import type { CMVIndicatorCardProps } from "~/types/dashboard";
import { IndicatorCard } from "./IndicatorCard";

export function CMVIndicatorCard({
  cmvData,
  isLoading = false,
}: CMVIndicatorCardProps) {
  const indicators = [
    {
      label: "CMV Atual",
      value: cmvData.realValue,
      color: "text-blue-600",
    },
    {
      label: "CMV Projetado",
      value: cmvData.forecastValue,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Indicadores de CMV
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        Valores e percentuais calculados com base na previsão mensal
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator) => {
          const isCMV = indicator.label === "Compra Acumulada do Mês";
          const isAboveAverage = isCMV && indicator.value > 40;

          return (
            <IndicatorCard
              key={indicator.label}
              title={indicator.label}
              value={indicator.value.toString()}
              color={isAboveAverage ? "text-red-600" : indicator.color}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
