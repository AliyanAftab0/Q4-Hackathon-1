# 08. Introduction to Gazebo

Gazebo is a powerful 3D dynamic simulator. It simulates:
- **Physics**: Gravity, friction, collisions (ODE, Bullet, Dart).
- **Sensors**: Lidar, Camera, IMU (with noise models).
- **Interfaces**: Standard ROS 2 integration (`ros_gz_bridge`).

## Gazebo Harmonic
We focus on **Gazebo Harmonic**, the modern Ignition-based simulator.

### Running Gazebo
```bash
ros2 launch ros_gz_sim gz_sim.launch.py gz_args:="-r empty.sdf"
```

This launches an empty world. You can spawn your URDF robot into it.
