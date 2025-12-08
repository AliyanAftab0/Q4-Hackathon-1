
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Part 1: Foundations',
      collapsed: false,
      items: [
        'part-1-foundations/physical-ai-intro',
        'part-1-foundations/sensors-and-systems',
        'part-1-foundations/math-for-robotics',
      ],
    },
    {
      type: 'category',
      label: 'Part 2: ROS 2 Architecture',
      items: [
        'part-2-ros/ros2-architecture',
        'part-2-ros/ros2-nodes-topics-services',
        'part-2-ros/ros2-actions-and-launch',
        'part-2-ros/urdf-sdf-basics',
      ],
    },
    {
      type: 'category',
      label: 'Part 3: Simulation & Digital Twins',
      items: [
        'part-3-simulation/gazebo-intro',
        'part-3-simulation/gazebo-physics-sensors',
        'part-3-simulation/unity-integration',
        'part-3-simulation/digital-twin-workflows',
      ],
    },
    {
      type: 'category',
      label: 'Part 4: Isaac Sim & NVIDIA AI',
      items: [
        'part-4-isaac/isaac-sim-intro',
        'part-4-isaac/isaac-ros-vslam',
        'part-4-isaac/synthetic-data-and-sim2real',
      ],
    },
    {
      type: 'category',
      label: 'Part 5: Control & Locomotion',
      items: [
        'part-5-control/humanoid-kinematics',
        'part-5-control/dynamics-and-control',
        'part-5-control/biped-locomotion',
      ],
    },
    {
      type: 'category',
      label: 'Part 6: Perception & Vision',
      items: [
        'part-6-perception/computer-vision-for-robots',
        'part-6-perception/vslam-and-mapping',
      ],
    },
    {
      type: 'category',
      label: 'Part 7: VLA & Agentic AI',
      items: [
        'part-7-vla/vision-language-action-overview',
        'part-7-vla/whisper-and-voice-to-action',
        'part-7-vla/llm-planning-and-safety',
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      items: [
        'capstone/capstone-autonomous-humanoid',
        'capstone/capstone-appendix',
      ],
    },
  ],
};

export default sidebars;
