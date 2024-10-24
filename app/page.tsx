"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

const backgrounds = [
  { color: 'bg-red-500', image: '/images/BackgroundImage1.jpg' },
  { color: 'bg-green-500', image: '/images/2.jpg' },
  { color: 'bg-blue-500', image: '/images/3.jpg' },
];

const navItems = [
  [
    { text: "Discord", link: "https://discord.com/users/645568639793102868" },
    { text: "Instagram", link: "https://instagram.com/xpizzza" },
    { text: "Twitter", link: "https://twitter.com/xpizzer" },
  ],
  [
    { text: "Discover", link: "#" },
    { text: "Services", link: "#" },
    { text: "Connect", link: "#" },
  ],
  [
    { text: "Gallery", link: "#" },
    { text: "Projects", link: "#" },
  ],
];

const NavItem: React.FC<{ text: string; link: string; disabled: boolean }> = ({ text, link, disabled }) => {
  if (disabled) {
    return (
      <span className="text-white font-bold text-lg font-orbitron opacity-50 px-4 py-2">
        {text}
      </span>
    );
  }

  return (
    <motion.a
      href={link}
      className="text-white font-bold text-lg font-orbitron relative overflow-hidden px-4 py-2"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.span
        className="relative z-10"
        variants={{
          hover: { y: -2 },
          tap: { scale: 0.95 }
        }}
      >
        {text}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1, originX: 0 },
          tap: { scaleY: 0.5, originY: 1 }
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1, originX: 1 },
          tap: { scaleY: 0.5, originY: 0 }
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ zIndex: 1 }}
      />
    </motion.a>
  );
};

const Home: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform for background movement (opposite direction, 50% strength)
  const bgX = useTransform(mouseX, [-30, 30], [15, -15]);
  const bgY = useTransform(mouseY, [-30, 30], [15, -15]);

  const nextBg = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBg = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const moveXRatio = (clientX / window.innerWidth - 0.5) * 30;
      const moveYRatio = (clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(moveXRatio);
      mouseY.set(moveYRatio);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen overflow-hidden relative bg-black">
      <AnimatePresence initial={false}>
      <motion.div
  key={currentBg}
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.5 }}
  className="absolute inset-0"
  style={{
    x: bgX,
    y: bgY,
    filter: currentBg === 0 ? 'blur(3px)' : 'blur(3px) brightness(0.3)', // Darker for 2nd and 3rd backgrounds
  }}
>
  <Image
    src={backgrounds[currentBg].image}
    layout="fill"
    objectFit="cover"
    alt={`Background ${currentBg + 1}`}
    priority
  />
</motion.div>

      </AnimatePresence>

      <div className="relative flex flex-col min-h-screen">
        <div className="fixed inset-0 border-[22px] border-black pointer-events-none z-20"></div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBg}
              className="max-w-7xl mx-auto flex justify-center space-x-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {navItems[currentBg].map((item, index) => (
                <NavItem key={index} text={item.text} link={item.link} disabled={currentBg !== 0} />
              ))}
            </motion.div>
          </AnimatePresence>
        </nav>

        {/* Coming Soon Text */}
        {currentBg !== 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <h2 className="text-white text-6xl font-bold font-orbitron">Coming Soon</h2>
          </div>
        )}

<div className="absolute inset-0 z-50 flex items-center justify-between px-8 pointer-events-none">
  <motion.button
    onClick={prevBg}
    className="text-white text-4xl focus:outline-none relative w-16 h-16 flex items-center justify-center pointer-events-auto"
    aria-label="Previous background"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="relative z-10">&#8592;</span>
    <motion.div
      className="absolute inset-0 bg-white rounded-full opacity-20"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1.5, opacity: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </motion.button>
  <motion.button
    onClick={nextBg}
    className="text-white text-4xl focus:outline-none relative w-16 h-16 flex items-center justify-center pointer-events-auto"
    aria-label="Next background"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="relative z-10">&#8594;</span>
    <motion.div
      className="absolute inset-0 bg-white rounded-full opacity-20"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1.5, opacity: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </motion.button>
</div>


        <footer className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-5 z-40 flex flex-col items-center backdrop-blur-md">
          <div className="w-full z-10">
            <div className="bg-white bg-opacity-20 h-[1px] w-full" />
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center pt-2">
            <p className="font-orbitron font-bold text-center md:text-left text-[25px] md:text-[24px] pl-4 md:pl-0 md:ml-[22px]">
              overwhelming.world
            </p>

            <p className="font-orbitron text-gray-400 text-center md:text-right text-[14px] pr-4 md:pr-0 md:mr-[22px]">
              Do you truly believe what you see is real?
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;