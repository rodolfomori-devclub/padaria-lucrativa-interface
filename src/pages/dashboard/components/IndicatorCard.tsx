import { cn } from "~/lib/utils";
import type { IndicatorCardProps } from "~/types/dashboard";

export function IndicatorCard({
  title,
  value,
  subtitle,
  color = "text-gray-900",
  isLoading = false,
  isMixMargens = false,
  icon: Icon,
}: IndicatorCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          {Icon && <div className="h-5 w-5 bg-gray-200 rounded" />}
        </div>
        <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-40 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      {isMixMargens ? (
        <div className="flex items-center justify-between">
          <p className={cn("text-2xl font-bold mb-1", color)}>{value}</p>
          <p className={cn("text-md text-gray-500", color)}>{subtitle}</p>
        </div>
      ) : (
        <>
          <p className={cn("text-2xl font-bold mb-1", color)}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </>
      )}
    </div>
  );
}
