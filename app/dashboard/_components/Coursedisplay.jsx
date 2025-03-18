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
import { RefreshCw } from 'lucide-react'

// function Coursedisplay() {
        
//     const {user}=useUser()
//     const[courselist,setcourselist]=useState([])
//     const{totalcredits,setcredits}=useContext(Creditcount)

//     useEffect(()=>{

//    user&&getcourselist()

//     },[user])
   
//     const getcourselist=async()=>{

//         const result=await axios.post('/api/course',
//       {createdemail:user?.primaryEmailAddress?.emailAddress}
//         )
//         console.log(result)
//         setcourselist(result.data.result)
//         console.log(courselist)

//         setcredits(result.data.result?.length)
//     }

function Coursedisplay() {
        
  const {user}=useUser()
  const[courselist,setcourselist]=useState([])
  const{totalcredits,setcredits}=useContext(Creditcount)
  const{loading,setloading}=useState(false)
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

try{
  setloading(true)
      const result=await axios.post('/api/course',
    {createdemail:user?.primaryEmailAddress?.emailAddress}
      )

      console.log(result)
      setcourselist(result.data.result)
   setloading(false)
      console.log(courselist)
      
          if (userDetails?.isMember) {
      setcredits(result.data.result?.length); 
    } else {
      setcredits(Math.min(result.data.result?.length, 5));
    }

  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  }


   
  return (
    <div  className='ml-8'>
      
        <h2 className='font-bold mt-10 text-2xl flex justify-between items-center'>YOUR STUDY MATERIAL

          <Button variant='outline'
          onClick={getcourselist}
           className='border-orange-400 text-orange-600'> <RefreshCw/>Refresh </Button>
        </h2>

            <div className='grid grid-cols-2  lg:grid-cols-3
            mt-2 gap-5'> 
                    { loading==false?courselist?.map((x,index)=>(
                  
                   <Coursecard course={x} key={index}/>
                    ))
                  :[1,2,3,4,5,6].map((i,index)=>(
                    <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>

                    </div>
                  ))
                  }

            </div>

        </div>
  )
}

export default Coursedisplay
