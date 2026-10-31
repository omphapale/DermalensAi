import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const DemoResult = ({ title, text }) => {
  return (
    <div>
      <p className="text-xs font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

const AssessmentDemo =() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-xl sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">

        {/* Image */}

        <div className="relative min-h-[330px] overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 to-orange-100">

          <div className="absolute left-[20%] top-[20%] h-[60%] w-[60%] rotate-[-8deg] rounded-[45%] bg-gradient-to-br from-[#f5c1a9] to-[#d88773]" />

          <div className="absolute left-[48%] top-[43%] h-16 w-20 rounded-full bg-red-400/40 blur-md" />

          <div className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 backdrop-blur">
            Uploaded image
          </div>

          <motion.div
            animate={{
              y: ["0%", "300%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 top-0 h-[2px] w-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
          />
        </div>

        {/* Results */}

        <div className="rounded-2xl bg-white p-5 sm:p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                AI-assisted assessment
              </p>

              <h3 className="mt-1 text-lg font-black text-slate-900">
                Assessment Overview
              </h3>
            </div>

            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
              Moderate
            </div>

          </div>

          <div className="mt-6 space-y-5">

            <DemoResult
              title="Visual observations"
              text="Localized redness and visible skin irritation."
            />

            <DemoResult
              title="Possible explanations"
              text="Several possibilities may correspond with the visual pattern."
            />

            <DemoResult
              title="General care"
              text="Keep the area clean and monitor for changes."
            />

          </div>

          <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-xs font-bold text-white">
            <MessageCircle className="h-4 w-4" />
            Ask AI Assistant
          </button>

        </div>
      </div>
    </motion.div>
  );
}

export default AssessmentDemo