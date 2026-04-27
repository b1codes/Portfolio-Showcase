import {Project, ProjectPhase} from "@/src/types.ts";
import { Theme } from '@mui/material/styles';

export const PHASES_ORDER = [
    'Planning & Requirements Analysis',
    'Implementation',
    'Deployment',
    'Maintenance & Support',
];

export const PHASE_DESCRIPTIONS: Record<string, string> = {
    'Planning & Requirements Analysis': 'Projects in the initial phase of gathering requirements and planning.',
    'Implementation': 'Projects currently in active development and implementation.',
    'Deployment': 'Projects that are being deployed or have been recently deployed.',
    'Maintenance & Support': 'Projects that are complete and are now in a maintenance and support cycle.',
};

// Change this to match your repository name if hosting on GitHub Pages (e.g. '/My-Portfolio')
// or set to '/' if hosting at the root of a domain.
export const BASE_URL = '/';

export const DEFAULT_PROJECT_PHASE: ProjectPhase = {
    number: 1,
    title: 'MVP',
    description: 'MVP',
    isComplete: false,
    currentPhaseStage: 'Planning & Requirements Analysis',
}


export const getPhaseColors = (theme: Theme): Record<string, string> => ({
    'Planning & Requirements Analysis': theme.palette.info.main,
    'Implementation': theme.palette.secondary.main,
    'Deployment': theme.palette.success.main,
    'Maintenance & Support': theme.palette.primary.main,
});

export function getCurrentPhase(project: Project): ProjectPhase {
    //phases can't be null, but it could be empty
    if (project.phases.length == 0) {
        return DEFAULT_PROJECT_PHASE
    }

    return project.phases.find((phase) => !phase.isComplete) ?? project.phases[project.phases.length - 1]
}