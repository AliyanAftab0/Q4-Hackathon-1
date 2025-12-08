# 10. Unity Integration

For photorealistic simulation, we use **Unity**.

## Unity Robotics Hub
Unity provides the **URDF Importer** and **ROS-TCP-Connector** to bridge Unity High Definition Render Pipeline (HDRP) with ROS 2.

### Why Unity?
- **Graphics**: Superior lighting for Vision training.
- **VR**: Human-in-the-loop teleoperation.
- **Assets**: Massive library of 3D environments.

We use the `ROS-TCP-Endpoint` node on the ROS side to serialize messages to Unity over a standard TCP socket.
