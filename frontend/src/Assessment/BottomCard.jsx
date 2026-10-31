import { ShieldCheck, Zap } from "lucide-react";

const InfoCard =({
  icon,
  title,
  text,
}) =>{
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6FFFB] text-[#0EA5A8]">
        {icon}
      </div>

      <div>

        <p className="text-xs font-bold">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-slate-400">
          {text}
        </p>

      </div>

    </div>
  );
}

const StethoscopeIcon = () =>{
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4 3h4" />
      <path d="M12 3h4" />
      <path d="M14 14a4 4 0 0 0 8 0v-2" />
      <circle cx="22" cy="10" r="2" />
      <path d="M14 18a6 6 0 0 1-12 0v-2" />
    </svg>
  );
}

const BottomCard = () =>{
   return(
      <>
      <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-3">

            <InfoCard
              icon={<ShieldCheck />}
              title="Safety First"
              text="AI output should not replace professional medical care."
            />

            <InfoCard
              icon={<Zap />}
              title="AI-Assisted"
              text="Results are generated from image and symptom context."
            />

            <InfoCard
              icon={<StethoscopeIcon />}
              title="Know When to Seek Care"
              text="Concerning or worsening symptoms require professional evaluation."
            />

          </div>   
      </>
   )
}

export default BottomCard