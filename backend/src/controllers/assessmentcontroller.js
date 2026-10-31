const { generateAssessment }  = require("../services/geminiService")
const AssessmentModel = require("../models/assessment")

/**
 * @descrption Controller to generate assessment result based on image , symptoms, duaration, body location, pain
 */


async function generateAssessmentController(req, res) {

  try {

    // Get uploaded image
    const imageFile = req.file;

    // Get user-provided information
    const {
      symptoms,
      duration,
      bodyLocation,
      painLevel
    } = req.body;


    // Generate assessment using AI
    const assessmentByAi = await generateAssessment({

      image: imageFile,

      symptoms,
      duration,
      bodyLocation,
      painLevel

    });


    // Check AI response in console
    console.log("AI ASSESSMENT:");

    console.dir(assessmentByAi, {
      depth: null
    });


    // Save assessment in database
    const assessment = await AssessmentModel.create({

      image: {
        data: imageFile.buffer,
        originalName: imageFile.originalname,
        contentType: imageFile.mimetype,
        size: imageFile.size
      },

      symptoms,
      duration,
      bodyLocation,
      painLevel,

      aiAnalysis: assessmentByAi

    });
    // Send response
    res.status(201).json({
     message: "Assessment generated successfully",
     assessment,
     aiAnalysis: assessment.aiAnalysis 
    });
  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: "Internal server error",

      message: err.message

    });

  }

}


async function getAssessmentByIdController(req, res) {
  try {
    const { assessmentId } = req.params;

    const assessment = await AssessmentModel.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        message: "Assessment not found."
      });
    }

    const assessmentData = assessment.toObject();

    assessmentData.imageUrl =
      `data:${assessmentData.image.contentType};base64,` +
      assessmentData.image.data.toString("base64");

    res.status(200).json({
      message: "Assessment fetched successfully.",
      assessment: assessmentData
    });

  } catch (err) {
    console.error("Get assessment error:", err);

    res.status(500).json({
      message: "Failed to fetch assessment.",
      error: err.message
    });
  }
}



module.exports = {generateAssessmentController, getAssessmentByIdController}