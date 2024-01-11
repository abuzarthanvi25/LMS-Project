import React from 'react';
import { Box, Button, Card, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CourseCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Card style={{ minHeight: '400px', width: 'auto' }}>
      <Box
        style={{
          backgroundColor: theme.palette.grey[300], // Set the background color for the skeleton
          width: 'auto',
          height: '200px',
        }}
      ></Box>
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5px' }}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Box sx={{ marginTop: '10px' }}>
              <Skeleton variant="text" width={150} height={24} /> {/* Skeleton for course title */}
            </Box>
            <Box sx={{ padding: '10px', width: '100%' }}>
              <Skeleton variant="text" width={'100%'} height={80} /> {/* Skeleton for course description */}
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton variant="text" width={150} height={24} /> {/* Skeleton for price */}
            </Box>
          </Box>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button style={{ padding: '10px 25px', marginTop: '10px' }} variant={'outlined'} disabled>
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCardSkeleton;
