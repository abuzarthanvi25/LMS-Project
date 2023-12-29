// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Account from 'mdi-material-ui/AccountOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import Course from 'mdi-material-ui/FolderFileOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
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
  ]
}

export default navigation
