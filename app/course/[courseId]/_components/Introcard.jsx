
import { Brain, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Introcard({course}) {
  return (
    <div className='group bg-slate-800 border border-slate-700 rounded-xl p-8 
      hover:border-orange-500/20 transition-all duration-500 animate-fadeIn'>
        
      <div className='flex items-center gap-8'>
        
     <div className='relative'>
          
          <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 
            flex items-center justify-center group-hover:scale-110 transition-transform duration-500
            group-hover:animate-pulse'>
            
          <Brain className='w-12 h-12 text-orange-400
              group-hover:animate-bounce'/>
          </div>
          
          <Sparkles className='absolute -top-2 -right-2 w-6 h-6 text-yellow-400 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse'/>
          
        </div>

        <div className='flex-1 transform group-hover:translate-x-2 transition-transform duration-500'>
          
          <h2 className='font-bold text-3xl text-slate-200 mb-3 flex items-center gap-3
            bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent
            group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-500'>
            
            {course?.topic?.toUpperCase()}
          </h2>

          <p className='text-slate-400 text-lg leading-relaxed animate-slideUp'>
            {course?.courselayout?.courseSummary ||  course?.courselayout?.course_summary ||  course?.courselayout?.summary_of_course}
             </p>
          
        </div>
      </div>
      
    </div>
  )
}

export default Introcard
