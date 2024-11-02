import Image from 'next/image'
import { VideoInfo as VideoInfoType } from '@/lib/youtube'

export default function VideoInfo({ videoId, title, authorName, authorUrl }: VideoInfoType) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-start space-x-4 transform transition-all hover:scale-105">
      <Image
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        alt={title || 'YouTube Video Thumbnail'}
        width={200}
        height={150}
        className="rounded-lg shadow-md"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2 text-purple-900">{title}</h2>
        <p className="text-pink-600 mb-2 text-lg">
          By{' '}
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            {authorName}
          </a>
        </p>
        <div className="flex space-x-4">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Watch on YouTube
          </a>
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 font-medium"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  )
}