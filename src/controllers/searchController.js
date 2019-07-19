/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
import recommender from 'recommender';
import QuestionsService from '../services/questions.service';
import errorResponses from '../common/errorResponses';
// get the list of questions from mongo
const SearchController = {
  returnClosestMatches: async (req, res, next) => {
    try {
      const documents = await QuestionsService.getAllQuestions();
      if (documents && documents.length) {
        const titlesOnly = documents.map(data => {
          return data.title;
        });
        const { searchQuery } = req ? req.query : null;
        recommender.tfidf(searchQuery, titlesOnly, sortedDocs => {
          console.log(sortedDocs);
          const sortedDocList = sortedDocs.slice(0, 5);
          // eslint-disable-next-line array-callback-return
          const searchResponse = documents.map(doc => {
            if (sortedDocList.includes(doc.title)) {
              return doc;
            }
          });
          res.json({
            suggested: searchResponse
          });
        });
      } else {
        res.status(404).json(errorResponses.NotFound);
      }
    } catch (error) {
      next(error);
    }
  }
};
// config to define app settings
export default SearchController;
