/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    FileDownload as FileDownloadIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { ABOUT_ME_TEXT } from '../data';
import { Link } from 'react-router-dom';

const BASE_URL = '/';

export function AboutMe() {
    const aboutText = ABOUT_ME_TEXT;
    const githubProfileUrl = 'https://github.com/YourUsername';
    const linkedInProfileUrl = 'https://linkedin.com/in/YourUsername';
    // Ensure you add your resume file to public/files/ and update the name here
    const resumeUrl = `${BASE_URL}/files/Resume.pdf`;
    const renderContent = () => (
        <Card sx={{ maxWidth: 800, width: '100%', p: { xs: 2, sm: 3 } }}>
            <CardContent>
                <Grid container spacing={3} direction={{ xs: 'column', sm: 'row' }} alignItems="center" sx={{ textAlign: { xs: 'center', sm: 'left'} }}>
                    <Grid item xs={12} sm="auto">
                        <Avatar
                            alt="Profile"
                            // Ensure you add your profile picture to public/images/ and update the name here
                            // or remove src to show a color/initial
                            src={`${BASE_URL}/images/Profile.png`}
                            sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 }, bgcolor: 'primary.main', border: '3px solid', borderColor: 'secondary.main' }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ typography: { xs: 'h4', sm: 'h3' } }}>Your Name</Typography>
                        <Typography variant="h5" color="secondary.main" fontWeight="500" sx={{ typography: { xs: 'h6', sm: 'h5' } }}>Software Engineer</Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    href={githubProfileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={<GitHubIcon />}
                                >
                                    GitHub
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    href={linkedInProfileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={<LinkedInIcon />}
                                >
                                    LinkedIn
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    component="a"
                                    href={resumeUrl}
                                    download
                                    aria-label="Download Resume"
                                    startIcon={<FileDownloadIcon />}
                                >
                                    Download Resume
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    {aboutText.split('\n\n').map((paragraph, index) => (
                        <Typography key={index} variant="body1" paragraph sx={{ lineHeight: { xs: 1.6, sm: 1.7 }, color: 'text.secondary' }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
            {renderContent()}
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