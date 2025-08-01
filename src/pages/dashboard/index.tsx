import { useState } from "react";
import { useDashboardData } from "~/hooks/dashboard/useDashboardData";
import type { DashboardFilters } from "~/types/dashboard";
import { DashboardFilters as DashboardFiltersComponent } from "./components/DashboardFilters";
import { FinancialIndicators } from "./components/FinancialIndicators";
import { NetResultIndicator } from "./components/NetResultIndicator";
import { SalesIndicators } from "./components/SalesIndicators";

export function DashboardPage() {
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;

    // Dashboard filters state
    const [filters, setFilters] = useState<DashboardFilters>({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    // Fetch dashboard data
    const { dashboardData, isLoading, error } = useDashboardData(filters);

    const handleFiltersChange = (newFilters: Partial<DashboardFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base">Dashboard</h1>
                <p className="text-gray-600 mt-2">Visão geral do desempenho da padaria</p>
            </div>

            {userData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-base mb-4">Informações do Usuário</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Nome:</span> {userData.nome}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">E-mail:</span> {userData.email}
                        </p>
                        {userData.telefone && (
                            <p className="text-gray-700">
                                <span className="font-medium">Telefone:</span> {userData.telefone}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Dashboard Filters */}
            <DashboardFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
            />

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                    <h3 className="text-red-800 font-medium">Erro ao carregar dados</h3>
                    <p className="text-red-600 text-sm mt-1">
                        Não foi possível carregar os dados do dashboard. Tente novamente.
                    </p>
                </div>
            )}

            {/* Dashboard Content */}
            {dashboardData ? (
                <>
                    {/* Sales Indicators */}
                    <SalesIndicators
                        salesData={dashboardData.salesIndicators}
                        isLoading={isLoading}
                    />

                    {/* Financial Indicators */}
                    <FinancialIndicators
                        financialData={dashboardData.financialIndicators}
                        isLoading={isLoading}
                    />

                    {/* Net Result */}
                    <NetResultIndicator
                        netResult={dashboardData.netResult}
                        isLoading={isLoading}
                    />
                </>
            ) : !error && (
                /* Loading state with skeleton components */
                <>
                    <SalesIndicators
                        salesData={{
                            dailyAverage: 0,
                            monthlyForecast: 0,
                            actualSales: 0,
                            salesDays: 0,
                        }}
                        isLoading={true}
                    />
                    <FinancialIndicators
                        financialData={{
                            fixedExpenses: { value: 0, percentage: 0 },
                            variableExpenses: { value: 0, percentage: 0 },
                            personnelExpenses: { value: 0, percentage: 0 },
                            monthlyPurchases: { value: 0, percentage: 0 },
                            cardCosts: { value: 0, percentage: 0 },
                            total: { value: 0, percentage: 0 },
                        }}
                        isLoading={true}
                    />
                    <NetResultIndicator
                        netResult={{
                            value: 0,
                            margin: 0,
                        }}
                        isLoading={true}
                    />
                </>
            )}
        </div>
    );
} 