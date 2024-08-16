import "reflect-metadata";
import { AppDataSource } from "./data-source"
import * as express from "express";
import { config } from "dotenv";
import router from "./routes/notification.route";

config();
const PORT = process.env.PORT || 3000;


// Function to initialize the server
const startServer = async () => {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
  
      // Create and setup express app
      const app = express();
      app.use(express.json());
  
      // Setup routes
      app.use("/", router);
      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
  
      // Start listening on the specified port
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log('Data Source initialization error', error);
    }
  };
  
  // Start the server
  startServer();