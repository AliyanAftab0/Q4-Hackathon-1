# 04. ROS 2 Architecture

The Robot Operating System (ROS 2) is the industry standard for robotics middleware.

## DDS: The Backbone
ROS 2 is built on top of **DDS (Data Distribution Service)**. This allows for:
- **Real-time**: Deterministic data delivery.
- **Security**: Authentication and Encryption (SROS).
- **Decentralization**: No "Master Node" implies single point of failure is removed.

## The Graph
A ROS 2 system is a graph of **Nodes** communicating via:
1.  **Topics** (Publish/Subscribe) - Streaming data (Lidar, Camera).
2.  **Services** (Request/Response) - Direct actions (Reset Odom).
3.  **Actions** (Goal/Feedback/Result) - Long running tasks (Go to Goal).

### Micro-ROS
For microcontrollers (ESP32, Teensy), **micro-ROS** brings ROS 2 semantics to embedded devices.
