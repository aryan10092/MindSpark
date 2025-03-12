import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Brain, RefreshCw, Target, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

function Coursecard({course}) {
  // Calculate progress value
  const progressValue = course?.completedSections 
    ? (course.completedSections / course.totalSections) * 100 
    : 20;

  return (
    <div className='bg-slate-800 border border-slate-700 rounded-xl p-5 text-white hover:border-orange-500/20 
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
          course?.courselayout?.CourseSummary||'Course description not available'}</p>


       

        <div className='mt-7 flex justify-end'> 
          {course?.status === 'Generating' ? (
            <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 
              text-orange-400 border border-orange-500/20 text-sm flex items-center gap-2'>
              <Loader2 className='h-4 w-4 animate-spin'/>
              Creating Course...
            </div>
          ) : (
        <Link  href={'/course/'+course?.courseId}> <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 
              hover:to-pink-600 text-white rounded-xl px-4 py-2 transform hover:scale-105 
              transition-all duration-300 flex items-center gap-2'
              
              >
               <>Start Journey <Target className='w-4 h-4'/></>
              
            </Button></Link> 
          )}
        </div>
      </div>
    </div>
  )
}

// function Coursecard({course}) {
//   return (
//     <div className='border rounded-lg shadow-md p-5'>
//      <div>
//         <div className='flex justify-between items-center'>
//              {/* <Image src={'/knowledge.jpg'} alt='other' width={50} height={50}/> */}
// <Brain/>
//              <h2 className='p-1 px-2 rounded-full text-[10px] bg-blue-500 text-white' >27 february</h2>
//          </div>

//          <h2 className='mt-3 font-medium text-lg'>{course?.topic}</h2>
//          <p className='text-xs mt-1 line-clamp-2 text-gray-800'>{course?.courselayout?.courseSummary}</p>

//           <div className='mt-3'>
//             <Progress value={20} />
//           </div>

//           <div className='mt-3 flex justify-end'> 
//            { course?.status=='Generating'?
            
//             <h2 className='p-1 px-2 rounded-full bg-gray-400 text-white text-sm flex gap-2 items-center'>
//               <RefreshCw className='h-5 w-5'/>
        
//               Generating</h2>

//            :<Button>View</Button>}
//           </div>



//       </div>
//     </div>
//   )
// }

// export default Coursecard


// function Coursecard({course}) {
//   // Calculate progress percentage based on completed sections
//   const progressValue = course?.completedSections 
//     ? (course.completedSections / course.totalSections) * 100 
//     : 0;

//   // Format date nicely
//   const formattedDate = course?.date 
//     ? new Date(course.date).toLocaleDateString('en-US', { 
//         month: 'long', 
//         day: 'numeric' 
//       })
//     : 'Not started';

//   return (
//     <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white 
//       hover:border-slate-700 transition-all duration-300 group'>
//       <div>
//         <div className='flex justify-between items-center'>
//           <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
//             flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
//             <Brain className='w-7 h-7 text-blue-400'/>
//           </div>
//           <div className='flex items-center gap-2'>
//             <div className={`w-2 h-2 rounded-full ${
//               course?.status === 'Generating' ? 'bg-yellow-400 animate-pulse' : 
//               course?.status === 'Completed' ? 'bg-green-400' : 'bg-blue-400'
//             }`}/>
//             <h2 className='px-4 py-1.5 rounded-full text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 
//               text-blue-400 border border-blue-500/20'>{formattedDate}</h2>
//           </div>
//         </div>

//         <h2 className='mt-5 font-bold text-xl text-slate-200 group-hover:text-blue-400 
//           transition-colors duration-300'>{course?.topic || 'Untitled Course'}</h2>
//         <p className='text-sm mt-3 line-clamp-2 text-slate-400'>{
//           course?.courselayout?.courseSummary || 'Course description not available'}</p>

//         <div className='mt-5 space-y-2'>
//           <div className='flex justify-between text-xs text-slate-400'>
//             <span>Progress</span>
//             <span>{Math.round(progressValue)}%</span>
//           </div>
//           <Progress value={progressValue} className='h-2 bg-slate-800 rounded-full' 
//             indicatorClassName='bg-gradient-to-r from-blue-500 to-purple-500'/>
//         </div>

