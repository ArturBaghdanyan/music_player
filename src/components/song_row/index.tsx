import { Song } from "../../types/songData";

export const SongRow: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <div>
      <p>Song Name: {song.songName}</p>
      <p>Artist Name: {song.artistName}</p>
      <p>Track Number: {song.trackNumber}</p>
      {song.file && (
        <p>
          File: {song.file.name} ({(song.file.size / 1024).toFixed(2)} KB)
        </p>
      )}
    </div>
  );
};