# 05. Nodes, Topics, & Services

## Nodes: The Workers
A node is a process that performs computation. A generic robot system might have:
- `camera_driver` node
- `path_planner` node
- `motor_controller` node

## Topics: Streaming Data
Topics are named buses for data exchange. They use **Publish/Subscribe**.

```python
# Publisher Example
class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World'
        self.publisher_.publish(msg)
```

## Services: RPC
Services are synchronous. A Client sends a Request, and waits for a Response.
- **Use Case**: `reset_odometry`, `calibrate_sensor`.
