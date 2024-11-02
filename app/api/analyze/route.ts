import { NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { videoAnalysisSchema } from './schema'

export const maxDuration = 60

export async function POST(req: Request) {
  const { videoId } = await req.json()

  try {
    const [transcript] = await Promise.all([
      YoutubeTranscript.fetchTranscript(videoId)
    ])

    const fullTranscript = transcript.map((t) => t.text).join(' ')

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      schema: videoAnalysisSchema,
      prompt: `Analyze the following YouTube video transcript titled and provide a comprehensive summary:\n\n${fullTranscript}`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error processing YouTube transcript:', error)
    return NextResponse.json({ error: 'Failed to process video' }, { status: 500 })
  }
}