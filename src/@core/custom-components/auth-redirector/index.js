import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import Loader2 from '../loaders/loader-ellipsis'

const AuthRedirector = ({ children, auth, rehydrated }) => {
  const [isRehydrated, setIsRehydrated] = useState(false)
  const [routeChanged, setRouteChanged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsRehydrated(rehydrated)
  }, [rehydrated])

  useEffect(() => {
    authCheck()
  }, [])

  useEffect(() => {
    authCheck()
  }, [router.pathname])

  const authCheck = () => {
    if (auth?.userDetails) {
      setRouteChanged(false)
    } else {
      setRouteChanged(true)
      router.push('/')
    }
  }

  if (routeChanged || !isRehydrated) {
    return <Loader2 />
  }

  return children
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    rehydrated: state._persist.rehydrated
  }
}

export default connect(mapStateToProps, null)(AuthRedirector)
