export interface VideoInfo {
  videoId: string;
  title: string;
  authorName: string;
  authorUrl: string;
}

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`)
    if (!response.ok) {
      throw new Error('Failed to fetch video information')
    }
    const data = await response.json()
    return {
      videoId,
      title: data.title,
      authorName: data.author_name,
      authorUrl: data.author_url,
    }
  } catch (error) {
    console.error('Error fetching video info:', error)
    return {
      videoId,
      title: `YouTube Video: ${videoId}`,
      authorName: 'Unknown Author',
      authorUrl: `https://www.youtube.com/channel/UC${videoId}`,
    }
  }
}

export function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^/?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^/?]+)/i,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}