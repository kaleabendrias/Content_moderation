const aiModels = require("../utils/aiModels");

const moderateImage = async (imageBuffer) => {
  const moderationResult = await aiModels.moderateImage(imageBuffer);
  const isHarmful = moderationResult.some((concept) =>
    ["explicit", "gore", "nudity"].includes(concept.label)
  );
  return { moderationResult, isHarmful };
};

const moderateText = async (text) => {
    const moderationResult = await aiModels.moderateText(text);
    const isHarmful = moderationResult.some((concept) =>
      ["explicit", "gore", "nudity"].includes(concept.label)
    );
    return { moderationResult, isHarmful };
  };

module.exports = { moderateImage, moderateText };
