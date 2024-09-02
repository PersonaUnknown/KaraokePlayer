import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LyricDetails } from "../../interfaces/song"
const SongDetailsForm = ({onSubmitCallback}: SongDetailsFormProps) => {
    // States
    const [formFilled, setFormFilled] = useState<boolean>(false)
    const [songTitle, setSongTitle] = useState<string>("")
    const [songArtist, setSongArtist] = useState<string>("")
    const [songLyrics, setSongLyrics] = useState<string>("")
    useEffect(() => {
        if (songTitle.length === 0 || songArtist.length === 0 || songLyrics.length === 0) {
            setFormFilled(false)
        } else {
            setFormFilled(true)
        }
    }, [songTitle, songArtist, songLyrics])
    // Styles
    const containerStyle = {
        display: 'flex', 
        flex: 1,
        flexDirection: 'column' as const
    }
    const buttonStyle = {
        marginTop: 'auto',
        marginBottom: 10,
        width: 80,
        height: 40,
        fontSize: 20,
        marginLeft: 'auto',
        cursor: 'pointer',
        borderRadius: 40,
        backgroundColor: '#FFFFFF'
    }
    // Logic
    const onSubmit = () => {
        onSubmitCallback({title: songTitle, artist: songArtist, lyrics: songLyrics})
    }
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(e.currentTarget.value)
    }
    const onArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongArtist(e.currentTarget.value)
    }
    const onLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSongLyrics(e.currentTarget.value)
    }
    // Render
    const TextInput = (label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto', fontSize: 24}}>
                <span style={{textAlign: 'start', flex: 1, margin: 'auto'}}>
                    {label}
                </span>
                <input 
                    type="text" 
                    style={{flex: 1.5, paddingLeft: 10, paddingRight: 10, padding: 5, fontFamily: 'Nunito', fontSize: 20}} 
                    placeholder={placeholder}
                    value={value} 
                    onChange={onChange}
                />
            </div>
        )
    }
    const Divider = () => {
        const DividerStyle = {
            height: 2,
            backgroundColor: '#949494',
            marginTop: 5,
            marginBottom: 15
        }
        return (
            <div
                style={DividerStyle}
            />
        )
    }
    return (
        <div style={containerStyle}>
            <span style={{marginRight: 'auto', marginBottom: 5}}> 
                Song Information 
            </span>
            <span style={{fontSize: 18, marginRight: 'auto', marginBottom: 5}}> 
                Provide information about the song you want lyrics of 
            </span>
            <Divider/>
            { TextInput('Song Title', "Never Gonna Give You Up", songTitle, onTitleChange) }
            { TextInput('Song Artist', "Rick Astley", songArtist, onArtistChange) }
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, marginBottom: 15}}>
                <span style={{marginRight: 'auto'}}>
                    Song Lyrics
                </span>
                <textarea 
                    style={{resize: 'none', height: '100%', fontSize: 20, paddingLeft: 10, paddingRight: 10, padding: 5, fontFamily: 'Nunito'}}
                    placeholder={
                        `We're no strangers to love` + 
                        `\nYou know the rules and so do I (do I)` + 
                        `\nA full commitment's what I'm thinking of` + 
                        `\nYou wouldn't get this from any other guy` +
                        `\nI just wanna tell you how I'm feeling` +
                        `\nGotta make you understand`+
                        `\nNever gonna give you up`+
                        `\nNever gonna let you down`+
                        `\nNever gonna run around and desert you`+
                        `\nNever gonna make you cry`+
                        `\nNever gonna say goodbye`+
                        `\nNever gonna tell a lie and hurt you...`
                    }
                    value={songLyrics}
                    onChange={onLyricsChange}
                />
            </div>
            <motion.button 
                style={{...buttonStyle}} 
                whileHover={!formFilled ? {} : {backgroundColor: '#0096FF', color: '#FFFFFF'}}
                disabled={!formFilled}
                onClick={onSubmit}
            >
                Next
            </motion.button>
        </div>
    )
}
interface SongDetailsFormProps {
    onSubmitCallback: (value: LyricDetails) => void
}
export default SongDetailsForm