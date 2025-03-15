import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Brain, RefreshCw, Target, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

function Coursecard({course}) {
  
  const progressValue = course?.completedSections 
    ? (course.completedSections / course.totalSections) * 100 
    : 20;

  return (
    <div className='bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200 rounded-xl 
      p-5 hover:border-orange-400 
      transition-all duration-300 group cursor-pointer'>
      
       <div>
        <div className='flex justify-between items-center'>
       <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 
            flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
            
            <Brain className='w-7 h-7 text-white group-hover:animate-pulse'/>
          </div>
          
       <div className='px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-orange-500 to-pink-400 
            text-white border border-orange-300 group-hover:from-orange-500 
            group-hover:to-pink-500 transition-all duration-300'>
              {course?.date || '27 February'}
     </div>
          
        </div>

        <h2 className='mt-5 font-bold text-xl text-gray-800 group-hover:text-orange-500 
          transition-colors duration-300 flex items-center gap-2'>
          {course?.topic || 'Untitled Course'}
          {course?.status === 'Completed' && <Sparkles className='w-5 h-5 text-yellow-400' />}
        </h2>
        
        <p className='text-sm mt-3 line-clamp-2 text-gray-600'>{
          course?.courselayout?.courseSummary || course?.courselayout?.course_summary ||
          course?.courselayout?.CourseSummary||'Course description not available'}</p>

        <div className='mt-7 flex justify-end'> 
          
          {course?.status === 'Generating' ? (
            <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400/10 to-pink-400/10 
              text-orange-500 border border-orange-300 text-sm flex items-center gap-2'>
              <Loader2 className='h-4 w-4 animate-spin'/>
              
              Creating Course...
            </div>
          ) :
            (
        <Link href={'/course/'+course?.courseId}> <Button className='bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-500 
              hover:to-pink-500 text-white rounded-xl px-4 py-2 transform hover:scale-105 
              transition-all duration-300 flex items-center gap-2'>
          
               <>Start Journey <Target className='w-4 h-4'/></>
            </Button></Link> 
          )}
        </div>
         
        </div>
    </div>
  )
}



export default Coursecard
