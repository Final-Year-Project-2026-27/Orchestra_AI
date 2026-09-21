from pypdf import PdfReader
from pathlib import Path

def load_document(filepath: str) -> str:
    """Reads a PDF or text file and returns raw text."""
    if filepath.endswith(".pdf"):
        reader = PdfReader(filepath)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    elif filepath.endswith(".txt"):
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    else:
        raise ValueError(f"Unsupported file type: {filepath}")


def load_documents(directory: str) -> list[tuple[Path, str]]:
    """Loads supported files directly inside one directory, without recursion."""
    input_dir = Path(directory)
    if not input_dir.is_dir():
        raise NotADirectoryError(f"Input directory does not exist: {directory}")

    return [
        (path, load_document(str(path)))
        for path in sorted(input_dir.iterdir())
        if path.is_file() and path.suffix.lower() in {".pdf", ".txt"}
    ]