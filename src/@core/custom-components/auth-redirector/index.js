import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Loader2 from '../loaders/loader-ellipsis'

const AuthRedirector = ({ children, auth, rehydrated }) => {
  const [isRehydrated, setIsRehydrated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsRehydrated(rehydrated)
  }, [rehydrated])

  useEffect(() => {
    authCheck()
  }, [router.pathname, isRehydrated])

  const authCheck = () => {
    if (!isRehydrated) {
      // Still rehydrating, show loader
      setIsLoading(true)

      return
    }

    if (!auth?.userDetails) {
      // User is logged out, redirect to "/"
      setIsLoading(false)
      router.push('/')
    } else if (router.pathname === '/') {
      // User is logged in and tries to access "/", redirect to "/dashboard"
      setIsLoading(false)
      router.push('/dashboard')
    } else {
      // User is logged in and accessing other routes, no redirection needed
      setIsLoading(false)
    }
  }

  return isLoading ? <Loader2 /> : children
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    rehydrated: state._persist.rehydrated
  }
}

export default connect(mapStateToProps, null)(AuthRedirector)
