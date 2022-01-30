import SearchItem from '../SearchItem/SearchItem'
import './List.css'
import {IoChevronUp} from 'react-icons/io5';
import { useState } from 'react';
export default function SearchList(props){
    const [songOpen, setSongOpen] = useState(false)
    const clickHandler = item => {
        if(item.type == "ARTIST"){
            props.cclick(item)
        }
        else if(item.type == "PLAYLIST"){
            props.pclick(item)
        }
        else    
            props.sclick(item)
    }
    return(
        <div className = "search-list">
            <div className = "category">
                <p className = "category-heading">Top Result</p>
                <SearchItem item = {props.all[0]} type="tr" clickHandler={() => clickHandler(props.all[0])}/>
            </div>
            {props.songs.length !== 0 && <div className = "category">
                <p className = "category-heading">Music</p>
                {
                    props.songs.slice(0,3).map((item) => {
                        return(
                            <SearchItem item = {item} type="m" clickHandler={() => clickHandler(item)}/>
                        )
                    })
                }
            </div>}
            {
               props.songs.length > 3 && <div className = "more-tab" onClick = {() => setSongOpen(!songOpen)} onTouchStart = {(e) => e.currentTarget.style.backgroundColor = "#26292e"} onTouchEnd = {(e) => e.currentTarget.style.backgroundColor = "#16181c"}>
                    {songOpen ? <IoChevronUp /> : "+" + (props.songs.length - 3)}
               </div> 
            }
            {songOpen && <div className = "category">
                {
                    props.songs.slice(2).map((item) => {
                        return(
                            <SearchItem item = {item} type="m" clickHandler={() => clickHandler(item)}/>
                        )
                    })
                }
            </div>}
            {props.playlists.length !== 0 && <div className = "category">
                <p className = "category-heading">Playlist</p>
                {
                    props.playlists.slice(0,3).map((item) => {
                        return(
                            <SearchItem item = {item} type="tr" clickHandler={() => clickHandler(item)}/>
                        )
                    })
                }
            </div>}
            {props.artist.length !== 0 && <div className = "category">
                <p className = "category-heading">Artists</p>
                {
                    props.artist.slice(0,3).map((item) => {
                        return(
                            <SearchItem item = {item} type="tr" clickHandler={() => clickHandler(item)}/>
                        )
                    })
                }
            </div>}
        </div>
    )
}