import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, BadgeCheck, Upload } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const StatusBadge =({ children, type = "neutral" }) => {
  const styles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    safe: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    info: "bg-cyan-50 text-cyan-700 border-cyan-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}


const PageIntro = () =>{
  const { id } = useParams();
   const navigate = useNavigate();
   return(
      <>
      <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge type="safe">
              <BadgeCheck size={13} className="mr-1" />
              AI ASSESSMENT COMPLETE
            </StatusBadge>

            <span className="text-xs text-slate-400">
              Assessment #{String(id).slice(-8)}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Your assessment is ready.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                Here are AI-assisted visual insights based on the image and
                information you provided.
              </p>
            </div>

            <button
              onClick={() => navigate("/assessment")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
            >
              <Upload size={17} />
              New Assessment
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5"
        >
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <AlertTriangle className="text-amber-600" size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Important: informational guidance only
              </h3>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                DermaLens AI provides visual observations and general
                information. It does not provide a definitive diagnosis or
                prescription. For concerning, persistent, worsening, or
                severe symptoms, consult a qualified healthcare professional.
              </p>
            </div>
          </div>
        </motion.div>
      </>
   )
}

export default PageIntro