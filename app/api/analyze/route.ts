import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { videoAnalysisSchema } from './schema'

export const maxDuration = 60

class TranscriptAPI {
  static async getTranscript(id: string, config = {}) {
    const url = new URL('https://youtubetranscript.com')
    url.searchParams.set('server_vid2', id)
    
    const response = await axios.get(url.toString(), config)
    const $ = cheerio.load(response.data, undefined, false)
    const err = $('error')
  
    if (err.length) throw new Error(err.text())
    return $('transcript text').map((i, elem) => {
      const $a = $(elem)
      return {
        text: $a.text(),
        start: Number($a.attr('start')),
        duration: Number($a.attr('dur'))
      }
    }).toArray()
  }
}

export async function POST(req: Request) {
  const { videoId } = await req.json()

  try {
    console.log(`Attempting to fetch transcript for video ID: ${videoId}`)
    const transcript = await TranscriptAPI.getTranscript(videoId)

    console.log(`Successfully fetched transcript. Length: ${transcript.length}`)
    const fullTranscript = transcript.map((t) => t.text).join(' ')

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      schema: videoAnalysisSchema,
      prompt: `Analyze the following YouTube video transcript titled and provide a comprehensive summary:\n\n${fullTranscript}`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Detailed error:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json({ error: 'Failed to process video', details: error }, { status: 500 })
  }
}