const express = require("express")
const assessmentcontroller = require("../controllers/assessmentcontroller")
const upload = require("../middleware/uploadMiddleware")

const assessmentRouter = express.Router()

/**
 * @route POST /api/assessment
 * @description generate new assessement result based on the image, symptoms, duration, body location, pain provided
 * @access public
 */

assessmentRouter.post("/", upload.single("image"), assessmentcontroller.generateAssessmentController)

/**
 * @route GET /api/assessment/:assessmentId
 * @description get assessment by assessment id
 * @access public
 */
assessmentRouter.get("/:assessmentId", assessmentcontroller.getAssessmentByIdController)

module.exports = assessmentRouter
