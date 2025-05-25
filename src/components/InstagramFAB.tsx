"use client";

import React from "react";
import { Instagram } from "lucide-react";

interface InstagramFABProps {
  instagramUrl: string;
}

export default function InstagramFAB({ instagramUrl }: InstagramFABProps) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="Instagram"
    >
      <Instagram size={24} className="text-white" />
    </a>
  );
}
