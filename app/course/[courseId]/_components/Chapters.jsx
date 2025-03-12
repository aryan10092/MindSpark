// import React from 'react'

// function Chapters({course}) {

//     const chapters=course?.courselayout?.chapters
//   return (
//     <div className='mt-8'>
//         <h2 className='font-bold text-3xl text-slate-200 mb-6 flex items-center gap-3 group'>
//             <span className='bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent 
//                 group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-300'>
//                 Course 
//             </span>
//             <span className='text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 
//                 to-pink-500/10 text-orange-400 border border-orange-500/20'>
//                 {chapters?.length || 0} Chapters
//             </span>
//         </h2>

//         <div className='space-y-4'>
//             {chapters?.map((x,i)=>(
//                 <div 
//                     key={i} 
//                     className='bg-slate-800 border border-slate-700 p-6 rounded-xl cursor-pointer
//                         hover:border-orange-500/20 transition-all duration-300 group'
//                 >
//                     <div className='flex items-center gap-4'>
//                         <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 
//                             flex items-center justify-center text-orange-400 font-medium'>
//                             {i + 1}
//                         </div>
//                         <div className='flex-1'>
//                             <h2 className='font-medium text-slate-200 group-hover:text-orange-400 
//                                 transition-colors duration-300'
//                             >{x?.chapter_title||x?.chapterTitle}</h2>
//                             <p className='text-slate-400 text-sm mt-1'>{x?.chapter_summary||x?.chapterSummary}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Chapters


