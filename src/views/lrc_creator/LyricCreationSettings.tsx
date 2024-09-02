import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import FileUpload from "./FileUpload"
const LyricCreationSettings = ({onPrevCallback, onNextCallback}: LyricCreationSettingsProps) => {
    // States
    const [formFilled, setFormFilled] = useState<boolean>(false)
    const [lyricsType, setLyricsType] = useState<string>("line-by-line")
    const [audioFile, setAudioFile] = useState<AudioFileValues | null>(null)
    useEffect(() => {
        if (audioFile === null) {
            setFormFilled(false)
        } else {
            console.log("enabled")
            setFormFilled(true)
        }
    }, [audioFile])
    // Styles
    const containerStyle = {
        display: 'flex', 
        flex: 1,
        flexDirection: 'column' as const,
        fontFamily: 'Nunito'
    }
    const buttonStyle = {
        marginTop: 'auto',
        marginBottom: 10,
        width: 80,
        height: 40,
        fontSize: 20,
        cursor: 'pointer',
        borderRadius: 40,
        backgroundColor: '#FFFFFF'
    }
    // Logic
    const onLyricsTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLyricsType(e.currentTarget.value)
    }
    const onUploadCallback = (value: AudioFileValues) => {
        setAudioFile(value)
    }
    const onSubmit = () => {
        if (audioFile === null) {
            return
        }
        onNextCallback(lyricsType, audioFile)
    }
    // Render
    return (
        <div style={containerStyle}>
            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'start', marginBottom: 25}}>
                <span style={{flex: 2}}>
                    How do you want lyrics configured?
                </span>
                <select style={{flex: 1}} value={lyricsType} onChange={onLyricsTypeChange}>
                    <option value="line-by-line">Line by line</option>
                    <option value="word-by-word">Word by word</option>
                    <option value="multi-singers">Multiple Singers</option>
                </select>
            </div>
            <span style={{marginBottom: 15}}>
                Upload the audio file of the song you want
            </span>
            <FileUpload onUploadCallback={onUploadCallback}/>
            <div style={{display: 'flex', marginTop: 'auto', marginBottom: 15, justifyContent: 'space-between'}}>
                <motion.button 
                    style={{...buttonStyle}} 
                    whileHover={{backgroundColor: '#0096FF', color: '#FFFFFF'}}
                    onClick={onPrevCallback}
                >
                    Prev
                </motion.button>
                <motion.button 
                    style={{...buttonStyle}} 
                    whileHover={!formFilled ? {} : {backgroundColor: '#0096FF', color: '#FFFFFF'}}
                    disabled={!formFilled}
                    onClick={onSubmit}
                >
                    Next
                </motion.button>
            </div>
        </div>
    )
}
interface LyricCreationSettingsProps {
    onPrevCallback: () => void,
    onNextCallback: (type: string, audioFile: AudioFileValues) => void
}
export interface AudioFileValues {
    name: string,
    url: string
}
export default LyricCreationSettings