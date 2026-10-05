export interface CommercialProject {
  id: string;
  title: string;
  category: string;
  description: string;
  previewImage: string;
  internalPath: string;
  highlightFeature?: string;
}

const BASE_URL = import.meta.env.BASE_URL;

export const PROJECTS: CommercialProject[] = [
  {
    id: 'imprenta',
    title: 'Prototipo para Help Graf',
    category: 'Landing Page',
    description:
      'Diseño enfocado en alta conversión de servicios gráficos y cotizaciones directas.',
    previewImage:
      `${BASE_URL}previews/help-graf.png`,
    internalPath:
      `${BASE_URL}src/projects/help-graf/src/index.html`,
    highlightFeature:
      'Creado para impulsar tus ventas',
  },
  {
    id: 'lisy',
    title: 'Prototipo para Lisy Dance Cuba',
    category: 'Landing Page',
    description:
      'Diseño enfocado en alta conversión de servicios gráficos y cotizaciones directas.',
    previewImage:
      `${BASE_URL}previews/lisy-dance-cuba.png`,
    internalPath:
      `${BASE_URL}src/projects/lisy-dance-cuba/index.html`,
    highlightFeature:
      'Optimizado para captar clientes',
  },
];