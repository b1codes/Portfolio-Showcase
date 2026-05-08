/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Grid } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface ProjectGridProps {
    projects: Project[];
}

// Renders the grid of all project cards.
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {projects.map((project, index) => (
        <Grid 
          item 
          key={project.id} 
          xs={12} 
          md={6} 
          lg={4}
          sx={{
            animation: `${fadeInUp} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
            animationDelay: `${index * 80}ms`
          }}
        >
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}