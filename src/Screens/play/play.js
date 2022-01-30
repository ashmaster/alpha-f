import { useEffect, useState, useRef } from 'react'
import './play.css'

import { FaSearch } from 'react-icons/fa'
import { IoArrowBack, IoCloseOutline, IoCloseSharp } from 'react-icons/io5'
import SearchTab from '../../Tabs/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import Queue from '../../Tabs/Queue/Queue';
import Player from '../../Components/Player/Player';
import Item from '../../Tabs/Queue/Item';
export default function Play(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [sClick, setSClick] = useState(null);
  const searchRef = useRef()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const redState = useSelector(state => state)

  useEffect(() => {
    console.log(redState)
    if(!redState.currSong){
      if(redState.queue[0]){
        dispatch({
          type: "SETSONG",
          payload: redState.queue[0]
        })
      } 
    }
    else{
      setSClick(redState.currSong);
    }
    
    if (redState.currSong !== {})
      document.body.style.overflowY = "hidden"
    else
      document.body.style.overflowY = "scroll"
  }, [redState])


  const submitHandler = (e) => {
    e.preventDefault();
    blurHandler()
    searchRef.current.showAlert()
  }
  const blurHandler = () => {
    searchRef.current.focus(false)
    setTimeout(() => {
      inputRef.current.blur()
    }, 500)
  }
  const searchHandler = () => {
    if (selectedTab == 3) {
      searchRef.current.clearWord()
      inputRef.current.value = "";
      setTimeout(() => { setSelectedTab(0) }, 500)
    }
    else {
      setSelectedTab(3)
    }
  }

  
  return (
    <div style={{ overflowX: 'hidden', overflowY: 'scroll', marginBottom: '20vh' }}>
      <div className="tab-nav">
        <div className="se-tab" style={selectedTab == 3 ? { borderBottomColor: '#e97236', width: '100vw' } : { width: '22px' }}>
          <div style={{ height: '52px', width: "22px" }} className={selectedTab == 3 ? 'backIcon' : 'searchIcon'} onClick={() => { searchHandler() }}><p> {selectedTab == 3 ? <IoArrowBack size={22} /> : <FaSearch style={{ marginTop: '4px' }} />}</p></div>
          <div className="input-container" className="se-tab" style={selectedTab == 3 ? { width: '100vw' } : { width: 0 }} >
            <form onSubmit={(e) => submitHandler(e)}><input ref={inputRef} onFocus={() => searchRef.current.focus(true)} onBlur={() => blurHandler()} onChange={(e) => setSearchWord(e.target.value)} style={selectedTab == 3 ? { width: '60vw', fontSize: '16px' } : { width: 0, fontSize: '16px' }} placeholder={"Search song, playlist.."} /></form>
            <div style={selectedTab == 3 ? { height: '50px', width: "22px", marginLeft: '10px' } : { display: 'none' }} ><p> <IoCloseSharp size={22} /></p></div>
          </div>

        </div>
        <div onClick={() => setSelectedTab(0)} className="q-tab" style={selectedTab == 0 ? { borderBottomColor: '#e97236' } : {}}>
          <p style={selectedTab == 0 ? { color: '#e97236' } : {}}>Queue</p>
        </div>
        <div onClick={() => setSelectedTab(1)} className="s-tab" style={selectedTab == 1 ? { borderBottomColor: '#e97236' } : {}}>
          <p style={selectedTab == 1 ? { color: '#e97236' } : {}}>Suggestions</p>
        </div>
        <div onClick={() => setSelectedTab(2)} className="m-tab" style={selectedTab == 2 ? { borderBottomColor: '#e97236' } : {}}>
          <p style={selectedTab == 2 ? { color: '#e97236' } : {}}>Members</p>
        </div>
      </div>
      <div className="play">
        {selectedTab == 0 ? <div className="Queue">
          <Queue />
        </div> : selectedTab == 1 ?
          <div className="Suggestions">
            <p>Suggestion</p>
          </div> : selectedTab == 2 ?
            <div className="Members">
              <p>Members</p>
            </div> : <div className="Search">
              <SearchTab ref={searchRef} searchWord={searchWord} />
            </div>}
      </div>
      {
        (sClick) && (
          <Player song = {redState.currSong}/>
        )
      }
    </div>
  )
}