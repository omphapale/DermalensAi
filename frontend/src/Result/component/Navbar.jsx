import { Link, useNavigate } from "react-router-dom"
import { Sparkles, Home } from "lucide-react"

const PlusIcon= ()=> {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}


const Navbar = () =>{
   const navigate = useNavigate();

   return(
      <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
              <Sparkles size={18} />
            </div>

            <div>
              <div className="text-base font-bold tracking-tight text-slate-900">
                DermaLens<span className="text-teal-600"> AI</span>
              </div>

              <div className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:block">
                See. Understand. Care.
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/assessment")}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 sm:flex"
            >
              <PlusIcon />
              New Assessment
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </header>
      </>
   )
}

export default Navbar