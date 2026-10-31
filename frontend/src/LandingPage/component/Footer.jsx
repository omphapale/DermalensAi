import { ScanLine } from "lucide-react";
import { Link } from "react-router-dom";

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900">
        {title}
      </h3>

      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="block text-sm text-slate-500 transition hover:text-[#0EA5A8]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

const Footer = () =>{
   return(
      <>
      <footer className="bg-[#F8FAFC] px-4 pb-8 pt-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 border-b border-slate-200 pb-12 sm:grid-cols-2 lg:grid-cols-4">

            <div className="sm:col-span-2">

              <Link to="/" className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A8]">
                  <ScanLine className="h-5 w-5 text-white" />
                </div>

                <div>
                  <span className="block font-bold">
                    DermaLens
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0EA5A8]">
                    AI Health
                  </span>
                </div>

              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
                AI-assisted visual insights designed to help users better
                understand skin and injury concerns.
              </p>

            </div>

            <FooterColumn
              title="Product"
              links={[
                ["Assessment", "/assessment"],
                ["How It Works", "#how-it-works"],
                ["Features", "#features"],
              ]}
            />

            <FooterColumn
              title="Information"
              links={[
                ["Safety", "#safety"],
                ["FAQ", "#faq"],
                ["Privacy", "#"],
              ]}
            />

          </div>

          <div className="flex flex-col gap-3 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} DermaLens AI. All rights reserved.
            </p>

            <p>
              AI-assisted information • Not medical advice
            </p>

          </div>

        </div>
      </footer>
      </>
   )
}

export default Footer