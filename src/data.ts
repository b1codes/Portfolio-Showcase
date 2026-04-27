/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Project, ProjectPhase} from './types';
import {BASE_URL} from './utils';

import {
  FolderSpecial as FolderSpecialIcon,
} from '@mui/icons-material';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Example Project',
    cardIcon: FolderSpecialIcon, // Ensure this import remains
    inspiration: 'Explain why you built this project here.',
    shortDescription: 'A short catchy description.',
    longDescription: 'A detailed description of the project, technical challenges, and outcome.',
    technologies: ['React', 'TypeScript'],
    techStack: [
         { category: 'Frontend', technologies: ['React', 'TypeScript'] }
    ],
    // Use a placeholder image path or remove 'images' property if not needed
    githubUrl: 'https://github.com/your-username/your-repo',
    phases: [
      {
        number: 1,
        title: 'MVP',
        isComplete: true,
        currentPhaseStage: 'Maintenance & Support',
      }
    ]
  }
];

export const ABOUT_ME_TEXT = `Hello! I am a software engineer. This is a template description. 

Users can edit this text in src/data.ts to tell their own story.`;