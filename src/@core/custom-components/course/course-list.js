import { Box, Grid } from '@mui/material'
import CourseCard from '../course/course-card'
import CourseCardSkeleton from './course-card-skeleton'

const CourseList = ({ courseList = [], loading = true, handleAction, actionTitle }) => {

    return (
        <Box sx={{ padding: '20px' }}>
            <Grid spacing={10} container>
                {!!courseList.length && !loading ?
                    courseList.map((course, index) => (
                        <Grid key={index} item sm={6} xs={12} md={4} lg={4} xl={4}>
                            <CourseCard actionTitle={actionTitle} handleAction={handleAction} courseDetails={course} />
                        </Grid>
                    )) : [1, 2, 3, 4, 5, 6].map((item) => <Grid key={item} item sm={6} xs={12} md={4} lg={4} xl={4}>
                        <CourseCardSkeleton />
                    </Grid>)}
            </Grid>
        </Box>
    )
}

export default CourseList