import * as cheerio from "cheerio";
import axios from "axios";

// detect type from URL
export function detectType(url) {
  if (!url) return "note";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("twitter.com") || url.includes("x.com")) return "tweet";
  if (url.endsWith(".pdf")) return "pdf";
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url.split('?')[0])) return "image";
  return "article";
}

// extract youtube video ID
export function extractYoutubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// extract tweet ID
export function extractTweetId(url) {
  const match = url.match(/(?:twitter\.com|x\.com)\/.*\/status\/([0-9]+)/);
  return match ? match[1] : null;
}

// main extractor
export async function extractFromUrl(url) {
  console.log("Extracting URL:", url);
  const type = detectType(url);
  const domain = new URL(url).hostname.replace("www.", "");
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  try {
    if (type === "pdf") {
      return {
        type, url, domain, favicon,
        title: url.split('/').pop() || "PDF Document",
        description: null, thumbnail: null, rawText: null, videoId: null,
      };
    }

    if (type === "image") {
      return {
        type, url, domain, favicon,
        title: url.split('/').pop() || "Image",
        description: null, thumbnail: url, rawText: null, videoId: null,
      };
    }

    if (type === "youtube") {
      const videoId = extractYoutubeId(url);
      let title = `YouTube Video`;
      let description = null;
      try {
        const oembed = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`, { timeout: 5000 });
        title = oembed.data.title;
        
        // Also attempt to get the meta description
        const { data: ytHtml } = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" }});
        const $yt = cheerio.load(ytHtml);
        description = $yt('meta[name="description"]').attr("content") || $yt('meta[property="og:description"]').attr("content");
      } catch (err) {
        console.warn("YouTube extraction failed", err.message);
      }
      return {
        type, url, domain, favicon, videoId,
        title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        description, rawText: description,
      };
    }

    if (type === "tweet") {
      let title = `Tweet`;
      let htmlContent = "";
      try {
        const oembed = await axios.get(`https://publish.twitter.com/oembed?url=${url}`, { timeout: 5000 });
        title = oembed.data.author_name;
        htmlContent = cheerio.load(oembed.data.html)("blockquote").text();
      } catch (err) {
        console.warn("Twitter oEmbed failed", err.message);
      }
      return {
        type, url, domain, favicon, videoId: null, thumbnail: null,
        title: `Tweet by ${title}`,
        description: htmlContent,
        rawText: htmlContent,
      };
    }

    // Default: Article extraction
    const { data: html } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      timeout: 8000
    });

    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr("content") || $("title").text() || "Untitled";
    const description = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || null;
    const thumbnail = $('meta[property="og:image"]').attr("content") || null;
    const rawText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 5000);

    return {
      type, url, domain, favicon, thumbnail, description, rawText, videoId: null,
      title: title.trim(),
    };
  } catch (error) {
    console.error("Extraction failed for URL:", url, error.message);
    // Return graceful fallback
    return {
      type: "article",
      url,
      domain,
      favicon,
      title: url,
      description: "Failed to extract content. " + error.message,
      thumbnail: null,
      rawText: null,
      videoId: null
    };
  }
}
