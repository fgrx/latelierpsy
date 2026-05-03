import { siteConfig } from "../config";

interface Stats {
  lettrePsy: { value: string; label: string };
  youtube: { value: string; label: string };
  ateliers: { value: string; label: string };
}

function formatCount(n: number): string {
  return n.toLocaleString("fr-FR").replace(/\s/g, " ") + "+";
}

async function getGetResponseCount(): Promise<number | null> {
  const apiKey = import.meta.env.GETRESPONSE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      "https://api.getresponse.com/v3/contacts?perPage=1&fields=contactId",
      {
        headers: { "X-Auth-Token": `api-key ${apiKey}` },
      }
    );
    if (!res.ok) return null;
    const total = res.headers.get("totalcount");
    return total ? parseInt(total, 10) : null;
  } catch {
    return null;
  }
}

async function getYoutubeCount(): Promise<number | null> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=catherinelapsy&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const count = data?.items?.[0]?.statistics?.subscriberCount;
    return count ? parseInt(count, 10) : null;
  } catch {
    return null;
  }
}

export async function getAllStats(activeAteliersCount: number): Promise<Stats> {
  const [grCount, ytCount] = await Promise.all([
    getGetResponseCount(),
    getYoutubeCount(),
  ]);

  return {
    lettrePsy: {
      value: formatCount(grCount ?? siteConfig.stats.lettrePsy.fallback),
      label: siteConfig.stats.lettrePsy.label,
    },
    youtube: {
      value: formatCount(ytCount ?? siteConfig.stats.youtube.fallback),
      label: siteConfig.stats.youtube.label,
    },
    ateliers: {
      value: String(activeAteliersCount),
      label: siteConfig.stats.ateliers.label,
    },
  };
}
