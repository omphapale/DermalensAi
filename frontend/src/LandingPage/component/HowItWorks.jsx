import { Upload, ScanLine, MessageCircle } from "lucide-react"
import { motion } from "framer-motion";


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

const StepCard =({
  number,
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -7,
      }}
      className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6FFFB] text-[#0EA5A8] transition group-hover:bg-[#0EA5A8] group-hover:text-white">
          {icon}
        </div>
        <span className="text-5xl font-black tracking-tight text-slate-100">
          {number}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}

const HowItWorks = () => {
   return(
      <>
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[#F8FAFC] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Simple Process"
            title="From Image to Insight in Three Steps"
            description="DermaLens AI keeps the assessment experience simple. Provide visual context, add your symptoms, and explore the generated insights."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <StepCard
              number="01"
              icon={<Upload />}
              title="Upload"
              description="Upload a clear image of the affected skin area or injury."
            />

            <StepCard
              number="02"
              icon={<ScanLine />}
              title="Analyze"
              description="AI considers the image together with your symptom information."
            />

            <StepCard
              number="03"
              icon={<MessageCircle />}
              title="Explore"
              description="Review the assessment and ask follow-up questions using the AI assistant."
            />

          </div>
        </div>
      </section>
      </>
   )
}

export default HowItWorks