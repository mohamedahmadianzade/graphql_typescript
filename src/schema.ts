export const typeDefs = `#graphql
type User{
    fullname:String!
    username:String!
    logs:[Log]
}

type Log{
    id:ID!
    createdAt:String!
    action:String!
    username:UserInfoForLog
}
interface UserInfoForLog{
    fullname:String
}


type Query{
    login(username:String,password:String):String
    logs:[Log]
    logByUserId(userId:String):[Log]
    users:[User]
}
`;
