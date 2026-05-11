export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

const CHANNEL_HANDLE = "catherinelapsy";

async function getUploadsPlaylistId(
  apiKey: string
): Promise<string | null> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return (
    data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null
  );
}

async function getAllPlaylistVideoIds(
  apiKey: string,
  playlistId: string
): Promise<string[]> {
  const videoIds: string[] = [];
  let nextPageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId,
      maxResults: "50",
      key: apiKey,
    });
    if (nextPageToken) params.set("pageToken", nextPageToken);

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params}`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();

    for (const item of data.items ?? []) {
      const videoId = item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title ?? "";
      if (
        videoId &&
        title !== "Deleted video" &&
        title !== "Private video"
      ) {
        videoIds.push(videoId);
      }
    }

    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videoIds;
}

async function getVideoDetails(
  apiKey: string,
  videoIds: string[]
): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const params = new URLSearchParams({
      part: "snippet",
      id: batch.join(","),
      key: apiKey,
    });
    const url = `https://www.googleapis.com/youtube/v3/videos?${params}`;
    const res = await fetch(url);
    if (!res.ok) continue;
    const data = await res.json();

    for (const item of data.items ?? []) {
      const snippet = item.snippet;
      const thumbs = snippet.thumbnails;
      const thumbnail =
        thumbs?.maxres?.url ?? thumbs?.standard?.url ?? thumbs?.high?.url ?? thumbs?.medium?.url ?? "";

      videos.push({
        id: item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail,
        publishedAt: snippet.publishedAt,
      });
    }
  }

  return videos;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    const playlistId = await getUploadsPlaylistId(apiKey);
    if (!playlistId) return [];

    const videoIds = await getAllPlaylistVideoIds(apiKey, playlistId);
    if (videoIds.length === 0) return [];

    const videos = await getVideoDetails(apiKey, videoIds);
    videos.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
    return videos;
  } catch {
    return [];
  }
}

export function hasYouTubeApiKey(): boolean {
  return Boolean(import.meta.env.YOUTUBE_API_KEY);
}