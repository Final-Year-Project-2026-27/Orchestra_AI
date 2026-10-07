import re

INJECTION_PATTERNS = [
    r"ignore\s+(?:[a-z]+\s+){0,3}instructions",
    r"disregard\s+(?:[a-z]+\s+){0,3}instructions",
    r"you are now (a|an)?\s*\w*",
    r"new system prompt",
    r"act as (an?|the)\s+\w+",
    r"new instructions\s*:",
    r"</?(system|instructions|prompt)>",
]

def sanitize_content(text: str) -> tuple[str, int]:
    """
    Splits text into sentences. Any sentence containing an injection attempt
    is dropped ENTIRELY — not replaced with a marker — so the remaining text
    reads as one clean, grammatically normal passage.

    Returns (cleaned_text, removed_count) — removed_count is for logging/
    auditing separately, kept OUT of the actual content sent to the LLM.
    """
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    kept_sentences = []
    removed_count = 0

    for sentence in sentences:
        if not sentence.strip():
            continue

        is_suspicious = any(
            re.search(pattern, sentence, flags=re.IGNORECASE)
            for pattern in INJECTION_PATTERNS
        )

        if is_suspicious:
            removed_count += 1
        else:
            kept_sentences.append(sentence)

    return " ".join(kept_sentences), removed_count


def wrap_as_untrusted(text: str, source: str) -> str:
    return f'<untrusted_source url="{source}">\n{text}\n</untrusted_source>'