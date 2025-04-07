const { connect } = require("mongoose");

// connection URL
const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error("Missing MongoDB connection URL");
}

// establish connection
async function connectToDB() {
  try {
    await connect(url);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.log("Server connection issue", error);
    throw error;
  }
}

connectToDB();