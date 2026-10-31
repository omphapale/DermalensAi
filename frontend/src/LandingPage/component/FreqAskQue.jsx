import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SectionHeading = ({
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex rounded-full bg-[#E6FFFB] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087f82]">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

const faqs = [
  {
    question: "What is DermaLens AI?",
    answer:
      "DermaLens AI is an AI-assisted skin and injury assessment tool that analyzes an uploaded image together with the symptoms you provide and generates informational visual insights.",
  },
  {
    question: "Does DermaLens AI provide a medical diagnosis?",
    answer:
      "No. DermaLens AI does not replace a doctor or provide a definitive medical diagnosis. Its results are informational and should be reviewed with a qualified healthcare professional when appropriate.",
  },
  {
    question: "How does the image analysis work?",
    answer:
      "You upload an image and provide information such as symptoms, duration, pain level, and body location. The backend sends this multimodal information to an AI model which generates a structured assessment.",
  },
  {
    question: "Can I ask follow-up questions?",
    answer:
      "Yes. After an assessment, you can use the AI assistant to better understand the observations, possible explanations, care guidance, and other information presented in your assessment.",
  },
  {
    question: "What if my symptoms are severe?",
    answer:
      "If symptoms are severe, rapidly worsening, associated with serious pain, fever, significant swelling, breathing problems, or other emergency warning signs, seek professional medical care promptly rather than relying on an AI assessment.",
  },
];


const FreqAskQue = () =>{
   const [activeFaq, setActiveFaq] = useState(null);
   return(
      <>
      <section
        id="faq"
        className="scroll-mt-24 bg-[#F8FAFC] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="FAQ"
            title="Questions, Answered."
            description="A few things to know before using DermaLens AI."
          />

          <div className="mt-14 space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    onClick={() =>
                      setActiveFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                  >
                    <span className="text-sm font-bold text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                      >
                        <div className="border-t border-slate-100 px-5 pb-6 pt-4 text-sm leading-7 text-slate-600 sm:px-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>
        </div>
      </section>
      </>
   )
}

export default FreqAskQue