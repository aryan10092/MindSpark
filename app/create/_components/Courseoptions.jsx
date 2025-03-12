// import { Button } from '@/components/ui/button'
// import { BookAIcon, BotOffIcon, Code2Icon, NotebookPen, NotebookTabs } from 'lucide-react'
// import Image from 'next/image'
// import React, { useState } from 'react'

// function Courseoptions({selectedtype}) {
//     const options=[{
//         name:'exam',
//         icon: NotebookTabs
//     },
//     {
//         name:'Coding',
//         icon:Code2Icon
//     },
//     {
//         name:'Practice',
//         icon:NotebookPen
//     },
//     {
//         name:'job interview',
//         icon: BotOffIcon
//     },
//     {
//         name:'other',
//         icon:BookAIcon
//     }

//     ]

// const[selected,setselected]=useState()
    
//   return (
//     <div>

//         <h2 className='items-center mb-2 text-lg'>Select the category to create your personal study material</h2>
//         <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5 '>
//             {options.map((x,index)=>(
//                 <div key={index} className={`p-4 flex flex-col items-center justify-center 
//                 border-2  rounded-xl hover:border-primary cursor-pointer
//             ${x?.name==selected&&'border-primary'}`
//             }
//                 onClick={()=>{setselected(x.name);
//                 selectedtype(x.name)}}>
//                    <x.icon/>
//       <h2 className='text-sm'> {x.name}</h2>
//                 </div>
//             ))}
//         </div>

        
//     </div>
//   )
// }

// export default Courseoptions

import { Button } from '@/components/ui/button'
import { BookAIcon, Code2Icon, Sparkles, Brain, Target, Briefcase, Palette } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion"

function Courseoptions({selectedtype}) {
    const options=[{
         name:'Exam ',
        icon: Brain,
        description: 'Smart study materials for exam success',
        gradient: 'from-blue-500 to-indigo-500'

    },

      {
        name:'Coding',
        icon: Code2Icon,
        description: 'Master programming with hands-on practice',
        gradient: 'from-emerald-500 to-teal-500'
    },    {
        name:'Practice',
        icon: Target,
        description: 'Interactive exercises to perfect your skills',
        gradient: 'from-orange-500 to-amber-500'
    },


    {
        name:'Interview',
        icon: Briefcase,
        description: 'Ace your next job interview',
        gradient: 'from-purple-500 to-violet-500'

    },   {
        name:'Custom',
        icon: Palette,
        description: 'Design your own learning journey',
        gradient: 'from-pink-500 to-rose-500'

    }]

    const[selected,setselected]=useState()
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 p-8 rounded-2xl text-white"
        >
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-10"
            >
                <motion.div 
                    whileHover={{ rotate: 12 }}
                    className="relative"
                >
                    
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 
                 flex items-center justify-center transform transition-transform duration-300">

                        <Sparkles className="w-8 h-8" />

                    </div>
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-1 -right-1 w-14 h-14 rounded-2xl bg-gradient-to-br 
                        from-orange-500 to-pink-500 -z-10 opacity-50 blur-sm"
                    />
                </motion.div>
                <div>
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 
                        bg-clip-text text-transparent"
                    >
                        Choose Your Learning Path
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-400 text-sm mt-1"
                    >
                        Select a category to personalize your study experience
                    </motion.p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {options.map((option, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index }}
                        whileHover={{ scale: 1.05 }}
                        key={index}
                        className={`relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border-2 
                            border-slate-700/50 hover:border-transparent cursor-pointer transition-all 
                            duration-300 hover:shadow-xl overflow-hidden
                            ${option.name === selected ? 'border-orange-300 border-1 shadow-2xl' : ''}
                            group`}
                        onClick={() => {
                            setselected(option.name);
                            selectedtype(option.name);
                            
                        }}
                    >
                         <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} 
                            opacity-0 group-hover:opacity-10 transition-opacity duration-900`}></div> 
                        
                        <div className="flex items-center gap-4 relative z-10">
                            <motion.div 
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`p-3 rounded-lg bg-gradient-to-br ${option.gradient} 
                                opacity-80 group-hover:opacity-100 transition-all duration-300 
                                shadow-lg group-hover:shadow-2xl`}
                            >
                                <option.icon className="w-6 h-6" />
                            </motion.div>
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-white 
                                    transition-colors duration-300">{option.name}</h3>
                                <p className="text-sm text-slate-400 mt-1 group-hover:text-slate-300 
                                    transition-colors duration-300">{option.description}</p>
                            </div>
                        </div>
                        
                        {option.name === selected && (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 
                                    to-emerald-500 rounded-full flex items-center justify-center animate-bounce"
                                >
                                    <span className="text-sm">✓</span>
                                </motion.div>
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.05, 1],
                                        opacity: [0.2, 0.4, 0.2]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 border-2 border-green-400/20 
                                    rounded-xl"
                                />
                            </>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default Courseoptions