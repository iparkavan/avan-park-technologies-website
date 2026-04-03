"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Overview() {
  const ref = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start 100%", "start 0%"],
  });

  // Reduce margin on smaller screens via clamp-style transform
  // On mobile: start at 16px, on desktop: start at 60px → 0px
  const margin = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const radius = useTransform(scrollY, [0, 300], [24, 24]);

  return (
    <motion.section
      ref={ref}
      style={{
        marginLeft: margin,
        marginRight: margin,
        borderRadius: radius,
      }}
      className="bg-secondary rounded-t-3xl min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading Row — stacks vertically on mobile */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl text-primary font-display font-semibold font-indie underline tracking-tight shrink-0"
          >
            Overview
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground sm:max-w-xs md:max-w-sm lg:max-w-md sm:text-right"
          >
            We don't just build products — we craft digital experiences that
            deliver impact, clarity, and growth.
          </motion.p>
        </div>

        {/*
          Grid layout:
          - Mobile (default): 1 column, all cards stack
          - sm (640px+):       2 columns
          - lg (1024px+):      4 columns, 2 rows with row-span card
        */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-5 lg:gap-6">
          {/* Card 1 — Projects stat */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 sm:p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">
              100+ <br /> Projects
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Across Branding, Packaging, SEO, Product design and development!
            </p>
          </motion.div>

          {/* Card 2 — Team Members (accent card, row-span-2 only on lg) */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="lg:row-span-2 flex justify-between flex-col p-6 sm:p-8 rounded-2xl bg-linear-to-br from-black to-primary backdrop-blur-sm border border-border shadow-sm min-h-[260px] lg:min-h-0"
          >
            <h3 className="text-5xl sm:text-6xl text-secondary font-semibold">
              16 +
            </h3>

            <div className="space-y-3 sm:space-y-4 mt-6 lg:mt-0">
              <h4 className="text-xl sm:text-2xl text-secondary font-semibold">
                Team Members
              </h4>
              <p className="text-muted-foreground text-sm sm:text-base">
                A dynamic team of creatives shaping ideas into stunning
                realities
              </p>
              <Button>Know More</Button>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 sm:p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">Development</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Scalable, high-performance web apps built with modern tech.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="lg:row-span-2 flex justify-between flex-col p-6 bg-muted/40  sm:p-8 rounded-2xl backdrop-blur-sm border border-border shadow-sm min-h-[260px] lg:min-h-0"
          >
            <h3 className="text-5xl sm:text-6xl font-semibold">5M+</h3>

            <div className="space-y-3 sm:space-y-4 mt-6 lg:mt-0">
              <h4 className="text-xl sm:text-2xl font-semibold">Impressions</h4>
              <p className="text-muted-foreground text-sm sm:text-base">
                Generated 5M + impressions and over 3M + views in one year
              </p>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 sm:p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">Development</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Scalable, high-performance web apps built with modern tech.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 sm:p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">
              50+ <br /> Clients
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Clients Across Technology, Healthcare, Finance, and beyond
            </p>
          </motion.div>
        </div>
        <div className="mt-6 px-4 sm:px-6 py-6 sm:py-8 text-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0 bg-primary rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-24">
            <AvatarGroup>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>

            <h3 className="font-indie text-xl sm:text-2xl">About Us</h3>
          </div>

          <Button variant="secondary" className="sm:w-auto">
            Know More
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
