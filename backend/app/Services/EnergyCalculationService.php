<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Consumption;
use App\Models\Price;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use NXP\MathExecutor;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EnergyCalculationService
{
    function probar()
    {
        echo "probar";
    }

    function probar3()
    {
        echo "probar3";
    }
    
    /**
     * Calcula el precio indexado, total de importes y total de consumos en un rango de fechas.
     *
     * @throws NotFoundHttpException Si falta algún registro de consumo o precio en el rango de fechas.
     * @throws \InvalidArgumentException Si ocurre un error al evaluar la fórmula matemática.
     */
    public function calculate(string $startDate, string $endDate, string $formula): array
    {
        // 1. Consultar únicamente mediante Eloquent ORM
        $consumptions = Consumption::betweenDates($startDate, $endDate)
            ->get()
            ->keyBy(fn (Consumption $item) => $item->date->format('Y-m-d'));

        $prices = Price::betweenDates($startDate, $endDate)
            ->get()
            ->keyBy(fn (Price $item) => $item->date->format('Y-m-d'));

        // 2. Generar el periodo de fechas obligatorias
        $period = CarbonPeriod::create($startDate, $endDate);

        $totalImportes = 0.0;
        $totalConsumos = 0.0;

        $executor = new MathExecutor();

        // 3. Iterar por cada día del rango y verificar existencia completa
        foreach ($period as $date) {
            $dateKey = $date->format('Y-m-d');

            if (!$consumptions->has($dateKey) || !$prices->has($dateKey)) {
                throw new NotFoundHttpException("No existen registros completos de consumos o precios para la fecha: {$dateKey}");
            }

            $consumptionRecord = $consumptions->get($dateKey);
            $priceRecord = $prices->get($dateKey);

            // Iterar por cada hora (h1 a h25)
            for ($h = 1; $h <= 25; $h++) {
                $hourKey = "h{$h}";
                $priceValue = $priceRecord->{$hourKey};
                $consumptionValue = $consumptionRecord->{$hourKey};

                // Si alguno es nulo (ej. h25 en día normal de 24h), ignorar la hora
                if ($priceValue === null || $consumptionValue === null) {
                    continue;
                }

                // Sustituir la etiqueta [OMIE_MD] por el valor numérico del precio
                $replacedFormula = str_replace('[OMIE_MD]', (string) $priceValue, $formula);

                try {
                    $evaluatedPrice = (float) $executor->execute($replacedFormula);
                } catch (\Throwable $e) {
                    throw new \InvalidArgumentException("Error al evaluar la fórmula matemática en la hora {$hourKey}: " . $e->getMessage());
                }

                $importeHora = $evaluatedPrice * (float) $consumptionValue;
                $totalImportes += $importeHora;
                $totalConsumos += (float) $consumptionValue;
            }
        }

        // 4. Calcular precio indexado
        $priceIndexed = $totalConsumos > 0 ? ($totalImportes / $totalConsumos) : 0.0;

        return [
            'price_indexed' => round($priceIndexed, 4),
            'total_importes' => round($totalImportes, 2),
            'total_consumos' => round($totalConsumos, 4),
        ];
    }
}
