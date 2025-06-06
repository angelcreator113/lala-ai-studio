// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import captionsRouter from "./routes/captions.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/captions", captionsRouter);

app.get("/api/health", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
