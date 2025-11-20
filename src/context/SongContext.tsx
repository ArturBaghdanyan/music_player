import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { Song } from "../types/songData";

type SongTypeProvider = {
  children: ReactNode;
};

type SongType = {
  songs: Song[];
  addSong: (song: Song) => void;
  selectedFiles: any;
  setSelectedFiles: Dispatch<SetStateAction<any>>;
  removeSong: (id: string) => void;
  removeSelectedFile: (name: string) => void;
  playSong: (song: Song) => void;
  stopSong: () => void;
  pauseSong: () => void;
  currentSongId: string | null;
  setCurrentSongId: Dispatch<SetStateAction<string | null>>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

const SongContext = createContext<SongType | null>(null);

const SongProvider: FC<SongTypeProvider> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const addSong = (song: Song) => setSongs((prev) => [...prev, song]);

  const removeSong = (id: string) => {
    if (currentSongId === id) stopSong();
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const removeSelectedFile = (name: string) => {
    setSelectedFiles((prev: any) => prev.filter((f: any) => f.name !== name));
  };

  const playSong = (song: Song) => {
    if (!audioRef.current || currentSongId !== song.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const newAudio = new Audio(URL.createObjectURL(song.file));
      audioRef.current = newAudio;
      setCurrentSongId(song.id);
      setIsPlaying(true);

      newAudio.play();

      newAudio.onloadedmetadata = () => setDuration(newAudio.duration);

      newAudio.ontimeupdate = () => setCurrentTime(newAudio.currentTime);

      newAudio.onended = () => {
        setIsPlaying(false);
        setCurrentSongId(null);
        setCurrentTime(0);
      };
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentSongId(null);
    }
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        addSong,
        selectedFiles,
        setSelectedFiles,
        removeSong,
        removeSelectedFile,
        playSong,
        pauseSong,
        stopSong,
        currentSongId,
        setCurrentSongId,
        isPlaying,
        currentTime,
        duration,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

const useCard = () => useContext(SongContext) as SongType;

export { SongProvider, useCard };
