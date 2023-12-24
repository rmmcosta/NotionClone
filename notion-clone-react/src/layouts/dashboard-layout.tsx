import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"
 
export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()
    const [isRedirecting, setIsRedirecting] = React.useState(false);
 
    //console.log('test', userId)
 
    React.useEffect(() => {
        if (isLoaded && !userId) {
            setIsRedirecting(true);
            navigate("/sign-in")
        }
    }, [navigate, userId, isLoaded])
 
    if (!isLoaded || isRedirecting) return <div>Loading...</div>
 
    return (
        <Outlet />
    )
}