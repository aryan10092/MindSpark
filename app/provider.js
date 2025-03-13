"use client"

import { eq } from 'drizzle-orm'
import db from '../configs/db'
import USER_TABLE from '../configs/schema'
import { useUser } from '@clerk/nextjs'

import React, { useEffect } from 'react'
import axios from 'axios'

function Provider({children}) {

    const {user}=useUser()

    useEffect(()=>{
      user&&  newuser()
    },[user])

  const newuser=async()=>{
    
// console.log(result)


const resp=await axios.post('/api/create-user',{user:user})

console.log(resp.data)
  }
  return (
    <div>{children}</div>
  )
}

export default Provider
