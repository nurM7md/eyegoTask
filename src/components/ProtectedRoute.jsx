"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
    const {user , loading} = useSelector((state)=> state.auth)
    const router = useRouter();

    useEffect(()=>{
        if(!loading && !user){
            router.push("/login")
        }
    }, [user , loading , router])
    if(loading) return <div>...Loading</div>
  return ( 
    <>
    {children}
    </>
  )
}

export default ProtectedRoute