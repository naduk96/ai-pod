import json
import os
import re

def sanitize_filename(filename):
    """
    Sanitizes a string to make it a valid filename.

    Args:
        filename (str): The input filename string.

    Returns:
        str: A sanitized filename.
    """
    return re.sub(r'[^a-zA-Z0-9_\-]', '', filename.replace(' ', '_'))

def generate_newsletter(metadata, structured_summary):
    """
    Generates a structured newsletter.

    Args:
        metadata (dict): Video metadata.
        structured_summary (dict): Parsed sections from the podcast summary.

    Returns:
        dict: A structured newsletter as JSON.
    """
    return {
        "title": metadata.get("title", "Untitled Video"),
        "channel": metadata.get("channel", "Unknown Channel"),
        "duration": f"{metadata.get('duration', 0) // 60} minutes",
        "storyHighlights": structured_summary.get("storyHighlights", "No story highlights available."),
        "keyTakeaways": structured_summary.get("keyTakeaways", "No key takeaways found."),
        "toolsAndResources": structured_summary.get("toolsAndResources", "No tools or resources found."),
        "opportunitiesToAct": structured_summary.get("opportunitiesToAct", "No opportunities to act provided."),
        "link": metadata.get("url", "#"),
    }

def save_newsletter(newsletter_content, output_dir):
    """
    Saves the newsletter to a uniquely named file based on its title.

    Args:
        newsletter_content (dict): The content of the newsletter as a dictionary.
        output_dir (str): The directory path to save the newsletter.
    """
    try:
        # Ensure the output directory exists
        os.makedirs(output_dir, exist_ok=True)

        # Use the sanitized title as the filename
        title = newsletter_content.get("title", "Untitled_Newsletter")
        sanitized_title = sanitize_filename(title)
        filename = f"{sanitized_title}.json"
        output_path = os.path.join(output_dir, filename)

        # Save the newsletter to the file
        with open(output_path, "w") as file:
            file.write(json.dumps(newsletter_content, indent=4))
        print(f"Newsletter saved to {output_path}")
    except Exception as e:
        print(f"Error saving newsletter: {e}")
