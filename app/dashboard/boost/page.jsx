"use client"

import db from '@/configs/db'
import USER_TABLE from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { eq } from 'drizzle-orm'

import React, { useEffect, useState } from 'react'

function boost() {
    const {user}=useUser()
    const[userdetail,setuserdetail]=useState()
    useEffect(()=>{

        user&& userdetails()
       // console.log(user?.primaryEmailAddress?.emailAddress)

    },[user])

    useEffect(()=>{

      userdetail&&  console.log(userdetail?.customerId )
      

    },[userdetail])

          const userdetails=async()=>{
            const res=await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))

            setuserdetail(res[0])
            console.log(res[0])
          }

    const onupgradeclick=async()=>{
        const res=await axios.post('/api/payment/checkout',{
            priceId:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
        })
        console.log(res.data)
        window.open(res.data.url)
    }

    const onpayment=async()=>{
        const res=await axios.post('/api/payment/manage-payment',{
            customerId:userdetail?.customerId
        })
        console.log(res)
    }

  return (
    <div className="p-8">
       
        <h2 className='font-bold  text-3xl mb-4'>Plans</h2>
        <p className="text-gray-600 mb-8">Upgrade your plan to generate unlimited notes for you</p>

        <div className="grid md:grid-cols-2 gap-8">
            
            <div className="border rounded-xl p-6 shadow-md">
                
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <div className="text-3xl font-bold mb-4">
                    $0 <span className="text-gray-500 text-lg">/month</span>
                </div>
                <ul className="space-y-3">
                    
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Create up to 5 courses
                        
                      </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                            </path>
                            
                        </svg>
                        Email Support
                    </li>
                    
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" 
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        Help center access
                        
                    </li>

                </ul>
                <button className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
                    Current Plan</button>
            </div>
            

            <div className="border rounded-xl p-6 shadow-md bg-gray-900 text-white">
                
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="text-3xl font-bold mb-4">
                    $1 <span className="text-gray-400 text-lg">/month
                    </span>
                    
                </div>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        Unlimited courses
                    </li>
                    
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" 
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        Email Support
                    </li>
                    
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                       Advanced notes generation
                    </li>
                    
                </ul>
                {userdetail?.isMember==false ?

                  <button onClick={onupgradeclick}
                 className="mt-6 w-full bg-gradient-to-r from-orange-400 to-pink-400
                 text-white py-2 rounded-lg hover:from-orange-500 hover:to-pink-500">
                  Upgrade Now</button> :

                  <button disabled={true}
                  className="mt-6 w-full bg-gradient-to-r from-orange-400 to-pink-400
                  text-white py-2 rounded-lg hover:from-orange-500 hover:to-pink-500
                  disabled:opacity-60 disabled:cursor-not-allowed">
                  Upgraded </button>

                }
             </div>
        </div>
        
    </div>
  )
}

export default boost
