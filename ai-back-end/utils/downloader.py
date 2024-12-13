import os
from yt_dlp import YoutubeDL

def download_audio_from_youtube(url, output_dir):
    """
    Downloads the audio of a YouTube video as an MP3 file.

    Args:
        url (str): The YouTube video URL.
        output_dir (str): The directory where the MP3 file will be saved.

    Returns:
        str: The path to the downloaded MP3 file.
    """
    try:
        # Create output directory if it doesn't exist
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Configure yt-dlp options for direct mp3 download
        ydl_opts = {
            'format': 'm4a/bestaudio/best',
            'outtmpl': f'{output_dir}/%(title)s.mp3',
            'extract_audio': True,
            'audio_format': 'mp3',
            'audio_quality': '192K',
        }

        # Download the audio
        with YoutubeDL(ydl_opts) as ydl:
            print(f"Downloading from: {url}")
            result = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(result).replace('.webm', '.mp3').replace('.m4a', '.mp3')
            print(f"Download complete: {filename}")
            return filename
    except Exception as e:
        print(f"Error downloading audio: {e}")
        return None

def get_video_metadata(url):
    """
    Extracts metadata from a YouTube video.

    Args:
        url (str): The YouTube video URL.

    Returns:
        dict: Metadata including title, channel, duration, and URL.
    """
    try:
        ydl_opts = {'quiet': True}
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        return {
            "title": info.get("title"),
            "channel": info.get("uploader"),
            "duration": info.get("duration"),
            "url": url
        }
    except Exception as e:
        print(f"Error retrieving metadata: {e}")
        return None
    
    