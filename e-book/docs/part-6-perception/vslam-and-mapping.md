# 19. VSLAM & Mapping

## SLAM
**Simultaneous Localization And Mapping**.
- **Localization**: Where am I?
- **Mapping**: What does the world look like?

## Visual SLAM (ORB-SLAM3)
Uses feature points (corners, edges) to track movement.
- **Loop Closure**: Recognizing a place you've been before to correct drift.

## Octomap
Representing the world as 3D Voxels (Minecraft-like blocks). Efficient for collision checking.
