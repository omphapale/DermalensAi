const app = require("../app");
const connectToDB = require("../database");

let isConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connectToDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Backend error:", error);

    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};