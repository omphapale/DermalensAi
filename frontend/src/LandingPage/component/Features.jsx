import { motion } from "framer-motion";
import { Eye, Brain, CircleAlert, HeartPulse, FileSearch, MessageCircle } from "lucide-react";

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

const FeatureCard = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-xl"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6FFFB] text-[#0EA5A8]">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </motion.div>
  );
}

const Features = () => {
 return(
   <>
    <section
        id="features"
        className="scroll-mt-24 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="What You Get"
            title="One Assessment. Multiple Layers of Insight."
            description="Designed to help users understand the information around a visible skin concern without overwhelming them."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={<Eye />}
              title="Visual Observations"
              description="Understand what the AI can visually identify from the uploaded image."
            />

            <FeatureCard
              icon={<Brain />}
              title="Possible Explanations"
              description="Explore possible causes presented as informational possibilities rather than definitive diagnoses."
            />

            <FeatureCard
              icon={<CircleAlert />}
              title="Severity Context"
              description="Receive an informational indication of the potential level of concern."
            />

            <FeatureCard
              icon={<HeartPulse />}
              title="Care Guidance"
              description="Get general care and monitoring guidance relevant to the assessment."
            />

            <FeatureCard
              icon={<FileSearch />}
              title="Medication Information"
              description="Understand medication-related information educationally without autonomous prescribing."
            />

            <FeatureCard
              icon={<MessageCircle />}
              title="AI Assistant"
              description="Ask follow-up questions about the information contained in your assessment."
            />

          </div>
        </div>
      </section>
   </>
 )
}

export default Features