// Read the Astrolabe music relay and write what it holds into this repository.
// Run by .github/workflows/mirror.yml once a day; safe to run by hand.
//   node tools/mirror.mjs [relay base]
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] || 'https://apc-second-brain-kit.web.app').replace(/\/$/, '');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const get = async (p) => { const r = await fetch(BASE + p, { signal: AbortSignal.timeout(30000) }); if (!r.ok) throw new Error(p + ' ' + r.status); return r.json(); };
const write = (rel, v) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v, null, 1) + '\n'); };

const { playlists } = await get('/api/music/playlists');
write('playlists/index.json', playlists);
const keep = new Set(['index.json']);
for (const p of playlists) {
  write(`playlists/${p.id}.json`, await get('/api/music/playlists/' + p.id));
  keep.add(p.id + '.json');
}
// a playlist its sharer took back leaves here too
for (const f of fs.readdirSync(path.join(ROOT, 'playlists'))) if (f.endsWith('.json') && !keep.has(f)) fs.rmSync(path.join(ROOT, 'playlists', f));
const top = await get('/api/music/top');
write('charts/top100.json', top);
console.log(`${playlists.length} playlists, ${top.songs.length} songs on the chart from ${top.dashboards} dashboards`);
