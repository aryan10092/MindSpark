"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
  import Coursecard from './Coursecard'
import Banner from './Banner'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

import { Creditcount } from '@/app/_context/Creditcount'
import db from '@/configs/db'
import USER_TABLE from '@/configs/schema'
import { eq } from 'drizzle-orm'



function Coursedisplay() {
        
  const {user}=useUser()
  const[courselist,setcourselist]=useState([])
  const{totalcredits,setcredits}=useContext(Creditcount)

  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (user) {
      getUserDetails()
    }
  }, [user])

  const getUserDetails = async () => {
    const res = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
    setUserDetails(res[0])

  }


  useEffect(()=>{
if (user && userDetails) {
      getcourselist();
      console.log(userDetails?.isMember)
      
    }
  }, [user, userDetails])


 
  const getcourselist=async()=>{

      const result=await axios.post('/api/course',
    {createdemail:user?.primaryEmailAddress?.emailAddress}
      )

      console.log(result)
      setcourselist(result.data.result)

      console.log(courselist)
      
          if (userDetails?.isMember) {
      setcredits(result.data.result?.length); 
    } else {
      setcredits(Math.min(result.data.result?.length, 5));
    }

  }


   
  return (
    <div  className='ml-8'>
      
        <h2 className='font-bold mt-10 text-2xl '>YOUR STUDY MATERIAL
        </h2>
    
            <div className='grid grid-cols-2  lg:grid-cols-3
            mt-2 gap-5'> 
                    {courselist?.map((x,index)=>(
                  
                   <Coursecard course={x} key={index}/>
                    ))}

            </div>

        </div>
  )
}

export default Coursedisplay
