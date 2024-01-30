let data = {}
let idx = 0;

for await (const f of Deno.readDir('./public')) {
  if (!f.isFile) continue;
  const ext = f.name.split('.')[1];
  if (ext !== "mp3") continue;
  console.log(f.name, ext); //name of the file
  const index = f.name.split('QuranTerjemah-')[1].substring(0, 3);
  data = { ...data, [index]: "https://quran-api.deno.dev/" + f.name };
  idx++;
}

writeJson('./files.json', data);

async function writeJson(filePath: string, o: any) {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(o));
  } catch (e) {
    console.log(e);
  }
}
//