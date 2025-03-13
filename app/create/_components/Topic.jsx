

import { Textarea } from '@/components/ui/textarea'
import React from 'react'

import { Rocket } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
  

function Topic({Settopic,setlevel}) {
  return (
    <div className="mt-8 flex flex-col bg-slate-900 p-8 rounded-2xl text-white"> 

        <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 
            flex items-center justify-center">
                <Rocket className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold">
                Create Your Study Material</h2>

      </div>

        <div className="mb-6">

            <h3 className="text-lg font-semibold mb-2">
                Enter your topic
            </h3>

            <Textarea 
                placeholder="What would you like to learn about?"
                className="mt-2 w-full bg-slate-800 border-slate-700 text-white
                 placeholder:text-slate-400" 
                onChange={(e)=>Settopic(e.target.value)}  />

        </div>

        <div>

            <h3 className="text-lg font-semibold mb-2">
                Select difficulty level

            </h3>

            <Select onValueChange={(e)=>setlevel(e)}>

                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Choose your level" />
                </SelectTrigger>

                      <SelectContent className="bg-slate-800 border-slate-700 text-white">

                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>

                </SelectContent>

            </Select>
     </div>
    </div>
  )
}

export default Topic
