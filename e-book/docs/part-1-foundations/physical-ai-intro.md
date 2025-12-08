# 01. Physical AI Intro

Physical AI is the discipline of creating intelligent agents that can perform tasks in the physical world.

## The Loop: Sense-Think-Act
All robotic systems follow this fundamental loop:

1.  **Sense**: Gather data from Lidar, Cameras, IMUs.
2.  **Think**: Process data using SLAM, Computer Vision, and Planning Algorithms.
3.  **Act**: Send commands to motors/actuators.

```python
# A simple conceptual loop
def robot_loop():
    while True:
        sensor_data = get_sensors()
        state = state_estimator(sensor_data)
        action = policy_network(state)
        apply_torque(action)
```

## Why Humanoids?
Humanoid robots are designed to operate in environments built for humans (stairs, doors, tools).

### Challenges
- **Balance**: High center of mass.
- **Complexity**: High degrees of freedom (DoF).
- **Power**: High energy consumption.
