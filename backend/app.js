// const bodyParser = require("body-parser");
// const express = require("express");

// const eventRoutes = require("./routes/events");
// const authRoutes = require("./routes/auth");

// const app = express();

// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });

// app.use(authRoutes);

// app.use("/events", eventRoutes);

// app.use((error, req, res, next) => {
//   const status = error.status || 500;
//   const message = error.message || "Something went wrong.";
//   res.status(status).json({ message: message });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

const app = express();

// --- Middleware ---
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// --- API Routes ---
app.use(authRoutes);
app.use("/events", eventRoutes);

// --- Error handling ---
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message });
});

// --- Serve frontend build ---
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// اگر مسیر با هیچ API نخورد، فایل index.html فرانت‌اند رو بده
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


