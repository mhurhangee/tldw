'use client'

import { useState } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { videoAnalysisSchema, VideoAnalysis } from './api/analyze/schema'
import YouTubeInput from '@/components/YouTubeInput'
import VideoInfo from '@/components/VideoInfo'
import AnalysisOptions from '@/components/AnalysisOptions'
import ResponseArea from '@/components/ResponseArea'

export default function Home() {
  const [videoId, setVideoId] = useState<string | null>(null)

  const { object, submit, isLoading } = useObject<VideoAnalysis>({
    api: '/api/analyze',
    schema: videoAnalysisSchema,
  })

  const handleVideoSubmit = (id: string) => {
    setVideoId(id)
  }

  const handleAnalyze = (analysisType: string) => {
    if (videoId) {
      submit({ videoId, analysisType })
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          TLDW: Too Long; Didn't Watch
        </h1>
        <YouTubeInput onVideoSubmit={handleVideoSubmit} />
        <VideoInfo videoId={videoId} title={object?.title ?? null} />
        <AnalysisOptions onOptionSelect={handleAnalyze} disabled={!videoId || isLoading} />
        <ResponseArea analysis={object ? { ...object, keyPoints: object.keyPoints?.filter((kp): kp is string => kp !== undefined) } : null} isLoading={isLoading} />
      </div>
    </main>
  )
}