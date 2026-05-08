/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    Modal,
    Paper,
    Stack,
    Typography,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

import {
    ArrowBack as ArrowBackIcon,
    GitHub as GitHubIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Language as WebIcon,
    Apple as AppleIcon,
    Android as AndroidIcon,
    Cloud as CloudIcon,
    Terminal as TerminalIcon,
    Window as WindowsIcon,
    Computer as ComputerIcon,
    PhoneIphone as IOSIcon,
    TabletMac as IPadOSIcon,
    DesktopMac as MacOSIcon,
    Watch as WatchIcon,
} from '@mui/icons-material';

import { getPhaseColors, getCurrentPhase } from '../utils';
import { ClickUpProgress } from './ClickUpProgress';

const getBuildTargetIcon = (target: string) => {
    switch (target) {
        case 'Web': return <WebIcon fontSize="small" />;
        case 'iOS': return <IOSIcon fontSize="small" />;
        case 'iPadOS': return <IPadOSIcon fontSize="small" />;
        case 'macOS': return <MacOSIcon fontSize="small" />;
        case 'Apple Watch': return <WatchIcon fontSize="small" />;
        case 'Android': return <AndroidIcon fontSize="small" />;
        case 'Cloud': return <CloudIcon fontSize="small" />;
        case 'Terminal': return <TerminalIcon fontSize="small" />;
        case 'Windows': return <WindowsIcon fontSize="small" />;
        case 'Linux': return <ComputerIcon fontSize="small" />;
        default: return undefined;
    }
}

interface ProjectDetailProps {
    project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    const theme = useTheme();
    const PHASE_COLORS = getPhaseColors(theme);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const currentPhase = getCurrentPhase(project);
    const currentStage = currentPhase.currentPhaseStage ?? 'Planning & Requirements Analysis';

