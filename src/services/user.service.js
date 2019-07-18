import User from "../models/User";

const { pick } = require("lodash");
require("dotenv").config({ path: `${process.cwd()}/.env` });

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
  },
  updateUserScore: async (id, scoreData) => {
    console.log("Inside UserSearvice: updateUserScore", scoreData);
    let response;
    try {
      console.log("Question body", scoreData);
      if (scoreData.type && scoreData.type.toLowerCase() === "forum") {
        response = await User.update(
          { id },
          { $inc: { "forumProfile.score": scoreData.score } },
          {
            new: true
          }
        );
      } else if (
        scoreData.type &&
        scoreData.type.toLowerCase() === "playground"
      ) {
        response = await User.update(
          { id },
          { $inc: { "playgroundProfile.score": scoreData.score } },
          {
            new: true
          }
        );
      } else {
        return false;
      }
      console.log("UserScore saved successful", scoreData);
      return response;
    } catch (err) {
      console.log("Error in UserService: UpdateUSerScore", err);
      throw err;
    }
  }
};
export default UserService;
