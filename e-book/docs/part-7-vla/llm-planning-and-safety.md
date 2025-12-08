# 22. LLM Planning & Safety

## Chain of Thought (CoT)
LLMs are great high-level planners.
> Command: "Clean the kitchen."
> Plan:
> 1. Find trash on floor.
> 2. Navigate to trash.
> 3. Pick up trash.
> 4. Navigate to bin.
> 5. Drop trash.

## Safety Guardrails
We cannot let an LLM directly control torque.
- **LLM Output**: High-level goal ("Move to x=10").
- **MPC Controller**: Checks safety (Is x=10 valid? Is trajectory collision-free?).
- **Hardware**: Emergency Stop.
