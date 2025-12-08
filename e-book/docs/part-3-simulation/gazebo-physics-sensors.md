# 09. Gazebo Physics & Sensors

## Physics Engines
Gazebo supports multiple physics engines. For humanoids, **DART** is often preferred due to better handling of kinematic chains, though **Bullet** is faster.

## Adding Sensors
To give your robot eyes, add sensor plugins to your URDF/SDF.

```xml
<sensor name="camera" type="camera">
  <update_rate>30</update_rate>
  <camera>
    <horizontal_fov>1.047</horizontal_fov>
    <image>
      <width>800</width>
      <height>600</height>
    </image>
  </camera>
  <plugin filename="libapi_camera_plugin.so" name="camera_controller">
     <!-- ROS 2 remapping -->
  </plugin>
</sensor>
```
