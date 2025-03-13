

"use client"
import React, { useEffect, useState } from 'react'
import Courseoptions from './_components/Courseoptions'
import { Button } from '@/components/ui/button'
import Topic from './_components/Topic'
import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import { Loader, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { motion } from "framer-motion"
import { toast } from 'react-toastify'
import db from '@/configs/db'
import USER_TABLE from '@/configs/schema'
import { eq } from 'drizzle-orm'

function Create() {
  const [step, setStep] = useState(0)
  const { user } = useUser()

  const [formData, setFormData] = useState({})
   
     const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [userDetails, setUserDetails] = useState(null)

  const [userCoursesCount, setUserCoursesCount] = useState(0)


  useEffect(() => {
    if (user) {
      getUserDetails()
    //  console.log(userDetails)
    }
  }, [user])

  useEffect(()=>{
       console.log(userDetails)
       console.log(userDetails?.isMember)
  },[userDetails])

  const getUserDetails = async () => {
    const res = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
    setUserDetails(res[0])
    
    
    getUserCoursesCount()

  }

  const getUserCoursesCount = async () => {
    try {
      const response = await axios.post('/api/getUserCoursesCount', 
        {
          createdemail:user?.primaryEmailAddress?.emailAddress
      })
      console.log(response)
      console.log(response.data.count)
       
        setUserCoursesCount(response.data.count)
    } catch (error) {
       
      console.error('Failed to fetch user courses count:', error)
    }
  }


    const handleInputOptions = (name, value) => {
     setFormData(prev => ({
      ...prev,
      [name]: value|| ""
    }))
    console.log(formData)
  }
  console.log(formData)


  // console.log(formData.studytype)

  const generateCourse = async () => {
    if (userDetails?.isMember || userCoursesCount < 5) {
    try {
      setLoading(true)

      const courseId = uuidv4()
      
      const result=await axios.post('/api/generatecourse/', {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress
      })

  toast("Your course is generating, Please wait")
      router.replace('/dashboard')
      setTimeout(() => {
        toast.success("Please refresh this page to start your journey");
      }, 30000);
      console.log(result)

    } catch (error) {
      console.error('Failed to generate course:', error)
    } finally {
      setLoading(false)
    }
  }else{
    toast.error("You have reached the limit of 5 courses. Please upgrade to generate more courses.");
 
    router.replace('/dashboard')
  }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className="min-h-screen bg-slate-950 text-white p-5
       md:px-24 lg:px-36"
    >
      <div className="max-w-4xl mx-auto mt-10">

     <div className="flex items-center gap-4 mb-8">

          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}

            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 
              flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
            <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}

              transition={{ delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 
                bg-clip-text text-transparent"
            >
              Create Your Study Guide
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}

              transition={{ delay: 0.3 }}
              className="text-slate-400 mt-2"
            >
              Customize your learning experience in just a few steps
            </motion.p>
             </div>  

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}

          className="w-full"
        >
          {step === 0 ? (
            <Courseoptions selectedtype={(value) => handleInputOptions('studytype', value)} />
          ) : (
            <Topic 
              Settopic={(value) => handleInputOptions('topic', value)}

              setlevel={(value) => handleInputOptions('level', value)}
            />
          )}
        </motion.div>

             <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

             transition={{ delay: 0.5 }}

          className="flex justify-between mt-12"
        >
          {step !== 0 ? (
            <Button
              variant="outline"

              onClick={() =>{ 
                setStep(0);
                handleInputOptions('studytype',"")
              }}
              className="bg-slate-800 hover:bg-slate-700
               border-slate-700"
            >
              Previous
            </Button>

          ):<Button variant='outline'  className="bg-slate-800
           hover:bg-slate-700 border-slate-700"

             onClick={()=>router.replace('/dashboard')}>Go back</Button>
          
          }

          {step === 0 ? (
            <Button 
              onClick={() => setStep(1)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
             disabled={!formData.studytype}
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={()=>{generateCourse()}}  disabled={loading||!formData.topic}

              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">

                  <Loader className="animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Guide'
              )}
            </Button>
          )}
             </motion.div>
         
      </div>
    </motion.div>
  )
}

export default Create
