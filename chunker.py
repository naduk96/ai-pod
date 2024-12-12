import tiktoken

def split_into_chunks(text, max_tokens=1500, overlap=100):
    """
    Splits the text into chunks of approximately `max_tokens` length, with overlap.

    Args:
        text (str): The input text to be chunked.
        max_tokens (int): The maximum number of tokens per chunk.
        overlap (int): The number of overlapping tokens for context.

    Returns:
        list: A list of text chunks.
    """
    tokenizer = tiktoken.get_encoding("cl100k_base")  # Adjust based on model
    tokens = tokenizer.encode(text)
    chunks = []

    for i in range(0, len(tokens), max_tokens - overlap):
        chunk_tokens = tokens[i:i + max_tokens]
        chunks.append(tokenizer.decode(chunk_tokens))

    return chunks