"use client"
import { useState, useRef} from "react" 
import {Song} from "@/types/musician"
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

interface Props {
  songs: Song[],
}

export default function MusicPlayer({songs} : Props) {
  /**
   * Refs que almacenarán las referencias de las canciones de manera dinámica
   */
  const songRefs = useRef<{ [key: number]: HTMLAudioElement }>({ });

  /**
   * Estado que almacenará la canción actual
   */
  const [currentSong, setCurrentSong] = useState({
    progressIntervalId: 0 as number | null,
    element: null as HTMLAudioElement | null,
    id: null as number | null, 
    progressPercentage: 0,
  });

  /**
   * Función para guardar las referencias de las canciones
   */
  function setSongRef(audio: HTMLAudioElement, id: number) {
    if (audio) {
      songRefs.current[id] = audio;
    }
  };

  /**
   * Maneja la reproducción de las canciones 
   */
  function playSong(song: HTMLAudioElement, id: number): void {
    song.volume = 0.5;
  
    // Si hay una canción en reproducción y no es la misma, se pausa y se reinicia.
    if (currentSong.element && currentSong.element !== song) {
      currentSong.element.pause();
      currentSong.element.currentTime = 0;
    }
  
    // Limpiar el intervalo anterior si existe
    if (currentSong.progressIntervalId) {
      clearInterval(currentSong.progressIntervalId);
    }
  
    // Si la canción está pausada, se reproduce. Si está en reproducción, se pausa.
    if (song.paused) {
      song.play();
    } else {
      song.pause();
      song.currentTime = 0;
    }
  
    // Establecer el nuevo estado.
    setCurrentSong({
      element: song.paused ? null : song,
      id: song.paused ? null : id,
      progressPercentage: 0,
      progressIntervalId: null
    });
  
    // Configurar el nuevo intervalo si la canción se está reproduciendo.
    if (!song.paused) {
      const songDuration = Math.ceil(song.duration);
      let currentTime = 0;
      let percentage = 0;
  
      const newIntervalId = setInterval(() => {
        currentTime++;
        percentage = (currentTime / songDuration) * 100;
  
        setCurrentSong(prevState => ({
          ...prevState,
          progressPercentage: percentage,
        }));
  
        if (percentage >= 100) {
          clearInterval(newIntervalId);
          setCurrentSong(prevState => ({
            ...prevState,
            progressPercentage: 0,
            progressIntervalId: null
          }));
        }
      }, 1000) as unknown as number;
  
      setCurrentSong(prevState => ({
        ...prevState,
        progressIntervalId: newIntervalId
      }));
    }
  }

  return (
    <ul className="album__canciones mt-2">
      <li className="canciones__header">
        <p>#</p>
        <p>Name</p>
        <p>Duration</p>
      </li>
      {songs.map((song, i) => (
        <li key={song.title}> 
          <div className="cancion__btn d-flex align-items-center">    
            <button
              onClick={() => playSong(songRefs.current[i+1], i+1)}
              className="btn btn-light">
                {currentSong.id == i + 1 ? <FaPause/> : <FaPlay />}
            </button> 
          </div>
          <p>{song.title}</p>
          <p>00:30</p>
          <audio
            ref={el => setSongRef(el!, i + 1)}
            id={`song-${i + 1}`}
            hidden
            controls
            src={song.audio.url}>
          </audio>
          <div 
            style={
              {width: currentSong.id == i + 1 ? Number(currentSong.progressPercentage) + "%" : 0 + "%"}
            }
            className="progress-percentage">
          </div>
        </li>
      ))}
    </ul>
  )
}