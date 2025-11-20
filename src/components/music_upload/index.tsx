import { ChangeEvent, useState } from "react";
import { useCard } from "../../context/SongContext";
import { v4 as uuidv4 } from "uuid";
import { Song } from "../../types/songData";

import style from "./styles.module.scss";
import { AudioPlayer } from "../playMusic/audio";

const MusicUploadForm = () => {
  const {
    setSelectedFiles,
    selectedFiles,
    addSong,
  } = useCard();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      const filesWithId = newFiles.map((file) => ({
        file,
        id: uuidv4(),
      }));
      setSelectedFiles([...selectedFiles, ...filesWithId]);
    }
  };

  const onSubmit = async (files: { file: File; id: string }[]) => {
    try {
      const uploadedSongs: Song[] = files.map((f, index) => ({
        id: f.id,
        songName: f.file.name,
        artistName: "Unknown Artist",
        trackNumber: index + 1,
        file: f.file,
      }));

      const storedSongs = sessionStorage.getItem("songs");
      let existingSongs: any[] = storedSongs ? JSON.parse(storedSongs) : [];

      existingSongs = [
        ...existingSongs,
        ...uploadedSongs.map((s) => ({
          ...s,
          fileName: s.file.name,
        })),
      ];

      sessionStorage.setItem("songs", JSON.stringify(existingSongs));

      uploadedSongs.forEach((song) => addSong(song));

      console.log("All songs in array:", existingSongs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadError("Please select a files");
      return;
    }

    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onSubmit(selectedFiles);
      setSelectedFiles([]);
      setUploadError(null);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className={style.music_list} onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        accept=".mp3, .wav"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {uploadError && (
        <p className={style.music_list_error_message}>{uploadError}</p>
      )}

      {selectedFiles.map((fileObj: any) => {
        const fakeSong: Song = {
          id: fileObj.id,
          songName: fileObj.file.name,
          artistName: "Unknown Artist",
          trackNumber: 1,
          file: fileObj.file,
        };

        return (
          <div key={fakeSong.id} className={style.music_list_col_item}>
            <AudioPlayer song={fakeSong} />
          </div>
        );
      })}

      {isUploading ? (
        <div>
          <p>Uploading...</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFiles.length}
          className={style.music_list_upload}
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default MusicUploadForm;
