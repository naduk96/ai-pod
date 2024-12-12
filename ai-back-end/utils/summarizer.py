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
    Summarizes a podcast episode and generates actionable insights.

    Args:
        transcription_text (str): The full text of the transcription.
        title (str): The title of the podcast episode.
        description (str): The description of the podcast episode.

    Returns:
        dict: A structured dictionary containing story highlights, key takeaways, tools and resources, and opportunities to act.
    """
    messages = [
        {
            "role": "system",
            "content": (
                "You are a professional podcast summarizer and storyteller. Your role is to extract the most important insights "
                "and present them in an engaging and actionable way. Your tone should be concise and easy to understand but also personal "
                "(use names if given to you) and inspirational."
            ),
        },
        {
            "role": "user",
            "content": (
                f"Title: {title}\n\n"
                f"Description: {description}\n\n"
                f"Transcript: {transcription_text}\n\n"
                "Generate a structured summary with the following sections:\n"
                "1. **Story Highlights**: A brief overview of the key moments and narrative.\n"
                "2. **Key Takeaways**: 3-5 actionable points that entrepreneurs, creators, or professionals can implement.\n"
                "3. **Tools and Resources**: Specific tools, platforms, or methodologies mentioned, with brief explanations.\n"
                "4. **Opportunities to Act**: 2-3 steps or strategies inspired by the content for immediate application.\n"
            ),
        },
    ]

    # Make the API call to the OpenAI GPT model
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=1500,
        temperature=0.7,
    )

    response_content = completion.choices[0].message.content.strip()
    # print("Raw AI Response:", response_content)  # Log the raw response

    # Clean the response text
    cleaned_response = clean_text(response_content)
    # print("cleaned response:", cleaned_response)

     # Attempt to parse the sections from the cleaned response
    try:
        story_highlight_section = cleaned_response.split("Key Takeaways")[0].strip()
        key_takeaways_section = cleaned_response.split("Key Takeaways")[1].split("Tools and Resources")[0].strip()
        tools_and_resources_section = cleaned_response.split("Tools and Resources")[1].split("Opportunities to Act")[0].strip()
        opportunities_to_act_section = cleaned_response.split("Opportunities to Act")[1].strip()

        return (
            story_highlight_section,
            key_takeaways_section,
            tools_and_resources_section,
            opportunities_to_act_section,
        )
    except Exception as e:
        print(f"Error parsing AI response: {e}")

        return (
                "Unable to parse story highlights.",
                "No key takeaways found.",
                "No tools and resources provided.",
                "No opportunities to actprovided.",
        )

