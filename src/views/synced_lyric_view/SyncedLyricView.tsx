import { useRef } from "react"
import { Song, SongWord } from "../../interfaces/song"
import SyncedLyricText from "./SyncedLyricText"
import SyncedLyricGroupText from "./SyncedLyricGroupText"
// A View component to display synced lyrics through varying levels of animation
const SyncedLyricView = ({song}: SyncedLyricProps) => {
    const renderLyrics = () => {
        return ( 
            song.lyrics.map((lyric, index) => {
                // Parse to check if lyrics are grouped in the same timestamp or not
                let line: Array<SongWord> = lyric.line
                let initialTimeStamp: number = line[0].timestamp
                let isSimpleLine: boolean = true
                let lyrics: Array<string> = []
                for (let i = 0; i < line.length; i++) {
                    let word: SongWord = line[i]
                    let wordTimestamp = word.timestamp
                    lyrics.push(word.word)
                    if (initialTimeStamp !== wordTimestamp) {
                        isSimpleLine = false
                        break
                    }
                }

                if (isSimpleLine) {
                    return (
                        <SyncedLyricGroupText
                            key={index}
                            startTime={initialTimeStamp}
                            lyrics={lyrics}
                        />
                    )
                } else {
                    return (
                        <div key={'line ' + index}>
                        {
                            lyric.line.map((words, index) => {
                                return (
                                    <span key={'word ' + index}> {words.word} </span>
                                )
                            })
                        }
                        </div>  
                    )
                }
            })
        )
    }
    const viewStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: 'red',
        width: '100%',
        height: '100%'
    }
    return (
        <div style={viewStyle}>
            { renderLyrics() }
        </div>
    )
}
interface SyncedLyricProps {
    song: Song
}

export default SyncedLyricView