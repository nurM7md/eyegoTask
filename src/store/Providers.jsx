"use client"
import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { clearUser, setLoading, setUser } from '../features/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { store } from './store';
import auth from "../lib/firebase"

function AuthListener({children}){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setLoading(true));
        const unsubscribe = onAuthStateChanged(auth , (user)=>{
            if(user){
                const breif = {
                    id: user.id,
                    email : user.email,
                    name : user.name || null
                }
                dispatch(setUser(breif));
            }else{
                dispatch(clearUser());
            }
        });
        return ()=> unsubscribe();
    },[dispatch]);

    return <>{children}</>
}

const Providers = ({children}) => {
  return (
    <Provider store={store}>
        <AuthListener>{children}</AuthListener>
    </Provider>
  )
}

export default Providers