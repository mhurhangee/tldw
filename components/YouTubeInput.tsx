'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { extractYoutubeVideoId } from '@/lib/youtube'

interface YouTubeInputProps {
  onVideoSubmit: (videoId: string) => void;
  isLoading: boolean;
}

export default function YouTubeInput({ onVideoSubmit, isLoading }: YouTubeInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractYoutubeVideoId(url)
    if (videoId) {
      onVideoSubmit(videoId)
    } else {
      toast.error('Invalid YouTube URL. Please enter a valid YouTube video URL.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
      <Input
        type="url"
        placeholder="🔗 Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-grow text-lg p-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-inter md:w-2/3 h-12"
      />
      <button
        type="submit"
        className={`text-lg font-semibold bg-purple-600 text-white rounded-lg p-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 font-poppins md:w-1/3 h-12 ${
          isLoading ? 'animate-pulse' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? '🔍 Analyzing...' : '🚀 TLDW'}
      </button>
    </form>
  )
}