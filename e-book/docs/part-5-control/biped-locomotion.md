# 17. Biped Locomotion

Walking is "controlled falling".

## The Inverted Pendulum Model
We approximate the robot as an **Linear Inverted Pendulum (LIP)**.
- **CoM** moves at constant height.
- **ZMP (Zero Moment Point)** tracks the center of pressure.

## Reinforcement Learning (RL) for Locomotion
Classical control is robust but hard to tune. **Deep RL** (PPO) is the new standard.
- **Sim-to-Real**: Train in Isaac Sim with randomized terrain.
- **Observation**: Joint positions, velocities, IMU.
- **Action**: Target joint angles (PD setpoints).

> "The robot learns to walk by trying millions of times in simulation."
