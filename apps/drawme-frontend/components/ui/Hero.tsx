"use client"
import { motion } from "framer-motion";
import heroSketch from '../../public/assets/heroImage.png'
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useRouter } from "next/navigation";
import LoadingUI from "./LoadingUI";
import { UserContext } from "../../context/UserContext";

const Hero = () => {
  const context = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const navigate = useRouter();
  if (!context || !userContext) return;

  const { setPanelState } = context;
  const { login, IsAuthUser } = userContext;

  useEffect(() => {
    IsAuthUser();
  }, [])

  // if (true) <LoadingUI />
  // console.log(login);

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              Free & open source
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-3xl font-display text-5xl leading-tight tracking-tight text-foreground md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sketch your ideas,{" "}
            <span className="text-primary">together.</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Drawme is a virtual whiteboard for sketching hand-drawn like
            diagrams. Collaborate in real-time, no account needed.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-primary cursor-pointer border border-border bg-background px-6 py-3 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                (login) ? setPanelState(true) : navigate.push('/auth')
              }}
            >
              Start Drawing
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 overflow-hidden rounded-xl border border-border shadow-xl md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Image
            src={heroSketch}
            alt="Drawme canvas showing a collaborative whiteboard with hand-drawn diagrams"
            className="w-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
