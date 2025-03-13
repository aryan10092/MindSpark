

import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { FaBook, FaFire } from 'react-icons/fa'; 

function DashHeader() {

  const pathname = usePathname();


  return (
    <div className="bg-gradient-to-r pl-14 from-orange-100 to-pink-200 p-6 rounded-xl
      shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-3">
       
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 flex
          items-center justify-center">
          <FaFire className="w-8 h-8 text-white" />
        </div>

        
        {pathname.startsWith("/course/") && (
        <h2 className="font-bold text-2xl text-orange-400">MindSpark</h2>
      )}

      </div>
      
      <div className="flex items-center pr-4">
        <UserButton />
      </div>
    </div>
  );
}

export default DashHeader;
