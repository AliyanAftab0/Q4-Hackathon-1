# 03. Math for Robotics

Robotics is math in motion.

## Coordinate Frames & Transforms
We represent the position and orientation of objects using **Coordinate Frames**.
- **Translation**: $(x, y, z)$
- **Rotation**: Euler Angles $(\alpha, \beta, \gamma)$ or **Quaternions** $(x, y, z, w)$.

### Homogeneous Transformation Matrices
A $4 \times 4$ matrix combining rotation and translation:

$$
T = \begin{bmatrix}
R & P \\
0 & 1
\end{bmatrix}
$$

Where $R$ is a $3 \times 3$ rotation matrix and $P$ is a $3 \times 1$ position vector.

## Forward vs. Inverse Kinematics
- **Forward Kinematics (FK)**: Given joint angles -> Where is the hand?
    - *Easy (Matrix Multiplication)*
- **Inverse Kinematics (IK)**: I want the hand efficiently *here* -> What should the angles be?
    - *Hard (Optimization/Jacobians)*

```python
import numpy as np

# Simple 2D Rotation
theta = np.radians(45)
c, s = np.cos(theta), np.sin(theta)
R = np.array(((c, -s), (s, c)))
v = np.array((1, 0))
v_prime = R.dot(v)
print(f"Rotated Vector: {v_prime}")
```
