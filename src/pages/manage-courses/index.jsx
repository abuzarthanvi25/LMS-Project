import { Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllCoursesAdminRequest } from 'src/store/reducers/courseReducer'
import CourseCardList from "../../@core/custom-components/course/course-list"
import { useEffect, useState } from "react";
import { get } from "lodash";
import { ROLES } from "src/configs/role-constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { showFaliureToast } from "src/configs/app-toast";
import { useRouter } from "next/router";

const ManageCourses = ({ userDetails, allCoursesAdmin, getAllCoursesAdminRequest }) => {
    const Role = get(userDetails, 'data.role', '')
    const token = get(userDetails, 'token', null)
    const router = useRouter();

    const [courseListAdminLocal, setCourseAdminListLocal] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleGetAllCoursesAdmin = () => {
        try {
            if (token && Role == ROLES.admin) {
                getAllCoursesAdminRequest({ token })
                    .then(unwrapResult)
                    .then(() => setLoading(false))
                    .catch(error => {
                        showFaliureToast(error?.response?.data?.message)
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllCoursesAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!!allCoursesAdmin?.length) {
            setCourseAdminListLocal(allCoursesAdmin)
        }
    }, [allCoursesAdmin])

    const handleViewCourse = (courseDetails) => {
        console.log(courseDetails)
        router.replace(`/courses/${courseDetails?._id}`)
    }

    return (
        <Box>
            <Typography variant="h4" textAlign={'center'}>All Courses</Typography>
            <CourseCardList actionTitle={'View Course'} handleAction={handleViewCourse} courseList={courseListAdminLocal} loading={loading} />
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        allCoursesAdmin: state.courses.allCoursesAdmin,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllCoursesAdminRequest,
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourses)
