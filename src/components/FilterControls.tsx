/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';

interface FilterControlsProps {
    technologies: string[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

// Renders the filter chips for project technologies.
export function FilterControls({ technologies, activeFilter, onFilterChange }: FilterControlsProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const renderDesktop = () => (
      <Box
        component="div"
        role="toolbar"
        aria-label="Project filters"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 4,
            borderBottom: 1,
            borderColor: 'divider',
            p: 2
        }}
      >
        <Chip
            label="All"
            color="primary"
            variant={activeFilter === 'All' ? 'filled' : 'outlined'}
            onClick={() => onFilterChange('All')}
            aria-pressed={activeFilter === 'All'}
        />
        {technologies.map(tech => (
            <Chip
                key={tech}
                label={tech}
                color="primary"
                variant={activeFilter === tech ? 'filled' : 'outlined'}
                onClick={() => onFilterChange(tech)}
                aria-pressed={activeFilter === tech}
            />
        ))}
      </Box>
    );

    const renderMobile = () => (
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="tech-filter-select-label">Filter by Technology</InputLabel>
        <Select
          labelId="tech-filter-select-label"
          value={activeFilter}
          label="Filter by Technology"
          onChange={(e) => onFilterChange(e.target.value as string)}
        >
          <MenuItem value="All">All</MenuItem>
          {technologies.map(tech => (
            <MenuItem key={tech} value={tech}>{tech}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    return isMobile ? renderMobile() : renderDesktop();
}