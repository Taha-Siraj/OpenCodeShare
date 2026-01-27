import "dotenv/config";
import express from "express";
import cors from "cors";
import textRoutes from './routes/textRoutes.js';
import fileRoutes from  './routes/fileRoutes.js'
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: "http://localhost:5173",
}));
const port = 5000;


app.use("/api", textRoutes);
app.use("/api", fileRoutes);





app.get('/api/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
