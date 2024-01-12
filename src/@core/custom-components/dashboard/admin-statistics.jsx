import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import StatisticsCard from './statistics-card';
import { camelCaseToTitleCase } from 'src/@core/utils/helpers';
import SchoolIcon from '@mui/icons-material/School';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AnimatedCounter from '../animated-divs/animated-counter';

const AdminStatistics = ({ statistics, loading }) => {

    const handleGetStaticsArray = props => {
        if (!props || typeof props !== 'object') return [];

        const keys = Object.keys(props);

        return keys.map((key) => ({ title: key, value: props[key] }))
    }

    const handleGetIcon = (title) => {
        const iconStyles = { fontSize: '90px' };

        if (!title) return null;

        if (title.includes('Course')) {
            return <SchoolIcon style={iconStyles} />
        }

        if (title.includes('Student')) {
            return <RecentActorsIcon style={iconStyles} />
        }

        if (title.includes('Teacher')) {
            return <AssignmentIndIcon style={iconStyles} />
        }

        return null
    }

    return (
        <Card sx={{padding: '20px', borderRadius: '10px'}}>
            <Grid spacing={10} container>
                {
                    !!handleGetStaticsArray(statistics).length && !loading ? handleGetStaticsArray(statistics)?.map(({ title, value }, _) => (
                        <Grid style={{ display: 'flex', justifyContent: 'center' }} key={_} item md={4} sm={12} xs={12}>
                            <StatisticsCard maxValue={50} strokeWidth={6} value={value}>
                                <Typography fontWeight={'bold'} variant='h6'>{camelCaseToTitleCase(title)}</Typography>
                                <Box>
                                    {handleGetIcon(camelCaseToTitleCase(title))}
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AnimatedCounter duration={2} number={value} />
                                    </Box>
                                </Box>
                            </StatisticsCard>
                        </Grid>
                    )) : [1, 2, 3, 4].map((item) => <Grid style={{ display: 'flex', justifyContent: 'center' }} key={item} item md={6} sm={12} xs={12}><Box style={{ width: '260px', height: '410px' }}><Skeleton style={{borderRadius: '50%'}} height={'100%'} width={'100%'} /></Box></Grid>)
                }
            </Grid>
        </Card>
    )
}

export default AdminStatistics
