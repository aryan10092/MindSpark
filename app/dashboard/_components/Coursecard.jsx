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
  <div className='bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200 rounded-xl p-4 sm:p-5 hover:border-orange-400 
      transition-all duration-300 group cursor-pointer w-full'>

      <div>
          <div className='flex justify-between items-center flex-wrap gap-3 sm:flex-nowrap'>

          <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 
            flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>

            <Brain className='w-6 h-6 sm:w-7 sm:h-7 text-white
             group-hover:animate-pulse'/>
          </div>

       <div className='px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-pink-400 
            text-white border border-orange-300 group-hover:from-orange-500 
            group-hover:to-pink-500 transition-all duration-300'>
                 { course?.date
    ? new Date(course.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available"}
          </div>

        </div>

        <h2 className='mt-4 sm:mt-5 font-bold text-lg sm:text-xl text-gray-800 group-hover:text-orange-500 
          transition-colors duration-300 flex items-center gap-2 line-clamp-2'>

              {course?.topic || 'Untitled Course'}
          {course?.status === 'Completed' && <Sparkles 
          className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0' />}
        </h2>
        
        <p className='text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 text-gray-600'>{
            course?.courselayout?.courseSummary || course?.courselayout?.course_summary ||
          course?.courselayout?.CourseSummary||course?.courselayout?.courseTitle||'Course description not available'}</p>

        <div className='mt-5 sm:mt-7 flex justify-end'> 
          {course?.status === 'Generating' ? 
          (
              <div className='px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-orange-400/10 to-pink-400/10 
              text-orange-500 border border-orange-300 text-xs sm:text-sm flex items-center gap-2'>

              <Loader2 className='h-3 w-3 sm:h-4 sm:w-4 animate-spin'/>

              Creating Course...
            </div>
          ) :
           (
        <Link href={'/course/'+course?.courseId}>  <Button className='bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-500 
                hover:to-pink-500 text-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transform hover:scale-105 
                transition-all duration-300 flex items-center gap-2'
              >
                Start Journey <Target className='w-3 h-3 sm:w-4 sm:h-4'/>
              </Button>

            </Link> 
          )}
        </div>

          </div>
    </div>
  )
}



export default Coursecard
