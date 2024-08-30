import { forwardRef, useImperativeHandle } from "react"
import { SongWord } from "../../interfaces/song"
const SyncedLyricGroupText = forwardRef(({startTime, lyrics} : SyncedLyricGroupTextProps, ref) => {
    useImperativeHandle(ref, () => {
        
    }, []);
    const flattenedLyrics: string = lyrics.join(" ")
    const textStyle = {

    }
    return (
        <div style={textStyle}>
            {flattenedLyrics}
        </div>
    )
})
interface SyncedLyricGroupTextProps {
    startTime: number,
    lyrics: Array<string>
}
export default SyncedLyricGroupText