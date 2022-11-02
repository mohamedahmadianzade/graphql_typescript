import User from "./interfaces/user.interface";
import UserLog from "./interfaces/userLog.interface";
let users: User[] = [
  {
    userId: "1",
    username: "1",
    password: "1",
    fullname: "mohamed",
  },
  {
    userId: "2",
    username: "2",
    password: "2",
    fullname: "bagheri",
  },
  {
    userId: "3",
    username: "3",
    password: "3",
    fullname: "hamid",
  },
];

let userLogs: UserLog[] = [
  {
    userId: "1",
    createdAt: new Date().toISOString(),
    action: "login",
    id: "1",
  },
];
export { users, userLogs };
