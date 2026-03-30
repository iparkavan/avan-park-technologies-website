"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CardType = {
  type: "text" | "team" | "image" | "textLarge" | "textLight";
  title?: string;
  subtitle?: string;
  desc?: string;
  src?: string;
  className?: string;
  speed: number;
};

type Props = {
  card: CardType;
  scrollYProgress: MotionValue<number>;
};

export const ParallaxCard = ({ card, scrollYProgress }: Props) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -card.speed]);

  return (
    <motion.div style={{ y }} whileHover={{ scale: 1.04 }}>
      <Card
        className={`h-full border-none rounded-3xl overflow-hidden ${card.className}`}
      >
        {card.type === "image" ? (
          <img
            src={card.src}
            alt="card"
            className="w-full h-full object-cover"
          />
        ) : (
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h2
                className={`font-bold ${
                  card.type === "team" ? "text-5xl" : "text-3xl"
                }`}
              >
                {card.title}
              </h2>

              {card.subtitle && <p className="text-lg mt-1">{card.subtitle}</p>}
            </div>

            <div>
              {card.desc && (
                <p
                  className={`text-sm mt-4 ${
                    card.type === "textLight"
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {card.desc}
                </p>
              )}

              {card.type === "team" && (
                <Button className="mt-4 bg-white text-black rounded-full px-6">
                  Know More
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};
