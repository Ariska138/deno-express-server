import { Application, Router } from './deps.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/', async ({ response, request }) => {

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


router.get('/:juz', async ({ response, request, params }) => {

  const juz = params.juz;
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

router.post('/', (ctx) => {
  ctx.response.body = 'Received a POST HTTP method';
});

router.put('/', (ctx) => {
  ctx.response.body = 'Received a PUT HTTP method';
});

router.delete('/', (ctx) => {
  ctx.response.body = 'Received a DELETE HTTP method';
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });