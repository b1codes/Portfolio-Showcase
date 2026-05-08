/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Project, ExtraProfiles} from './types';

import {
  FolderSpecial as FolderSpecialIcon,
  Devices as DevicesIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Example Full Project',
    cardIcon: FolderSpecialIcon,
    headerImage: 'https://via.placeholder.com/1200x600?text=Header+Image',
    inspiration: 'A description of why this project was conceived and the problem it aims to solve.',
    shortDescription: 'A robust full-stack application demonstrating comprehensive feature sets.',
    longDescription: 'This project showcases a complete software development lifecycle, featuring integration with modern cloud services and a responsive frontend architecture. It handles complex data processing and provides a seamless user experience across multiple platforms.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    techStack: [
      { category: 'Frontend', technologies: ['React', 'TypeScript', 'Material UI'] },
      { category: 'Backend', technologies: ['Node.js', 'Express', 'PostgreSQL'] },
      { category: 'Infrastructure', technologies: ['AWS', 'Docker', 'Terraform'] }
    ],
    githubUrl: 'https://github.com/your-username/example-full-project',
    clickupListId: '12345678', // Example ClickUp List ID for progress tracking
    buildTargets: ['Web', 'Cloud'],
    phases: [
      {
        number: 1,
        title: 'Foundation',
        description: 'Establishing core architecture and basic functionality.',
        isComplete: true,
        currentPhaseStage: 'Deployment',
      },
      {
        number: 2,
        title: 'Advanced Features',
        description: 'Implementing complex business logic and third-party integrations.',
        isComplete: false,
        currentPhaseStage: 'Implementation',
      }
    ]
  },
  {
    id: 2,
    title: 'Simple Component Library',
    cardIcon: CodeIcon,
    inspiration: 'Created to streamline the development process for reusable UI components.',
    shortDescription: 'A lightweight and highly customizable set of UI components.',
    longDescription: 'This project focuses on modular design and performance. It provides a set of components that are easy to integrate and theme, ensuring consistency across various applications.',
    technologies: ['TypeScript', 'CSS Modules'],
    techStack: [
      { category: 'Core', technologies: ['TypeScript', 'React', 'Vite'] }
    ],
    githubUrl: 'https://github.com/your-username/ui-library',
    buildTargets: ['Web'],
    phases: [
      {
        number: 1,
        title: 'Alpha Release',
        description: 'Initial set of core components.',
        isComplete: true,
        currentPhaseStage: 'Maintenance & Support',
      }
    ]
  },
  {
    id: 3,
    title: 'Cross-Platform App',
    cardIcon: DevicesIcon,
    inspiration: 'Built to provide a unified experience across mobile and desktop devices.',
    shortDescription: 'A modern application designed for versatility and reach.',
    longDescription: 'Leveraging multi-platform frameworks, this application ensures that users have access to the same powerful features whether they are on their phone or their computer.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    githubUrl: 'https://github.com/your-username/cross-platform-app',
    buildTargets: ['iOS', 'Android', 'macOS', 'Windows'],
    phases: [
      {
        number: 1,
        title: 'Mobile Launch',
        description: 'Initial release for iOS and Android.',
        isComplete: true,
        currentPhaseStage: 'Maintenance & Support',
      }
    ]
  }
];

export const ABOUT_ME_TEXT = `Hello! I am a software engineer passionate about building high-quality applications. 

This is a template description. You can edit this text in src/data.ts to tell your own professional story, highlight your skills, and showcase your achievements.`;

export const GITHUB_PROFILE_URL = 'https://github.com/your-username';
export const LINKEDIN_PROFILE_URL = 'https://linkedin.com/in/your-profile';

export const EXTRA_PROFILES: any[] = [
  { name: 'GitHub', url: 'https://github.com/your-username', icon: FolderSpecialIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile', icon: FolderSpecialIcon },
];

export const IDES: string[] = ['VS Code', 'IntelliJ', 'Xcode'];

export const DEV_TOOLS: string[] = ['Git', 'Docker', 'Jenkins', 'Terraform'];
tring[] = ['VS Code', 'IntelliJ', 'Xcode'];

export const DEV_TOOLS: string[] = ['Git', 'Docker', 'Jenkins', 'Terraform'];
