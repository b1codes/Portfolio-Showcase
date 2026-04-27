/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@mui/material';

import {
  Home as HomeIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  Apps as AppsIcon,
  Timeline as TimelineIcon, // Add this import
} from '@mui/icons-material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function Header() {
  const githubProfileUrl = 'https://github.com/YourUsername';
  const linkedInProfileUrl = 'https://linkedin.com/in/YourUsername';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsMenuOpen(open);
    if(open) {
      setIsProjectsSubmenuOpen(false);
    }
  };

  const menuContent = (
      <Box
          sx={{ width: { xs: '75vw', sm: 280 } }}
          role="presentation"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={() => setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen)}>
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary="Projects" />
            {isProjectsSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isProjectsSubmenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {PROJECTS.map((project) => (
                  <ListItemButton key={project.id} sx={{ pl: 4 }} component={Link} to={`/project/${project.id}`} onClick={() => setIsMenuOpen(false)}>
                    <ListItemIcon>{project.cardIcon && <project.cardIcon />}</ListItemIcon>
                    <ListItemText primary={project.title} />
                  </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* Added SDLC Link Here */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/sdlc">
              <ListItemIcon><TimelineIcon /></ListItemIcon>
              <ListItemText primary="SDLC Phases" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="About Me" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
                component="a"
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
              <ListItemIcon><GitHubIcon /></ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
                component="a"
                href={linkedInProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
              <ListItemIcon><LinkedInIcon /></ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
  );

  return (
      <>
        <AppBar position="fixed" sx={{ bgcolor: 'rgba(30, 30, 30, 0.85)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="go to homepage"
                sx={{ mr: 1 }}
                component={Link} to="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, typography: { xs: 'body1', sm: 'h6' }, whiteSpace: 'nowrap' }}>
              Developer Portfolio
            </Typography>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="open menu"
                onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
            anchor="right"
            open={isMenuOpen}
            onClose={toggleDrawer(false)}
        >
          {menuContent}
        </Drawer>
      </>
  );
}