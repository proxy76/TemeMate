import { lazy } from 'react';

export const homeworkRegistry = {
    "GR1MON1730_001": {
        id: "hw1",
        component: lazy(() => import('./Homework1')),
        title: "Temă Matematică - Exerciții Mixte"
    }
};
