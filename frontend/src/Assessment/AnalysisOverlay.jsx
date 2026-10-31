import { motion, AnimatePresence } from "framer-motion";
import { ScanLine } from "lucide-react";
import { useState } from "react";

const AnalysisStep =({
  text,
  active = false,
}) =>{
  return (
    <div className="flex items-center gap-3">

      {active ? (
        <CheckCircle2 className="h-4 w-4 text-[#0EA5A8]" />
      ) : (
        <span className="h-4 w-4 rounded-full border-2 border-slate-200" />
      )}

      <span
        className={`text-xs font-medium ${
          active
            ? "text-slate-700"
            : "text-slate-400"
        }`}
      >
        {text}
      </span>

    </div>
  );
}

const AnalysisOverlay = () =>{
   const [isAnalyzing, setIsAnalyzing] = useState(false);
   return(
      <>
        <AnimatePresence>

        {isAnalyzing && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-md"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              className="w-full max-w-md rounded-[2rem] border border-white/20 bg-white p-7 text-center shadow-2xl sm:p-10"
            >

              <div className="relative mx-auto h-24 w-24">

                <div className="absolute inset-0 animate-ping rounded-full bg-[#0EA5A8]/10" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#E6FFFB]">
                  <ScanLine className="h-10 w-10 text-[#0EA5A8]" />
                </div>

              </div>

              <h2 className="mt-7 text-2xl font-black">
                Analyzing your image
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                DermaLens AI is processing your image and symptom context.
              </p>

              <div className="mt-7 overflow-hidden rounded-full bg-slate-100">

                <motion.div
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "90%",
                  }}
                  transition={{
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  className="h-2 rounded-full bg-[#0EA5A8]"
                />

              </div>

              <div className="mt-5 space-y-3 text-left">

                <AnalysisStep text="Processing image" active />

                <AnalysisStep
                  text="Analyzing visual patterns"
                  active
                />

                <AnalysisStep
                  text="Preparing structured insights"
                />

              </div>

              <p className="mt-7 text-[10px] text-slate-400">
                Please don't close or refresh this page.
              </p>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
      </>
   )
}

export default AnalysisOverlay