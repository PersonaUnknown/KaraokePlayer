import { useRef, useState, SyntheticEvent } from "react"
import { ImLoop } from "react-icons/im";
import { FaShuffle } from "react-icons/fa6";
import { AudioVolumeSliderRef } from "./AudioVolumeSlider";
import AudioProgressBar from "./AudioProgressBar";
import AudioVolumeSlider from "./AudioVolumeSlider";
import AudioControls from "./AudioControls";
const AudioPlayer = () => {
    // States
    const [currDuration, setCurrDuration] = useState<number>(0)
    const [currTime, setCurrTime] = useState<number>(0)
    const [currAudio, setCurrAudio] = useState<string | null>(null)
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
    // Playback
    const onAudioFinish = (e: SyntheticEvent<HTMLMediaElement>) => {
        setIsAudioPlaying(false)
    }
    const onDurationChange = (e: SyntheticEvent<HTMLMediaElement>) => {
        if (audioRef.current) {
            const updatedDuration: number = e.currentTarget.duration
            console.log(updatedDuration)
            setCurrDuration(updatedDuration)
            setCurrTime(0)
        }
    }
    const onTimeUpdate = (e: SyntheticEvent<HTMLMediaElement>) => {
        // Volume Check
        if (audioRef.current && volumeRef.current) {
            audioRef.current.volume = volumeRef.current.getMuteState() ? 0 : volumeRef.current.getCurrValue() / 100
        }
        // Time Check
        const updatedCurrTime: number = e.currentTarget.currentTime
        setCurrTime(updatedCurrTime)
    }
    const updateVolume = () => {
        if (audioRef.current && volumeRef.current) {
            audioRef.current.volume = volumeRef.current.getMuteState() ? 0 : volumeRef.current.getCurrValue() / 100
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
    const toggleCallback = () => { setIsAudioPlaying(!isAudioPlaying) }
    const skipForward = () => {
        if (audioRef.current) {
            let newCurrTime: number = currTime + 10
            if (newCurrTime >= currDuration) {
                newCurrTime = currDuration
            } 
            audioRef.current.currentTime = newCurrTime
            setCurrTime(newCurrTime)
        }
    }
    const skipBackward = () => {
        if (audioRef.current) {
            let newCurrTime: number = currTime - 10
            if (newCurrTime <= 0) {
                newCurrTime = 0
            } 
            audioRef.current.currentTime = newCurrTime
            setCurrTime(newCurrTime)
        }
    }
    const seekTime = (percentage: number) => {
        if (audioRef.current) {
            let newCurrTime: number = percentage * currDuration
            audioRef.current.currentTime = newCurrTime
            setCurrTime(newCurrTime)
        }
    }
    const onMouseDownHandler = (percentage: number) => {
        if (!audioRef.current) {
            return
        }

        if (isAudioPlaying) {
            // pause()
            audioRef?.current?.pause() 
        }

        seekTime(percentage)
    }
    const onMouseUpHandler = () => {
        if (!audioRef.current) {
            return
        }

        if (isAudioPlaying) {
            play()
        }
    }
    // Styles
    const containerStyle = {
        display: 'flex',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: 'auto',
        marginBottom: '2.5%'
    }
    // Ref
    const volumeRef = useRef<AudioVolumeSliderRef>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    // File upload
    const onAudioFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const url = URL.createObjectURL(file)
        setCurrAudio(url)
    }

    if (currAudio === null) {
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
                <span>
                    Insert a .mp3 file to listen to it!
                </span>
                <input type="file" accept="audio/mp3" id='songMusic' onChange={onAudioFileUpload}/>
            </div>
        )
    }

    return (
        <div style={containerStyle}> 
            <audio ref={audioRef} src={currAudio} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange} onEnded={onAudioFinish}>
            </audio>
            <AudioControls
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
            />
            <div style={{display: 'flex', width: '25%'}}>
                {/* <button>
                    <ImLoop style={{width: 37.5, height: 37.5}}/>
                </button>
                <button>
                    <FaShuffle style={{width: 37.5, height: 37.5}}/>
                </button> */}
                <AudioVolumeSlider
                    ref={volumeRef}
                    width={'100%'}
                    height={37.5}
                />
            </div>
        </div>
    )
}

export default AudioPlayer