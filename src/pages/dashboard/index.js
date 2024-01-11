import { Box, Grid, Typography, Card } from '@mui/material'
import CourseCard from '../../@core/custom-components/course/course-card'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const Dashboard = ({ courseList }) => {
  const [courseListLocal, setCourseListLocal] = useState([])

  useEffect(() => {
    if (courseList) {
      setCourseListLocal(courseList)
    }
  }, [])

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid spacing={10} container>
        {!!courseListLocal.length &&
          courseListLocal.map((course, index) => (
            <Grid key={index} item sm={6} xs={12} md={4} lg={4} xl={4}>
              <CourseCard courseDetails={course} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.courses.allCourses
  }
}

export default connect(mapStateToProps, null)(Dashboard)
