import { useEffect } from "react";
import { Song } from "../../types/songData";
import { useCard } from "../../context/SongContext";

import play from "../../assets/play.png";
import stop from "../../assets/stop.png";

import style from "./style.module.scss";

interface Props {
  song: Song;
}

export const AudioPlayer = ({ song }: Props) => {
  const {
    playSong,
    pauseSong,
    stopSong,
    currentSongId,
    isPlaying,
    currentTime,
    duration,
  } = useCard();

  const isCurrent = currentSongId === song.id;

  const formatTime = (sec: number) => {
    if (!sec) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const audioEl = document.getElementById(
      `audio-${song.id}`
    ) as HTMLAudioElement;
    if (audioEl) {
      audioEl.currentTime = value;
    }
  };

  const audioURL = URL.createObjectURL(song.file);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  return (
    <div className={style.music}>
      <h3>{song.songName}</h3>
      <audio id={`audio-${song.id}`} src={audioURL}></audio>
      <div style={{ marginTop: 10 }}>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step={1}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>
      {!isCurrent && (
        <button onClick={() => playSong(song)} className={style.play_button}>
          <img src={play} alt="play" />
        </button>
      )}

      {isCurrent && isPlaying && (
        <button onClick={pauseSong} className={style.play_button}>
          <img src={stop} alt="pause" />
        </button>
      )}

      {isCurrent && !isPlaying && (
        <button onClick={() => playSong(song)} className={style.play_button}>
          <img src={play} alt="resume" />
        </button>
      )}

      {isCurrent && (
        <button onClick={stopSong} className={style.play_button}>
          Reset
        </button>
      )}
    </div>
  );
};