//         <div className='mt-5 flex justify-end'> 
//           {course?.status === 'Generating' ? (
//             <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 
//               text-blue-400 border border-blue-500/20 text-sm flex items-center gap-2'>
//               <RefreshCw className='h-4 w-4 animate-spin'/>
//               Generating Course
//             </div>
//           ) : (
//             <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
//               hover:to-purple-600 text-white rounded-xl px-6 py-2 transform hover:scale-105 
//               transition-all duration-300'>
//               {course?.status === 'Completed' ? 'Review Course' : 'Start Learning'}
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// import { BookOpen, Target, Sparkles, Loader2 } from 'lucide-react' // Add these imports

// function Coursecard({course}) {
//   const progressValue = course?.completedSections 
//     ? (course.completedSections / course.totalSections) * 100 
//     : 0;

//   const formattedDate = course?.date 
//     ? new Date(course.date).toLocaleDateString('en-US', { 
//         month: 'long', 
//         day: 'numeric' 
//       })
//     : 'Not started';

//   return (
//     <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white 
//       hover:border-slate-700 transition-all duration-300 group relative overflow-hidden'>
//       {/* Background decoration */}
//       <div className='absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16' />
//       <div className='absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full -ml-12 -mb-12' />
      
//       <div className='relative'>
//         <div className='flex justify-between items-center'>
//           {/* Modified icon container */}
//           <div className='relative'>
//             <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
//               flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
//               <BookOpen className='w-6 h-6 text-blue-400'/>
//             </div>
//             {/* Decorative elements */}
//             <div className='absolute -top-1 -right-1 w-3 h-3 bg-purple-500/20 rounded-full' />
//             <div className='absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500/20 rounded-full' />
//           </div>

//           {/* Modified date display */}
//           <div className='flex items-center gap-3'>
//             <Target className={`w-4 h-4 ${
//               course?.status === 'Completed' ? 'text-green-400' : 'text-blue-400'
//             }`}/>
//             <h2 className='px-4 py-1.5 rounded-full text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 
//               text-blue-400 border border-blue-500/20 flex items-center gap-2'>
//               <span className='w-1 h-1 rounded-full bg-blue-400'></span>
//               {formattedDate}
//             </h2>
//           </div>
//         </div>

//         <h2 className='mt-5 font-bold text-xl text-slate-200 group-hover:text-blue-400 
//           transition-colors duration-300 flex items-center gap-2'>
//           {course?.topic || 'Untitled Course'}
//           {course?.status === 'Completed' && <Sparkles className='w-5 h-5 text-yellow-400' />}
//         </h2>
        
//         <p className='text-sm mt-3 line-clamp-2 text-slate-400'>{
//           course?.courselayout?.courseSummary || 'Course description not available'}</p>

//         {/* Custom progress bar */}
//         <div className='mt-5 space-y-2'>
//           <div className='flex justify-between text-xs text-slate-400'>
//             <span className='flex items-center gap-2'>
//               <div className='w-1 h-1 rounded-full bg-blue-400'></div>
//               Progress
//             </span>
//             <span className='font-mono'>{Math.round(progressValue)}%</span>
//           </div>
//           <div className='h-2 bg-slate-800 rounded-full overflow-hidden'>
//             <div 
//               className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
//                 transition-all duration-700 ease-out relative group-hover:opacity-90'
//               style={{ width: `${progressValue}%` }}>
//               <div className='absolute top-0 left-0 w-full h-full bg-white/20 
//                 animate-[shimmer_2s_infinite]'></div>
//             </div>
//           </div>
//         </div>

//         <div className='mt-5 flex justify-end'> 
//           {course?.status === 'Generating' ? (
//             <div className='px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 
//               text-blue-400 border border-blue-500/20 text-sm flex items-center gap-2'>
//               <Loader2 className='h-4 w-4 animate-spin'/>
//               Creating Magic...
//             </div>
//           ) : (
//             <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
//               hover:to-purple-600 text-white rounded-xl px-6 py-2 transform hover:scale-105 
//               transition-all duration-300 flex items-center gap-2'>
//               {course?.status === 'Completed' ? (
//                 <>Review Course <Sparkles className='w-4 h-4'/></>
//               ) : (
//                 <>Start Journey <Target className='w-4 h-4'/></>
//               )}
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
//}
export default Coursecard