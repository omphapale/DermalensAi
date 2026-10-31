import { Eye, FileSearch, HeartPulse, MessageCircle } from "lucide-react"
import AssessmentDemo from "./AssessmentDemo";

const DarkFeature = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-cyan-300">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-300">
        {text}
      </span>
    </div>
  );
}

const InteractiveDemo = () =>{
   return(
      <>
      <section
        id="demo"
        className="relative overflow-hidden bg-[#0F172A] py-24 sm:py-32"
      >
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            <div className="text-center lg:text-left">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Product Preview
              </span>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
                See the kind of insights
                <span className="block text-cyan-300">
                  your assessment provides.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-400">
                The assessment combines image observations with the context
                you provide, presenting information in an easy-to-understand
                format.
              </p>

              <div className="mt-8 space-y-4 text-left">

                <DarkFeature
                  icon={<Eye />}
                  text="Visual observations"
                />

                <DarkFeature
                  icon={<FileSearch />}
                  text="Possible explanations"
                />

                <DarkFeature
                  icon={<HeartPulse />}
                  text="Severity and urgency context"
                />

                <DarkFeature
                  icon={<MessageCircle />}
                  text="Contextual AI assistant"
                />

              </div>
            </div>

            <AssessmentDemo />
          </div>
        </div>
      </section>

      </>
   )
}

export default InteractiveDemo