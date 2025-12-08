# 06. Actions & Launch

## Actions: Long-Running Tasks
For tasks that take time (e.g., "Navigate to Kitchen"), we use **Actions**.
- **Goal**: "Go to (x=5, y=5)".
- **Feedback**: "Distance remaining: 2.0m... 1.5m... 1.0m" (Streaming).
- **Result**: "Arrived" or "Failed (Blocked)".

## Launch System
Instead of running 50 terminals for 50 nodes, we use `.launch.py` files.

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_bringup',
            executable='driver_node',
            name='driver'
        ),
        Node(
            package='nav2_bringup',
            executable='planner_node',
            name='planner'
        )
    ])
```
