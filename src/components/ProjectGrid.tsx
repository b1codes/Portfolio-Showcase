/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Grid } from '@mui/material';

interface ProjectGridProps {
    projects: Project[];
}

// Renders the grid of all project cards.
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {projects.map(project => (
        <Grid item key={project.id} xs={12} md={6} lg={4}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}