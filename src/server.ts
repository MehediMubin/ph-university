import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let serverVar: Server;

async function server() {
   try {
      await mongoose.connect(config.database_url as string);
      serverVar = app.listen(config.port, () => {
         console.log(`PH University app listening on port ${config.port}`);
      });
   } catch (error) {
      console.log(error);
   }
}

server();

process.on("unhandledRejection", () => {
   serverVar.close(() => {
      process.exit(1);
   });
});
