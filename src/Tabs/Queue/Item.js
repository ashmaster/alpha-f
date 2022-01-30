import { IoBulbOutline, IoBulbSharp } from 'react-icons/io5';
import { FaPlusSquare, FaPlayCircle } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Item.css'
import { useEffect, useRef, useState  } from 'react';
export default function Item(props) {
    const dispatch = useDispatch()
    const redState = useSelector(state => state)
    const [focus, setFocus] = useState(false)
    const [sClick, setSClick] = useState(false)
    useEffect(() => {
        console.log(redState.queue)
    },[redState.queue])
    const itemRef = useRef()
    const itemType = (it) => {
        let i = props.type == "m" ? it.kind : it.id.kind;
        let type = i.split('#')[1];
        return type.toUpperCase()
    }

    const channelTitle = i => {
        if (i.includes("Topic")) {
            return i.slice(0, i.length - 8)
        }
        else
            return i
    }
    const clickHandler = () => {
        if (item.type == "PLAYLIST" || item.type == "ARTIST") {
            props.clickHandler()
        }
        else {
            setSClick(!sClick)
        }
    }
    let { item } = props;
    return (
        <div className="search-main">
            <div ref={itemRef} onClick={() => clickHandler()} className="search-item" style={focus ? { backgroundColor: '#26292e' } : { backgroundColor: '#16181c' }} onTouchStart={() => setFocus(true)} onTouchEnd={() => setFocus(false)}>
                <div className="item">
                    <div className="thumbnail">
                        <img style={itemType(item) === "CHANNEL" ? { borderRadius: '30px' } : {}} src={item.snippet.thumbnails.default.url} height={60} width={60} />
                    </div>
                    <div className="details">
                        <div className="title">
                            <p>{item.snippet.title}</p>
                        </div>
                        <div className="subtitle">
                            <p>{!(itemType(item) === "CHANNEL") ? (itemType(item) === "PLAYLISTITEM") ? channelTitle(item.snippet.videoOwnerChannelTitle) : item.snippet.channelTitle : ""} </p>
                        </div>
                    </div>
                </div>

            </div>
            {/* {sClick && (<div className="extra">
                <div style={{ padding: '10px 0', width: '20vw', textAlign: 'center', borderRadius:'30px' }} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#26292e"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#16181c"}>
                    <FaPlayCircle size={22}/>
                </div>
                <div style={{ padding: '10px 0', width: '20vw', textAlign: 'center', borderRadius:'30px'}} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#26292e"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#16181c"}>
                    <FaPlusSquare size={22}/>
                </div>
                <div style={{ padding: '10px 0', width: '20vw', textAlign: 'center', borderRadius:'30px' }} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#26292e"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#16181c"}>
                    <IoBulbSharp size={22}/>
                </div>
            </div>)} */}
            {
                sClick &&
                <Popup open = {sClick} modal position="right center" contentStyle = {{background : '#282a36', border: 'none', width : '70%'}}>
                    <div style={{paddingLeft : '10px', color : '#fff', width : '90%', fontSize: '18px'}}>
    <div style={{paddingTop : '10px', fontWeight: 'bold'}}>{item.snippet.title}</div>
    <div style={{background : '#e97236', height : '1px', width : '100%', marginTop : '7px', marginBottom : '7px'}}></div>
    <div style={{paddingTop : '10px', paddingBottom : '10px', width : '100%', paddingLeft : '7px'}} onClick={() => dispatch({type : "SETSONG", payload:  item})} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#16181c"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#282a36"}>Play Next</div>
    <div style={{paddingTop : '10px', paddingBottom : '10px', width : '100%', paddingLeft : '7px'}} onClick={() => dispatch({type : "ADDTOQUEUE", payload:  item})} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#16181c"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#282a36"}>Add to queue</div>
    <div style={{paddingTop : '10px', paddingBottom : '10px', width : '100%', paddingLeft : '7px'}} onClick={() => dispatch({type : "ADDTOSUGG", payload:  item})} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#16181c"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#282a36"}>Add to suggestion</div>
    </div>
  </Popup>
            }
        </div>
    )
}