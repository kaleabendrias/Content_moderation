const express = require("express");
const multer = require("multer");
const {
  moderateImg,
  moderateAud,
} = require("../controllers/moderationController");
const { moderateTxt } = require("../controllers/moderationController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /moderation/image:
 *   post:
 *     summary: Moderate image content for harmful content.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Moderation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 moderationResult:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       score:
 *                         type: number
 *                 isHarmful:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */
router.post("/image", upload.single("file"), moderateImg);

/**
 * @swagger
 * /moderation/text:
 *   post:
 *     summary: Moderate text content for harmful content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This is a sample text for moderation."
 *     responses:
 *       200:
 *         description: Moderation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 moderationResult:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       score:
 *                         type: number
 *                 isHarmful:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */
router.post("/text", moderateTxt);

router.post("/audio", upload.single("file"), moderateAud);

module.exports = router;
