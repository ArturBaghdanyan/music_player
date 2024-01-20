// MusicUploadForm.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MusicUploadForm from './MusicUploadForm';
import { SongProvider } from '../context/SongContext';

describe('MusicUploadForm Component', () => {
  it('renders file input and upload button', () => {
    const { getByText, getByLabelText } = render(
      <SongProvider>
        <MusicUploadForm />
      </SongProvider>
    );

    const fileInput = getByLabelText(/select a file/i);
    const uploadButton = getByText(/upload/i);

    expect(fileInput).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it('updates selected file on file change', () => {
    const { getByLabelText } = render(
      <SongProvider>
        <MusicUploadForm />
      </SongProvider>
    );

    const fileInput = getByLabelText(/select a file/i);
    const file = new File(['sample content'], 'sample.mp3', { type: 'audio/mp3' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });

  it('displays selected file name and triggers upload process', async () => {
    const { getByLabelText, getByText } = render(
      <SongProvider>
        <MusicUploadForm />
      </SongProvider>
    );

    const fileInput = getByLabelText(/select a file/i);
    const uploadButton = getByText(/upload/i);
    const file = new File(['sample content'], 'sample.mp3', { type: 'audio/mp3' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/selected file: sample.mp3/i)).toBeInTheDocument();
      expect(screen.getByText(/uploading/i)).toBeInTheDocument();
    });

    // Add more assertions as needed for your specific logic
  });

  it('displays an error message if no file is selected', () => {
    const { getByText } = render(
      <SongProvider>
        <MusicUploadForm />
      </SongProvider>
    );

    const uploadButton = getByText(/upload/i);

    fireEvent.click(uploadButton);

    expect(screen.getByText(/please select a file/i)).toBeInTheDocument();
  });

  // Add more tests for error handling, API simulation, etc.
});
