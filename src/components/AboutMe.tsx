/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Collapse,
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    EmojiEvents as TrophyIcon,
    FileDownload as FileDownloadIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
    Web as WebIcon,
    KeyboardArrowDown as ExpandMoreIcon,
    KeyboardArrowUp as ExpandLessIcon,
    DeveloperBoard as BackendIcon,
    Storage as DatabaseIcon,
    Api as ApiIcon,
    Build as BuildIcon,
    Cloud as CloudIcon,
    Code as CodeIcon,
    Layers as FullStackIcon,
} from '@mui/icons-material';
import { ABOUT_ME_TEXT, PROJECTS, IDES, DEV_TOOLS, EXTRA_PROFILES, GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '../data';
import { Link } from 'react-router-dom';
import type { SvgIconComponent } from '@mui/icons-material';

const BASE_URL = '/';

interface DisplayCategory {
    label: string;
    icon: SvgIconComponent;
    color: string;
    /** The techStack category names from project data that map to this display category. */
    sourceCategories: string[];
}

/** Maps project techStack categories → display categories and defines styling. */
const DISPLAY_CATEGORIES: DisplayCategory[] = [
    {
        label: 'Full Stack',
        icon: FullStackIcon,
        color: '#ff8a65',
        sourceCategories: [],
    },
    {
        label: 'Languages & Scripting',
        icon: CodeIcon,
        color: '#f48fb1',
        sourceCategories: ['Languages & Scripting'],
    },
    {
        label: 'Frontend',
        icon: WebIcon,
        color: '#bb86fc',
        sourceCategories: ['Frontend'],
    },
    {
        label: 'Backend',
        icon: BackendIcon,
        color: '#03dac6',
        sourceCategories: ['Backend'],
    },
    {
        label: 'Hosting & Infrastructure',
        icon: CloudIcon,
        color: '#a5d6a7',
        sourceCategories: ['Cloud & Infrastructure'],
    },
    {
        label: 'Database',
        icon: DatabaseIcon,
        color: '#cf6679',
        sourceCategories: ['Database'],
    },
    {
        label: 'APIs, SDKs & Packages',
        icon: ApiIcon,
        color: '#ffb74d',
        sourceCategories: ['APIs & SDKs', 'APIs, SDKs & Packages', 'Frameworks & Libraries', 'System & Security'],
    },
    {
        label: 'Tools & IDEs',
        icon: BuildIcon,
        color: '#81d4fa',
        sourceCategories: ['AI Tools & Agents', 'Tools'],
    },
];

interface TechFrequency {
    name: string;
    count: number;
}

interface CategoryData {
    label: string;
    icon: SvgIconComponent;
    color: string;
    top3: TechFrequency[];
    allTechnologies: TechFrequency[];
}

/**
 * Computes technology frequencies per display category by scanning every
 * project's techStack from data.ts.
 */
function computeCategoryData(): CategoryData[] {
    return DISPLAY_CATEGORIES.map((displayCat) => {
        const frequencyMap = new Map<string, number>();

        if (displayCat.label === 'Full Stack') {
            for (const project of PROJECTS) {
                if (!project.techStack) continue;
                const frontends = project.techStack.find(s => s.category === 'Frontend')?.technologies || [];
                const backends = project.techStack.find(s => s.category === 'Backend')?.technologies || [];

                if (frontends.length > 0 && backends.length > 0) {
                    for (const fe of frontends) {
                        for (const be of backends) {
                            const pair = `${fe} + ${be}`;
                            frequencyMap.set(pair, (frequencyMap.get(pair) ?? 0) + 1);
                        }
                    }
                }
            }
        } else {
            for (const project of PROJECTS) {
                if (!project.techStack) continue;
                for (const stack of project.techStack) {
                    if (displayCat.sourceCategories.includes(stack.category)) {
                        for (const tech of stack.technologies) {
                            frequencyMap.set(tech, (frequencyMap.get(tech) ?? 0) + 1);
                        }
                    }
                }
            }

            if (displayCat.label === 'Tools & IDEs') {
                for (const ide of IDES) {
                    if (!frequencyMap.has(ide)) {
                        frequencyMap.set(ide, 0);
                    }
                }
                for (const tool of DEV_TOOLS) {
                    if (!frequencyMap.has(tool)) {
                        frequencyMap.set(tool, 0);
                    }
                }
            }
        }

        const sorted: TechFrequency[] = Array.from(frequencyMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

        return {
            label: displayCat.label,
            icon: displayCat.icon,
            color: displayCat.color,
            top3: sorted.slice(0, 3),
            allTechnologies: sorted,
        };
    });
}

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'] as const;

/** Max collapsed height in px for aggregate sub-cards before they get a "Show more" toggle. */
const COLLAPSED_MAX_HEIGHT = 130;

export function AboutMe() {
    const aboutText = ABOUT_ME_TEXT;
    const githubProfileUrl = GITHUB_PROFILE_URL;
    const linkedInProfileUrl = LINKEDIN_PROFILE_URL;
    const resumeUrl = `${BASE_URL}/files/Resume.pdf`;

    const categoryData = useMemo(() => computeCategoryData(), []);

    // Track which aggregate sub-cards are expanded and which ones overflow.
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [overflowingCards, setOverflowingCards] = useState<Record<string, boolean>>({});
    const [showExtraLinks, setShowExtraLinks] = useState(false);
    const chipContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const measureOverflow = useCallback(() => {
        const next: Record<string, boolean> = {};
        for (const cat of categoryData) {
            const el = chipContainerRefs.current[cat.label];
            if (el) {
                next[cat.label] = el.scrollHeight > COLLAPSED_MAX_HEIGHT;
            }
        }
        setOverflowingCards(next);
    }, [categoryData]);

    useEffect(() => {
        measureOverflow();
        window.addEventListener('resize', measureOverflow);
        return () => window.removeEventListener('resize', measureOverflow);
    }, [measureOverflow]);

    const toggleExpand = (label: string) => {
        setExpandedCards((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const renderContent = () => (
        <Card sx={{ maxWidth: 800, width: '100%', p: { xs: 2, sm: 3 } }}>
            <CardContent>
                <Grid container spacing={3} direction={{ xs: 'column', sm: 'row' }} alignItems="center" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Grid item xs={12} sm="auto">
                        <Avatar
                            alt="Profile"
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
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => setShowExtraLinks(!showExtraLinks)}
                                    endIcon={showExtraLinks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    sx={{ 
                                        color: 'secondary.main',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': { background: 'rgba(3, 218, 198, 0.08)' }
                                    }}
                                >
                                    {showExtraLinks ? 'Hide Extra Profiles' : 'Show Extra Profiles'}
                                </Button>
                            </Grid>
                        </Grid>
                        <Collapse in={showExtraLinks} timeout="auto" unmountOnExit>
                            <Box 
                                sx={{ 
                                    mt: 2, 
                                    p: 2, 
                                    borderRadius: 3, 
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1.5,
                                    justifyContent: 'center'
                                }}
                            >
                                {EXTRA_PROFILES.map((profile) => {
                                    const Icon = profile.icon as SvgIconComponent;
                                    return (
                                        <Button
                                            key={profile.name}
                                            variant="outlined"
                                            size="small"
                                            href={profile.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            startIcon={<Icon />}
                                            sx={{ 
                                                borderRadius: 2,
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                color: 'text.secondary',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    borderColor: 'secondary.main',
                                                    color: 'secondary.main',
                                                    transform: 'translateY(-2px)',
                                                    background: 'rgba(3, 218, 198, 0.04)'
                                                }
                                            }}
                                        >
                                            {profile.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Collapse>
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

    const renderTechStack = () => (
        <Card sx={{ maxWidth: 800, width: '100%', p: { xs: 2, sm: 3 } }}>
            <CardContent>
                {/* ── Card Title ── */}
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        mb: 1,
                        background: 'linear-gradient(135deg, #bb86fc 0%, #03dac6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                    }}
                >
                    My Tech Stack
                </Typography>

                {/* ── Top Section: Most Used (Top 3) ── */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1, mt: 3 }}>
                    <TrophyIcon sx={{ color: '#FFD700', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Most Used Technologies
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                >
                    Top 3 per category, ranked by number of projects
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {categoryData.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                            <Grid item xs={12} sm={6} key={`top3-${cat.label}`}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: `${cat.color}44`,
                                        background: `linear-gradient(135deg, ${cat.color}14 0%, ${cat.color}08 100%)`,
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: `${cat.color}77`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 6px 24px ${cat.color}22`,
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <IconComponent sx={{ color: cat.color, fontSize: 22 }} />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: cat.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                            {cat.label}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {cat.top3.map((tech, rank) => (
                                            <Box
                                                key={tech.name}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    p: 1,
                                                    borderRadius: 1.5,
                                                    backgroundColor: `${cat.color}0D`,
                                                    border: '1px solid',
                                                    borderColor: `${cat.color}22`,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: `${MEDAL_COLORS[rank]}33`,
                                                        border: '1.5px solid',
                                                        borderColor: MEDAL_COLORS[rank],
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: MEDAL_COLORS[rank] }}>
                                                        {rank + 1}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500, flexGrow: 1 }}>
                                                    {tech.name}
                                                </Typography>
                                                <Chip
                                                    label={`${tech.count} ${tech.count === 1 ? 'project' : 'projects'}`}
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.65rem',
                                                        height: 22,
                                                        fontWeight: 600,
                                                        backgroundColor: `${cat.color}22`,
                                                        color: cat.color,
                                                        borderColor: `${cat.color}55`,
                                                        border: '1px solid',
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* ── Divider ── */}
                <Divider sx={{ my: 3, borderColor: 'divider' }} />

                {/* ── Bottom Section: Full Aggregate List ── */}
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600, mb: 1 }}>
                    All Technologies
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                >
                    Everything I work with across all my projects
                </Typography>

                <Grid container spacing={3}>
                    {categoryData.map((cat) => {
                        const IconComponent = cat.icon;
                        const isExpanded = !!expandedCards[cat.label];
                        const doesOverflow = !!overflowingCards[cat.label];
                        return (
                            <Grid item xs={12} sm={6} key={`all-${cat.label}`}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: `${cat.color}33`,
                                        backgroundColor: `${cat.color}0A`,
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: `${cat.color}66`,
                                            backgroundColor: `${cat.color}14`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 4px 20px ${cat.color}1A`,
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                        <IconComponent sx={{ color: cat.color, fontSize: 24 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: cat.color }}>
                                            {cat.label}
                                        </Typography>
                                    </Box>
                                    {/* Chip container with collapsible overflow */}
                                    <Box
                                        ref={(el: HTMLDivElement | null) => { chipContainerRefs.current[cat.label] = el; }}
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.75,
                                            maxHeight: isExpanded ? 'none' : COLLAPSED_MAX_HEIGHT,
                                            overflow: 'hidden',
                                            transition: 'max-height 0.35s ease',
                                            position: 'relative',
                                            ...(!isExpanded && doesOverflow ? {
                                                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                                                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                                            } : {}),
                                        }}
                                    >
                                        {cat.allTechnologies.map((tech) => (
                                            <Chip
                                                key={tech.name}
                                                label={tech.name}
                                                size="small"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    height: 26,
                                                    backgroundColor: `${cat.color}1A`,
                                                    color: 'text.primary',
                                                    borderColor: `${cat.color}40`,
                                                    border: '1px solid',
                                                    '&:hover': {
                                                        backgroundColor: `${cat.color}33`,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    {doesOverflow && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mt: 1,
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleExpand(cat.label)}
                                                aria-label={isExpanded ? 'Show less' : 'Show more'}
                                                sx={{
                                                    color: cat.color,
                                                    transition: 'transform 0.3s ease',
                                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    '&:hover': {
                                                        backgroundColor: `${cat.color}22`,
                                                    },
                                                }}
                                            >
                                                <ExpandMoreIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
            {renderContent()}
            {renderTechStack()}
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