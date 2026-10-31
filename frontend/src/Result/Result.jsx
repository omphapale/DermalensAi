import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
  BadgeCheck,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Droplets,
  Eye,
  FileText,
  HeartPulse,
  Home,
  Info,
  Leaf,
  MessageCircle,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Thermometer,
  Upload,
  XCircle,
} from "lucide-react";

import { getAssessmentById } from "../services/assessment.service";
import Navbar from "./component/Navbar";
import PageIntro from "./component/PageIntro";


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

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function SectionHeader({ eyebrow, title, description, icon: Icon }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-8"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600">
        {Icon && <Icon size={16} />}
        {eyebrow}
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function StatusBadge({ children, type = "neutral" }) {
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

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
          <RefreshCw className="animate-spin text-teal-600" size={28} />
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Loading your assessment
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Preparing your AI-assisted insights...
        </p>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-slate-200/40">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertCircle className="text-red-500" size={30} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Unable to load assessment
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {message || "Something went wrong while loading your assessment."}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <button
            onClick={() => navigate("/assessment")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Result Page                                                           */
/* -------------------------------------------------------------------------- */

const Result= () =>{
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAssessment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAssessmentById(id);

      setAssessment(response.assessment);
    } catch (err) {
      setError(
        err.message || "Unable to load the assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAssessment();
    }
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !assessment) {
    return <ErrorScreen message={error} onRetry={fetchAssessment} />;
  }

  const analysis = assessment.aiAnalysis || {};

  const imageUrl = assessment.imageUrl || "";

  const observations = Array.isArray(analysis.observations)
    ? analysis.observations
    : [];

  const possibleCauses = Array.isArray(analysis.possibleCauses)
    ? analysis.possibleCauses
    : [];

  const guidelines = Array.isArray(analysis.guidelines)
    ? analysis.guidelines
    : [];

  const selfCare = Array.isArray(analysis.selfCare)
    ? analysis.selfCare
    : [];

  const medicationInformation = Array.isArray(
    analysis.medicationInformation
  )
    ? analysis.medicationInformation
    : [];

  const warnings = Array.isArray(analysis.warnings)
    ? analysis.warnings
    : [];

  const severity = analysis.severity || "Not specified";
  const urgency = analysis.urgency || "Not specified";

  const getStatusType = (value) => {
    const normalized = String(value).toLowerCase();

    if (
      normalized.includes("high") ||
      normalized.includes("severe") ||
      normalized.includes("urgent") ||
      normalized.includes("emergency")
    ) {
      return "danger";
    }

    if (
      normalized.includes("moderate") ||
      normalized.includes("medium") ||
      normalized.includes("soon")
    ) {
      return "warning";
    }

    if (
      normalized.includes("low") ||
      normalized.includes("mild") ||
      normalized.includes("routine")
    ) {
      return "safe";
    }

    return "info";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      
      {/* //Navbar */}
     
      <Navbar/>

      {/* //Page Content */}
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* //Page intro */}
         
        <PageIntro/>

        {/* ---------------------------------------------------------------- */}
        {/* Summary Card                                                     */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-12"
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/30">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Image */}
              <div className="relative min-h-[330px] overflow-hidden bg-slate-950 lg:min-h-[430px]">
                {imageUrl ? (
                     <img
                        src={imageUrl}
                        alt="Uploaded skin assessment"
                        className="h-full w-full object-cover"
                     />
                     ) : (
                        <div className="flex h-full min-h-[330px] items-center justify-center">
                           <div className="text-center text-slate-500">
                              <Eye size={42} className="mx-auto mb-3" />
                              <p className="text-sm">Assessment image unavailable</p>
                           </div>
                        </div>
                        )} 
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"/>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    <Eye size={14} />
                    Uploaded image
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-teal-600">
                  <Sparkles size={17} />
                  AI-ASSISTED ASSESSMENT
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  What the image suggests
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  The following observations are based on the visual
                  characteristics detected from your submitted image and the
                  context you provided.
                </p>

                <div className="mt-7 space-y-3">
                  {observations.length > 0 ? (
                    observations.slice(0, 4).map((observation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex gap-3 rounded-xl bg-slate-50 p-4"
                      >
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-teal-600"
                          size={18}
                        />

                        <p className="text-sm leading-6 text-slate-700">
                          {typeof observation === "string"
                            ? observation
                            : observation.description ||
                              observation.text ||
                              JSON.stringify(observation)}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <EmptyState text="No visual observations were returned."/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Status cards                                                     */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatusCard
            icon={HeartPulse}
            title="Severity"
            value={severity}
            type={getStatusType(severity)}
          />

          <StatusCard
            icon={ShieldAlert}
            title="Urgency"
            value={urgency}
            type={getStatusType(urgency)}
          />

          <StatusCard
            icon={Thermometer}
            title="Pain level"
            value={
              assessment.painLevel !== undefined
                ? `${assessment.painLevel}/10`
                : "Not specified"
            }
            type="info"
          />

          <StatusCard
            icon={Clock3}
            title="Duration"
            value={assessment.duration || "Not specified"}
            type="neutral"
          />
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Visual Observations                                              */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="01 / Visual analysis"
            title="Visual observations"
            description="These are observable image characteristics identified by the AI. They should not be interpreted as a confirmed diagnosis."
            icon={Eye}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {observations.length > 0 ? (
              observations.map((observation, index) => (
                <ObservationCard
                  key={index}
                  index={index}
                  observation={observation}
                />
              ))
            ) : (
              <EmptyState text="No visual observations available." />
            )}
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Possible Causes                                                  */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="02 / Possible explanations"
            title="What could explain these observations?"
            description="These are possible explanations rather than confirmed diagnoses. Several different conditions can produce similar visual characteristics."
            icon={Info}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {possibleCauses.length > 0 ? (
              possibleCauses.map((cause, index) => (
                <PossibleCauseCard key={index} cause={cause} index={index} />
              ))
            ) : (
              <EmptyState text="No possible explanations were returned." />
            )}
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Care Guidelines                                                  */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="03 / General care"
            title="General care guidelines"
            description="Simple habits that may help protect irritated or sensitive skin while you monitor the situation."
            icon={HeartPulse}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {guidelines.length > 0 ? (
              guidelines.map((guideline, index) => (
                <GuidelineCard
                  key={index}
                  guideline={guideline}
                  index={index}
                />
              ))
            ) : (
              <DefaultGuidelines />
            )}
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Self Care                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="04 / Early-stage support"
            title="Self-care & comfort guide"
            description="Low-risk supportive care for comfort and basic skin care. These suggestions are not a prescription and are not intended to treat an unknown medical condition."
            icon={Home}
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-slate-200/30"
          >
            {/* Card Header */}
            <div className="border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-sm">
                    <Home size={23} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Basic comfort measures
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Gentle steps that focus on protecting the skin barrier.
                    </p>
                  </div>
                </div>

                <StatusBadge type="info">GENERAL SELF-CARE</StatusBadge>
              </div>
            </div>

            {/* Self-care list */}
            <div className="grid gap-0 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {selfCare.length > 0 ? (
                selfCare.map((item, index) => (
                  <SelfCareCard key={index} item={item} />
                ))
              ) : (
                <>
                  <SelfCareFallback
                    icon={Droplets}
                    title="Gentle cleansing"
                    description="Clean the area gently with lukewarm water and avoid aggressive scrubbing."
                  />

                  <SelfCareFallback
                    icon={Thermometer}
                    title="Cool compress"
                    description="A clean, cool, damp cloth may temporarily help with irritation or itching."
                  />

                  <SelfCareFallback
                    icon={XCircle}
                    title="Avoid irritants"
                    description="Avoid newly introduced fragrances, cosmetics, harsh soaps, or products that make symptoms worse."
                  />

                  <SelfCareFallback
                    icon={HeartPulse}
                    title="Protect the skin barrier"
                    description="Where appropriate, gentle fragrance-free skin care may help maintain the skin barrier."
                  />
                </>
              )}
            </div>

            {/* Natural remedies warning */}
            <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Leaf size={21} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    About homemade & herbal remedies
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    DermaLens does not automatically recommend applying
                    homemade herbal preparations to an unidentified skin
                    condition. “Natural” ingredients can still irritate
                    sensitive or damaged skin.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                      Avoid unknown mixtures
                    </span>

                    <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                      Avoid harsh ingredients
                    </span>

                    <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                      Monitor changes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Medication Information                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="05 / Medication information"
            title="Medication information"
            description="Educational information only. DermaLens does not prescribe medication or recommend starting, stopping, or changing medication without professional guidance."
            icon={Stethoscope}
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/30"
          >
            {medicationInformation.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {medicationInformation.map((medication, index) => (
                  <MedicationCard
                    key={index}
                    medication={medication}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <FileText size={24} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  No medication information provided
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Medication should not be selected solely from an image.
                  Consult a qualified healthcare professional or pharmacist
                  for medication-specific advice.
                </p>
              </div>
            )}

            <div className="border-t border-amber-100 bg-amber-50/70 p-5">
              <div className="flex gap-3">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <p className="text-sm leading-6 text-amber-800">
                  Do not use this section as a prescription. Do not change
                  medication dose, start medication, or stop prescribed
                  medication based solely on this AI assessment.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Warnings / Red Flags                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-14">
          <SectionHeader
            eyebrow="06 / Safety"
            title="When to seek medical care"
            description="Certain symptoms should not be managed using an AI assessment alone."
            icon={ShieldAlert}
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-xl shadow-slate-200/30"
          >
            <div className="border-b border-red-100 bg-red-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <ShieldAlert size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-red-900">
                    Pay attention to worsening or concerning symptoms
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-700">
                    Seek professional medical evaluation if symptoms are
                    severe, rapidly changing, persistent, or accompanied by
                    signs of infection or a serious reaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {warnings.length > 0
                  ? warnings.map((warning, index) => (
                      <WarningItem
                        key={index}
                        warning={warning}
                      />
                    ))
                  : defaultWarnings.map((warning, index) => (
                      <WarningItem
                        key={index}
                        warning={warning}
                      />
                    ))}
              </div>

              <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex gap-3">
                  <AlertCircle
                    className="mt-0.5 shrink-0 text-red-600"
                    size={20}
                  />

                  <div>
                    <h4 className="font-bold text-red-900">
                      Emergency symptoms
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-red-800">
                      Difficulty breathing or swallowing, or significant
                      swelling involving the eyes or lips, requires urgent
                      medical attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Chatbot CTA                                                      */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
        >
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/40 sm:p-10 lg:p-12">
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md">
                  <Bot size={14} />
                  DERMALENS AI ASSISTANT
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Have questions about your assessment?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                  Ask questions about the observations, possible explanations,
                  general care guidance, or the information shown in this
                  assessment.
                </p>
              </div>

              <button
                onClick={() => navigate(`/chat/${id}`)}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-teal-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
              >
                <MessageCircle size={19} />
                Ask DermaLens AI
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom disclaimer                                                */}
        {/* ---------------------------------------------------------------- */}

        <div className="border-t border-slate-200 pt-8 text-center">
          <div className="mx-auto flex max-w-3xl items-start justify-center gap-2 text-left sm:text-center">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-slate-400 sm:hidden"
            />

            <p className="text-xs leading-5 text-slate-400">
              DermaLens AI is an informational AI-assisted tool. Results may
              be incomplete or inaccurate and should not be used as a
              substitute for examination, diagnosis, treatment, or
              professional medical advice.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/assessment")}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-teal-600"
            >
              <RefreshCw size={14} />
              Start another assessment
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-teal-600"
            >
              <Home size={14} />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Card                                                                */
/* -------------------------------------------------------------------------- */

function StatusCard({ icon: Icon, title, value, type }) {
  const iconStyles = {
    safe: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    info: "bg-cyan-50 text-cyan-600",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
          iconStyles[type] || iconStyles.neutral
        }`}
      >
        <Icon size={19} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold capitalize text-slate-900">
        {value}
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Observation Card                                                           */
/* -------------------------------------------------------------------------- */

function ObservationCard({ observation, index }) {
  const text =
    typeof observation === "string"
      ? observation
      : observation.description ||
        observation.text ||
        observation.observation ||
        "Observation available.";

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <span className="text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Visual observation {index + 1}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Possible Cause Card                                                        */
/* -------------------------------------------------------------------------- */

function PossibleCauseCard({ cause, index }) {
  const name =
    typeof cause === "string"
      ? cause
      : cause.name || cause.title || "Possible explanation";

  const reason =
    typeof cause === "string"
      ? "This is one possible explanation based on the available information."
      : cause.reason ||
        cause.description ||
        "This may share some characteristics with the visual observations.";

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <Info size={21} />
        </div>

        <span className="text-xs font-semibold text-slate-400">
          POSSIBLE {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900">{name}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{reason}</p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Guideline Card                                                             */
/* -------------------------------------------------------------------------- */

function GuidelineCard({ guideline, index }) {
  const text =
    typeof guideline === "string"
      ? guideline
      : guideline.description ||
        guideline.text ||
        guideline.title ||
        "General care guidance.";

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
          <CheckCircle2 size={18} />
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400">
            STEP {index + 1}
          </span>

          <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Self Care Card                                                             */
/* -------------------------------------------------------------------------- */

function SelfCareCard({ item }) {
  const title =
    item.title || item.name || "Self-care measure";

  const description =
    item.description ||
    item.reason ||
    "Follow gentle skin-care practices and monitor changes.";

  const category = item.category || "comfort";

  const icons = {
    comfort: HeartPulse,
    cleansing: Droplets,
    irritation: XCircle,
    hydration: Droplets,
    protection: ShieldAlert,
  };

  const Icon = icons[category.toLowerCase()] || HeartPulse;

  return (
    <div className="p-6 sm:p-7">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <Icon size={21} />
        </div>

        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SelfCareFallback({ icon: Icon, title, description }) {
  return (
    <div className="p-6 sm:p-7">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <Icon size={21} />
        </div>

        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Medication Card                                                            */
/* -------------------------------------------------------------------------- */

function MedicationCard({ medication }) {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <FileText size={23} />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {medication.name || medication.title || "Medication information"}
            </h3>

            <StatusBadge type="neutral">INFORMATION ONLY</StatusBadge>
          </div>

          {medication.purpose && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                General purpose
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {medication.purpose}
              </p>
            </div>
          )}

          {medication.precautions && (
            <div className="mt-4 rounded-xl bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Precautions
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                {medication.precautions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Warning Item                                                               */
/* -------------------------------------------------------------------------- */

function WarningItem({ warning }) {
  const text =
    typeof warning === "string"
      ? warning
      : warning.description ||
        warning.text ||
        warning.title ||
        "Concerning symptom";

  return (
    <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4">
      <AlertTriangle
        size={18}
        className="mt-0.5 shrink-0 text-red-500"
      />

      <p className="text-sm leading-6 text-red-800">{text}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <Info className="mx-auto text-slate-400" size={24} />

      <p className="mt-3 text-sm text-slate-500">{text}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Default data                                                               */
/* -------------------------------------------------------------------------- */

function DefaultGuidelines() {
  return (
    <>
      <GuidelineCard
        index={0}
        guideline="Keep the affected area clean and avoid aggressive scrubbing."
      />

      <GuidelineCard
        index={1}
        guideline="Avoid scratching or repeatedly touching the affected area."
      />

      <GuidelineCard
        index={2}
        guideline="Avoid new cosmetic, fragrance, or skincare products that may be irritating the area."
      />

      <GuidelineCard
        index={3}
        guideline="Monitor the area for changes in appearance, pain, swelling, or spread."
      />

      <GuidelineCard
        index={4}
        guideline="If symptoms persist or worsen, consider getting evaluated by a qualified healthcare professional."
      />

      <GuidelineCard
        index={5}
        guideline="If monitoring progression, taking another photo under similar lighting can help document changes."
      />
    </>
  );
}

const defaultWarnings = [
  "The affected area is spreading rapidly.",
  "Pain is severe or getting worse.",
  "There is pus, yellow crusting, or unusual discharge.",
  "You develop fever or feel significantly unwell.",
  "Blisters, open sores, or significant skin damage appear.",
  "There is substantial swelling or warmth around the affected area.",
  "The eyes, lips, mouth, or genital area are involved.",
];

/* -------------------------------------------------------------------------- */
/* Small Plus icon                                                            */
/* -------------------------------------------------------------------------- */

function PlusIcon() {
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

export default Result