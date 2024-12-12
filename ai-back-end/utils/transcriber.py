import whisper

def transcribe_with_whisper(audio_path, output_path):
    # Load the Whisper model
    model = whisper.load_model("base")
    print("Whisper model loaded successfully!")

    
    # Transcribe the audio
    print(f"Transcribing: {audio_path}")
    result = model.transcribe(audio_path)
    
    # Save the transcription to a file
    with open(output_path, "w") as f:
        f.write(result["text"])
    
    print(f"Transcription saved to: {output_path}")