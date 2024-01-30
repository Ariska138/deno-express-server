import { Application, Router, send } from './deps.ts';

const ROOT_DIR = "./public", ROOT_DIR_PATH = "/";

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/api', async ({ response, request }) => {

  const juz = request.url.searchParams.get('juz');
  console.log(juz);

  const resp = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${juz ?? 1}.json`, {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });


  const data = await resp.json();


  response.status = 200
  response.headers.set("Content-Type", "application/json") // set to html if you want
  response.body = {
    data
  }
});


router.get('/api/:juz', async ({ response, request, params }) => {

  const juz = params.juzy;
  console.log(juz);

  const resp = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${juz ?? 1}.json`, {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });

  const data = await resp.json();


  response.status = 200
  response.headers.set("Content-Type", "application/json") // set to html if you want
  response.body = {
    data
  }
});

router.post('/api', (ctx) => {
  ctx.response.body = 'Received a POST HTTP method';
});

router.put('/api', (ctx) => {
  ctx.response.body = 'Received a PUT HTTP method';
});

router.delete('/api', (ctx) => {
  ctx.response.body = 'Received a DELETE HTTP method';
});

app.use(router.allowedMethods());
app.use(router.routes());

app.use(async (ctx, next) => {
  if (!ctx.request.url.pathname.startsWith(ROOT_DIR_PATH)) {
    next();
    return;
  }
  const filePath = ctx.request.url.pathname.replace(ROOT_DIR_PATH, "");
  await send(ctx, filePath, {
    root: ROOT_DIR,
  });
});


app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });