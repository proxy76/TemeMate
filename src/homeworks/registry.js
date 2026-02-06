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
    }
};
