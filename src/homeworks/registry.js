import { lazy } from 'react';

export const homeworkRegistry = {
    [import.meta.env.VITE_CODE_MATH_MIXED]: {
        id: "hw1",
        component: lazy(() => import('./LiceuDiverse1')),
        title: "Temă Matematică - Exerciții Mixte"
    },
    [import.meta.env.VITE_CODE_GEOM_7]: {
        id: "hw2",
        component: lazy(() => import('./GeomCls7')),
        title: "Temă Matematică - Geometrie Clasa 7"
    },
    [import.meta.env.VITE_CODE_RADEASY_7]: {
        id: "hw3",
        component: lazy(() => import('./RadicaliSimpli')),
        title: "Temă Matematică - Radicali Simpli"
    },
    [import.meta.env.VITE_CODE_M2EZ]: {
        id: "hw4",
        component: lazy(() => import('./M2Sub1Simplu')),
        title: "Temă Matematică - M2"
    },
    [import.meta.env.VITE_CODE_BASIC]: {
        id: "hw5",
        component: lazy(() => import('./Basic')),
        title: "Temă Matematică - Exerciții de Bază"
    },
    [import.meta.env.VITE_CODE_BASIC2]: {
        id: "hw6",
        component: lazy(() => import('./CalculeBasic')),
        title: "Temă Matematică - Calcule de Bază"
    },
    [import.meta.env.VITE_CODE_BASIC3]: {
        id: "hw7",
        component: lazy(() => import('./EcuatiiBasic')),
        title: "Temă Matematică - Ecuații de Baza"
    },
    [import.meta.env.VITE_CODE_DERPUT]: {
        id: "hw8",
        component: lazy(() => import('./PuteriSiDerivate')),
        title: "Temă Matematică - Puteri si Derivate"
    }
};
