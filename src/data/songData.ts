import { Song } from "../types/songData";
import { v4 } from "uuid";

export const songList: Song[] = [
  {
    id: v4(),
    songName: "First Song",
    artistName: "Artist",
    trackNumber: 1,
    file: new File([""], "example-song.mp3", { type: "audio/mp3" }),
  },
];
