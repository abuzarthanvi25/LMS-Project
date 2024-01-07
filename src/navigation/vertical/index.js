// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/AccountOutline'
import Course from 'mdi-material-ui/FolderFileOutline'
import CourseSettings from 'mdi-material-ui/FolderCogOutline'
import Settings from 'mdi-material-ui/FolderSettings'
import SettingsCourse from 'mdi-material-ui/FolderPlusOutline'
import AccountSettings from 'mdi-material-ui/AccountCogOutline'

const navigation = () => {
  return {
    Admin: [
      {
        sectionTitle: 'Home'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/dashboard'
      },
      {
        sectionTitle: 'Students'
      },
      {
        title: 'Manage Students',
        icon: AccountSettings,
        path: '/manage-students'
      },
      {
        sectionTitle: 'Teachers'
      },
      {
        title: 'Manage Teachers',
        icon: AccountSettings,
        path: '/manage-teachers'
      },
      {
        sectionTitle: 'Courses'
      },
      {
        title: 'Manage Courses',
        icon: CourseSettings,
        path: '/dashboard/#'
      }
    ],
    Student: [
      {
        sectionTitle: 'Home'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/dashboard'
      },
      {
        sectionTitle: 'Profile'
      },
      {
        title: 'My Profile',
        icon: Account,
        path: '/profile'
      },
      {
        sectionTitle: 'Courses'
      },
      {
        title: 'Course 1',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 2',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 3',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 4',
        icon: Course,
        path: '/dashboard/#'
      }
    ],
    Teacher: [
      {
        sectionTitle: 'Home'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/dashboard'
      },
      {
        sectionTitle: 'Profile'
      },
      {
        title: 'My Profile',
        icon: Account,
        path: '/profile'
      },
      {
        sectionTitle: 'Courses Management'
      },
      {
        title: 'Manage Courses',
        icon: Settings,
        path: '/dashboard/#'
      },
      {
        sectionTitle: 'Course Management'
      },
      {
        title: 'Add A Course',
        icon: SettingsCourse,
        path: '/add-a-course'
      },
      {
        sectionTitle: 'Courses'
      },
      {
        title: 'Course 1',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 2',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 3',
        icon: Course,
        path: '/dashboard/#'
      },
      {
        title: 'Course 4',
        icon: Course,
        path: '/dashboard/#'
      }
    ]
  }
}

export default navigation
