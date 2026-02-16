"use client"

import { motion } from "framer-motion";
import { Pencil, Users, Download, Zap } from "lucide-react";

const features = [
  {
    icon: Pencil,
    title: "Hand-drawn feel",
    description:
      "Every shape you draw looks like it was sketched by hand. No sterile, robotic lines here.",
  },
  {
    icon: Users,
    title: "Real-time collaboration",
    description:
      "Invite your team with a single link. See cursors, edits, and ideas appear instantly.",
  },
  {
    icon: Download,
    title: "Export anywhere",
    description:
      "Save your work as PNG, SVG, or share a live link. Your drawings go wherever you need them.",
  },
  {
    icon: Zap,
    title: "Zero friction",
    description:
      "No sign-up required. Open the app and start drawing in under a second.",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            Why people love Drawme
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Simple tools that get out of your way so you can focus on what matters — your ideas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
