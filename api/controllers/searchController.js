require("dotenv").config({ path: `${process.cwd()}/.env` });
const errorResponses = require("../Utils/errorResponses");
const { tfidf } = require("recommender");
const mongoose = require("mongoose");

// get the list of questions from mongo
const fetchQuestions = () => {};
const returnClosestMatches = (req, res) => {
  const documents = fetchQuestions;
  const titlesOnly = documents.map(data => {
    return data.title;
  });
  const { searchQuery } = req ? req.query : null;
  tfidf(searchQuery, titlesOnly, sortedDocs => {
    console.log(sortedDocs);
    sortedDocs = sortedDocs.slice(0, 5);
    searchResponse = documents.map(doc => {
      if (sortedDocs.includes(doc.title)) {
        return doc;
      }
    });
    res.json({
      suggested: searchResponse
    });
  });
};
// config to define app settings
const config = process.env;
module.exports = returnClosestMatches;
