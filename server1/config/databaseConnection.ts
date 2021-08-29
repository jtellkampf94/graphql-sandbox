import mongoose from "mongoose";

const databaseConnection = async () => {
  const connection = await mongoose.connect("mongodb://localhost:27017/gql");

  if (connection) {
    console.log(
      `MongoDD database connected at host ${connection.connection.host}`
    );
  }
};

export default databaseConnection;
