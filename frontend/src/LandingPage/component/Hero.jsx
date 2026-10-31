import { motion } from "framer-motion"
import { ArrowRight, Eye, Sparkles, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom";
import HeroVisual from "./HeroVisual";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const HeroCheck = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-[#0EA5A8]" />
      <span className="text-xs font-semibold text-slate-600">
        {text}
      </span>
    </div>
  );
}

const Hero = ()=>{
   return(
      <>
      <section className="relative min-h-screen overflow-hidden pt-32">
      
              {/* Background decorations */}
      
              <div className="pointer-events-none absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-[100px]" />
      
              <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[450px] w-[450px] rounded-full bg-teal-200/30 blur-[100px]" />
      
              <div className="pointer-events-none absolute bottom-[-20%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-[100px]" />
      
              <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
                >
      
                  {/* Hero Content */}
      
                  <div className="relative z-10 text-center lg:text-left">
      
                    <motion.div
                      variants={fadeUp}
                      className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0EA5A8]/20 bg-[#E6FFFB] px-4 py-2"
                    >
                      <Sparkles className="h-4 w-4 text-[#0EA5A8]" />
      
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#087f82]">
                        AI-Assisted Analysis
                      </span>
                    </motion.div>
      
                    <motion.h1
                      variants={fadeUp}
                      className="mx-auto max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:mx-0 lg:text-7xl"
                    >
                      Understand Your Skin
                      <span className="block bg-gradient-to-r from-[#0EA5A8] to-cyan-500 bg-clip-text text-transparent">
                        With AI-Powered Insights.
                      </span>
                    </motion.h1>
      
                    <motion.p
                      variants={fadeUp}
                      className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0"
                    >
                      Upload a skin or injury image, describe your symptoms, and
                      receive structured AI-assisted visual insights, possible
                      explanations, care guidance, and follow-up support.
                    </motion.p>
      
                    <motion.div
                      variants={fadeUp}
                      className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
                    >
                      <Link
                        to="/assessment"
                        className="group flex items-center justify-center gap-2 rounded-2xl bg-[#0F172A] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-1"
                      >
                        Start Free Assessment
      
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
      
                      <a
                        href="#how-it-works"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                        See How It Works
                      </a>
                    </motion.div>
      
                    <motion.div
                      variants={fadeUp}
                      className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
                    >
                      <HeroCheck text="Image analysis" />
                      <HeroCheck text="Symptom context" />
                      <HeroCheck text="AI follow-up" />
                    </motion.div>
      
                    <motion.p
                      variants={fadeUp}
                      className="mt-6 text-xs leading-5 text-slate-400"
                    >
                      For informational purposes only. Not a medical diagnosis or
                      prescription.
                    </motion.p>
                  </div>
      
                  {/* Hero Visual */}
      
                  <motion.div
                    variants={fadeUp}
                    className="relative mx-auto w-full max-w-[560px]"
                  >
                    <HeroVisual />
                  </motion.div>
                </motion.div>
              </div>
      
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
            </section>
      </>
   )
}

export default Hero