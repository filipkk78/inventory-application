const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateGenre = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
  body("imageUrl").trim().isURL().withMessage("Image url must be an url"),
  body("oldName")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
];

exports.addGenre = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("genre-form", {
        errors: errors.array(),
      });
    }
    const { name, imageUrl } = req.body;
    await db.addGenre(name, imageUrl);
    res.redirect("/");
  },
];

exports.updateGenre = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("update-genre-form", {
        errors: errors.array(),
        genre: await db.getGenreByName(oldName),
      });
    }
    const { name, imageUrl, oldName } = req.body;
    await db.updateGenre(name, imageUrl, oldName);
    res.redirect("/");
  },
];
