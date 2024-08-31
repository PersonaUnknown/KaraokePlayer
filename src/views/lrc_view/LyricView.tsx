import { ParseLRC } from "../../models/lyrics/lrc_parser"
import { Song, SongLine } from "../../interfaces/song"
import { useRef, useState, SyntheticEvent } from "react"
import KaraokeLine from "./KaraokeLine"
const LyricView = () => {
    const [currLyrics, setCurrLyrics] = useState<Song | null>(null)
    const [currAudio, setCurrAudio] = useState<string | null>(null)
    const onLRCFileUpload = async (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const fileContents = await file.text()
        const splitFileContents = fileContents.replace(/\r\n|\r/g, "\n").split("\n")
        const lyrics = await ParseLRC(splitFileContents)
        setCurrLyrics(lyrics)
    }
    const onAudioFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const url = URL.createObjectURL(file)
        setCurrAudio(url)
    }
    // Playback
    const audioRef = useRef<HTMLAudioElement>(null)
    const [selectedLineIndex, setSelectedLineIndex] = useState<number>(0)
    const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0)
    const [currLine, setCurrLine] = useState<string>("")
    const [currLyricPercentage, setCurrLyricPercentage] = useState<number>(0)
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
    const checkTime = (time: number) => {
        if (currLyrics === null || currAudio === null || currLyrics.timestamps.length <= selectedLineIndex) {
            setCurrLyricPercentage(100)
            return
        }
        const currentLineTimestamps: number[] = currLyrics.timestamps[selectedLineIndex]
        const currentWordTimestamp: number = currentLineTimestamps[selectedWordIndex]
        if (time >= currentWordTimestamp) {
            // Increment line or word
            if (selectedWordIndex >= currentLineTimestamps.length - 1) {
                // Increment to the next line
                incrementLineIndex()
            } else {
                // Increment to the next word
                incrementWordIndex()
            }
            setCurrLyricPercentage(0)
        } else {
            let prevTimestamp: number = selectedLineIndex <= 0 ? 0 : currLyrics.timestamps[selectedLineIndex - 1][currLyrics.timestamps[selectedLineIndex - 1].length - 1]
            let newPercentage: number = (time - prevTimestamp) / (currentWordTimestamp - prevTimestamp) * 100
            setCurrLyricPercentage(newPercentage)
        }
    }
    const onTimeUpdate = (e: SyntheticEvent<HTMLMediaElement>) => {
        // Time Check
        const updatedCurrTime: number = e.currentTarget.currentTime
        checkTime(updatedCurrTime)
    }
    const onDurationChange = (e: SyntheticEvent<HTMLMediaElement>) => {
        if (audioRef.current) {
            let initLyrics = getLyricsByIndex(0)
            setCurrLine(initLyrics)
        }
    }
    const play = () => { 
        audioRef?.current?.play()
        setIsAudioPlaying(true)
    }
    const pause = () => { 
        audioRef?.current?.pause() 
        setIsAudioPlaying(false)
    }
    const toggle = () => { 
        if (isAudioPlaying) {
            pause()
        } else {
            play()
        }
    }
    // Adjust State
    const getLyricsByIndex = (index: number) => {
        if (currLyrics === null || currLyrics.lyrics.length <= index) {
            return ""
        }
        let newCurrLine: SongLine = currLyrics.lyrics[index]
        let newLyrics: string[] = newCurrLine.line.map((line) => {
            return line.word
        })
        return newLyrics.join(" ")
    }
    const incrementWordIndex = () => {
        if (currLyrics === null || currLyrics.timestamps.length <= selectedLineIndex) {
            return
        }
        let newWordIndex = selectedWordIndex + 1
        let numWords = currLyrics.timestamps[selectedLineIndex].length - 1
        if (newWordIndex >= numWords) {
            newWordIndex = numWords
        }
        setSelectedWordIndex(newWordIndex)
    }
    const incrementLineIndex = () => {
        if (currLyrics === null || currLyrics.lyrics.length <= selectedLineIndex) {
            return
        }
        let newLineIndex = selectedLineIndex + 1
        let newLyrics: string = getLyricsByIndex(newLineIndex)
        if (newLyrics !== "")
            setCurrLine(newLyrics)
        setSelectedLineIndex(newLineIndex)
    }
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        margin: 'auto',
        gap: 10
    }
    // Render
    if (currLyrics === null || currAudio === null) {
        const fileInputStyle = {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
            fontSize: 20
        }
        return (
            <div style={fileInputStyle}>
                {/* <audio src={test} autoPlay></audio> */}
                <span> 
                    Insert a .lrc file to view its lyrics!
                </span>
                <input type="file" accept=".lrc" id='songLyrics' onChange={onLRCFileUpload}/>
                <span>
                    Insert a .mp3 file to listen to it!
                </span>
                <input type="file" accept="audio/mp3" id='songMusic' onChange={onAudioFileUpload}/>
            </div>
        )
    }
    return (
        <div style={containerStyle}>
            <KaraokeLine
                words={currLine}
                percentage={currLyricPercentage}
            />
            { currAudio !== null && <audio ref={audioRef} src={currAudio} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}></audio>}
            <button onClick={toggle}>
                { isAudioPlaying ? "Pause" : "Play"}
            </button>
        </div>
    )
}

export default LyricView