import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

    return (
        <>
            {user ? children : null}
        </>
    )
}

export default ProtectedRoute