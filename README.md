# Astrolabe Music

Every [Astrolabe](https://github.com/goggledefogger/second-brain-dashboard) has a music player built in, and the member's library stays on their own computer. Two things can leave it, and only when the member chooses:

- **A playlist they share.** Its name, up to three genres, and its songs (YouTube ids with title, artist and album). A display name only if they gave one. They can take it back from the player at any time.
- **Play counts, for the community chart.** Only from members who said yes during setup (they can change it from the player). Per song, how many plays: no name, no playlists, no times. Each dashboard sends under a random key it made itself, so a later send replaces its last one rather than adding to it.

This repository is the public record of both. Once a day a GitHub Action reads the Astrolabe music relay and writes what it holds here:

- `playlists/index.json`: every shared playlist, newest first, with its genres.
- `playlists/<id>.json`: one shared playlist, with its songs.
- `charts/top100.json`: the Top 100 songs, artists and albums, ranked first by how many people play them, then by plays, from the last 90 days of counts.

## Genres

pop, rock, indie, alternative, hip-hop, r-and-b, soul-funk, jazz, blues, country, folk, electronic, dance, ambient, classical, latin, reggae, metal, punk, world, soundtrack, focus, workout, chill, kids.

## Something here should not be

Open an issue with the playlist id. The member who shared it can also take it down from their own player.
