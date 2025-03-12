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
    // if (!user?.username) {
    //     throw new Error("Full name is not available");
    //   }

// const result=await db.select().from(USER_TABLE)
// .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
  

// console.log(result)

// if(result?.length==0){

//    const res= await db.insert(USER_TABLE).values({
//         name:user?.username,
//         email:user?.primaryEmailAddress?.emailAddress
//     }).returning({id:USER_TABLE.id})
const resp=await axios.post('/api/create-user',{user:user})

console.log(resp.data)
  }
  return (
    <div>{children}</div>
  )
}

export default Provider