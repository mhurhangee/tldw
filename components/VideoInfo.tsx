import Image from 'next/image'

interface VideoInfoProps {
  videoId: string | null
  title: string | null
}

export default function VideoInfo({ videoId, title }: VideoInfoProps) {
  if (!videoId) {
    return null
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      <Image
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        alt={title || 'YouTube Video Thumbnail'}
        width={120}
        height={90}
        className="rounded"
      />
      <div>
        <h2 className="text-xl font-semibold mb-2">{title || 'Loading...'}</h2>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  )
}