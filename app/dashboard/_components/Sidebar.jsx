"use client"

import { Creditcount } from '@/app/_context/Creditcount'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

  import { Flame, Rocket, BookOpen, UserCircle, Settings } from 'lucide-react'
  import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useContext } from 'react'
import { FaBook } from 'react-icons/fa'

function Sidebar({isopen, setIsOpen}) {
const menuItems = [{
    
        name: 'Learning Path',
        icon: BookOpen,

        path: '/dashboard',
        badge: 'New'
    }, {
        name: 'Boost Mode',
     icon: Rocket,
        path: '/dashboard/boost'
    }, {
        name: 'My Profile',
        icon: UserCircle,
        path: '/dashboard/profile'
    },
    // {
    //     name: 'Settings',
    //     icon: Settings,
    //     path: '/settings'
    // }
]

const path = usePathname()

    const{totalcredits,setcredits}=useContext(Creditcount)


return (
    <div className='h-screen bg-slate-900 w-72 fixed left-0 top-0 text-white'>

  <div className='p-6'>
    
     <div className='flex items-center gap-3'>
                <div
                 className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500
                  to-pink-500 flex items-center justify-center'>

                    <FaBook className='w-8 h-8' />
          </div>


                <h2 className='font-bold text-2xl bg-gradient-to-r from-orange-400
                 to-pink-400 bg-clip-text text-transparent'>MindSpark</h2>

                  <button 
            onClick={() => setIsOpen(false)}
            className='lg:hidden text-slate-400 hover:text-white'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
       
            </div>

            <div  
             className='mt-10 space-y-8'>
                <Link href={'/create'}>
                <Button className='w-full bg-gradient-to-r from-orange-500 to-pink-500
                 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl 
                 h-12 text-lg shadow-lg shadow-orange-500/20 mb-4'>
                    Start Learning


                </Button></Link>

                <nav className='space-y-2'>
                    {menuItems.map((item, index) => (

            <Link href={item.path} key={index}>
                 <div className={`flex items-center mt-3 justify-between px-4 py-3.5 rounded-xl
                  transition-all duration-300 
                                ${path === item.path 
                                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/20' 
                                    : 'hover:bg-slate-800' }`}>
                                <div className='flex items-center gap-3'>

                <item.icon className={`w-5 h-5 ${path === item.path ? 'text-orange-400' : 'text-slate-400'}`}/>
                                    <span className={`font-medium ${path === item.path ? 'text-orange-400' : 'text-slate-300'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {item.badge && (
                                    <span className='text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full'>
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
          </nav>

            </div>
        </div>

        
        <div className='absolute bottom-6 left-6 right-6'>

            <div className='bg-slate-800 rounded-xl p-5 border border-slate-700'>


            {totalcredits<=5?(<>

    <div className='flex items-center gap-4 mb-4'>

                      
           
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 
                    flex items-center justify-center'>
                        <Rocket className='w-6 h-6 text-orange-400' />
                    </div>

                 <div>
                     <h2 className='font-semibold text-lg text-slate-200'>Credits</h2>

                          <p className='text-sm text-slate-400'>{5-totalcredits} of 5 remaining</p>
                    </div>

                </div>

                <Progress value={(totalcredits/5)*100} className='h-2.5 bg-slate-700 rounded-full' indicatorclassname='bg-gradient-to-r from-orange-500 to-pink-500'/>
                <div className='mt-4 flex flex-col gap-2'>
                    
               <p className='text-sm text-slate-400'>{totalcredits} out of 5 used</p>
                    <Link href={'/dashboard/boost'} 
                        className='text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2'>
                        Upgrade for more credits
                        <Rocket className='w-4 h-4' />
                    </Link>
         </div>
         </>) 
         :(
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-pink-400/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-slate-200">Premium Member</h2>
                <p className="text-sm text-slate-400">Unlimited course creation</p>
              </div>
            </div>

            <Progress 
              value={100} 
              className="h-2.5 bg-slate-700 rounded-full"
              indicatorclassname="bg-gradient-to-r from-orange-400 to-pink-400"
            />

            <p className="text-sm text-slate-400 italic">Thank you for upgrading!</p>
          </div>
        
    )

                      }


            </div>

        </div>
    </div>
)
}

export default Sidebar
