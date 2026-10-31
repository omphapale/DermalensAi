import ApiError from "../utils/ApiError.js";

export const validateAssessment = (req, res, next) => {
  const {
    symptoms = "",
    duration = "",
    painLevel,
    bodyLocation = "",
  } = req.body;

  if (!req.file) {
    return next(
      new ApiError(
        400,
        "Please upload an image for assessment."
      )
    );
  }

  if (painLevel !== undefined) {
    const pain = Number(painLevel);

    if (Number.isNaN(pain) || pain < 0 || pain > 10) {
      return next(
        new ApiError(
          400,
          "Pain level must be between 0 and 10."
        )
      );
    }
  }

  if (symptoms.length > 2000) {
    return next(
      new ApiError(
        400,
        "Symptoms description is too long."
      )
    );
  }

  next();
};

export const validateChatMessage = (req, res, next) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return next(
      new ApiError(
        400,
        "Please enter a message."
      )
    );
  }

  if (message.length > 5000) {
    return next(
      new ApiError(
        400,
        "Message is too long."
      )
    );
  }

  next();
};