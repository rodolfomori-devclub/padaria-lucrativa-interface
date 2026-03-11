export interface TutorialVideo {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
}

export const MARGENS_LUCRO_VIDEOS: TutorialVideo[] = [
  {
    id: "margens-lucro-principal",
    title: "Margens de Lucro",
    description: "Aprenda a configurar as margens de lucro da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1YlhtH9y8qNiZgFk9E3Dcc-2P1TeHyWYO/view?usp=sharing",
  },
  {
    id: "percentual-de-cartao",
    title: "Como encontrar o Percentual de Cartão",
    description:
      "Aprenda a encontrar o percentual de vendas no cartão da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/180MiFfKPMT-I_h7JYp5jnnhSkJpsgtVE/view?usp=sharing",
  },
  {
    id: "margem-produtos-de-revenda",
    title: "Como encontrar a Margem de Produtos de Revenda",
    description:
      "Aprenda a encontrar a margem de produtos de revenda da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1zVpYktlgpDplkyLY1gVlLQYXQsZCWrWj/view?usp=sharing",
  },
  {
    id: "margem-partição-fabricação-própria",
    title:
      "Como encontrar a Margem de Partipação dos Produtos de Fabricação Própria",
    description:
      "Aprenda a encontrar a margem de partipação dos produtos de fabricação própria da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1XIh39oas4bEiE6DbuFiQKggnvplzFuDv/view?usp=sharing",
  },
  {
    id: "percentual-de-imposto",
    title: "Como encontrar o Percentual de Imposto",
    description: "Aprenda a encontrar o percentual de imposto da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1eUSPQnPMzpPkmjQtJ2oO_LPU-4Qj61sy/view?usp=sharing",
  },
  {
    id: "percentual-de-quebra",
    title: "Como encontrar o Percentual de Quebra",
    description: "Aprenda a encontrar o percentual de quebra da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1MZhrPEPSKbdwb1tbKimw-PxRsW_7fjH2/view?usp=sharing",
  },
  {
    id: "percentual-de-custo-embalagem",
    title: "Como encontrar o Percentual de Custo de Embalagem",
    description:
      "Aprenda a encontrar o percentual de custo de embalagem da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1X77XVCHa6s7agqe24wF-iCySGeZg9lPy/view?usp=sharing",
  },
];

export const PROJECAO_VENDAS_VIDEOS: TutorialVideo[] = [
  {
    id: "projecao-vendas",
    title: "Tutorial - Projeção de Vendas",
    description: "Aprenda a gerenciar as projeções de vendas da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/15YS_cF8ciC3EE75qaSLGNkYxqfpVMoGx/view?usp=sharing",
  },
];

export const CONTROLE_PERDAS_VIDEOS: TutorialVideo[] = [
  {
    id: "controle-perdas",
    title: "Tutorial - Controle de Perdas",
    description: "Aprenda a gerenciar as perdas da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1apy-0bd2DFl3tTeeVnRywNhE4ntSn8Pp/view?usp=sharing",
  },
];

export const RECEITAS_MODELO_VIDEOS: TutorialVideo[] = [
  {
    id: "receitas-modelo",
    title: "Tutorial - Receitas Modelo",
    description: "Aprenda a gerenciar as receitas modelo da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/11WcW2t0X61eDbIBayGH0w5FO-n6HAu59/view?usp=sharing",
  },
];

export const INSUMOS_VIDEOS: TutorialVideo[] = [
  {
    id: "insumos",
    title: "Tutorial - Insumos",
    description: "Aprenda a gerenciar os insumos da sua padaria.",
    videoUrl:
      "https://drive.google.com/file/d/1JGHyq4xLjvcU-0xypsn5js3SbEeF4GxM/view?usp=sharing",
  },
];

const DESPESAS_VIDEO_URL =
  "https://drive.google.com/file/d/1n8LFWQUYDhixa4PrmwsB82_HaMHf8nsk/view?usp=sharing";

export const DESPESAS_VIDEOS: TutorialVideo[] = [
  {
    id: "despesas-fixas",
    title: "Tutorial - Despesas Fixas",
    description: "Aprenda a gerenciar as despesas fixas da sua padaria.",
    videoUrl: DESPESAS_VIDEO_URL,
  },
  {
    id: "despesas-variaveis",
    title: "Tutorial - Despesas Variáveis",
    description: "Aprenda a gerenciar as despesas variáveis da sua padaria.",
    videoUrl: DESPESAS_VIDEO_URL,
  },
];

export const INTRODUCTION_VIDEO: TutorialVideo = {
  id: "introduction",
  title: "Seja Bem-vindo!",
  description: "Aprenda a usar o sistema Padaria Lucrativa.",
  videoUrl:
    "https://drive.google.com/file/d/1l3WIH-XTJqsgOQMr5kwb95ipuNV6vE57/view?usp=sharing",
};

/** All tutorial videos in the system (aggregates all sections) */
export const ALL_TUTORIAL_VIDEOS: TutorialVideo[] = [
  INTRODUCTION_VIDEO,
  ...MARGENS_LUCRO_VIDEOS,
  ...PROJECAO_VENDAS_VIDEOS,
  ...CONTROLE_PERDAS_VIDEOS,
  ...RECEITAS_MODELO_VIDEOS,
  ...INSUMOS_VIDEOS,
  ...DESPESAS_VIDEOS,
];
