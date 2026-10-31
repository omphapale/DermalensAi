import { Sparkles, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const FinalCard = () =>{
   return(
      <>
       <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0F172A] px-6 py-20 text-center sm:px-10 sm:py-28">

          <div className="absolute left-1/2 top-[-180px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />

          <div className="relative">

            <Sparkles className="mx-auto h-8 w-8 text-cyan-300" />

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              Ready to understand
              <span className="block text-cyan-300">
                what you're seeing?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Upload an image and explore AI-assisted insights in a simple,
              structured experience.
            </p>

            <Link
              to="/assessment"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-slate-900 shadow-xl transition hover:-translate-y-1"
            >
              Start Assessment

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>
        </div>
      </section>
      </>
   )
}

export default FinalCard