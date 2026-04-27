/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Typography, Paper, useTheme, Divider, Link as MuiLink, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getPhaseColors, PHASES_ORDER } from '../utils';

export function SDLC() {
    const theme = useTheme();
    const PHASE_COLORS = getPhaseColors(theme);

    // Definitions mapped from https://github.com/resources/articles/what-is-sdlc
    const definitions: Record<string, React.ReactNode> = {
        'Planning & Requirements Analysis': (
            <>
                Based on <strong>Requirements Gathering and Analysis</strong>. This is the foundational phase where accurate, complete, and measurable user requirements are defined to ensure the software meets user needs. Activities include conducting interviews or workshops to gather insights, evaluating system feasibility, and recording requirements in documents like user stories or specifications. This step helps avoid costly rework and project delays.
            </>
        ),
        'Implementation': (
            <>
                This phase encompasses <strong>System Design</strong>, <strong>Coding</strong>, and <strong>Testing</strong>.
                <br /><br />
                First, architects design the overall structure (using tools like UML or data flow diagrams) to define the application's behavior. Next, developers translate these designs into actual code, following best practices like version control and code reviews. Finally, the software is thoroughly tested (including unit, integration, and system testing) to identify defects and ensure security vulnerabilities are addressed before release.
            </>
        ),
        'Deployment': (
            <>
                Corresponding to the <strong>Deployment</strong> phase, this is where the software is made available to users in a production environment. The process typically involves committing code to a repository, triggering automated tests, and using specific deployment strategies (like blue/green or canary deployments) to minimize downtime. It ensures the correct configuration and network protocols are in place for a smooth release.
            </>
        ),
        'Maintenance & Support': (
            <>
                Reflecting the <strong>Maintenance and Support</strong> phase, this ongoing cycle ensures the software operates at peak performance after deployment. It involves monitoring technical performance, issuing patches to fix bugs or security issues, and helping users resolve problems. Ideally, insights gathered here feed back into the planning stage, allowing the product to evolve and improve over time.
            </>
        )
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, width: '100%' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2, typography: { xs: 'h4', sm: 'h3' } }}>
                    Software Development Life Cycle
                </Typography>

                <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
                    The Software Development Life Cycle (SDLC) is a structured process used to design, develop, and test high-quality software.
                    The definitions below are adapted from the <MuiLink href="https://github.com/resources/articles/what-is-sdlc" target="_blank" rel="noopener noreferrer">GitHub Resources SDLC Article</MuiLink> to match the tracking phases of this portfolio.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {PHASES_ORDER.map((phase) => (
                        <Box key={phase} component="section">
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        bgcolor: PHASE_COLORS[phase],
                                        mr: 2,
                                        boxShadow: `0 0 8px ${PHASE_COLORS[phase]}`
                                    }}
                                />
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                                    {phase}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            <Typography variant="body1" component="div" sx={{ lineHeight: 1.7, color: 'text.primary', pl: { xs: 0, sm: 4 } }}>
                                {definitions[phase]}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Paper>
            <Button
                variant="contained"
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                aria-label="Go back to portfolio"
            >
                Back to Projects
            </Button>
        </Box>
    );
}