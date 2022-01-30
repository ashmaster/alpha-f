import './Search.css'
import {FaSearch} from 'react-icons/fa'
import {IoCloseSharp} from 'react-icons/io5'
import { useState } from 'react'
export default function Search(props){
    const [value, setValue] = useState('')
    const changeValue = (e) => {
        setValue(e)
        props.changeString(e)
    }
    const loseFocus = () => {
        setTimeout(() => props.focussed(false), 500)
    }
    return(
        <div className = "search">
            <div className = "search-container">
                <FaSearch />
                <input onFocus = {() => props.focussed(true)} onBlur = {() => loseFocus()} value = {value} onChange = {(e) => changeValue(e.currentTarget.value)} type="text" placeholder="Search songs, playlists ..." name="search"></input>
                <IoCloseSharp size = {20} onClick = {() => changeValue('')}/>
            </div>
        </div>
    )
}