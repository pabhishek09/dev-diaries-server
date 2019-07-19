/* eslint-disable consistent-return */
import recommender from 'recommender';
import QuestionsService from '../services/questions.service';

// get the list of questions from mongo
const SearchController = {
  returnClosestMatches: async (req, res, next) => {
    try {
      const documents = await QuestionsService.getAllQuestions();
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
    } catch (error) {
      next(error);
    }
  }
};
// config to define app settings
export default SearchController;
