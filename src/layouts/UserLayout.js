// ** MUI Imports
import get from 'lodash/get'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'
import SettingsCourse from 'mdi-material-ui/FolderPlusOutline'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { bindActionCreators } from 'redux'
import { getCoursesStudentRequest } from '../store/reducers/courseReducer'
import { showFaliureToast } from 'src/configs/app-toast'
import { ROLES } from 'src/configs/role-constants'
import { removeDuplicatesById } from 'src/@core/utils/helpers'

const UserLayout = ({ children, userDetails, getCoursesStudentRequest, allCoursesStudent }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const [role, setRole] = useState('')
  const [coursesLocal, setCourseLocal] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleGetCoursesList(), [])

  useEffect(() => {
    if (allCoursesStudent) {
      setCourseLocal(removeDuplicatesById(allCoursesStudent))
    }
  }, [allCoursesStudent])

  const ROLE = get(userDetails, 'data.role', 'Student')
  const token = get(userDetails, 'token', null)

  const handleGetCoursesList = () => {
    try {
      if (token && ROLE == ROLES.student) {
        getCoursesStudentRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
          })
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (ROLE) {
      setRole(ROLE)
    }
  }, [ROLE])

  const getNavItems = () => {
    try {
      if (role !== ROLES.student) return VerticalNavItems()[role]

      const arr = [
        ...VerticalNavItems()[role],
        {
          sectionTitle: 'Enrolled Courses'
        },
        ...coursesLocal.map(course => ({
          title: course?.courseTitle,
          icon: SettingsCourse,
          path: `/courses/${course._id}`
        }))
      ]

      return arr
    } catch (error) {
      return VerticalNavItems()[role]
    }
  }

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={getNavItems()} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userDetails,
    profileDetails: state.profile.profileDetails,
    allCoursesStudent: state.courses.allCoursesStudent,
    rehydrated: state._persist.rehydrated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCoursesStudentRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout)
