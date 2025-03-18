"use client"
import React, { useState } from 'react'
   import Sidebar from'./_components/Sidebar'
   
import Dashheader from'./_components/Dashheader'
import { Creditcount } from '../_context/Creditcount'

function dashlayout({children}) {
  const[totalcredits,setcredits]=useState(0)

  const[isOpen,setIsOpen]=useState(false)

  return (
    <Creditcount.Provider value={{totalcredits,setcredits}}>
    <div className="flex relative">
       
        <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300
         ease-in-out lg:block fixed z-40`}>
          <Sidebar isopen={isOpen} setIsOpen={setIsOpen} />
        </div>

        
         {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )} 

     
        <div className='flex-1 lg:ml-72 w-full'>

          <Dashheader isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className='p-6 lg:p-10 mt-20'>
            {children}
          </div>

        </div>
    </div>
    </Creditcount.Provider>
  )
}

export default dashlayout

