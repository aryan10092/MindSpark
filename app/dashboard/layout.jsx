"use client"
import React, { useState } from 'react'
import Sidebar from'./_components/Sidebar'
import Dashheader from'./_components/Dashheader'
import { Creditcount } from '../_context/Creditcount'
//import Creditcount from'../_context/Creditcount'

function dashlayout({children}) {
  const[totalcredits,setcredits]=useState(0)
  return (
    <Creditcount.Provider value={{totalcredits,setcredits}}>
    <div>
        <div className='md:w-64 hidden md:block fixed '>
            <Sidebar />
        </div>

        <div className='md:ml-64'>
            <Dashheader />
        <div className='p-10'>

        {children}
        </div>
        
        </div>
    </div>
    </Creditcount.Provider>
  )
}

export default dashlayout
