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
                <ReactPlayer playsinline url={`https://aac.saavncdn.com/742/0202e03010d92dc5604715d2d0634964_320.mp4`} width={0} height={0} playing = {play} />
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