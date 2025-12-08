# 21. Whisper & Voice

To interact naturally, robots need ears.

## OpenAI Whisper / Distil-Whisper
State-of-the-art Speech-to-Text (STT).
- Robust to noise (fans, motors).
- Multilingual.

## The Pipeline
1.  **User**: "Hand me the wrench."
2.  **Whisper**: Transcribes audio to text.
3.  **LLM Router**: Decides if this is a question (RAG) or a command (VLA).
4.  **Action**: Robot executes.
