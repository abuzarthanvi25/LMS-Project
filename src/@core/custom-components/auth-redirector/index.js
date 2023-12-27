import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import FullPageLoader from '../loaders'

const AuthRedirector = ({ children, auth, rehydrated }) => {
  const [isShow, setIsShow] = useState(false)
  const [isRehydrated, setIsRehydrated] = useState(false)
  const [routeChanged, setRouteChanged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsRehydrated(rehydrated)
  }, [rehydrated])

  useEffect(() => {
    authCheck()

    const hideContent = () => {
      setIsShow(true)
    }

    const showContent = () => {
      setIsShow(false)
    }
    router.events.on('routeChangeStart', hideContent)
    router.events.on('routeChangeComplete', showContent)

    return () => {
      router.events.off('routeChangeStart', hideContent)
    }
  }, [])

  useEffect(() => {
    authCheck()
  }, [router.pathname])

  const authCheck = () => {
    if (auth?.userDetails) {
      setRouteChanged(false)
    } else {
      setRouteChanged(true)
      router.push('/login')
    }
  }
  if (isShow || routeChanged || !isRehydrated) {
    return <FullPageLoader isLoading={true} />
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
