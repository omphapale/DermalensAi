import { ShieldCheck, CheckCircle2 } from "lucide-react";

const SafetyItem = ({ text }) => {
  return (
    <div className="flex gap-2 text-xs leading-5 text-slate-700">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <span>{text}</span>
    </div>
  );
}

const Safety = () =>{
   return(
      <>
      <section
        id="safety"
        className="scroll-mt-24 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-10">

            <div className="absolute right-[-80px] top-[-80px] h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="h-7 w-7 text-amber-600" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                  Important Safety Information
                </span>

                <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                  AI insights should not replace professional medical care.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                  DermaLens AI is designed as an informational and educational
                  tool. It does not provide a definitive diagnosis, prescribe
                  medication, or replace evaluation by a qualified healthcare
                  professional.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <SafetyItem text="Do not use AI results as a definitive diagnosis." />

                  <SafetyItem text="Do not start or stop medication based only on AI output." />

                  <SafetyItem text="Seek professional care for concerning symptoms." />

                  <SafetyItem text="Seek urgent help when symptoms are severe or rapidly worsening." />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
   )
}

export default Safety