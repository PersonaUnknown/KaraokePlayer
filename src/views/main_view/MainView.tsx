import { useContext, useRef } from "react"
import { SongContext, SongContextType } from "../../models/refs/songContext";
import { ParseLRC } from "../../models/lyrics/lrc_parser";
import SyncedLyricView from "../synced_lyric_view/SyncedLyricView";
const MainView = () => {
    const { currSongLyrics, setCurrSongLyrics } = useContext(SongContext) as SongContextType
    const onLRCFileUpload = async (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const fileContents = await file.text()
        const splitFileContents = fileContents.replace(/\r\n|\r/g, "\n").split("\n")
        const lyrics = await ParseLRC(splitFileContents)
        // setSyncedLyrics(lyrics)
        setCurrSongLyrics(lyrics)
    }
    const onAudioFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const url = URL.createObjectURL(file)
        audioPlayerRef?.current?.setAttribute("src", url)
        audioPlayerRef?.current?.load()
        // audioPlayerRef?.current?.play()
    }
    // Refs
    const audioPlayerRef = useRef<HTMLAudioElement>(null)
    // Render
    return (
        <div>
            <input type="file" accept=".lrc" id='lyricTest' onChange={onLRCFileUpload}/>
            <input type="file" accept="audio/mp3" id='songMusic' onChange={onAudioFileUpload}/>
            { currSongLyrics && <SyncedLyricView song={currSongLyrics}/> }
            <audio src={""} ref={audioPlayerRef}></audio>
        </div>
    )
}
interface LoadState {
    lrcLoaded: boolean,
    audioLoaded: boolean
}
export default MainView