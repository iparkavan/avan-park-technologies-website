// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";

// export default function Hero() {
//   const { scrollY } = useScroll();

//   // Move slower than scroll (parallax effect)
//   const y = useTransform(scrollY, [0, 500], [0, 150]);

//   return (
//     <section className="h-screen flex items-center justify-center bg-black text-white overflow-hidden">
//       {/* Background Layer */}
//       <motion.div
//         style={{ y }}
//         className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-40"
//       />

//       {/* Content */}
//       <div className="relative z-10 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-5xl font-bold"
//         >
//           Build Your Future with Us
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-4 text-lg"
//         >
//           We create powerful digital experiences
//         </motion.p>
//       </div>
//     </section>
//   );
// }
