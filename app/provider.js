"use client"

import { useUser } from '@clerk/nextjs'

import React, { useEffect } from 'react'
import axios from 'axios'

function Provider({children}) {

    const {user}=useUser()

    useEffect(()=>{
      if (user?.id && user?.primaryEmailAddress?.emailAddress) {
        newuser()
      }
    },[user?.id])

  const newuser=async()=>{
    try {
      console.log("adding user to db")
      const resp = await axios.post('/api/create-user', { user })
      console.log(resp.data)
    } catch (error) {
      console.error("create-user request failed", error)
    }
  }
  return (
    <div>{children}</div>
  )
}

export default Provider
