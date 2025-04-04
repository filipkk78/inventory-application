const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validateGenre = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
  body("imageUrl")
    .optional()
    .default("https://placehold.co/600x900?text=Genre+Placeholder&font=roboto")
    .trim()
    .isURL()
    .withMessage("Image url must be an url"),
  body("oldName")
    .optional()
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

const validateGenreUpdate = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
  body("imageUrl")
    .optional()
    .default("https://placehold.co/600x900?text=Genre+Placeholder&font=roboto")
    .trim()
    .isURL()
    .withMessage("Image url must be an url"),
  body("pwd")
    .trim()
    .equals(process.env.ADMIN_PWD)
    .withMessage("Incorrect password"),
  body("oldName")
    .optional()
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage(`Name must be between 5 and 30 characters`),
];

exports.updateGenre = [
  validateGenreUpdate,
  async (req, res) => {
    const { name, imageUrl, oldName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("update-genre-form", {
        errors: errors.array(),
        genre: (await db.getGenreByName(oldName)).at(0),
      });
    }
    await db.updateGenre(name, imageUrl, oldName);
    res.redirect("/");
  },
];

const validateAdminPwd = [
  body("pwd")
    .trim()
    .equals(process.env.ADMIN_PWD)
    .withMessage("Incorrect password"),
];

exports.deleteGenre = [
  validateAdminPwd,
  async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("delete-genre-auth", {
        errors: errors.array(),
        genre: await db.getGenreByName(name),
      });
    }
    await db.deleteGenre(name);
    res.redirect("/");
  },
];
