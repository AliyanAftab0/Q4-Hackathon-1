import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { Brain, Bot, ChevronRight, Terminal, Cpu, Layers } from 'lucide-react';
import GeminiChatbot from '../components/GeminiChatbot';

function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white pt-16">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#fbbf24]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            Next-Gen Robotics Learning
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Master <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Physical AI</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            The comprehensive guide to building autonomous humanoid robots using <span className="text-white font-medium">ROS 2</span>, <span className="text-white font-medium">Isaac Sim</span>, and <span className="text-white font-medium">Agentic LLMs</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/docs/intro" className="group relative px-8 py-4 bg-[#fbbf24] text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">Start Reading <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link to="https://github.com/AliyanAftab0" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium text-lg rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              <Terminal size={20} />
              View Source
            </Link>
          </div>
        </motion.div>

        {/* Right: Visual/3D Element Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900 to-black rounded-[3rem] border border-white/10 shadow-2xl p-2 flex items-center justify-center overflow-hidden group">
            {/* Simulated 'Hologram' effect */}
            <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20" />
            <div className="relative z-10 w-[80%] h-[80%] bg-gradient-to-tr from-yellow-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <img
              src="/img/robot-arm-concept.png"
              alt="Robot"
              className="relative z-20 w-full h-full object-contain mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-[2s]"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800";
                e.currentTarget.className = "relative z-20 w-full h-full object-cover opacity-80 rounded-2xl";
              }}
            />

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 z-30 bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <Brain className="text-purple-400" size={24} />
              <div>
                <div className="text-xs text-gray-400">Model</div>
                <div className="text-sm font-bold">Gemini 2.5 flash</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-10 z-30 bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <Cpu className="text-yellow-400" size={24} />
              <div>
                <div className="text-xs text-gray-400">Processor</div>
                <div className="text-sm font-bold">NVIDIA Jetson</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-yellow-500/30 hover:bg-white/10 transition-all group"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon size={24} className="text-white group-hover:text-yellow-400 transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}

function Features() {
  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Full-Stack Robotics <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Curriculum</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">From mathematical foundations to deploying Vision-Language-Action models on real hardware.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Layers}
            title="Simulation First"
            desc="Master Gazebo and Isaac Sim to train robust policies before touching real hardware."
            delay={0.1}
          />
          <FeatureCard
            icon={Brain}
            title="Agentic AI"
            desc="Integrate LLMs like Gemini for high-level planning and reasoning in robotic loops."
            delay={0.2}
          />
          <FeatureCard
            icon={Bot}
            title="Sim2Real"
            desc="Deploy your trained models to physical humanoid robots with minimal friction."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="The Future of Embodied Intelligence">
      <main className="font-poppins bg-[#050505] min-h-screen">
        <Hero />
        <Features />
        {/* Global Chatbot */}
        <GeminiChatbot />
      </main>
    </Layout>
  );
}


