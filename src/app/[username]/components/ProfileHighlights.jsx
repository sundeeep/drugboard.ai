"use client";
import { parseTextWithLinks } from "@/utils/parseTextWithLinks.util";
import { Award } from "lucide-react";
import { Sparkles } from 'lucide-react';

const ProfileHighlights = () => {

    let phWithLink = 'Iodonium ion cyclization at Chem. help ASAP, https://youtu.be/P7dxSZUJ02A';

      
  return (
    <div className="flex flex-col items-stretchbg-white w-[50%]  border-2 border-[#FACC15] rounded-3xl backdrop-blur-xl">
        <div className='flex items-center justify-start gap-3 p-3 rounded-t-3xl border-b-2 border-b-[#FACC15] bg-white'>
            <Award className='text-[#FACC15]'/>
            <p className='text-[#1E293B] text-xl font-bold'>Profile Highlights</p>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
            <ul className="list-disc list-inside flex flex-col items-start gap-2">
                <li className="font-semibold flex items-start gap-2">
                    <span><Sparkles size={16} className="mt-[6px]"/></span>
                    <span>
                        Cover page of The Journal of Organic Chemistry 2020, Volume 85, Issue 3, “Modern
                        Peptide and Protein Chemistry.” 
                    </span>
                </li>
                <li className="font-semibold flex items-start gap-2">
                    <span><Sparkles size={16} className="mt-[6px]"/></span>
                    <span>
                        {parseTextWithLinks(phWithLink)}
                    </span>
                </li>
            </ul>

        </div>
    </div>
  )
}

export default ProfileHighlights;