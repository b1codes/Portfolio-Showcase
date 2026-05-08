/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Project } from '@/src/types';
import { Link } from 'react-router-dom';
import { CardActionArea, CardContent, Typography, Box, Chip, Stack, useTheme, Paper } from '@mui/material';
import { getPhaseColors, getCurrentPhase } from '@/src/utils';

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
        <Paper elevation={0} sx={{ 
            height: '100%', 
            display: 'flex', 
            overflow: 'hidden',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', 
            '&:hover': { 
                transform: 'translateY(-6px) scale(1.01)',
                boxShadow: '0 16px 40px -10px rgba(162, 107, 250, 0.25)',
                borderColor: 'rgba(162, 107, 250, 0.2)',
                '& .project-icon': {
                    transform: 'scale(1.1) rotate(4deg)',
                    color: 'secondary.main',
                }
            } 
        }}>
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
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: 3, 
                    background: 'linear-gradient(145deg, rgba(162, 107, 250, 0.12) 0%, rgba(5, 224, 201, 0.04) 100%)', 
                    alignSelf: 'stretch',
                    borderRight: '1px solid rgba(255, 255, 255, 0.03)',
                    minWidth: { xs: 80, sm: 110 }
                }}>
                    {project.cardIcon && typeof project.cardIcon !== 'string' && (
                      <project.cardIcon className="project-icon" sx={{ fontSize: { xs: 36, sm: 48 }, color: 'primary.main', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
                    )}
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'left', p: 3, '&:last-child': { pb: 3 } }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ typography: { xs: 'h6', sm: 'h5' }, fontWeight: 700, mb: 1 }}>
                        {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3, lineHeight: 1.6 }}>
                        {project.shortDescription}
                    </Typography>
                    <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ justifyContent: 'flex-start', mb: 2 }}>
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