import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Upload, X, Info, CircleAlert, Clock3, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { generateAssessment } from "../services/assessment.service";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const UploadTip = ({ text }) => {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500">
      {text}
    </span>
  );
}


const MAX_FILE_SIZE = 5 * 1024 * 1024;

const Form = () =>{
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [painLevel, setPainLevel] = useState(0);
  const [bodyLocation, setBodyLocation] = useState("");
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);



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

  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  };

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



  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    setError("");
    setIsAnalyzing(true);

    const response = await generateAssessment({
      symptoms,
      duration,
      bodyLocation,
      pain: painLevel,
      imageFile: image,
    });

    console.log("Assessment generated:", response);

    const assessmentId = response?.assessment?._id;

    if (!assessmentId) {
      throw new Error("Assessment ID was not returned by the server.");
    }

    navigate(`/result/${assessmentId}`);

  } catch (err) {
    console.error("Assessment generation failed:", err);

    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Failed to generate assessment. Please try again."
    );
  } finally {
    setIsAnalyzing(false);
  }
};


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


   return(
      <>
      <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-6xl"
          >

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">

              {/* =============================================
                  LEFT — IMAGE UPLOAD
              ============================================= */}

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6FFFB]">
                        <ImageIcon className="h-4 w-4 text-[#0EA5A8]" />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step 1
                        </p>

                        <h2 className="text-lg font-black">
                          Upload an image
                        </h2>
                      </div>

                    </div>

                  </div>

                  <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500 sm:block">
                    JPG / PNG / WEBP
                  </span>

                </div>

                {/* Upload Area */}

                <div className="mt-7">

                  {!preview ? (

                    <motion.div
                      whileHover={{
                        scale: 1.005,
                      }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`group relative flex min-h-[370px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-6 text-center transition ${
                        dragActive
                          ? "border-[#0EA5A8] bg-[#E6FFFB]"
                          : "border-slate-200 bg-slate-50/70 hover:border-[#0EA5A8]/50 hover:bg-[#E6FFFB]/50"
                      }`}
                    >

                      {/* Decorative circles */}

                      <div className="absolute left-[-30px] top-[-30px] h-32 w-32 rounded-full bg-cyan-100/50 blur-2xl" />

                      <div className="absolute bottom-[-50px] right-[-30px] h-40 w-40 rounded-full bg-teal-100/50 blur-2xl" />

                      <div className="relative">

                        <motion.div
                          animate={{
                            y: [0, -7, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg shadow-slate-900/5"
                        >

                          <Upload className="h-8 w-8 text-[#0EA5A8]" />

                        </motion.div>

                        <h3 className="mt-7 text-lg font-black">
                          Drop your image here
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          or click to browse from your device
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-2">

                          <UploadTip text="Clear image" />
                          <UploadTip text="Good lighting" />
                          <UploadTip text="Affected area visible" />

                        </div>

                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </motion.div>

                  ) : (

                    <div className="relative overflow-hidden rounded-3xl bg-slate-100">

                      <img
                        src={preview}
                        alt="Uploaded skin or injury"
                        className="h-[370px] w-full object-cover"
                      />

                      {/* Image overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                      {/* Scan animation */}

                      <motion.div
                        animate={{
                          top: ["5%", "92%", "5%"],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-0 h-[2px] w-full bg-cyan-300 shadow-[0_0_20px_#22d3ee]"
                      />

                      {/* AI Scan badge */}

                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-lg backdrop-blur">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#0EA5A8]" />

                        Image ready

                      </div>

                      {/* Remove */}

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {/* Bottom information */}

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">

                        <div className="rounded-xl bg-white/90 px-3 py-2 backdrop-blur">

                          <p className="max-w-[180px] truncate text-xs font-bold text-slate-800">
                            {image?.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {image
                              ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                              : ""}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-xl bg-[#0F172A]/90 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:bg-[#0F172A]"
                        >
                          Change image
                        </button>

                      </div>

                    </div>
                  )}

                </div>

                {/* Image guidelines */}

                <div className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4">

                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                  <p className="text-xs leading-5 text-slate-500">
                    For better visual analysis, use a clear, well-lit image
                    with the affected area visible. Avoid heavily filtered or
                    blurry images.
                  </p>

                </div>

              </motion.div>

              {/* RIGHT — SYMPTOM FORM */}

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.1,
                }}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7"
              >

                {/* Header */}

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6FFFB]">
                    <CircleAlert className="h-4 w-4 text-[#0EA5A8]" />
                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step 2
                    </p>

                    <h2 className="text-lg font-black">
                      Tell us about it
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-6">

                  {/* Symptoms */}

                  <div>

                    <label
                      htmlFor="symptoms"
                      className="mb-2.5 block text-sm font-bold text-slate-800"
                    >
                      What symptoms are you experiencing?
                    </label>

                    <textarea
                      id="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Example: Redness, itching, mild swelling..."
                      rows={5}
                      maxLength={1000}
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0EA5A8] focus:bg-white focus:ring-4 focus:ring-[#0EA5A8]/10"
                    />

                    <div className="mt-2 flex justify-end">
                      <span className="text-[10px] text-slate-400">
                        {symptoms.length}/1000
                      </span>
                    </div>

                  </div>

                  {/* Duration */}

                  <div>

                    <label
                      htmlFor="duration"
                      className="mb-2.5 block text-sm font-bold text-slate-800"
                    >
                      How long have you had this concern?
                    </label>

                    <div className="relative">

                      <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0EA5A8] focus:bg-white focus:ring-4 focus:ring-[#0EA5A8]/10"
                      >

                        <option value="">
                          Select duration
                        </option>

                        <option value="less_than_24_hours">
                          Less than 24 hours
                        </option>

                        <option value="1_3_days">
                          1-3 days
                        </option>

                        <option value="4_7_days">
                          4-7 days
                        </option>

                        <option value="1_2_weeks">
                          1-2 weeks
                        </option>

                        <option value="2_4_weeks">
                          2-4 weeks
                        </option>

                        <option value="more_than_month">
                          More than a month
                        </option>

                        <option value="unknown">
                          I'm not sure
                        </option>

                      </select>

                      <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />

                    </div>

                  </div>

                  {/* Body location */}

                  <div>

                    <label
                      htmlFor="bodyLocation"
                      className="mb-2.5 block text-sm font-bold text-slate-800"
                    >
                      Where is the affected area?
                    </label>

                    <div className="relative">

                      <select
                        id="bodyLocation"
                        value={bodyLocation}
                        onChange={(e) => setBodyLocation(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0EA5A8] focus:bg-white focus:ring-4 focus:ring-[#0EA5A8]/10"
                      >

                        <option value="">
                          Select body location
                        </option>

                        <option value="face">
                          Face
                        </option>

                        <option value="neck">
                          Neck
                        </option>

                        <option value="chest">
                          Chest
                        </option>

                        <option value="back">
                          Back
                        </option>

                        <option value="arms">
                          Arms
                        </option>

                        <option value="hands">
                          Hands
                        </option>

                        <option value="legs">
                          Legs
                        </option>

                        <option value="feet">
                          Feet
                        </option>

                        <option value="abdomen">
                          Abdomen
                        </option>

                        <option value="other">
                          Other
                        </option>

                      </select>

                      <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />

                    </div>

                  </div>

                  {/* Pain */}

                  <div>

                    <div className="mb-3 flex items-center justify-between">

                      <label className="text-sm font-bold text-slate-800">
                        Pain or discomfort
                      </label>

                      <span className="rounded-lg bg-[#E6FFFB] px-2.5 py-1 text-xs font-black text-[#087f82]">
                        {painLevel}/10
                      </span>

                    </div>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={painLevel}
                      onChange={(e) =>
                        setPainLevel(Number(e.target.value))
                      }
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0EA5A8]"
                    />

                    <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                      <span>No discomfort</span>
                      <span>Severe discomfort</span>
                    </div>

                  </div>

                </div>

                {/* Error */}

                <AnimatePresence>

                  {error && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                      }}
                      className="mt-6 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4"
                    >

                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                      <p className="text-xs font-medium leading-5 text-red-600">
                        {error}
                      </p>

                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F172A] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {isAnalyzing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Analyzing your image...
                    </>
                  ) : (
                    <>
                      Analyze With AI
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </button>

                <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                  Your information is used to generate this assessment.
                  Results are informational and not a medical diagnosis.
                </p>

              </motion.div>

            </div>

          </form>
      </>
   )
}
export default Form