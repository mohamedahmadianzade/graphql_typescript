import { GraphQLError } from "graphql";
import UserLogin from "./interfaces/userLogin";
import UserLog from "./interfaces/userLog.interface";
import { UserInfo } from "./interfaces/user.interface";
import { users, userLogs } from "./datasource";

export default class DataLayer {
  async login(userLogin: UserLogin): Promise<string> {
    let userInfo = users.find(
      (user) =>
        user.username == userLogin.username &&
        user.password == userLogin.password
    );
    if (!userInfo) throw new GraphQLError("username and password is wrong");
    return userInfo.fullname;
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
}
