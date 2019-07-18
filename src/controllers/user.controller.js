import UserService from "../services/user.service";

const UserController = {
  findUser: async (req, res, next) => {
    try {
      const userData = await UserService.findUser(uid);
      console.log("Exiting userController: findUser");
      res.send(userData);
    } catch (err) {
      console.log("somethings up with the findUser");
      next(err);
    }
  }
};
