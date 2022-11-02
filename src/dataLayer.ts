import { GraphQLError } from "graphql";
import UserLogin from "./interfaces/userLogin";
import UserLog from "./interfaces/userLog.interface";
import { UserInfo } from "./interfaces/user.interface";
import { users, userLogs } from "./datasource";
import UserLoginResult from "./interfaces/userLoginResult.inteface";
const jwt = require("jsonwebtoken");
export default class DataLayer {
  userTokens: string[] = [];

  async login(
    userLogin: UserLogin,
    secrectKey: string
  ): Promise<UserLoginResult> {
    let userInfo = users.find(
      (user) =>
        user.username == userLogin.username &&
        user.password == userLogin.password
    );
    if (!userInfo) throw new GraphQLError("username and password is wrong");

    const accessToken = jwt.sign(
      {
        sub: userInfo.userId,
        username: userInfo.username,
      },
      secrectKey
    );
    //simple token  manager
    this.userTokens.push(accessToken);
    return {
      username: userInfo.username,
      accessToken,
    };
  }

  async getAllUsers(): Promise<UserInfo[]> {
    return users.map((user) => ({
      userId: user.userId,
      username: user.username,
      fullname: user.fullname,
    }));
  }

  async logs(): Promise<UserLog[]> {
    return userLogs;
  }

  async logByUserId(userId: string): Promise<UserLog[]> {
    return userLogs.filter((userLog) => userLog.userId == userId);
  }

  async getUserInfo(userId: string): Promise<any | undefined> {
    const userInfo = users.find((user) => user.userId == userId);
    return { fullname: userInfo?.fullname };
  }

  checkToken(accessToken: string, secret: string): void {
    if (!accessToken || !this.userTokens.find((item) => item == accessToken))
      throw new GraphQLError("Forbidden access - token is not provided");
    try {
      jwt.verify(accessToken, secret);
    } catch (error) {
      throw new GraphQLError("Forbidden access - token is not valid");
    }
  }
}
