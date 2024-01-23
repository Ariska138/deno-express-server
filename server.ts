import { express } from "./deps.ts";

const app = express();

app.get("/", async (req, res) => {

  const resp = await fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/1.json", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });

  const data = await resp.json();

  res.status(200).json(data);
});

app.listen(8000, () => {
  console.log("server run on http://localhost:8000");
});

//deno run -A server.ts