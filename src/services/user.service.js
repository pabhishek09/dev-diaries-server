const { pick } = require("lodash");
require("dotenv").config({ path: `${process.cwd()}/.env` });
import User from "../models/User";

const UserService = {
  findUser: async uid => {
    console.log("Inside userService: findUser");
    let response;
    try {
      response = await User.find({ id: uid });
      console.log("findUser successful", response);
      return response;
    } catch (err) {
      console.log("Error in findUser", err);
      throw err;
    }
  },
  createUser: async userData => {
    try {
      console.log("Inside CreateUSer", userData);
      let gitData = pick(userData, [
        "login",
        "id",
        "node_id",
        "avatar_url",
        "gravatar_id",
        "url",
        "html_url",
        "gists_url",
        "email"
      ]);
      gitData = {
        ...gitData,
        ...{ playgroundProfile: { score: 0, level: "fledgeling" } }
      };
      console.log("gitData", gitData);
      const user = new User(gitData);
      const response = await user.save();
      console.log("user saved successful", response);
      return response;
    } catch (err) {
      console.log("Error in createUser", err, userData);
      throw err;
    }
  }
};
export default UserService;
