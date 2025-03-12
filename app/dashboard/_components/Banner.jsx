"use client"
import { useUser } from '@clerk/nextjs'
import { Flame } from 'lucide-react'
import React from 'react'
import { GiOvermind } from "react-icons/gi";

function Banner() {
  const { user } = useUser()
  
  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-6 
    rounded-xl border border-orange-500/20 ml-6">

      <div className="container mx-auto">

       <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text
             text-transparent">
              Welcome, {user?.firstName || 'Guest'}! 👋
         </h1>

            <p className="mt-2 text-slate-500">
              We're glad to have you here, it's time to 
              get back and start learning
            </p>
          </div>

          <div
           className="flex items-center justify-center w-12 h-12 rounded-xl 
          bg-gradient-to-br from-orange-500/20 to-pink-500/20">

            <GiOvermind className="w-8 h-8 text-orange-400" />
          </div>

     </div>


      </div>

    </div>
  )
}

export default Banner