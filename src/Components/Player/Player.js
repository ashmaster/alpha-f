import './Player.css'
import ReactPlayer from 'react-player'
import { IoArrowBack, IoCloseOutline, IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
export default function Player(props){
    const dispatch = useDispatch()
    const [play, setPlay]= useState(true)
    return(
        <div className="song-det">
            <div style={{ width: '100vw', height: 'auto', position: 'fixed', bottom: '0' }}>
              <div className="det-header">
                <div className="details">
                  <p style={{ fontSize: '16px' }}>{props.song.snippet.title}</p>
                  <p style={{ fontSize: '14px', color: '#ccc' }}>{props.song.snippet.channelTitle}</p>
                </div>
                <ReactPlayer playsinline url={`https://music.youtube.com/watch?v=${props.song.id}`} playing = {play} />
                <div className = "close-det" onClick = {() => setPlay(!play)}>
                  <IoCloseSharp size = {28} />
                </div>
              </div>
              <div className="det-options">
                
              </div>
            </div>
          </div>
    )
}