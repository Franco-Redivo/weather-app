import axios from "axios";

export const getYoutubeVideos = async (location) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const query = `${location} travel guide`;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${apiKey}`;

    const response = await axios.get(url);

    return response.data.items.map(video => ({
      title: video.snippet.title,
      videoId: video.id.videoId,
      thumbnail:
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.default?.url
    }));

  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};