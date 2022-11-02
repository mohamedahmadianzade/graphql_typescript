import DataLayer from "./dataLayer";
import UserLogin from "./interfaces/userLogin";
import { GraphQLError } from "graphql";
const dataLayer = new DataLayer();
export const resolvers = {
  Query: {
    login: (parent: any, params: UserLogin, context: any, info: any) => {
      return dataLayer.login(params);
    },
    logs: (parent: any, params: any, context: any, info: any) => {
      return dataLayer.logs();
    },
    logByUserId: (parent: any, params: any, context: any, info: any) => {
      return dataLayer.logByUserId(params.userId);
    },
    // access just authenticated users
    users: (parent: any, params: any, context: any, info: any) => {
      if (!context.accessToken) throw new GraphQLError("Forbidden access");
      return dataLayer.getAllUsers();
    },
  },
  Log: {
    username: (parent: any, params: any, context: any, info: any) => {
      return dataLayer.getUserInfo(parent.id);
    },
  },
  User: {
    logs: (parent: any) => {
      return dataLayer.logByUserId(parent.userId);
    },
  },
};
