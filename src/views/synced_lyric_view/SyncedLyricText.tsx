import { forwardRef, useImperativeHandle } from "react"
import { Song, SongWord } from "../../interfaces/song"
const SyncedLyricText = forwardRef(({words}: SyncedLyricTextProps, ref) => {
    useImperativeHandle(ref, () => {
        
    }, []);
    return (
        <div>

        </div>
    )
})
interface SyncedLyricTextProps {
    words: Array<string>
}
export default SyncedLyricText