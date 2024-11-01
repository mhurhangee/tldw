import { z } from 'zod'

export const videoAnalysisSchema = z.object({
  title: z.string().describe('The title of the YouTube video'),
  summary: z.string().describe('A concise summary of the video content'),
  keyPoints: z.array(z.string()).describe('Key points or main ideas from the video'),
  mainMessage: z.string().describe('The main message or takeaway from the video'),
})

export type VideoAnalysis = z.infer<typeof videoAnalysisSchema>