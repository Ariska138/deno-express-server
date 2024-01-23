import { express } from "./deps.ts";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(8000, () => {
  console.log("server run on http://localhost:8000");
});

//deno run -A server.ts