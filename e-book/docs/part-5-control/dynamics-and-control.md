# 16. Dynamics & Control

## Whole Body Control (WBC)
Modern humanoids use **WBC**.
Instead of controlling each joint individually, we define **Tasks** in Cartesian space.
1.  **Task 1**: Keep feet flat on ground (Priority 1).
2.  **Task 2**: Keep Center of Mass (CoM) over feet (Priority 2).
3.  **Task 3**: Move hand to target (Priority 3).

## QP Solvers
We solve this optimization problem at 1kHz using a Quadratic Programming (QP) solver.

$$
\min_x \frac{1}{2} x^T Q x + c^T x
$$
Subject to constraints (Torque limits, friction cones).

## MPC (Model Predictive Control)
While WBC handles the *now*, MPC looks into the future (e.g., 1 second). It plans footstep locations to maintain balance while walking.