// "use client"
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function Chapters({course}) {
//     const chapters=course?.courselayout?.chapters
//     const [expandedIndex, setExpandedIndex] = useState(null)
//     const courseId=course?.courseId
//     const[notes,setnotes]=useState([])
//     const chapterId=notes[0]?.chapterId

//     const toggleExpand = (index) => {
//         setExpandedIndex(expandedIndex === index ? null : index)
//     }

    
//       useEffect(() => {
//       getnotes();
//       }, [courseId]); 
      
    
//       useEffect(() => {
//        // console.log(notes)
//         console.log(notes);
//         console.log(notes[0])
//         console.log(chapterId)
//         }, [notes]); 


//         const getnotes=async()=>{
//           const res=await axios.post('/api/notes',{
//             courseid:courseId
//           })
//         //   console.log(res?.data)
//         //   setnotes(res.data)
//         const sortedNotes = res?.data?.sort((a, b) => a.chapterId - b.chapterId)
//         console.log(sortedNotes)
//         setnotes(sortedNotes)
    
//         }
    

//   return (
//     <div className='mt-8'>
//         <h2 className='font-bold text-3xl text-slate-200 mb-6 flex items-center gap-3 group'>
//             <span className='bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent 
//                 group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-300'>
//                 Course 
//             </span>
//             <span className='text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 
//                 to-pink-500/10 text-orange-400 border border-orange-500/20'>
//                 {chapters?.length || 0} Chapters
//             </span>
//         </h2>

//         <div className='space-y-4'>
//             {chapters?.map((x,i)=>(
//                 <div 
//                     key={i} 
//                     className='bg-slate-800 border border-slate-700 p-6 rounded-xl cursor-pointer
//                         hover:border-orange-500/20 transition-all duration-300 group'
//                     onClick={() => toggleExpand(i)}
//                 >
//                     <div className='flex items-center gap-4'>
//                         <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 
//                             flex items-center justify-center text-orange-400 font-medium'>
//                             {i + 1}
//                         </div>
//                         <div className='flex-1'>
//                             <h2 className='font-medium text-slate-200 group-hover:text-orange-400 
//                                 transition-colors duration-300'
//                             >{x?.chapter_title||x?.chapterTitle}</h2>
//                             <p className='text-slate-400 text-sm mt-1'>{x?.chapter_summary||x?.chapterSummary}</p>
//                         </div>
//                     </div>
//                     {expandedIndex === i && (
//                         // <div className='mt-4 pl-12 pr-4 text-slate-300 animate-fadeIn'>
                         
//                         //     <div className='mt-4'>
                              
//                         //       <div className='pt-4  ' dangerouslySetInnerHTML={{ __html: notes[i]?.notes } }
//                         //    />
                               
//                         //     </div> 
//                         // </div>
//                         <div className='mt-4 pl-12 pr-4 text-slate-300 animate-fadeIn'>
                         
//                         <div className='mt-4'>
                          
//                           <div className='pt-4  ' dangerouslySetInnerHTML={{ __html: notes[i]?.notes } }
//                        />
                           
//                         </div> 
//                     </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Chapters

"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Target } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Chapters({course}) {
    const chapters=course?.courselayout?.chapters
    const [expandedIndex, setExpandedIndex] = useState(null)
    const courseId=course?.courseId
    const[notes,setnotes]=useState([])
    const [completedChapters, setCompletedChapters] = useState({})
    const chapterId=notes[0]?.chapterId
  

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    const toggleComplete = (e, index) => {
        e.stopPropagation() // Prevent triggering the chapter expansion
        setCompletedChapters(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
    
    useEffect(() => {
        getnotes();
    }, [courseId]); 
      
    useEffect(() => {
        console.log(notes);
        console.log(notes[0])
        console.log(chapterId)
    }, [notes]); 

    const getnotes=async()=>{
        const res=await axios.post('/api/notes',{
            courseid:courseId
        })
        const sortedNotes = res?.data?.sort((a, b) => a.chapterId - b.chapterId)
        console.log(sortedNotes)
        setnotes(sortedNotes)
    }

    return (
        <div className='mt-8'>
            <div className='flex justify-between'>
            <h2 className='font-bold text-3xl text-slate-200 mb-6 flex items-center gap-3 group'>
                <span className='bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent 
                    group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-300'>
                    Course 
                </span>
                <span className='text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 
                    to-pink-500/10 text-orange-400 border border-orange-500/20'>
                    {chapters?.length || 0} Chapters
                </span>
            </h2>
            <Link href={'/dashboard'}>
            <Button className='bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 
              hover:to-pink-600 text-white rounded-xl px-3 py-4 transform hover:scale-105 
              transition-all duration-300 flex items-center gap-2 mr-4'
              
              >
             <>  Dashboard  <Target className='w-4 h-4'/></>
              
            </Button></Link> 
            </div>
  

            <div className='space-y-4'>
                {chapters?.map((x,i)=>(
                    <div 
                        key={i} 
                        className='bg-slate-800 border border-slate-700 p-6 rounded-xl cursor-pointer
                            hover:border-orange-500/20 transition-all duration-300 group'
                        onClick={() => toggleExpand(i)}
                    >
                        <div className='flex items-center gap-4'>
                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 
                                flex items-center justify-center text-orange-400 font-medium'>
                                {i + 1}
                            </div>
                            <div className='flex-1'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-medium text-slate-200 group-hover:text-orange-400 
                                        transition-colors duration-300'
                                    >{x?.chapter_title||x?.chapterTitle}</h2>
                                    <button
                                        onClick={(e) => toggleComplete(e, i)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 
                                            ${completedChapters[i] 
                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                    >
                                        {completedChapters[i] ? 'Completed' : 'Mark Complete'}
                                    </button>
                                </div>
                                <p className='text-slate-400 text-sm mt-1'>{x?.chapter_summary||x?.chapterSummary}</p>
                            </div>
                        </div>
                        {expandedIndex === i && (
                            <div className='mt-4 pl-12 pr-4 text-slate-300 animate-fadeIn'>
                                <div className='mt-4'>
                                    <div 
                                        className='pt-4 prose prose-invert prose-orange max-w-none
                                            prose-p:text-slate-300 prose-headings:text-slate-200
                                            prose-strong:text-orange-400 prose-em:text-pink-400
                                            prose-code:text-slate-300 prose-code:bg-slate-700/50
                                            prose-code:rounded prose-code:px-1
                                            prose-a:text-orange-400 hover:prose-a:text-orange-300
                                            prose-blockquote:border-l-orange-500
                                            prose-li:marker:text-orange-500'
                                        dangerouslySetInnerHTML={{ __html: notes[i]?.notes }}
                                    />
                                </div> 
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chapters