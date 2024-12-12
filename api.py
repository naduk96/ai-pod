from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.downloader import download_audio_from_youtube, get_video_metadata
from utils.transcriber import transcribe_with_whisper
from utils.summarizer import summarize_transcription
from utils.newsletter import generate_newsletter, save_newsletter
import os
import re

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Paths
OUTPUT_AUDIO_DIR = "audio/"
OUTPUT_TRANSCRIPT_DIR = "output/transcripts/"
OUTPUT_NEWSLETTER_DIR = "output/newsletters/"

# Ensure output directories exist
os.makedirs(OUTPUT_AUDIO_DIR, exist_ok=True)
os.makedirs(OUTPUT_TRANSCRIPT_DIR, exist_ok=True)
os.makedirs(OUTPUT_NEWSLETTER_DIR, exist_ok=True)

def sanitize_filename(filename):
    """
    Sanitizes a string to be used as a valid filename.

    Args:
        filename (str): The input string.

    Returns:
        str: A sanitized version of the filename.
    """
    return re.sub(r'[<>:"/\\|?*]', '', filename).replace(' ', '_')[:50]

@app.route('/generate-newsletter', methods=['POST'])
def generate_newsletter_api():
    """
    API endpoint to generate a newsletter.
    Accepts a YouTube link from the frontend.
    """
    data = request.json
    youtube_link = data.get('youtube_link')

    if not youtube_link:
        return jsonify({'error': 'No YouTube link provided'}), 400

    try:
        # Step 1: Download the audio from YouTube
        # print("Downloading audio...")
        # audio_file = download_audio_from_youtube(youtube_link, OUTPUT_AUDIO_DIR)
        # if not audio_file:
        #     return jsonify({'error': 'Failed to download audio'}), 500

        # Step 2: Extract video metadata
        print("Extracting video metadata...")
        metadata = get_video_metadata(youtube_link)
        if not metadata:
            return jsonify({'error': 'Failed to retrieve video metadata'}), 500

        # Step 3: Generate a dynamic filename for the transcription
        print("Preparing transcription filename...")
        title = metadata.get("title", "Untitled_Video")
        sanitized_title = sanitize_filename(title)
        transcription_file_path = os.path.join(OUTPUT_TRANSCRIPT_DIR, f"{sanitized_title}_transcript.txt")

        # Step 4: Transcribe the audio
        # print("Transcribing audio...")
        # transcribe_with_whisper(audio_file, transcription_file_path)

        # Step 5: Read the transcription
        print("Reading transcription...")
        with open(transcription_file_path, "r") as file:
            transcription_text = file.read()

        # Step 6: Summarize the transcription and generate structured insights
        print("Generating podcast summary...")
        description = metadata.get("description", "No description provided.")
        structured_summary = summarize_transcription(transcription_text, title, description)

        # Output raw AI response for debugging
        print("Raw AI Response:", structured_summary)

        # # Temporarily return the raw summary to verify correctness
        # return jsonify({'raw_summary': structured_summary})

        # Step 7: Generate the newsletter
        print("Generating newsletter...")
        newsletter = generate_newsletter(metadata, structured_summary)

        # Step 8: Save the newsletter to a file
        print("Saving newsletter...")
        save_newsletter(newsletter, OUTPUT_NEWSLETTER_DIR)

        # Step 9: Provide response to the frontend
        return jsonify({
            'newsletter': newsletter,
            'transcript_file': transcription_file_path
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
