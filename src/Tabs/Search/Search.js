import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import axios from 'axios';
import './Search.css'
import Search from "../../Components/Search/Search";
import load2 from '../../Assets/load2.gif'
import SearchList from "../../Components/List/List";
import { IoArrowBack, IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import SearchItem from "../../Components/SearchItem/SearchItem";
import { useDispatch, useSelector } from "react-redux";


const SearchTab = forwardRef((props, ref) => {
    const [search, setSearch] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [channels,setChannels] = useState([]);
    const [focus, setFocus] = useState(true);
    const [all, setAll] = useState([]);
    const [playlistOpen, setPlaylistOpen] = useState('');
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setSearch(props.searchWord)
    },[props.searchWord])

    const dispatch = useDispatch()
    const redState = useSelector(state => state)

    useImperativeHandle(
      ref,
      () => ({
          showAlert() {
              searchWord()
          },
            focus(e){
              setFocus(e)
            },
            clearWord(){
              setSearch('')
            }
      }),
  )

    useEffect(() => {
      if(playlistOpen !== ''){
        let url = `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=${playlistOpen.id.playlistId}&key=AIzaSyDzu7L3oDbycrunYE0_mQVPXRbf_ZVeeEM`
        axios.get(url).then((response) => {
          let itemCount = response.data.items[0].contentDetails.itemCount;
          let songUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${itemCount}&playlistId=${playlistOpen.id.playlistId}&key=AIzaSyDzu7L3oDbycrunYE0_mQVPXRbf_ZVeeEM`
          axios.get(songUrl).then((res) => {
              setPlaylistSongs(res.data.items)
              console.log(res.data.items)
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => console.log(err))
      }
    }, [playlistOpen])
      
    const searchWord = () => {
        setSongs([]);
        setPlaylists([]);
        setChannels([]);
        setLoading(true)
        setTimeout(() => {
          setFocus(false)
        }, 500)
        let url = `https://jiosaavn.com/api.php?__call=autocomplete.get&_format=json&query=${search}`
        let idString = "";
      axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin" : '*',
          "Cache-Control" : "s-maxage=300, stale-while-revalidate"
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // .then((response) => {
      //   setAll(response.data.items)
      //   response.data.items.map((video) => {
            

      //     if (video.id.kind === "youtube#video"){
      //         idString += video.id.videoId + ","
      //     }
      //     else if (video.id.kind === "youtube#playlist"){
      //           video.type = "PLAYLIST"
      //           setPlaylists([...playlists, video])
      //     }
      //     else if (video.id.kind === "youtube#channel"){
      //       video.type = "ARTIST"
      //       setChannels([...channels, video])
      // }
            

      //     }


      //   );
      //   let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${idString}&key=AIzaSyDzu7L3oDbycrunYE0_mQVPXRbf_ZVeeEM`;
      //       axios.get(url)
      //       .then((result) => {
      //         setSongs(result.data.items)
      //         setLoading(false)
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });

      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }

    const pclick = (item) => {
      setPlaylistOpen(item)
    }

    const psClick = (item) => {
      console.log("PSClick")
    }

    const cclick = (item) => {
      console.log("cCLick")
    }

    const sclick = (item) => {
      dispatch({
        type: "UPDATESCLICK",
        payload: item
      })
    }
    
    const notEmpty = () => {
        if(all.length !== 0 && (songs.length !== 0  || playlists.length !==0 || channels.length!==0) ){
            return true
        } 
        else
            return false
    }

    const clearPlaylist = () => {
      setPlaylistOpen('')
      setPlaylistSongs([])
    }

    if(playlistOpen !== ''){
      return(
        <div className = {"playlist-open"}>
          <div className = "close" onClick = {() => clearPlaylist()} >
            <IoCloseOutline size = {36} />
          </div>
          <div className = "playlist-main">
            <div className = "playlist-heading">
            <div className = "thumbnail">
                    <img src = {playlistOpen.snippet.thumbnails.high.url} height = {120} width = {180} style = {{objectFit: 'contain', marginTop: '36px'}} />
                </div>
              <p style = {{margin: '0 20px 20px 20px', textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>
                {playlistOpen.snippet.title}
              </p>
                {
                  playlistSongs.map((item) => {
                    return(
                      <SearchItem item = {item} type="m" clickHandler={() => psClick(item)} />
                    )
                  })
                }
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="searchtab">
            {
                loading && <img src = {load2} width = {'64px'} style = {{alignSelf: 'center', marginTop: '25vh'}}/>
            }
            {
                !loading && !focus && notEmpty() && <SearchList all = {all} songs = {songs} playlists = {playlists} artist = {channels} pclick = {(item) => pclick(item)} sclick = {(item) => sclick(item)} cclick = {(item) => cclick(item)}/>
            }
            {
                !loading && !focus && !notEmpty() && <div className = "search-dialog">
                  <h1 style = {{fontSize: '24px', textAlign: 'center', margin: '5px 20px'}}>Sorry</h1>
                <h3 style = {{color: '#ccc', margin: '0 20px', textAlign: 'center'}}>Could not find the song you were looking for</h3>
            </div>
            }

            
        </div>
        
    )
    }
    
})

export default SearchTab