/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { CardActionArea, CardContent, Typography, Box, Chip, Stack, useTheme, Paper } from '@mui/material';
import { getPhaseColors } from '../utils';
import { getCurrentPhase } from "@/src/utils.ts";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const theme = useTheme();
    const PHASE_COLORS = getPhaseColors(theme);
    const currentPhase = getCurrentPhase(project);
    const currentStage = currentPhase.currentPhaseStage ?? 'Planning & Requirements Analysis';

    // Calculate phase progress
    const totalPhases = project.phases.length;
    const completedPhases = project.phases.filter(p => p.isComplete).length;

    return (
        <Paper sx={{ height: '100%', display: 'flex', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardActionArea
                component={Link}
                to={`/project/${project.id}`}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '100%',
                }}
            >
                {/* On desktop, this is the colored sidebar. */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: { sm: 'rgba(0,0,0,0.2)' }, alignSelf: 'stretch' }}>
                    {project.cardIcon && <project.cardIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'left', p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ typography: { xs: 'h6', sm: 'h5' } }}>
                        {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                        {project.shortDescription}
                    </Typography>
                    <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ justifyContent: 'flex-start' }}>
                        <Chip
                            label={currentStage}
                            size="small"
                            sx={{
                                backgroundColor: PHASE_COLORS[currentStage] || theme.palette.grey[700],
                                color: theme.palette.getContrastText(PHASE_COLORS[currentStage] || theme.palette.grey[700]),
                                fontWeight: 'bold',
                            }}
                        />
                        <Chip
                            label={`Phase ${completedPhases}/${totalPhases} Done`}
                            variant="outlined"
                            size="small"
                            color={completedPhases === totalPhases ? "success" : "default"}
                        />
                    </Stack>
                    <Box sx={{ mt: 1 }}>
                        {project.technologies.slice(0, 3).map(tag => (
                            <Chip key={tag} label={tag} variant="outlined" size="small" sx={{ mr: 0.5, mt: 0.5 }} />
                        ))}
                        {project.technologies.length > 3 && (
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                                +{project.technologies.length - 3} more
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Paper>
    );
}