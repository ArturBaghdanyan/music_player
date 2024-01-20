import { uuid as uuidv4 } from "uuidv4";
import { Song } from "../types/songData";

export const songList: Song[] = [{
    songName: 'First Song',
    artistName: 'Artist',
    trackNumber: uuidv4(),
    file: new File([''], 'example-song.mp3', { type: 'audio/mp3' }),
  }];