# 15. Humanoid Kinematics

Humanoids are **floating-base** systems. Unlike an industrial arm bolted to a table, a humanoid is not attached to the world.

## Degrees of Freedom (DoF)
A typical humanoid has 20-40 actuators.
- **Legs**: 6 DoF each (Hip x3, Knee x1, Ankle x2).
- **Arms**: 4-7 DoF each.
- **Torso/Head**: 2-3 DoF.

## The Floating Base
We treat the Pelvis as the "Base Link", but it has 6 unactuated degrees of freedom (x, y, z, roll, pitch, yaw) relative to the world frame.

## Contact constraints
We move by pushing against the ground. The **Zero Moment Point (ZMP)** must stay within the support polygon (the feet area) for static stability.
