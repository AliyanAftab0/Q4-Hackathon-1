---
sidebar_position: 1
---

# Introduction to Physical AI

**Physical AI (PAI)** represents the convergence of artificial intelligence, robotics, and physical simulation. Unlike "Software AI" which lives on servers (like ChatGPT), Physical AI must perceive, reason, and act in the tangible world.

In this textbook, we explore the end-to-end stack for building **Autonomous Humanoid Robots**.

## What You Will Learn
1.  **Foundations**: Sensors, Actuators, and the Math of movement.
2.  **ROS 2**: The operating system of robotics.
3.  **Simulation**: Training robots in **Gazebo** and **NVIDIA Isaac Sim** before reality.
4.  **Control**: Bipedal locomotion and whole-body control.
5.  **Perception**: VSLAM, Object Detection, and Semantic Understanding.
6.  **Agentic AI**: Using **Vision-Language-Action (VLA)** models to give robots common sense.

## The Shift to "AI Native" Robotics
Traditional robotics relies on hard-coded state machines. **AI Native** robotics replaces these with learned policies and Large Language Models (LLMs) that can plan:

> "Pick up the apple" -> *Planner Agents* -> *Visual Servoing* -> *Motor Control*

## Prerequisites
- **Hardware**: NVIDIA RTX GPU recommended for Isaac Sim.
- **Software**: Python, Docker, Ubuntu (or WSL2).
- **Math**: Linear Algebra, Calculus (Basics).

Let's begin our journey into the body of the machine.
