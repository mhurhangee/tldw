import { z } from 'zod'

export const videoAnalysisSchema = z.object({
  emoji: z.string().describe('A relevant emoji to represent the video content'),
  aiGeneratedTitle: z.string().describe('An AI-generated title summarizing the video content'),
  executiveSummary: z.string().describe('A concise executive summary of the video content'),
  keyPoints: z.array(z.string()).describe('Bullet points of key information from the video'),
  conclusion: z.string().describe('A brief conclusion summarizing the main takeaways'),
})

export interface VideoAnalysis {
  emoji: string
  aiGeneratedTitle: string
  executiveSummary: string
  keyPoints: string[]
  conclusion: string
}