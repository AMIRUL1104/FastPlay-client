import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

const client = new MongoClient(uri);
const db = client.db("BookBridgeDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
  // need to add some additional field . role , isblocked, 
 user: {
  additionalFields: {
    role: {
      type: ["user", "admin"],
      defaultValue: "user",
      input: false,
    },

    profileCompleted: {
      type: "boolean",
      defaultValue: false,
      input: false,
    },

    isBlocked: {
      type: "boolean",
      defaultValue: false,
      input: false,
    },
  },
}
});