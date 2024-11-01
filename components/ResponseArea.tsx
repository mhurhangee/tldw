import { VideoAnalysis } from '@/app/api/analyze/schema'

interface ResponseAreaProps {
  analysis: Partial<VideoAnalysis> | null
  isLoading: boolean
}

export default function ResponseArea({ analysis, isLoading }: ResponseAreaProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">AI Response</h2>
      <div className="prose max-w-none">
        {isLoading ? (
          <p>Analyzing video...</p>
        ) : analysis ? (
          <>
            {analysis.summary && (
              <>
                <h3>Summary</h3>
                <p>{analysis.summary}</p>
              </>
            )}
            {analysis.keyPoints && (
              <>
                <h3>Key Points</h3>
                <ul>
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </>
            )}
            {analysis.mainMessage && (
              <>
                <h3>Main Message</h3>
                <p>{analysis.mainMessage}</p>
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500">Select an analysis option to get started.</p>
        )}
      </div>
    </div>
  )
}