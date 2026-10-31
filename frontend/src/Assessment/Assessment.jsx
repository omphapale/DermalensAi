import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import Form from "./Form";
import BottomCard from "./BottomCard";
import AnalysisOverlay from "./AnalysisOverlay";


const MAX_FILE_SIZE = 10 * 1024 * 1024;

const Assessment = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [painLevel, setPainLevel] = useState(0);
  const [bodyLocation, setBodyLocation] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ---------------------------------------------------------
  // CLEANUP IMAGE URL
  // ---------------------------------------------------------

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ---------------------------------------------------------
  // IMAGE VALIDATION
  // ---------------------------------------------------------

  const validateFile = (file) => {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 10MB.");
      return false;
    }

    return true;
  };

  // ---------------------------------------------------------
  // HANDLE IMAGE
  // ---------------------------------------------------------

  const handleImage = (file) => {
    setError("");

    if (!validateFile(file)) {
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(imageUrl);
  };

  // ---------------------------------------------------------
  // FILE INPUT
  // ---------------------------------------------------------

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  };

  // ---------------------------------------------------------
  // DRAG & DROP
  // ---------------------------------------------------------

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleImage(file);
    }
  };

  // ---------------------------------------------------------
  // REMOVE IMAGE
  // ---------------------------------------------------------

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ---------------------------------------------------------
  // FORM VALIDATION
  // ---------------------------------------------------------

  const validateForm = () => {
    setError("");

    if (!image) {
      setError("Please upload an image before continuing.");
      return false;
    }

    if (!symptoms.trim()) {
      setError("Please describe your symptoms.");
      return false;
    }

    if (!duration) {
      setError("Please select how long you have had the concern.");
      return false;
    }

    if (!bodyLocation) {
      setError("Please select the affected body location.");
      return false;
    }

    return true;
  };

  
  

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">

      {/* NAVBAR */}

      <Navbar/>

      {/* MAIN CONTENT */}

      <section className="relative min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">

        {/* Background glow */}

        <div className="pointer-events-none absolute left-[-15%] top-[15%] h-[450px] w-[450px] rounded-full bg-cyan-200/30 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-15%] top-[25%] h-[500px] w-[500px] rounded-full bg-teal-200/25 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* PAGE HEADER */}

          <PageHeader/>

          {/* PROGRESS */}

          <div className="mx-auto mt-10 max-w-4xl">

            <div className="flex items-center justify-center">

              <ProgressStep
                number="01"
                label="Image"
                active
              />

              <ProgressLine active />

              <ProgressStep
                number="02"
                label="Symptoms"
                active={!!image}
              />

              <ProgressLine active={!!image} />

              <ProgressStep
                number="03"
                label="Analyze"
                active={!!image && !!symptoms}
              />

            </div>

          </div>

          {/* FORM */}

          <Form/>

          {/* BOTTOM SAFETY CARDS */}

          <BottomCard/>

        </div>

      </section>

      {/* ANALYSIS OVERLAY */}

      <AnalysisOverlay/>

    </main>
  );
}


/* COMPONENTS*/

const ProgressStep =({
  number,
  label,
  active,
}) =>{
  return (
    <div className="flex flex-col items-center gap-2">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black transition ${
          active
            ? "bg-[#0EA5A8] text-white shadow-lg shadow-[#0EA5A8]/20"
            : "bg-slate-200 text-slate-400"
        }`}
      >
        {number}
      </div>

      <span
        className={`hidden text-[10px] font-bold uppercase tracking-wider sm:block ${
          active ? "text-slate-700" : "text-slate-400"
        }`}
      >
        {label}
      </span>

    </div>
  );
}


const ProgressLine = ({ active }) =>{
  return (
    <div
      className={`mx-2 h-px w-12 transition sm:mx-4 sm:w-24 ${
        active
          ? "bg-[#0EA5A8]"
          : "bg-slate-200"
      }`}
    />
  );
}

export default Assessment;

