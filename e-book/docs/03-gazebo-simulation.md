---
title: Gazebo Simulation
---

# Gazebo Simulation

Simulation is critical for Physical AI. Training on real hardware is slow and dangerous.

## Classic vs Ignition

We will use **Gazebo Ignition** (Fortress/Garden) for modern simulation capabilities.

## Creating a World

```xml
<sdf version="1.6">
  <world name="default">
    <include>
      <uri>model://sun</uri>
    </include>
  </world>
</sdf>
```
