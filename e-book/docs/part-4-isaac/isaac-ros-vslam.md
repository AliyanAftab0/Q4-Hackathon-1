# 13. Isaac ROS & VSLAM

**Isaac ROS** is a collection of hardware-accelerated ROS 2 packages using NVIDIA CUDA and VPI.

## Visual SLAM (VSLAM)
Simultaneous Localization and Mapping using cameras.
- **Package**: `isaac_ros_visual_slam`.
- **Input**: Stereo Images (realsense) + IMU.
- **Output**: Robot Pose (`/tf`) + Map points.

```bash
ros2 launch isaac_ros_visual_slam isaac_ros_visual_slam.launch.py
```

## GEM (Gems for Robots)
Other key packages:
- **Nvblox**: GPU-accelerated 3D reconstruction/occupancy grids.
- **AprilTag**: Fast tag detection for fiducial markers.
