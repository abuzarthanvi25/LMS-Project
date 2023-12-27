import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function AuthProvider({ children }) {
  const router = useRouter()

  const { userDetials } = useSelector(state => state.auth)

  // useEffect(() => {
  //   if (!userDetials) {
  //     router.push('/')
  //   } else {
  //     router.push('/')
  //   }
  // }, [userDetials])

  return <>{children}</>
}
