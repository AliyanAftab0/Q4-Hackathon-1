# 11. Digital Twin Workflows

A **Digital Twin** is a virtual replica of your physical robot, synchronized in real-time.

## The Workflow
1.  **Scan**: Use Lidar/Photogrammetry to scan the real environment (e.g., a Warehouse).
2.  **Import**: Bring the mesh into Isaac Sim or Gazebo.
3.  **Sync**: Connect the real robot's joint states to the simulation (shadow mode).
4.  **Predict**: Run Monte Carlo simulations to predict collisions before they happen.

## USD (Universal Scene Description)
NVIDIA Isaac Sim relies on **USD**. It is the "HTML of 3D worlds"—a powerful, layered format for assembling complex scenes.
