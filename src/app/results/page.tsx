"use client";

import React from "react";
import { LineChart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResultsPage() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-panel rounded-[3rem] p-12 md:p-16 shadow-sm border border-border-subtle flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-accent-blue/10 rounded-full flex items-center justify-center mb-6">
          <LineChart className="w-12 h-12 text-accent-blue" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-text-strong mb-4">
          My Results - Coming Soon
        </h1>
        
        <p className="text-text-muted mb-8 leading-relaxed max-w-md">
          Halaman ini sedang dalam tahap pengembangan. Nantinya, Anda dapat melihat riwayat lengkap asesmen, analisis tren skor, dan perbandingan kompetensi di sini.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-text-strong text-background rounded-full font-semibold hover:bg-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
