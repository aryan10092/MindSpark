import { UserButton } from "@clerk/nextjs";
import { Book, BookCopy, BrainCogIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBook } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <nav className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
                          className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500
                           to-pink-500 flex items-center justify-center text-white'>
         
                             <FaBook className='w-8 h-8' />
                   </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            MindSpark
          </h1>
        </div>
        <UserButton afterSignOutUrl="/"/>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Transform Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create personalized study materials with AI-powered course generation
          </p>
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl font-semibold text-lg hover:from-orange-500 hover:to-pink-500 transition-all shadow-lg shadow-orange-200"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white shadow-lg">
            <div className="w-16 h-16  mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
             
               <GiArtificialIntelligence className='w-8 h-8'/>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">Advanced AI technology to generate comprehensive study materials</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4  rounded-xl bg-pink-100 flex items-center justify-center">
               <BrainCogIcon className='w-8 h-8'/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized</h3>
            <p className="text-gray-600">Tailor materials to your learning style and pace</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg">
            <div className="w-16 h-16 mx-auto  mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
             
              <TimerIcon className='w-8 h-8'/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficient</h3>
            <p className="text-gray-600">Save time with instant course material generation</p>
          </div>
        </div>
      </main>
    </div>
  );
}
