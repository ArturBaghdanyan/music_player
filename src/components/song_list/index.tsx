import { SongRow } from "../song_row";
import { Song } from "../../types/songData";
import { useCard } from "../context/SongContext";

export const SongList = () => {
  const { songs } = useCard();

  return (
    <div>
      <h2>Song List</h2>
      {songs.map((song: Song) => (
        <SongRow key={song.trackNumber} song={song} />
      ))}
    </div>
  );
};