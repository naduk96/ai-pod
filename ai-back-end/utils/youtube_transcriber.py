from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
import re

def get_video_id(youtube_url):
    """
    Extracts the video ID from a YouTube URL.

    Args:
        youtube_url (str): The YouTube video URL.

    Returns:
        str: The video ID if found, otherwise None.
    """
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", youtube_url)
    return match.group(1) if match else None

def fetch_youtube_transcript(youtube_url):
    """
    Fetches the transcript of a YouTube video.

    Args:
        youtube_url (str): The URL of the YouTube video.

    Returns:
        str: The transcript as a single string.

    Raises:
        Exception: If the transcript cannot be retrieved.
    """
    video_id = get_video_id(youtube_url)
    if not video_id:
        raise ValueError("Invalid YouTube URL. Could not extract video ID.")
    
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([entry['text'] for entry in transcript_list])
        return transcript
    except TranscriptsDisabled:
        raise Exception("Transcripts are disabled for this video.")
    except NoTranscriptFound:
        raise Exception("No transcript found for this video.")
    except Exception as e:
        raise Exception(f"An error occurred while fetching the transcript: {e}")
