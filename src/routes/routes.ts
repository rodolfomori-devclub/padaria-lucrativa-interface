import {
  AlertTriangle,
  Calculator,
  ChartNoAxesCombined,
  ChefHat,
  FileText,
  Home,
  Package,
  Settings,
  TrendingUp,
  Truck,
  User,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

// Route constants
export const ROUTES = {
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",

  // Cadastros Gerais
  DESPESAS_FIXAS: "/despesas-fixas",
  DESPESAS_VARIAVEIS: "/despesas-variaveis",
  MARGENS_LUCRO: "/margens-lucro",

  // Despesa com Pessoal
  CARGOS: "/cargos",
  DESPESAS_PESSOAL: "/despesas-pessoal",

  // Insumos
  INSUMOS: "/insumos",

  // Receitas Modelo
  RECEITAS_MODELO: "/receitas-modelo",
  RECEITAS_MODELO_NOVA: "/receitas-modelo/nova",
  RECEITAS_MODELO_EDITAR: "/receitas-modelo/editar",

  // Fornecedores
  FORNECEDORES: "/fornecedores",
  BOLETOS: "/boletos",

  // Controle de Perdas
  CONTROLE_PERDAS: "/controle-perdas",

  // Projeção de Vendas
  PROJECAO_VENDAS: "/projecao-vendas",

  // Mix de Margens
  MIX_DE_MARGENS: "/mix-de-margens",

  // Admin routes
  ADMIN_CLIENTES: "/admin/clientes",
  ADMIN_PLANOS: "/admin/planos",
  ADMIN_FUNCIONARIOS: "/admin/funcionarios",
  ADMIN_CADASTROS_GERAIS: "/admin/cadastros-gerais",
} as const;

// Navigation item type
export interface NavItem {
  name: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
  children?: Omit<NavItem, "children">[];
}

// Sidebar navigation configuration
export const BASIC_SIDEBAR_NAVIGATION: NavItem[] = [
  {
    name: "Resultado Previsto",
    href: ROUTES.DASHBOARD,
    icon: Home,
  },
  {
    name: "Cadastros Gerais",
    icon: Settings,
    children: [
      {
        name: "Despesas Fixas",
        href: ROUTES.DESPESAS_FIXAS,
        icon: FileText,
      },
      {
        name: "Despesas Variáveis",
        href: ROUTES.DESPESAS_VARIAVEIS,
        icon: TrendingUp,
      },
      {
        name: "Margens de Lucro",
        href: ROUTES.MARGENS_LUCRO,
        icon: Calculator,
      },
    ],
  },
  {
    name: "Despesa com Pessoal",
    icon: Users,
    children: [
      {
        name: "Cargos",
        href: ROUTES.CARGOS,
        icon: User,
      },
      {
        name: "Despesas",
        href: ROUTES.DESPESAS_PESSOAL,
        icon: FileText,
      },
    ],
  },
  {
    name: "Insumos",
    href: ROUTES.INSUMOS,
    icon: Package,
  },
  {
    name: "Receitas Modelo",
    href: ROUTES.RECEITAS_MODELO,
    icon: ChefHat,
  },
  {
    name: "Fornecedores",
    icon: Truck,
    children: [
      {
        name: "Cadastro",
        href: ROUTES.FORNECEDORES,
        icon: FileText,
      },
      {
        name: "Boletos",
        href: ROUTES.BOLETOS,
        icon: Calculator,
      },
    ],
  },
  {
    name: "Controle de Perdas",
    href: ROUTES.CONTROLE_PERDAS,
    icon: AlertTriangle,
  },
  {
    name: "Projeção de Vendas",
    href: ROUTES.PROJECAO_VENDAS,
    icon: TrendingUp,
  },
];

export const PRO_SIDEBAR_NAVIGATION: NavItem[] = [
  ...BASIC_SIDEBAR_NAVIGATION,
  {
    name: "Mix de Margens",
    href: ROUTES.MIX_DE_MARGENS,
    icon: ChartNoAxesCombined,
  },
];

export const ADMIN_SIDEBAR_NAVIGATION: NavItem[] = [
  {
    name: "Clientes",
    href: ROUTES.ADMIN_CLIENTES,
    icon: Users,
  },
  {
    name: "Planos",
    href: ROUTES.ADMIN_PLANOS,
    icon: Package,
  },
  {
    name: "Funcionários",
    href: ROUTES.ADMIN_FUNCIONARIOS,
    icon: User,
  },
  {
    name: "Cadastros Gerais",
    href: ROUTES.ADMIN_CADASTROS_GERAIS,
    icon: Settings,
  },
];

// User menu configuration
export const USER_MENU_ITEMS = [
  {
    name: "Perfil",
    href: ROUTES.PROFILE,
    icon: User,
  },
] as const;
