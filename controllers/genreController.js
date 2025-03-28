const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateGenre = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
  body("imageUrl").trim().isURL().withMessage("Image url must be an url"),
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
    db.addGenre(name, imageUrl);
    res.redirect("/");
  },
];
