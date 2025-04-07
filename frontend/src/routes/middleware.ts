import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'

export const AuthHandler = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { currentUser, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!loading) {
      if (!currentUser && !['/login', '/signup'].includes(pathname)) navigate('/login')
      else if (currentUser && ['/login', '/signup'].includes(pathname)) navigate('/')
    }
  }, [loading, currentUser, pathname])
  return null
}