    const handleOpenImage = (imgSrc: string) => {
        setSelectedImage(imgSrc);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    return (
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4, md: 5 } }} aria-live="polite">
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    aria-label="Go back to portfolio"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Back to Projects
                </Button>
                <Button
                    variant="outlined"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    View on GitHub
                </Button>
            </Stack>

            {project.headerImage && (
                <Box
                    component="img"
                    src={project.headerImage}
                    alt={`${project.title} header`}
                    sx={{
                        width: '100%',
                        height: { xs: 150, sm: 200, md: 250 },
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 2,
                        mb: 3,
                    }}
                />
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                {project.appIcon && (
                    <Box
                        component="img"
                        src={project.appIcon}
                        alt={`${project.title} App Icon`}
                        sx={{
                            width: { xs: 48, sm: 64 },
                            height: { xs: 48, sm: 64 },
                            borderRadius: 2,
                            boxShadow: 2,
                            flexShrink: 0,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => handleOpenImage(project.appIcon!)}
                    />
                )}
                <Typography variant="h3" component="h2" sx={{ typography: { xs: 'h4', sm: 'h3' }, mb: 0 }}>
                    {project.title}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
                <Chip
                    label={currentStage}
                    sx={{
                        backgroundColor: PHASE_COLORS[currentStage] || theme.palette.grey[700],
                        color: theme.palette.getContrastText(PHASE_COLORS[currentStage] || theme.palette.grey[700]),
                        fontWeight: 'bold',
                    }}
                />
                {project.technologies.map(tag => <Chip key={tag} label={tag} variant="outlined" />)}
            </Stack>

            {project.buildTargets && project.buildTargets.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap" alignItems="center">
                    <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold', color: 'text.secondary' }}>Supported Platforms:</Typography>
                    {project.buildTargets.map(target => (
                        <Chip 
                            key={target} 
                            icon={getBuildTargetIcon(target)} 
                            label={target} 
                            variant="filled"
                            size="small"
                            color="primary"
                        />
                    ))}
                </Stack>
            )}

            <Typography variant='h5' paragraph sx={{ color: 'text.secondary', mb: 2, mt: 2, typography: { xs: 'h6', sm: 'h5' } }}>
                Inspiration
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: { xs: 1.6, sm: 1.7 }, color: 'text.secondary', maxWidth: '75ch' }}>
                {project.inspiration}
            </Typography>

            <Typography variant='h5' paragraph sx={{ color: 'text.secondary', mb: 2, typography: { xs: 'h6', sm: 'h5' } }}>
                Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: { xs: 1.6, sm: 1.7 }, color: 'text.secondary', maxWidth: '75ch' }}>
                {project.longDescription}
            </Typography>

            {/* Tech Stack Section */}
            {project.techStack && project.techStack.length > 0 && (
                <Box sx={{ my: 4 }}>
                    <Typography variant='h5' gutterBottom sx={{ color: 'text.secondary', mb: 2, typography: { xs: 'h6', sm: 'h5' } }}>
                        Tech Stack
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List disablePadding>
                            {project.techStack.map((stack, index) => (
                                <Box key={stack.category}>
                                    <ListItem alignItems="flex-start" sx={{ px: 0, py: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: { sm: '150px' }, mb: { xs: 1, sm: 0 } }}>
                                                    {stack.category}
                                                </Typography>
                                            }
                                            primaryTypographyProps={{ component: 'div' }}
                                            secondary={
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                    {stack.technologies.map((tech) => (
                                                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            }
                                            secondaryTypographyProps={{ component: 'div' }}
                                            sx={{ margin: 0, width: '100%' }}
                                        />
                                    </ListItem>
                                    {index < (project.techStack?.length || 0) - 1 && <Divider component="li" />}
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}

            {/* Project Phases Accordion Section */}
            <Box sx={{ my: 4 }}>
                <Typography variant='h5' gutterBottom sx={{ color: 'text.secondary', mb: 2, typography: { xs: 'h6', sm: 'h5' } }}>
                    Project Phases
                </Typography>
                {project.phases.map((phase) => (
                    <Accordion key={phase.number} defaultExpanded={phase.number === currentPhase.number}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`phase-${phase.number}-content`}
                            id={`phase-${phase.number}-header`}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {phase.isComplete ? (
                                    <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                                ) : (
                                    <RadioButtonUncheckedIcon color="action" sx={{ mr: 2 }} />
                                )}
                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
                                    Phase {phase.number}: {phase.title}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
                                    {phase.currentPhaseStage}
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {phase.description || "No description available for this phase."}
                            </Typography>
                            <Chip
                                label={phase.isComplete ? "Completed" : "In Progress/Planned"}
                                color={phase.isComplete ? "success" : "default"}
                                size="small"
                                variant="outlined"
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <ClickUpProgress projectId={project.id} />

            <Box sx={{ my: 4 }}>
                {project.video && (
                    <Box mb={4}>
                        <Typography variant="h5" gutterBottom sx={{ typography: { xs: 'h6', sm: 'h5' } }}>Screen Recording</Typography>
                        <Box sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100%',
                            paddingTop: '56.25%', // 16:9 Aspect Ratio
                            borderRadius: 1,
                        }}>
                            <iframe
                                src={project.video}
                                title={`Video for ${project.title}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {project.images && project.images.length > 0 && (
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ typography: { xs: 'h6', sm: 'h5' } }}>Screenshots</Typography>
                        <Grid container spacing={2}>
                            {project.images.map((img, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Screenshot ${index + 1} for ${project.title}`}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                        onClick={() => handleOpenImage(img)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
            <Modal
                open={selectedImage !== null}
                onClose={handleCloseImage}
                aria-labelledby="image-preview"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ position: 'relative', outline: 'none' }}>
                    <IconButton
                        aria-label="close image preview"
                        onClick={handleCloseImage}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'common.white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        src={selectedImage || ''}
                        alt="Enlarged screenshot"
                        sx={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '4px' }}
                    />
                </Box>
            </Modal>
        </Paper>
    );
}