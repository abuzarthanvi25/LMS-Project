// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { get } from 'lodash'
import { ROLES } from 'src/configs/role-constants'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility, userDetails } = props

  const [details, setDetails] = useState(null)

  useEffect(() => {
    setDetails(userDetails)
  }, [userDetails])

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const role = get(details, 'data.role', 'Student')
  const fullName = get(details, 'data.fullName', '')

  const roleMapper = () => {
    if (role) {
      if (role == ROLES.student) {
        return '🧑‍🎓'
      }
      if (role == ROLES.teacher) {
        return '👨‍🏫'
      }
      if (role == ROLES.admin) {
        return '🕴️'
      }
    }

    return ''
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <Typography variant='body2'>
          Hi There 👋🏻 <span style={{ fontWeight: 'bold' }}>{fullName}</span>, you are logged in as{' '}
          {role == ROLES.admin ? 'an' : 'a'} <span style={{ fontWeight: 'bold' }}>{role}</span> {roleMapper()}
        </Typography>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </Box>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userDetails
  }
}

export default connect(mapStateToProps, null)(AppBarContent)
