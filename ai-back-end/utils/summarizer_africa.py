import re
from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI()

def clean_text(response_text):
    """
    Cleans AI response text by removing excessive Markdown formatting.

    Args:
        response_text (str): The raw response from the AI.

    Returns:
        str: The cleaned response.
    """
    # Remove Markdown headings (e.g., ###, ####)
    cleaned_text = re.sub(r"#+\s*", "", response_text)
    # Remove excessive asterisks used for bold/italics
    cleaned_text = re.sub(r"\*+", "", cleaned_text)
    # Remove excessive dashes
    cleaned_text = re.sub(r"-{2,}", "", cleaned_text)
    # Strip extra whitespace
    return cleaned_text.strip()

def summarize_transcription(transcription_text, title, description):
    """
    Summarizes the transcription and generates actionable key takeaways using OpenAI GPT.

    Args:
        transcription_text (str): The full text of the transcription.
        title (str): The title of the YouTube video.
        description (str): The description of the YouTube video.

    Returns:
        tuple: A tuple containing the story summary, key actionable takeaways, Africa-specific innovations, 
        and next steps for innovators.
    """
    # Prepare the messages parameter for ChatCompletion
    messages = [
    {
        "role": "system",
        "content": (
            "You are a storyteller who crafts beautifully concise and effective narratives, "
            "making sure to sound sensational but inspirational, personal (use names if given to you), "
            "and professional. Always write in a way that is easy to understand, even for readers with "
            "basic knowledge of technology and business."
        ),
    },
    {
        "role": "user",
        "content": (
            f"Title: {title}\n\n"
            f"Description: {description}\n\n"
            f"Transcript: {transcription_text}\n\n"
            "Write a newsletter with the following structure:\n\n"
            "1. **Story Highlights:**\n"
            "   - Create a concise and compelling summary of the story based on the title, description, and transcript.\n\n"
            "2. **Key Takeaways:**\n"
            "   - Provide 3-5 actionable points tailored for entrepreneurs, business professionals, or creators. "
            "Make sure each point is practical and tied to the story.\n\n"
            "3. **Africa-Specific Innovation:**\n"
                " Suggest how this story or innovation could be adapted for Africa with the following considerations:\n"
                    " - Identify cultural or economic nuances like consumer preferences, affordability trends, or unique buying habits.\n"
                    " - Highlight opportunities for leapfrogging current technologies or processes.\n"
                    " - Address specific challenges in Africa, such as access to capital, infrastructural gaps, or varying levels of education.\n"
                    " - Consider the widespread adoption of smartphones and how data accessibility can unlock innovation.\n"
                    " - Provide concrete examples of industries or demographics that could benefit, detailing how the innovation could be localized for impact."
            "4. **Next Steps for Innovators:**\n"
            "   - Offer 2-3 specific actions or a roadmap readers can take to implement these insights practically. Focus on simple, achievable steps."
        ),
    },
    ]

    # Make the API call to the OpenAI GPT model
    completion = client.chat.completions.create(
        model="gpt-4o-mini",  # Ensure the model name is correct
        messages=messages,
        max_tokens=1000,  # Limit to ensure concise output
        temperature=0.7,  # Adjust for creativity; 0.7 is a balanced value
    )

    # Extract the response
    full_response = completion.choices[0].message.content.strip()

    # Clean the response text
    cleaned_response = clean_text(full_response)

    # Attempt to parse the sections from the cleaned response
    try:
        story_summary = cleaned_response.split("Key Takeaways:")[0].strip()
        key_takeaways_section = cleaned_response.split("Key Takeaways:")[1].split("Africa-Specific Innovation:")[0].strip()
        africa_innovation_section = cleaned_response.split("Africa-Specific Innovation:")[1].split("Next Steps for Innovators:")[0].strip()
        next_steps_section = cleaned_response.split("Next Steps for Innovators:")[1].strip()

        return (
            story_summary,
            key_takeaways_section,
            africa_innovation_section,
            next_steps_section,
        )
    except Exception as e:
        print(f"Error parsing AI response: {e}")
        return (
            "Unable to parse story summary.",
            "No key takeaways found.",
            "No Africa-specific innovations provided.",
            "No next steps provided.",
        )
