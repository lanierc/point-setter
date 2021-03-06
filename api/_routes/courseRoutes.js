const express = require("express");

const { setParams, apiPagination } = require("../_helpers/pagination");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const { apiKey: access_token } = req.query;
  try {
    const state = ["available", "unpublished"];
    const include = ["term"];
    const url = "https://canvas.instructure.com/api/v1/courses";

    const params = setParams(access_token, state, include);
    const courses = await apiPagination(url, params, []);
    res.status(200).json({
      courses,
    });
  } catch (e) {
    res.status(400);
  }
});

exports.router = router;
