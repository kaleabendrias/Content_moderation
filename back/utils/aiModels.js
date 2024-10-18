const axios = require("axios");
require("dotenv").config();
const moderateText = async (text) => {
  try {
    if (typeof text !== "string") {
      throw new Error("Text input must be a string.");
    }
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/unitary/toxic-bert",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in text moderation:", error);
    throw new Error("Text moderation failed");
  }
};

const moderateImage = async (imageBuffer) => {
  try {
    if (!Buffer.isBuffer(imageBuffer)) {
      throw new Error("Image input must be a Buffer.");
    }
    if (imageBuffer.length === 0) {
      throw new Error("Image buffer cannot be empty.");
    }
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error(
        "HUGGINGFACE_API_KEY is not set in environment variables."
      );
    }

    const imageBase64 = imageBuffer.toString("base64");

    const candidateLabels = [
      "explicit content",
      "violence",
      "gore",
      "drugs",
      "weapons",
      "hate symbols",
      "safe content",
      "normal photo",
      "family friendly",
      "appropriate content",
    ];

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
      {
        inputs: imageBase64,
        parameters: {
          candidate_labels: candidateLabels,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Image moderation failed: ${error.response.status} - ${
            error.response.data.error || "Unknown error"
          }`
        );
      } else if (error.request) {
        throw new Error("Image moderation failed: No response from server");
      }
    }
    throw error;
  }
};

const moderateAudio = async (audio) => {
  try {
    if (!Buffer.isBuffer(audio)) {
      throw new Error("Audio input must be a Buffer.");
    }
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/openai/whisper-large",
      audio,
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, 'Content-Type': 'audio/wav', },
        params: {
          return_timestamps: true, // Enable timestamp generation for long audio
        },
      }
    );

    const transcription = response.data.text;
    console.log("Transcription:", transcription);
    moderateText(transcription);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  moderateText,
  moderateImage,
  moderateAudio,
};
