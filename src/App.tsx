import './App.css';
import { SongList } from './components/song_list';
import MusicUploadForm from './components/music_upload';
import { AddAllButton } from './components/addAll_button/index';
import { PlayAllButton } from './components/playAll_button/index';

function App() {

  return (
    <div className="App">
      <SongList />
      <div className='buttons'>
        <AddAllButton />
        <PlayAllButton />
      </div>
      <MusicUploadForm />
    </div>
  );
}


export default App;
