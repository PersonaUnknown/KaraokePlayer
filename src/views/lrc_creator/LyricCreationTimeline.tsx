import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { AudioVolumeSliderRef } from "../audio_view/AudioVolumeSlider"
import AudioVolumeSlider from "../audio_view/AudioVolumeSlider"
const LyricCreationTimeline = ({url, lyrics}: LyricCreationTimelineProps) => {
    // States
    const [currDuration, setCurrDuration] = useState<number>(0)
    const [currTime, setCurrTime] = useState<number>(0)
    // Styles
    const containerStyle = {
        display: 'flex',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: 'auto',
        marginBottom: '2.5%'
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
    // Ref
    const volumeRef = useRef<AudioVolumeSliderRef>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    // Render
    return (
        <div style={containerStyle}> 
            <audio 
                ref={audioRef} 
                src={url} 
                autoPlay
                // onTimeUpdate={onTimeUpdate} 
                // onDurationChange={onDurationChange} 
                // onEnded={onAudioFinish}
            >
            </audio>
            {/* <AudioControls
                play={play}
                pause={pause}
                isAudioPlaying={isAudioPlaying}
                callback={toggleCallback}
                updateVolume={updateVolume}
                skipBackward={skipForward}
                skipForward={skipBackward}
            />
            <AudioProgressBar
                duration={currDuration}
                currTime={currTime}
                width={'45%'}
                height={37.5}
                backgroundColor="lightgrey"
                activeBackgroundColor="red"
                onMouseUpCallback={onMouseUpHandler}
                onMouseDownCallback={onMouseDownHandler}
                onMouseMoveCallback={seekTime}
            /> */}
            <div style={{display: 'flex', width: '25%'}}>
                <AudioVolumeSlider
                    ref={volumeRef}
                    width={'100%'}
                    height={37.5}
                />
            </div>
            <div style={{display: 'flex', marginTop: 'auto', marginBottom: 15, justifyContent: 'space-between'}}>
                <motion.button 
                    style={{...buttonStyle}} 
                    whileHover={{backgroundColor: '#0096FF', color: '#FFFFFF'}}
                    // onClick={onPrevCallback}
                >
                    Prev
                </motion.button>
                <motion.button 
                    style={{...buttonStyle}} 
                    // whileHover={!formFilled ? {} : {backgroundColor: '#0096FF', color: '#FFFFFF'}}
                    // disabled={!formFilled}
                    // onClick={onSubmit}
                >
                    Next
                </motion.button>
            </div>
        </div>
    )
}
interface LyricCreationTimelineProps {
    url: string,
    lyrics: string
}
export default LyricCreationTimeline