import { UserButton } from '@clerk/nextjs';
import { FaBook } from 'react-icons/fa';
import Link from 'next/link';

function CourseHeader() {
  return (
    <div className="fixed top-0 right-0 left-0 z-20">
      <div className="bg-gradient-to-r from-orange-100 to-pink-200 p-4 sm:p-6 
      flex justify-between items-center shadow-lg">

          <Link href="/dashboard">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 
            flex items-center justify-center">
             
              <FaBook className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            <h2 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              MindSpark
               </h2>
       </div>
        </Link>
        
        <div className="flex items-center">
          <UserButton afterSignOutUrl="/" />
      
        </div>
   </div> 

    </div>
  );
}

export default CourseHeader; 
