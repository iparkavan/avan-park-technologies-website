"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overview() {
  const ref = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start 100%", "start 0%"],
    // 👆 animation happens within viewport entry
  });

  // Fast + visible expansion within 100vh
  const margin = useTransform(scrollYProgress, [0, 1], [50, 0]);
  //   const { scrollY } = useScroll();

  //   // Animate margin from 20px → 0px
  //   const margin = useTransform(scrollY, [30, 300], [50, 50]);

  //   // Optional: smooth border radius shrink
  const radius = useTransform(scrollY, [0, 300], [24, 24]);
  return (
    <motion.section
      //   style={{
      //     marginLeft: margin,
      //     marginRight: margin,
      //     borderRadius: radius,
      //   }}
      ref={ref}
      style={{
        marginLeft: margin,
        marginRight: margin,
        borderRadius: radius,
      }}
      className="bg-secondary rounded-t-3xl h-screen px-6 py-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-semibold tracking-tight"
        >
          Overview
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          We don’t just build products — we craft digital experiences that
          deliver impact, clarity, and growth.
        </motion.p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">Strategy</h3>
            <p className="text-muted-foreground">
              Clear product thinking and structured planning to build what truly
              matters.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">Design</h3>
            <p className="text-muted-foreground">
              Clean, modern UI/UX focused on usability and conversion.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">Development</h3>
            <p className="text-muted-foreground">
              Scalable, high-performance web apps built with modern tech.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
