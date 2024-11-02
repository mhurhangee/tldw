'use client'

import { useState } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { videoAnalysisSchema, VideoAnalysis } from './api/analyze/schema'
import YouTubeInput from '@/components/YouTubeInput'
import SummaryDisplay from '@/components/SummaryDisplay'
import { getVideoInfo, VideoInfo } from '@/lib/youtube'
import FlipText from "@/components/ui/flip-text"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import { toast } from 'sonner'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export default function Home() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)

  const { object, submit, isLoading } = useObject<VideoAnalysis>({
    api: '/api/analyze',
    schema: videoAnalysisSchema,
  })

  const handleVideoSubmit = async (id: string) => {
    try {
      const info = await getVideoInfo(id)
      setVideoInfo(info)
      submit({ videoId: id })
    } catch (error) {
      toast.error('Error fetching video info. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 absolute z-0"
        )}
      />
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <FlipText
          className="text-5xl font-bold text-center text-purple-900 font-poppins"
          word="TL;DW"
        />
        <p className="text-center text-lg text-purple-700 font-inter font-bold">
        📺 Too Long; Didn&#39;t Watch: <span className="font-normal">Quickly summarize YouTube videos with AI! Save time and get the key points in seconds!</span>
        </p>
        <YouTubeInput onVideoSubmit={handleVideoSubmit} isLoading={isLoading} />
        <SummaryDisplay 
          analysis={object ? { ...object, keyPoints: object.keyPoints?.filter((kp): kp is string => kp !== undefined) } : null} 
          isLoading={isLoading} 
          videoInfo={videoInfo} 
        />
        <footer className="text-center text-sm text-purple-600">
          Created by <a href="https://github.com/mhurhangee" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">m.hurhangee@me.com</a> | 
          <span className="inline-flex items-center">
            <a href="https://github.com/mhurhangee/tldw" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline ml-1">GitHub</a>
            <GitHubLogoIcon className="w-4 h-4 ml-1" />
          </span>
        </footer>
      </div>
    </main>
  )
}