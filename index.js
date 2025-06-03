// // ----- Main Entry Point (index.js) -----

// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const morgan = require("morgan");
// const cors = require("cors");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config({ path: "./.env" });

// // Connect to MongoDB
// connectDB();

// // Initialize express app
// const app = express();

// // Middlewares
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON bodies

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       // "https://hms-frontend-ecru.vercel.app",  // deployed frontend https://hms-frontend-ecru.vercel.app/
//       "http://localhost:5173",                 // local dev frontend
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// // Logging only in development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // API Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));


// // Home route
// app.get("/", (req, res) => {
//   res.send("💰 Money Manager API is running...");
// });

// // 404 Handler for unknown routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack.red);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // Start server
// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(
//     `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   );
// });

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
connectDB();

const app = express();

app.use(
  cors({
    origin: ["https://money-frontend-bice.vercel.app/login","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.get("/", (req, res) => {
  res.send("💰 Money Manager API is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack.red);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
