import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {
  DashboardPage,
  InputsPage,
  ProfilePage,
  ReceitasModeloPage,
  RecipeFormPage,
} from "./pages";
import { ClientsPage } from "./pages/admin/clientes";
import { EmployeesPage } from "./pages/admin/funcionarios";
import { ForgotPasswordPage, LoginPage, RegisterPage } from "./pages/auth";
import {
  DespesasFixasPage,
  DespesasVariaveisPage,
} from "./pages/cadastros-gerais";
import { MargensLucroPage } from "./pages/cadastros-gerais/MargensLucro";
import { ControlePerdasPage } from "./pages/controle-perdas";
import { CargosPage, DespesasPessoalPage } from "./pages/despesas-pessoal";
import { BoletosPage, FornecedoresPage } from "./pages/fornecedores";
import { ProjecaoVendasPage } from "./pages/projecao-vendas";
import { ROUTES } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />

          {/* Nested Dashboard Routes */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Outlet />
              </AppLayout>
            }
          >
            <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.INSUMOS} element={<InputsPage />} />
            <Route
              path={ROUTES.RECEITAS_MODELO}
              element={<ReceitasModeloPage />}
            />
            <Route
              path={ROUTES.RECEITAS_MODELO_NOVA}
              element={<RecipeFormPage />}
            />
            <Route
              path={`${ROUTES.RECEITAS_MODELO_EDITAR}/:id`}
              element={<RecipeFormPage />}
            />
            <Route
              path={ROUTES.DESPESAS_FIXAS}
              element={<DespesasFixasPage />}
            />
            <Route
              path={ROUTES.DESPESAS_VARIAVEIS}
              element={<DespesasVariaveisPage />}
            />
            <Route path={ROUTES.MARGENS_LUCRO} element={<MargensLucroPage />} />
            <Route path={ROUTES.CARGOS} element={<CargosPage />} />
            <Route
              path={ROUTES.DESPESAS_PESSOAL}
              element={<DespesasPessoalPage />}
            />
            <Route path={ROUTES.FORNECEDORES} element={<FornecedoresPage />} />
            <Route path={ROUTES.BOLETOS} element={<BoletosPage />} />
            <Route
              path={ROUTES.CONTROLE_PERDAS}
              element={<ControlePerdasPage />}
            />
            <Route
              path={ROUTES.PROJECAO_VENDAS}
              element={<ProjecaoVendasPage />}
            />
            {/* <Route
              path={ROUTES.MIX_DE_MARGENS}
              element={
                <PlanProtectedRoute requiredPlan={PlanType.PRO}>
                  <MixMargensPage />
                </PlanProtectedRoute>
              }
            /> */}
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/"
            element={
              <AdminProtectedRoute>
                <AppLayout>
                  <Outlet />
                </AppLayout>
              </AdminProtectedRoute>
            }
          >
            {/* <Route path={ROUTES.ADMIN_PLANOS} element={<PlansPage />} /> */}
            <Route path={ROUTES.ADMIN_CLIENTES} element={<ClientsPage />} />
            <Route path={ROUTES.ADMIN_FUNCIONARIOS} element={<EmployeesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
