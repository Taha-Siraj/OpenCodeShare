import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors());
const port = 5000;







app.get('api/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
