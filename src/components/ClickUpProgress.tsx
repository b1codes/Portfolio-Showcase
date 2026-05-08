import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Chip, 
  Paper,
  Divider
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  RadioButtonUnchecked as RadioButtonUncheckedIcon 
} from '@mui/icons-material';
import { ClickUpDataSchema, ClickUpTask } from '../types';
import clickupDataRaw from '../generated/clickup_data.json';

const clickupData = clickupDataRaw as unknown as ClickUpDataSchema;

interface ClickUpProgressProps {
  projectId: number;
}

export const ClickUpProgress: React.FC<ClickUpProgressProps> = ({ projectId }: ClickUpProgressProps) => {
  const data = clickupData.projects[projectId.toString()];
  
  if (!data) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 2, typography: { xs: 'h6', sm: 'h5' } }}>
        Live Development Progress
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={data.progress} sx={{ height: 10, borderRadius: 5 }} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${data.progress}%`}</Typography>
          </Box>
        </Box>
        
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Recent Activity & Active Tasks
        </Typography>
        
        <List dense>
          {data.tasks.map((task: ClickUpTask, index: number) => (
            <React.Fragment key={index}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {task.isClosed ? <CheckCircleIcon color="success" fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText 
                  primary={task.name} 
                  secondary={
                    <Chip 
                      label={task.status} 
                      size="small" 
                      sx={{ 
                        mt: 0.5, 
                        height: 20, 
                        fontSize: '0.7rem', 
                        backgroundColor: task.statusColor,
                        color: (theme) => theme.palette.getContrastText(task.statusColor)
                      }} 
                    />
                  }
                />
              </ListItem>
              {index < data.tasks.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
        
        {clickupData.lastUpdated && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 2, textAlign: 'right' }}>
            Data as of: {new Date(clickupData.lastUpdated).toLocaleString()}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
