/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Tooltip, Typography, useMediaQuery, useTheme, Paper, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { getPhaseColors, PHASE_DESCRIPTIONS, PHASES_ORDER, getCurrentPhase } from '../utils';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';

interface ProjectPhasesProps {
    projects: Project[];
}

export function ProjectPhases({ projects }: ProjectPhasesProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const totalProjects = projects.length;
    const PHASE_COLORS = getPhaseColors(theme);

    // --- Data Preparation: Distribution ---
    const phaseCounts = PHASES_ORDER.reduce((acc, phase) => {
        acc[phase] = 0;
        return acc;
    }, {} as Record<string, number>);

    projects.forEach(project => {
        const currentPhaseStage = getCurrentPhase(project).currentPhaseStage;
        if (phaseCounts[currentPhaseStage] !== undefined) {
            phaseCounts[currentPhaseStage]++;
        }
    });

    const distLabels = PHASES_ORDER.filter(phase => phaseCounts[phase] > 0);
    const distValues = distLabels.map(phase => phaseCounts[phase]);
    const distColors = distLabels.map(phase => PHASE_COLORS[phase]);

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
        // Calculate totals across ALL projects
        const totalCompleted = projects.reduce((acc, project) => {
            return acc + project.phases.filter(p => p.isComplete).length;
        }, 0);

        // Calculate active projects per phase
        const activePhaseCounts = PHASES_ORDER.reduce((acc, phase) => {
            acc[phase] = 0;
            return acc;
        }, {} as Record<string, number>);

        projects.forEach(project => {
            const isActive = project.phases.some(phase => !phase.isComplete);
            if (isActive) {
                const currentPhaseStage = getCurrentPhase(project).currentPhaseStage;
                if (activePhaseCounts[currentPhaseStage] !== undefined) {
                    activePhaseCounts[currentPhaseStage]++;
                }
            }
        });

        const activeLabels = PHASES_ORDER.filter(phase => activePhaseCounts[phase] > 0);
        const activeValues = activeLabels.map(phase => activePhaseCounts[phase]);
        const activeColors = activeLabels.map(phase => PHASE_COLORS[phase]);

        const data: Data[] = [
            {
                x: ['Completed Phases', ...activeLabels],
                y: [totalCompleted, ...activeValues],
                type: 'bar',
                marker: {
                    color: [theme.palette.primary.main, ...activeColors]
                },
                text: [String(totalCompleted), ...activeValues.map(String)],
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
     * Renders the Sunburst chart showing project hierarchy.
     */
    const renderSunburstChart = () => {
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
            <Paper elevation={2} sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                flex: { xs: '0 0 auto', md: 1 },
                height: { xs: 450, md: 'auto' },
                width: '100%',
                overflow: 'hidden',
                minHeight: 400
            }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', flexShrink: 0 }}>
                    Project Phase Hierarchy
                </Typography>
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
            </Paper>
        );
    };

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
                minWidth: 0
            }}>
                <Box sx={{ 
                    flex: { xs: '0 0 auto', md: 1 },
                    minHeight: 0, 
                    minWidth: 0, 
                    display: 'flex', 
                    flexDirection: 'column' 
                }}>
                    {renderSunburstChart()}
                </Box>
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
        </Box>
    );
}
