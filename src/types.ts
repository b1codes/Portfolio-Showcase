/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Defines the possible development phases for a project.
export type ProjectStage = 'Planning & Requirements Analysis' | 'Implementation' | 'Deployment' | 'Maintenance & Support';

export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export type BuildTargets = 'Web' | 'iOS' | 'iPadOS' | 'Android' | 'Apple Watch' | 'Cloud' | 'Terminal' | 'macOS' | 'Windows' | 'Linux';

// Defines the structure for a single project.
export interface Project {
  id: number;
  cardIcon: React.ElementType | string; // Icon or image URL for the card
  appIcon?: string;
  headerImage?: string;
  title: string;
  inspiration: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  techStack?: TechStackCategory[];
  images?: string[];
  video?: string;
  // currentStage?: ProjectStage;
  githubUrl: string;
  clickupListId?: string;
  phases: ProjectPhase[];
  buildTargets: BuildTargets[];
}

export interface ProjectPhase {
  number: number; // Phase number in progress (e.g. 1, 2, 3)
  title: string; // Title of the phase (e.g. MVP, feature update, etc.)
  description?: string; // General description of additions, changes, and goals for the phase
  isComplete: boolean; // Whether the phase is complete or not
  currentPhaseStage: ProjectStage
}

export interface ExtraProfiles {
  name: string;
  url: string;
  icon: React.ElementType | string;
}

export interface ClickUpTask {
  name: string;
  status: string;
  statusColor: string;
  isClosed: boolean;
}

export interface ClickUpProjectData {
  progress: number;
  tasks: ClickUpTask[];
}

export interface ClickUpDataSchema {
  lastUpdated: string | null;
  projects: {
    [key: string]: ClickUpProjectData;
  };
}