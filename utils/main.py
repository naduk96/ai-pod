from utils.downloader import download_audio_from_youtube, get_video_metadata
from utils.transcriber import transcribe_with_whisper
from utils.summarizer import summarize_transcription
from utils.newsletter import generate_newsletter, save_newsletter

# Paths
OUTPUT_AUDIO_DIR = "audio/"
OUTPUT_TRANSCRIPT_FILE = "output/transcript.txt"
OUTPUT_NEWSLETTER_FILE = "output/newsletter.txt"
YOUTUBE_URL = "https://www.youtube.com/watch?v=iBfQTnA2n2s&ab_channel=OpenAI"


if __name__ == "__main__":
    # Step 1: Download the audio from YouTube
    print("Downloading audio...")
    audio_file = download_audio_from_youtube(YOUTUBE_URL, OUTPUT_AUDIO_DIR)

    if not audio_file:
        print("Failed to download audio. Exiting.")
        exit()

    # Step 2: Extract video metadata
    print("Extracting video metadata...")
    metadata = get_video_metadata(YOUTUBE_URL)

    if not metadata:
        print("Failed to retrieve video metadata. Exiting.")
        exit()

    # Step 3: Transcribe the audio
    print("Transcribing audio...")
    transcribe_with_whisper(audio_file, OUTPUT_TRANSCRIPT_FILE)

    # Step 4: Read the transcription
    print("Reading transcription...")
    with open(OUTPUT_TRANSCRIPT_FILE, "r") as file:
        transcription_text = file.read()

    # Step 5: Summarize the transcription
    print("Summarizing transcription...")
    summary = summarize_transcription(transcription_text)
    print("Summary:\n", summary)

    # Step 6: Generate the newsletter
    print("Generating newsletter...")
    newsletter_content = generate_newsletter(metadata, summary)

    # Step 7: Save the newsletter to a file
    save_newsletter(newsletter_content, OUTPUT_NEWSLETTER_FILE)