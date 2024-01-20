import React, 
{
    Dispatch, 
    FC, 
    ReactNode, 
    SetStateAction, 
    createContext, 
    useContext, 
    useState
} from 'react';
import { Song } from '../../types/songData';

type SongTypeProvider = {
  children: ReactNode;
}

type SongType = {
  songs: Song[],
  addSong: (song: Song) => void;
  selectedFiles: any;
  setSelectedFiles: Dispatch<SetStateAction<any>>;
}

const SongContext = createContext<SongType | null>(null);

const SongProvider: FC<SongTypeProvider> = ({children}) => {

  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const addSong = (song: Song) => {
    setSongs([...songs, song]);
  };

  return (
    <SongContext.Provider value={{ songs, addSong, selectedFiles, setSelectedFiles }}>
      {children}
    </SongContext.Provider>
    
  );
}
const useCard = () => {
  return useContext(SongContext) as SongType;
};

export { SongProvider, useCard };

