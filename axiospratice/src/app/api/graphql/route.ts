


import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import User from "@/model/user";

const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type RegisterResponse {
    message: String!
  }

  type DeleteResponse {
    message: String!
    success: Boolean!
  }

  type Query {
    users: [User!]!
    user(_id: ID!): User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): RegisterResponse!
    updateUser(_id: ID!, name: String, email: String, password: String): User
    deleteUser(_id: ID!): DeleteResponse!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (_: any, { _id }: any) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    register: async (_: any, { name, email, password }: any) => {
      const newUser = new User({ name, email, password });
      await newUser.save();
      return { message: "User registered successfully" };
    },
    updateUser: async (_: any, { _id, name, email, password }: any) => {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { name, email, password, _id },
        { new: true }
      );
      return updatedUser;
    },
    deleteUser: async (_: any, { _id }: any) => {
      const deleted = await User.findByIdAndDelete(_id);
      if (deleted) {
        return { message: "User deleted successfully", success: true };
      } else {
        return { message: "User not found", success: false };
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Expose both GET & POST for GraphQL API
const handler = startServerAndCreateNextHandler(server);
export { handler as GET, handler as POST };