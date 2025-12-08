# 20. Vision-Language-Action (VLA)

VLA models are the "Brain" of the new era. They combine:
1.  **Vision Encoder** (SigLIP/CLIP): To see.
2.  **LLM** (Gemini/Llama): To reason.
3.  **Action Head**: To output robot tokens.

## Google RT-1 & RT-2
The **Robotic Transformer**.
- **Input**: Image + Command ("Pick up the coke").
- **Output**: Discrete actions (x, y, z, gripper).

## OpenVLA
An open-source VLA model fine-tuned on the Open X-Embodiment dataset.
