import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import{ ArrowRight, ScanLine, Menu, } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = ()=>{

   const [mobileMenu, setMobileMenu] = useState(false);

   return(
      <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setMobileMenu(false)}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A8] shadow-lg shadow-[#0EA5A8]/25">
                  <ScanLine className="h-5 w-5 text-white" />

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-cyan-300" />
                </div>

                <div>
                  <span className="block text-base font-bold tracking-tight">
                    DermaLens
                  </span>

                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0EA5A8]">
                    AI Health
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-8 md:flex">
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0EA5A8]"
                >
                  How It Works
                </a>

                <a
                  href="#features"
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0EA5A8]"
                >
                  Features
                </a>

                <a
                  href="#safety"
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0EA5A8]"
                >
                  Safety
                </a>

                <a
                  href="#faq"
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0EA5A8]"
                >
                  FAQ
                </a>
              </div>

              {/* Desktop CTA */}
              <Link
                to="/assessment"
                className="hidden items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#1e293b] md:flex"
              >
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden md:hidden"
                >
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="flex flex-col gap-1">

                      <a
                        href="#how-it-works"
                        onClick={() => setMobileMenu(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        How It Works
                      </a>

                      <a
                        href="#features"
                        onClick={() => setMobileMenu(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Features
                      </a>

                      <a
                        href="#safety"
                        onClick={() => setMobileMenu(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Safety
                      </a>

                      <a
                        href="#faq"
                        onClick={() => setMobileMenu(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        FAQ
                      </a>

                      <Link
                        to="/assessment"
                        onClick={() => setMobileMenu(false)}
                        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white"
                      >
                        Start Assessment
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
      </>
   )
}

export default Navbar
