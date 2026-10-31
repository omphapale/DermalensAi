import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Sparkles,
  Bot,
  User,
  AlertTriangle,
  ShieldCheck,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  getAssessmentById,
} from "../services/assessment.service";

import {
  sendChatMessage,
} from "../services/chat.service";


// Animation

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Chat Page

const Chatbot = () => {

  const navigate = useNavigate();
  const { assessmentId } = useParams();

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [assessment, setAssessment] = useState(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [loadingAssessment, setLoadingAssessment] = useState(true);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");


  // Fetch Assessment

  useEffect(() => {

    const fetchAssessment = async () => {

      try {

        setLoadingAssessment(true);
        setError("");

        const response = await getAssessmentById(assessmentId);

        setAssessment(response.assessment);

      } catch (err) {

        console.error("Failed to fetch assessment:", err);

        setError(
          err?.response?.data?.message ||
          "Unable to load this assessment."
        );

      } finally {

        setLoadingAssessment(false);

      }
    };


    if (assessmentId) {
      fetchAssessment();
    }

  }, [assessmentId]);


  // Scroll to latest message

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, sending]);


  // Initial AI Message

  useEffect(() => {

    if (!assessment) return;

    const aiResult = assessment.aiAnalysis;

    setMessages([
      {
        id: "welcome",

        role: "assistant",

        content:
          "I've reviewed your assessment. You can ask me questions about the observations, possible explanations, care guidance, or warning signs.",
      },
    ]);

  }, [assessment]);


  // Send Message

  const handleSendMessage = async () => {

    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) {
      return;
    }


    const userMessage = {
      id: Date.now(),

      role: "user",

      content: trimmedMessage,
    };


    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setMessage("");

    setSending(true);

    try {

      const response = await sendChatMessage({
        assessmentId,
        message: trimmedMessage,
      });


      const aiMessage = {
        id: Date.now() + 1,

        role: "assistant",

        content:
          response?.assistantMessage?.content ||
          response?.data?.assistantMessage?.content ||
          response?.reply ||
          "I couldn't generate a response right now. Please try again.",
      };


      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);

    } catch (err) {

      console.error("Chat error:", err);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,

          role: "assistant",

          content:
            err?.response?.data?.message ||
            "Sorry, I couldn't process your message. Please try again.",
        },
      ]);

    } finally {

      setSending(false);

    }
  };


  // Enter key

  const handleKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      handleSendMessage();

    }

  };


  // Suggested Questions

  const suggestedQuestions = [
    "What could be causing this?",
    "What should I do for this?",
    "Should I see a doctor?",
    "What warning signs should I watch for?",
  ];


  const handleSuggestion = (question) => {

    setMessage(question);

    textareaRef.current?.focus();

  };


  // Loading

  if (loadingAssessment) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">

        <div className="flex flex-col items-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6FFFB]">

            <Sparkles className="h-6 w-6 animate-pulse text-[#0EA5A8]" />

          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Preparing your AI assistant...
          </p>

        </div>

      </div>
    );

  }


  // Error

  if (error || !assessment) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5">

        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">

            <AlertTriangle className="h-6 w-6 text-red-500" />

          </div>

          <h2 className="mt-5 text-xl font-black text-slate-900">
            Unable to open chat
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || "Assessment could not be found."}
          </p>

          <button
            onClick={() => navigate(`/result/${assessmentId}`)}
            className="mt-6 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Back to Result
          </button>

        </div>

      </div>
    );

  }


  const aiResult = assessment.aiAnalysis;


  // Main UI

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">


       {/* NAVBAR  */}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">

          <button
            onClick={() => navigate(`/result/${assessmentId}`)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-[#0EA5A8]"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to assessment

          </button>


          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6FFFB]">

              <Sparkles className="h-4 w-4 text-[#0EA5A8]" />

            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-black text-slate-900">
                DermaLens AI
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                AI Care Assistant
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2 rounded-full bg-[#E6FFFB] px-3 py-1.5">

            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0EA5A8]" />

            <span className="text-[10px] font-bold text-[#087f82]">
              AI ONLINE
            </span>

          </div>

        </div>

      </header>


      {/* MAIN  */}

      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[320px_1fr] lg:px-8">


          {/* LEFT — ASSESSMENT CONTEXT  */}

        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hidden lg:block"
        >

          <div className="sticky top-24 space-y-4">


            {/* Assessment Summary */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6FFFB]">

                  <ShieldCheck className="h-5 w-5 text-[#0EA5A8]" />

                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Your assessment
                  </p>

                  <h2 className="text-sm font-black text-slate-900">
                    Assessment summary
                  </h2>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Severity
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-800">
                    {aiResult?.severity || "Unclear"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Urgency
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-800">
                    {aiResult?.urgency || "Unclear"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-black capitalize text-slate-800">
                    {assessment.bodyLocation || "Not provided"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Pain
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-800">
                    {assessment.painLevel ?? 2}/10
                  </p>

                </div>

              </div>


              <button
                onClick={() => navigate(`/result/${assessmentId}`)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-[#0EA5A8] hover:text-[#0EA5A8]"
              >

                View full assessment

                <ArrowLeft className="h-3.5 w-3.5 rotate-180" />

              </button>

            </div>


             {/* Safety */}

            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">

              <div className="flex gap-3">

                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

                <div>

                  <p className="text-xs font-black text-amber-800">
                    Important
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-amber-700">
                    This assistant provides informational guidance
                    and does not replace professional medical advice.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </motion.aside>


        {/* RIGHT — CHAT */}

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex min-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
        >


          {/* Chat Header */}

          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6FFFB]">

                  <Bot className="h-5 w-5 text-[#0EA5A8]" />

                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />

                </div>

                <div>

                  <h1 className="text-sm font-black text-slate-900 sm:text-base">
                    DermaLens Assistant
                  </h1>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400 sm:text-xs">
                    Ask questions about your assessment
                  </p>

                </div>

              </div>


              <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-3 py-2 sm:flex">

                <MessageCircle className="h-3.5 w-3.5 text-slate-400" />

                <span className="text-[10px] font-bold text-slate-500">
                  Assessment chat
                </span>

              </div>

            </div>

          </div>


          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-slate-50/60 px-4 py-6 sm:px-6">

            <div className="mx-auto max-w-3xl space-y-5">


              {/* Intro */}

              <div className="mx-auto max-w-xl text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6FFFB]">

                  <Sparkles className="h-5 w-5 text-[#0EA5A8]" />

                </div>

                <h2 className="mt-3 text-sm font-black text-slate-800">
                  Let's talk about your assessment
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Ask me about your results, general care,
                  possible explanations, or warning signs.
                </p>

              </div>


              {/* Suggested Questions */}

              {messages.length <= 1 && (

                <div className="flex flex-wrap justify-center gap-2">

                  {suggestedQuestions.map((question) => (

                    <button
                      key={question}
                      onClick={() => handleSuggestion(question)}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:border-[#0EA5A8] hover:bg-[#E6FFFB] hover:text-[#087f82]"
                    >
                      {question}
                    </button>

                  ))}

                </div>

              )}


              {/* Messages */}

              <AnimatePresence initial={false}>

                {messages.map((item) => (

                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`flex gap-3 ${
                      item.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    {item.role === "assistant" && (

                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E6FFFB]">

                        <Bot className="h-4 w-4 text-[#0EA5A8]" />

                      </div>

                    )}


                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        item.role === "user"
                          ? "rounded-br-md bg-[#0F172A] text-white"
                          : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm"
                      }`}
                    >

                      {item.content}

                    </div>


                    {item.role === "user" && (

                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">

                        <User className="h-4 w-4 text-slate-500" />

                      </div>

                    )}

                  </motion.div>

                ))}

              </AnimatePresence>


              {/* Typing */}

              {sending && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex items-start gap-3"
                >

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6FFFB]">

                    <Bot className="h-4 w-4 text-[#0EA5A8]" />

                  </div>


                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-5 py-4 shadow-sm">

                    <div className="flex items-center gap-1.5">

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
                        style={{
                          animationDelay: "300ms",
                        }}
                      />

                    </div>

                  </div>

                </motion.div>

              )}


              <div ref={messagesEndRef} />

            </div>

          </div>


          {/* INPUT AREA */}

          <div className="border-t border-slate-100 bg-white p-4 sm:p-5">

            <div className="mx-auto max-w-3xl">

              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-[#0EA5A8] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">

                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={sending}
                  rows={2}
                  maxLength={1000}
                  placeholder="Ask something about your assessment..."
                  className="w-full resize-none bg-transparent px-4 py-4 pr-14 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                />


                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sending}
                  className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Send message"
                >

                  {sending ? (

                    <RefreshCw className="h-4 w-4 animate-spin" />

                  ) : (

                    <Send className="h-4 w-4" />

                  )}

                </button>

              </div>


              <div className="mt-2 flex items-center justify-between px-1">

                <p className="text-[10px] text-slate-400">
                  Press Enter to send · Shift + Enter for new line
                </p>

                <p className="text-[10px] text-slate-400">
                  {message.length}/1000
                </p>

              </div>


              <p className="mt-3 text-center text-[9px] leading-4 text-slate-400">
                AI responses are informational and should not be
                considered a medical diagnosis or prescription.
              </p>

            </div>

          </div>

        </motion.section>

      </main>

    </div>
  );
};

export default Chatbot