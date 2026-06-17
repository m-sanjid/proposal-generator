"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBrandX,
} from "@tabler/icons-react";
import IconHover from "./ui/icon-hover";
import { cn } from "@/lib/utils";

export const SocialLinks = ({ className }: { className?: string }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className={cn("flex items-center space-x-2 sm:space-x-3", className)}
      aria-label="Social media links"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/icon relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHovered(social.label)}
          aria-label={`Visit ${social.label} profile`}
        >
          <IconHover icon={social.icon} size={6} />

          <AnimatePresence>
            {hovered === social.label && (
              <motion.div
                layoutId="tooltip"
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 bg-black px-2 py-1 text-xs whitespace-nowrap rounded-md text-white shadow-lg dark:bg-white dark:text-black"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {social.label}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      ))}
    </nav>
  );
};



export const socialLinks = [
  {
    href: "https://github.com/m-sanjid",
    icon: IconBrandGithub,
    label: "GitHub",
  },
  {
    href: "https://x.com/dev_sanjid",
    icon: IconBrandX,
    label: "X (Twitter)",
  },
  {
    href: "https://www.linkedin.com/in/muhammedsanjid1/",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:contact@sanjid.in",
    icon: IconMail,
    label: "Email",
  },
];
