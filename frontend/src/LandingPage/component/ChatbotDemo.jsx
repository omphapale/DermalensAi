import { CheckCircle2, Sparkles, ArrowRight,   } from "lucide-react";

import { Link } from "react-router-dom";

const Suggestion = ({ text }) => {
  return (
    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-500">
      {text}
    </button>
  );
}

const Bullet = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0EA5A8]" />
      <span className="text-sm font-medium text-slate-600">
        {text}
      </span>
    </div>
  );
}

const ChatPreview = () => {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">

        {/* Header */}

        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A8]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold">
              DermaLens Assistant
            </p>

            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-400">
                Assessment context active
              </span>
            </div>
          </div>

        </div>

        {/* Messages */}

        <div className="space-y-5 bg-slate-50/70 p-5 sm:p-7">

          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
            <p className="text-xs leading-6 text-slate-600">
              Hello! I can help explain the information from your assessment.
              What would you like to understand?
            </p>
          </div>

          <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-[#0F172A] p-4">
            <p className="text-xs leading-6 text-white">
              What does the severity level mean?
            </p>
          </div>

          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
            <p className="text-xs leading-6 text-slate-600">
              The severity level is an informational estimate based on the
              assessment context. It should not be treated as a medical
              diagnosis.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <Suggestion text="Explain the observations" />
            <Suggestion text="What should I monitor?" />
          </div>

        </div>

        {/* Input */}

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex-1 text-xs text-slate-400">
              Ask about your assessment...
            </span>

            <div className="rounded-lg bg-[#0F172A] p-2">
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



const ChatbotDemo = () =>{
   return(
      <>
      <section className="bg-[#F8FAFC] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Chat UI */}

            <ChatPreview />

            {/* Content */}

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E6FFFB] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087f82]">
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </span>

              <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                Don't stop at the result.
                <span className="block text-[#0EA5A8]">
                  Ask questions.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                Your assessment becomes the context for a follow-up
                conversation. Ask the assistant to explain observations,
                possible explanations, care guidance, and other information
                already provided.
              </p>

              <div className="mt-8 space-y-4">
                <Bullet text="Assessment-aware conversation" />
                <Bullet text="Simple explanations" />
                <Bullet text="Medication information clarification" />
                <Bullet text="Safety-focused responses" />
              </div>

              <Link
                to="/assessment"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Try an Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>
      </>
   )
}

export default ChatbotDemo