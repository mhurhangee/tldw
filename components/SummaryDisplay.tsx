import { VideoAnalysis } from '@/app/api/analyze/schema'
import VideoInfo from './VideoInfo'
import { VideoInfo as VideoInfoType } from '@/lib/youtube'
import ShineBorder from "@/components/ui/shine-border"
import HyperText from "@/components/ui/hyper-text"

interface SummaryDisplayProps {
  analysis: Partial<VideoAnalysis> | null
  isLoading: boolean
  videoInfo: VideoInfoType | null
}

export default function SummaryDisplay({ analysis, isLoading, videoInfo }: SummaryDisplayProps) {
  return (
    <div className="space-y-6">
      {videoInfo && <VideoInfo {...videoInfo} />}
      
      {isLoading && (
        <div className="text-center text-xl font-semibold text-purple-700">
          <HyperText text="Analyzing video..." />
        </div>
      )}

      {analysis && (
        <ShineBorder
          className="relative overflow-hidden rounded-lg bg-white"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <div className="p-6 space-y-4">
            {analysis.aiGeneratedTitle && (
              <h2 className="text-3xl font-bold text-purple-900 font-poppins shadow-sm">{analysis.aiGeneratedTitle}</h2>
            )}
            {analysis.executiveSummary && (
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-pink-700 font-poppins shadow-sm"> 📝 Executive Summary </h3>
                <p className="text-gray-700 text-lg font-inter">{analysis.executiveSummary}</p>
              </div>
            )}
            {analysis.keyPoints && analysis.keyPoints.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-pink-700 font-poppins shadow-sm"> 🔑Key Points </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-700 text-lg font-inter">{point}</li>
                  ))}
                </ul>
              </div>
            )}
            {analysis.conclusion && (
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-pink-700 font-poppins shadow-sm"> 🎯Conclusion </h3>
                <p className="text-gray-700 text-lg font-inter">{analysis.conclusion}</p>
              </div>
            )}
          </div>
        </ShineBorder>
      )}
    </div>
  )
}