const {
  moderateImage,
  moderateText,
} = require("../services/moderationService");
const { moderateAudio } = require("../utils/aiModels");

const moderateImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageBuffer = req.file.buffer;
    const moderationResult = await moderateImage(imageBuffer);
    res.status(200).json({ moderationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const moderateAud = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const audioBuffer = req.file.buffer;
    const moderationResult = await moderateAudio(audioBuffer);
    res.status(200).json({ moderationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const moderateTxt = async (req, res) => {
  try {
    const { text } = req.body;
    const moderationResult = await moderateText(text);
    res.status(200).json({ moderationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { moderateImg, moderateTxt, moderateAud };
