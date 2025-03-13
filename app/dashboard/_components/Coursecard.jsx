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
    <div className='bg-slate-800 border border-slate-700 rounded-xl p-5 text-white
      hover:border-orange-500/20 
      transition-all duration-300 group cursor-pointer'>
      
      <div>
        <div className='flex justify-between items-center'>
          
             <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 
            flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
               
            <Brain className='w-7 h-7 text-orange-400 group-hover:animate-pulse'/>
          </div>
          
      <div className='px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-orange-500/20 to-pink-500/20 
            text-orange-400 border border-orange-500/20 group-hover:bg-gradient-to-r 
            group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-all duration-300'>
            
            {course?.date || '27 February'}
          </div>
          
        </div>

        <h2 className='mt-5 font-bold text-xl text-slate-200 group-hover:text-orange-400 
          transition-colors duration-300 flex items-center gap-2'>
          
          {course?.topic || 'Untitled Course'}
          {course?.status === 'Completed' && <Sparkles className='w-5 h-5 text-yellow-400' />}
        </h2>
        
        <p className='text-sm mt-3 line-clamp-2 text-slate-400'>{
          course?.courselayout?.courseSummary || course?.courselayout?.course_summary ||
        course?.courselayout?.CourseSummary||'Course description not available'}
        </p>


       

        <div className='mt-7 flex justify-end'> 
          
          {course?.status === 'Generating' ? (
            <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 
              text-orange-400 border border-orange-500/20 text-sm flex items-center gap-2'>
              
              <Loader2 className='h-4 w-4 animate-spin'/>
              Creating Course...
            </div>
          ) :
            (
        <Link  href={'/course/'+course?.courseId}> <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 
              hover:to-pink-600 text-white rounded-xl px-4 py-2 transform hover:scale-105 
              transition-all duration-300 flex items-center gap-2'
              
              >
               <>Start Journey <Target className='w-4 h-4'/>
               </>
              
            </Button></Link> 
          )}
           </div>
        
      </div>
    </div>
  )
}


export default Coursecard
