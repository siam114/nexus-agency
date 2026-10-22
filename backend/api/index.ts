import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Ensure database connection is initialized for serverless invocations
connectDB().catch(() => {
  // connection logged inside connectDB
});

export default app;

