import { motion } from "framer-motion";
import { Brain, Eye, Sparkles } from "lucide-react";
const HeroVisual = ()=> {
  return (
    <div className="relative aspect-square">

      {/* Main glass card */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-[8%] rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-6"
      >

        {/* Image area */}

        <div className="relative h-[65%] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100">

          {/* Abstract skin visual */}

          <div className="absolute left-[22%] top-[16%] h-[55%] w-[56%] rotate-[-12deg] rounded-[45%] bg-gradient-to-br from-[#f8c6ad] via-[#edaa90] to-[#d88975] shadow-2xl shadow-orange-900/10" />

          <div className="absolute left-[40%] top-[38%] h-20 w-24 rounded-[45%] bg-red-400/40 blur-md" />

          <div className="absolute left-[46%] top-[43%] h-10 w-12 rounded-full bg-red-500/40 blur-sm" />

          {/* Scan line */}

          <motion.div
            animate={{
              top: ["5%", "90%", "5%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"
          />

          {/* Corner brackets */}

          <div className="absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-cyan-500" />
          <div className="absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-cyan-500" />
          <div className="absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-cyan-500" />
          <div className="absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-cyan-500" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700 backdrop-blur">
            AI scanning
          </div>
        </div>

        {/* Result card */}

        <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">

          <div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-bold text-slate-500">
                Assessment ready
              </span>
            </div>

            <div className="mt-2 h-3 w-36 rounded-full bg-slate-100" />

            <div className="mt-2 h-2 w-24 rounded-full bg-slate-100" />

          </div>

          <div className="rounded-xl bg-[#E6FFFB] p-3">
            <Brain className="h-5 w-5 text-[#0EA5A8]" />
          </div>

        </div>
      </motion.div>

      {/* Floating observation card */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-[20%] hidden w-44 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-cyan-50 p-2">
            <Eye className="h-4 w-4 text-cyan-600" />
          </div>

          <span className="text-xs font-bold text-slate-700">
            Observation
          </span>
        </div>

        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          Visible localized skin changes detected.
        </p>
      </motion.div>

      {/* Floating AI card */}

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[18%] left-0 hidden w-48 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-[#E6FFFB] p-2">
            <Sparkles className="h-4 w-4 text-[#0EA5A8]" />
          </div>

          <span className="text-xs font-bold">
            AI Insights
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-100" />
          <div className="h-2 w-[80%] rounded-full bg-slate-100" />
          <div className="h-2 w-[65%] rounded-full bg-slate-100" />
        </div>
      </motion.div>

    </div>
  );
}

export default HeroVisual