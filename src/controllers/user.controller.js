import _get from 'lodash/get';
import UserService from '../services/user.service';
import errorResponses from '../common/errorResponses';

const UserController = {
  findUser: async (req, res, next) => {
    try {
      const uid = _get(req, 'params.id');
      const userData = await UserService.findUser(uid);
      console.log('Exiting userController: findUser', userData);
      if (userData.length > 0) {
        res.send({ user: userData[0] });
      } else {
        console.log('User Not found');
        res.status(404).json(errorResponses.NotFound);
      }
    } catch (err) {
      console.log('somethings up with the findUser', err);
      next(err);
    }
  },
  updateUserScore: async (req, res, next) => {
    try {
      const uid = _get(req, 'params.id', req.body);
      const userData = await UserService.updateUserScore(uid, req.body);
      console.log('Exiting userController: updateUserScore', userData);
      if (!userData) {
        res.status(404).json(errorResponses.NotFound);
      }
      res.send({ user: userData });
    } catch (err) {
      console.log('somethings up with the updateUserScore');
      next(err);
    }
  }
};

export default UserController;
