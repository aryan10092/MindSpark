"use client"

import Dashheader from '@/app/dashboard/_components/Dashheader'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Introcard from'./_components/Introcard'
import Chapters from'./_components/Chapters'

function page() {
      
  const {courseId}=useParams()
    const[course,setcourse]=useState()
    

    useEffect(() => {
      if (courseId) {
        getcourse();
      }
    }, [courseId]);

    // useEffect(() => {
    //   getnotes();
    //   }, [courseId]); 
      
    
    //   useEffect(() => {
    //    // console.log(notes)
    //     console.log(notes)
    //     console.log(notes[0])
    //     }, [notes]); 

    const getcourse=async()=>{
    
        const res=await axios.get('/api/course?courseId='+courseId)
        console.log(courseId)
        console.log(res)
        setcourse(res?.data?.result)
       
    }

    // const getnotes=async()=>{
    //   const res=await axios.post('/api/notes',{
    //     courseid:courseId
    //   })
    //   console.log(res?.data)
    //   setnotes(res.data)

    // }



  return (
    <div>
     

        <div className='mx-10 md:mx-36 lg:mx-60 mt-10'> 
          <Introcard course={course}/>
          

          <Chapters course={course} />
        </div>

    </div>
  )
}

export default page
