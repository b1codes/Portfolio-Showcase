/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import {
    Box,
    Grid,
    Container,
    CssBaseline,
    Typography,
    Avatar, Divider,
} from '@mui/material';
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';

import { theme } from './theme';
import { PROJECTS } from './data';
import {
  AboutMe,
  FilterControls,
  Header,
  ProjectDetail,
  ProjectGrid,
  ProjectPhases,
  SDLC
} from './components';

const BASE_URL = '/';

function HomePage() {
  const longGreeting = 'Welcome to my developer portfolio! Here you can explore my personal projects and learn more about my work as a passionate software engineer. You can also click on my profile picture to the right and learn more about me.';
  const shortGreeting = 'Welcome! Explore my projects or tap my picture to learn more about me.';
  const [activeFilter, setActiveFilter] = useState('All');

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    PROJECTS.forEach(p => p.technologies.forEach(t => techSet.add(t)));
    return Array.from(techSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter(p => p.technologies.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <Box sx={{ textAlign: 'center', my: 4, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
        <Grid container direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" sx={{ mb: 4 }} spacing={4}>
          <Grid item xs={12} sm>
            <Box>
              <Typography variant="h2" component="h1" gutterBottom sx={{ typography: { xs: 'h4', sm: 'h2' } }}>
                My Projects
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {longGreeting}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' }, px: 2 }}>
                {shortGreeting}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Avatar
              component={Link}
              to="/about"
              alt="Profile"
              // Ensure you add your profile picture to public/images/ and update the name here
              // or remove src to show a color/initial
              src={`${BASE_URL}/images/Profile.png`}
              sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 }, bgcolor: 'primary.main', border: '3px solid', borderColor: 'secondary.main', mt: { xs: 2, sm: 0 }, mx: { xs: 'auto', sm: 0 }, cursor: 'pointer' }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <ProjectPhases projects={PROJECTS} />
      </Box>
      <FilterControls
        technologies={allTechnologies}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}

function ProjectPage() {
    const { projectId } = useParams();
    const project = PROJECTS.find(p => p.id === Number(projectId));

    if (!project) {
        return <Typography>Project not found</Typography>;
    }

    return <ProjectDetail project={project} />;
}

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Remove the base path to get the route for the router
      const routePath = redirectPath.replace(BASE_URL, '');
      if (routePath && routePath !== '/') {
        navigate(routePath, { replace: true });
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl" sx={{ pt: { xs: '56px', sm: '64px' }, my: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/sdlc" element={<SDLC />} /> {/* Add Route */}
          <Route path="/project/:projectId" element={<ProjectPage />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/Portfolio">
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);