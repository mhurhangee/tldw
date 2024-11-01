import { NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { videoAnalysisSchema } from './schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const { videoId, analysisType } = await req.json()

  try {
    const [transcript, videoTitle] = await Promise.all([
      YoutubeTranscript.fetchTranscript(videoId),
      getVideoTitle(videoId),
    ])

    const fullTranscript = transcript.map((t) => t.text).join(' ')

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      schema: videoAnalysisSchema,
      prompt: `Analyze the following YouTube video transcript titled "${videoTitle}" and provide a ${analysisType}:\n\n${fullTranscript}`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error processing YouTube transcript:', error)
    return NextResponse.json({ error: 'Failed to process video' }, { status: 500 })
  }
}

async function getVideoTitle(videoId: string): Promise<string> {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`)
    if (!response.ok) {
      throw new Error('Failed to fetch video information')
    }
    const data = await response.json()
    return data.title || `YouTube Video: ${videoId}`
  } catch (error) {
    console.error('Error fetching video title:', error)
    return `YouTube Video: ${videoId}`
  }
}