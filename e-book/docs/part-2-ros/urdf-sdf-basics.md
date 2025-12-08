# 07. URDF & SDF Basics

To simulate a robot, we must define its body.

## URDF (Unified Robot Description Format)
XML format used by ROS to describe robot kinematics (Links and Joints).

```xml
<robot name="simple_arm">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
  </link>
  
  <joint name="joint1" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>
</robot>
```

## SDF (Simulation Description Format)
Used by **Gazebo**. Supports simpler collisions, world environments, and more physics parameters than URDF. ROS 2 usually converts URDF to SDF at runtime for Gazebo.
