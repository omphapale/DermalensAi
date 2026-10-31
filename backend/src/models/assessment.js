const mongoose = require("mongoose");

const possibleCauseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const selfCareSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "comfort",
    },
  },
  { _id: false }
);

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      default: "",
    },

    precautions: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const assessmentSchema = new mongoose.Schema(
  {
    image: { 
      data: { 
        type: Buffer, 
        required: true, 
      }, 
        contentType: 
      { 
        type: String, 
        required: true, 
      },
       originalName: 
       { 
        type: String, 
        required: true, 
      }, 
    },

    symptoms: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    painLevel: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    bodyLocation: {
      type: String,
      default: "",
    },

    aiAnalysis: {
      observations: {
        type: [String],
        default: [],
      },

      possibleCauses: {
        type: [possibleCauseSchema],
        default: [],
      },

      severity: {
        type: String,
        default: "Not specified",
      },

      urgency: {
        type: String,
        default: "Not specified",
      },

      guidelines: {
        type: [String],
        default: [],
      },

      selfCare: {
        type: [selfCareSchema],
        default: [],
      },

      medicationInformation: {
        type: [medicationSchema],
        default: [],
      },

      warnings: {
        type: [String],
        default: [],
      },

      disclaimer: {
        type: String,
        default:
          "This information is for educational purposes only and is not a diagnosis or prescription.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model(
  "AssessmentModel",
  assessmentSchema
);

module.exports = Assessment