"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import db from '@/configs/db'
import USER_TABLE from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Creditcount } from '@/app/_context/Creditcount'

function Profile() {
  const { user } = useUser()
  const [userDetails, setUserDetails] = useState(null)

  const{totalcredits,setcredits}=useContext(Creditcount)

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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">My Profile</h2>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-8">
          <img 
            src={user?.imageUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h3 className="text-2xl font-semibold">{user?.fullName}</h3>
            <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="border-b pb-4">
            <h4 className="text-lg font-medium mb-2">Membership Status</h4>
            <p className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${userDetails?.isMember ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              {userDetails?.isMember ? 'Premium Member' : 'Free Plan'}
            </p>
          </div>

          <div className="border-b pb-4">
            <h4 className="text-lg font-medium mb-2">Account Details</h4>
            <p className="text-gray-600">Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Activity Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-100 rounded-lg p-4">
                
                <p className="text-orange-600 font-medium">Courses Created</p>
                <p className="text-2xl font-bold">{totalcredits }</p>

                </div>

              <div className="bg-pink-100 rounded-lg p-4">
                <p className="text-pink-600 font-medium">Credits left</p>
                <p className="text-2xl font-bold">{5-totalcredits}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile