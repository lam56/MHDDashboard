const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server active on ${PORT}`));
