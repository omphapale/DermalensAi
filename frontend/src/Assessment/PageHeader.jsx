import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PageHeader = () =>{
   return(
      <>
      <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#0EA5A8]/20 bg-[#E6FFFB] px-4 py-2"
            >

              <Sparkles className="h-4 w-4 text-[#0EA5A8]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#087f82]">
                AI Assessment
              </span>

            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            >
              Let's understand
              <span className="block text-[#0EA5A8]">
                what you're seeing.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              Upload a clear image and provide a little context about your
              symptoms. DermaLens AI will generate structured,
              informational insights.
            </motion.p>

          </motion.div>
      </>
   )
}

export default PageHeader