import { Image as ImageIcon, Brain, MessageCircle } from "lucide-react"


const TrustItem = ({ icon, title, text }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-6 sm:justify-center sm:py-7">
      <div className="rounded-xl bg-[#E6FFFB] p-3 text-[#0EA5A8]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-xs text-slate-400">{text}</p>
      </div>
    </div>
  );
}


const TrustBar = () => {
   return(
      <>
       <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">

          <TrustItem
            icon={<ImageIcon />}
            title="Visual Analysis"
            text="Analyze uploaded images"
          />

          <TrustItem
            icon={<Brain />}
            title="AI-Assisted Insights"
            text="Structured contextual results"
          />

          <TrustItem
            icon={<MessageCircle />}
            title="Follow-Up Assistant"
            text="Ask questions about your result"
          />

        </div>
      </section>
      </>
   )
}

export default TrustBar