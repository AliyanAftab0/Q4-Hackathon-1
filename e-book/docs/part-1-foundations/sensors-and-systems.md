# 02. Sensors & Systems

To interact with the world, a robot must feel it.

## Proprioception vs. Exteroception
- **Proprioception** (Internal): Knowing where your limbs are.
    - *Encoders*: Measure joint angles.
    - *IMU*: Measure acceleration/orientation.
- **Exteroception** (External): Knowing where the world is.
    - *Lidar*: Laser scanning for depth.
    - *Depth Cameras (RGB-D)*: Stereoscopic vision (e.g., RealSense).

## The Actuators
- **BLDC Motors**: Brushless DC motors for joints.
- **Harmonic Drives**: High gear reduction for torque.
- **Series Elastic Actuators (SEA)**: Springs for compliance/safety.

### Quiz
1. What sensor measures a robot's orientation? (IMU)
2. What allows a robot to "see" depth? (RGB-D / Lidar)
3. Why are BLDC motors preferred? (High efficiency/torque density)
