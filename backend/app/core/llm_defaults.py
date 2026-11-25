import google.generativeai as genai
from google.api_core import retry as gretry

_original = genai.GenerativeModel.generate_content

def _generate_with_limits(self, *args, **kwargs):
    kwargs.setdefault("request_options", {
        "retry": gretry.Retry(initial=1.0, maximum=8.0, multiplier=2.0, timeout=45.0),
        "timeout": 60,
    })
    return _original(self, *args, **kwargs)

genai.GenerativeModel.generate_content = _generate_with_limits