/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo } from 'react';
import { Box, Tooltip, Typography, useMediaQuery, useTheme, Paper, Accordion, AccordionSummary, AccordionDetails, IconButton, Button, Dialog, DialogTitle, DialogContent, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HubIcon from '@mui/icons-material/Hub';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { getPhaseColors, PHASE_DESCRIPTIONS, PHASES_ORDER, getCurrentPhase } from '../utils';
import Plot from 'react-plotly.js';
// @ts-ignore
import { Data } from 'plotly.js';

interface ProjectPhasesProps {
    projects: Project[];
}

export function ProjectPhases({ projects }: ProjectPhasesProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isSunburstOpen, setIsSunburstOpen] = useState(false);
    const totalProjects = projects.length;
    const PHASE_COLORS = getPhaseColors(theme);

    // --- Data Preparation: Distribution ---
    const { phaseCounts, distLabels, distValues, distColors } = useMemo(() => {
        const counts = PHASES_ORDER.reduce((acc, phase) => {
            acc[phase] = 0;
            return acc;
        }, {} as Record<string, number>);

        projects.forEach(project => {
            const currentPhaseStage = getCurrentPhase(project).currentPhaseStage;
            if (counts[currentPhaseStage] !== undefined) {
                counts[currentPhaseStage]++;
            }
        });

        const labels = PHASES_ORDER.filter(phase => counts[phase] > 0);
        const values = labels.map(phase => counts[phase]);
        const colors = labels.map(phase => PHASE_COLORS[phase]);

        return { phaseCounts: counts, distLabels: labels, distValues: values, distColors: colors };
    }, [projects, PHASE_COLORS]);

    // --- Render Functions ---

    const legend = (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 2, width: '100%' }}>
            {PHASES_ORDER.map(phase => {
                const count = phaseCounts[phase];
                if (count === 0) return null;
                return (
                    <Tooltip key={phase} title={PHASE_DESCRIPTIONS[phase]}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: PHASE_COLORS[phase], mr: 1 }} />
                            <Typography variant="body2">{phase} ({count})</Typography>
                        </Box>
                    </Tooltip>
                );
            })}
        </Box>
    );

    /**
     * Renders the Pie/Bar distribution of current project phases.
     */
    const renderDistributionChart = () => (
        <Paper elevation={2} sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            overflow: 'hidden',
            minHeight: 'auto'
        }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', flexShrink: 0 }}>
                Current Phase Stage Distribution
            </Typography>

            {isMobile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ height: 300, width: '100%', position: 'relative' }}>
                        <Plot
                            data={[{
                                values: distValues,
                                labels: distLabels,
                                type: 'pie',
                                hole: .4,
                                marker: { colors: distColors },
                                textinfo: 'percent',
                                textposition: 'inside',
                            }]}
                            useResizeHandler={true}
                            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                            layout={{
                                showlegend: false,
                                autosize: true,
                                margin: { l: 20, r: 20, b: 20, t: 20 },
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                font: { color: theme.palette.text.primary },
                            }}
                            config={{ displayModeBar: false }}
                        />
                    </Box>
                    {legend}
                </Box>
            ) : (
                <Box sx={{ mt: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', width: '100%', minWidth: 0, minHeight: 0 }}>
                    <Box sx={{ display: 'flex', height: '24px', borderRadius: 1, overflow: 'hidden', mb: 2, border: '1px solid', borderColor: 'divider', flexShrink: 0, width: '100%' }}>
                        {PHASES_ORDER.map(phase => {
                            const count = phaseCounts[phase];
                            if (count === 0) return null;
                            const percentage = (count / totalProjects) * 100;
                            return (
                                <Tooltip key={phase} title={`${phase}: ${count} project${count > 1 ? 's' : ''}`}>
                                    <Box
                                        sx={{
                                            width: `${percentage}%`,
                                            backgroundColor: PHASE_COLORS[phase],
                                            transition: 'width 0.5s ease-in-out',
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Box>
                    {legend}
                </Box>
            )}
        </Paper>
    );

    /**
     * Renders the bar chart comparing total completed phases vs current active projects.
     */
    const renderTotalsChart = () => {
        // Calculate counts for every phase across all projects
        // Completed phases are treated as "Maintenance & Support"
        const { allPhaseLabels, allPhaseValues, allPhaseColors } = useMemo(() => {
            const counts = PHASES_ORDER.reduce((acc, phase) => {
                acc[phase] = 0;
                return acc;
            }, {} as Record<string, number>);

            projects.forEach(project => {
                project.phases.forEach(phase => {
                    if (phase.isComplete) {
                        counts['Maintenance & Support']++;
                    } else {
                        const stage = phase.currentPhaseStage;
                        if (counts[stage] !== undefined) {
                            counts[stage]++;
                        }
                    }
                });
            });

            const labels = PHASES_ORDER.filter(phase => counts[phase] > 0);
            const values = labels.map(phase => counts[phase]);
            const colors = labels.map(phase => PHASE_COLORS[phase]);
            return { allPhaseLabels: labels, allPhaseValues: values, allPhaseColors: colors };
        }, [projects, PHASE_COLORS]);

        const data: Data[] = [
            {
                x: allPhaseLabels.map((label: string) => label.replace(' & ', ' &<br>')),
                y: allPhaseValues,
                type: 'bar',
                marker: {
                    color: allPhaseColors
                },
                text: allPhaseValues.map(String),
                textposition: 'auto',
            }
        ];

        return (
            <Paper elevation={2} sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                flex: { xs: '0 0 auto', md: 1 },
                height: { xs: 400, md: 'auto' },
                width: '100%',
                overflow: 'hidden',
                minHeight: 300,
            }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', flexShrink: 0 }}>
                    All Phase Totals Across Portfolio
                </Typography>
                <Box sx={{ flex: 1, position: 'relative', minHeight: 0, width: '100%', minWidth: 0 }}>
                    <Plot
                        data={data}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        layout={{
                            autosize: true,
                            margin: isMobile
                                ? { l: 30, r: 10, b: 100, t: 10 }
                                : { l: 40, r: 20, b: 80, t: 10 },
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            font: { color: theme.palette.text.primary, size: isMobile ? 10 : 12 },
                            xaxis: {
                                fixedrange: true,
                                tickangle: -45, // Rotate labels
                                automargin: true
                            },
                            yaxis: { fixedrange: true },
                            showlegend: false
                        }}
                        config={{ displayModeBar: false }}
                    />
                </Box>
            </Paper>
        );
    };

    /**
     * Renders a condensed grid showing all projects and their phase progress.
     */
    const renderPhaseGrid = () => {
        const sortedProjects = [...projects].sort((a, b) => a.id - b.id);
        const maxPhases = Math.max(...projects.map(p => p.phases.length), 0);

        // Split projects into two columns
        const midPoint = Math.ceil(sortedProjects.length / 2);
        const leftColumnProjects = sortedProjects.slice(0, midPoint);
        const rightColumnProjects = sortedProjects.slice(midPoint);

        const renderColumnHeader = () => (
            <Grid container spacing={1} sx={{ mb: 1, borderBottom: 1, borderColor: 'divider', pb: 1, pr: 2, flexShrink: 0 }}>
                <Grid item xs={4}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Project</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {Array.from({ length: maxPhases }).map((_, i) => (
                            <Typography key={i} variant="caption" sx={{ width: 24, textAlign: 'center', fontWeight: 'bold', fontSize: '0.65rem' }}>
                                P{i + 1}
                            </Typography>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        );

        const renderProjectRow = (project: Project) => (
            <Grid container key={project.id} spacing={1} sx={{ 
                flexGrow: 1,
                minHeight: { xs: 40, lg: 45 },
                py: { xs: 1, lg: 0 }, 
                borderBottom: '1px solid', 
                borderColor: 'action.hover', 
                '&:last-child': { borderBottom: 0 }, 
                alignItems: 'center', 
                pr: 1 
            }}>
                <Grid item xs={4}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                        {project.title}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {project.phases.map((phase) => (
                            <Tooltip
                                key={phase.number}
                                title={
                                    <Box sx={{ p: 0.5 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Phase {phase.number}: {phase.title}</Typography>
                                        <Typography variant="caption" display="block">{phase.currentPhaseStage}</Typography>
                                        <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>{phase.description}</Typography>
                                    </Box>
                                }
                                arrow
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 1,
                                        backgroundColor: PHASE_COLORS[phase.currentPhaseStage],
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.15)',
                                            cursor: 'help',
                                            zIndex: 1,
                                            boxShadow: 2
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: theme.palette.getContrastText(PHASE_COLORS[phase.currentPhaseStage]),
                                        fontSize: '0.65rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {phase.isComplete ? '✓' : phase.number}
                                </Box>
                            </Tooltip>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        );

        return (
            <Paper elevation={2} sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                        Portfolio Phase Tracker
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<HubIcon />}
                        onClick={() => setIsSunburstOpen(true)}
                    >
                        View Full Hierarchy
                    </Button>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 4,
                    flex: 1,
                    minHeight: 0
                }}>
                    {/* Left Column */}
                    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {renderColumnHeader()}
                        <Box sx={{ 
                            flex: 1, 
                            overflowY: 'auto', 
                            pr: 0.5, 
                            display: 'flex', 
                            flexDirection: 'column',
                            minHeight: 0
                        }}>
                            {leftColumnProjects.map(project => renderProjectRow(project))}
                        </Box>
                    </Box>

                    {/* Right Column */}
                    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {renderColumnHeader()}
                        <Box sx={{ 
                            flex: 1, 
                            overflowY: 'auto', 
                            pr: 0.5, 
                            display: 'flex', 
                            flexDirection: 'column',
                            minHeight: 0
                        }}>
                            {rightColumnProjects.map(project => renderProjectRow(project))}
                        </Box>
                    </Box>
                </Box>
            </Paper>
        );
    };

    /**
     * Renders the Sunburst chart showing project hierarchy.
     */
    const renderSunburstChart = (isModal = false) => {
        // Arrays to hold chart data
        const ids: string[] = [];
        const labels: string[] = [];
        const parents: string[] = [];
        const values: number[] = [];
        const colors: string[] = [];
        const hovertext: string[] = [];

        projects.forEach(project => {
            const projId = `proj-${project.id}`;
            ids.push(projId);
            labels.push(project.title);
            // Parent is empty string -> this makes the Project a top-level slice
            parents.push('');
            // Value for project = number of phases it has
            values.push(project.phases.length);
            // Neutral color for project ring so phases pop
            colors.push(theme.palette.grey[800]);
            hovertext.push(`<b>Project:</b> ${project.title}<br><b>Total Phases:</b> ${project.phases.length}`);

            project.phases.forEach(phase => {
                const phaseId = `${projId}-phase-${phase.number}`;
                ids.push(phaseId);
                labels.push(phase.title);
                parents.push(projId);
                values.push(1); // Each phase is equal weight within the project

                // Color leaf nodes by their specific stage
                colors.push(PHASE_COLORS[phase.currentPhaseStage] || theme.palette.grey[500]);

                hovertext.push(`<b>Phase ${phase.number}: ${phase.title}</b><br><b>Stage:</b> ${phase.currentPhaseStage}<br><b>Status:</b> ${phase.isComplete ? 'Complete' : 'In Progress'}`);
            });
        });

        // Cast to any to avoid 'insidetextorientation' TS error
        const sunburstChart: any = {
            type: "sunburst",
            ids: ids,
            labels: labels,
            parents: parents,
            values: values,
            branchvalues: "total",
            marker: {
                colors: colors,
                line: {
                    width: 2,
                    color: theme.palette.background.paper
                }
            },
            text: hovertext,
            hoverinfo: "text",
            textinfo: "label",
            insidetextorientation: "radial",
        };

        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: isModal ? '1 1 auto' : { xs: '0 0 auto', md: 1 },
                height: isModal ? '80vh' : { xs: 450, md: 'auto' },
                width: '100%',
                overflow: 'hidden',
                minHeight: isModal ? 600 : 400
            }}>
                {!isModal && (
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', flexShrink: 0 }}>
                        Project Phase Hierarchy
                    </Typography>
                )}
                <Box sx={{ flex: 1, position: 'relative', minHeight: 0, width: '100%', minWidth: 0 }}>
                    <Plot
                        data={[sunburstChart]}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        layout={{
                            autosize: true,
                            margin: { l: 0, r: 0, b: 0, t: 0 },
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            font: { color: theme.palette.text.primary },
                        }}
                        config={{ displayModeBar: false }}
                    />
                </Box>
            </Box>
        );
    };

    const renderSunburstModal = () => (
        <Dialog
            open={isSunburstOpen}
            onClose={() => setIsSunburstOpen(false)}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    minHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    Detailed Project Phase Hierarchy
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={() => setIsSunburstOpen(false)}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 0, pb: '5px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, flexShrink: 0 }}>
                    <Typography variant="body2" color="text.secondary">
                        This view shows the full relationship between all projects and their specific SDLC phases. Outer rings represent individual phases, while the inner ring represents projects.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                    {renderSunburstChart(true)}
                </Box>
            </DialogContent>
        </Dialog>
    );

    const content = (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flex: { xs: '0 0 auto', md: 1 },
            gap: { xs: 2, md: 3 },
            minHeight: 0,
            minWidth: 0
        }}>
            {/* Left Column */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: { xs: '0 0 auto', md: 1 },
                width: '100%',
                gap: { xs: 2, md: 3 },
                minHeight: 0,
                minWidth: 0
            }}>
                <Box sx={{
                    flex: '0 0 auto',
                    minHeight: 0,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {renderDistributionChart()}
                </Box>
                <Box sx={{
                    flex: { xs: '0 0 auto', md: 1 },
                    minHeight: 0,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {renderTotalsChart()}
                </Box>
            </Box>

            {/* Right Column */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: { xs: '0 0 auto', md: 2 },
                width: '100%',
                minHeight: 0,
                minWidth: 0,
                alignSelf: 'stretch'
            }}>
                {renderPhaseGrid()}
            </Box>
        </Box>
    );

    if (isMobile) {
        return (
            <Accordion defaultExpanded={false} sx={{ width: '100%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6">Project Phases Overview</Typography>
                        <Tooltip title="Learn more about SDLC implementation">
                            <IconButton
                                component={Link}
                                to="/sdlc"
                                size="small"
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: 1 }}
                            >
                                <InfoIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                    {content}
                    {renderSunburstModal()}
                </AccordionDetails>
            </Accordion>
        );
    }

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderBottom: 1,
            borderColor: 'divider'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, flexShrink: 0 }}>
                <Typography variant="h4" component="h2">
                    Project Phases Overview
                </Typography>
                <Tooltip title="Learn more about SDLC implementation">
                    <IconButton component={Link} to="/sdlc" sx={{ ml: 2 }}>
                        <InfoIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
            </Box>
            {content}
            {renderSunburstModal()}
        </Box>
    );
}