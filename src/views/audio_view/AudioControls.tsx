import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaCirclePause, FaCirclePlay, FaForward, FaBackward  } from "react-icons/fa6";
const AudioControls = ({isAudioPlaying, play, pause, updateVolume, callback, skipForward, skipBackward}: AudioControlsProps) => {
    const toggleButtonStyle = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    const toggleButtonIconStyle = {
        flex: 1,
        width: 75,
        height: 75
    } 
    const rewindForwardButtonStyle = {
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    }
    const rewindForwardIconStyle = {
        width: 37.5,
        height: 37.5
    }
    const controlsStyle = {
        display: 'flex',
        width: '25%',
    }
    const renderToggleButton = () => {  
        const onToggle = () => {
            if (isAudioPlaying) {
                // Pause
                pause()
            } else {
                // Play
                updateVolume()
                play()
            }
            callback()
        }
        return (
            <button 
                style={toggleButtonStyle}
                onClick={onToggle}
            >
                { isAudioPlaying ? <FaCirclePause style={toggleButtonIconStyle}/> : <FaCirclePlay style={toggleButtonIconStyle}/> }
            </button>
        )
    }
    return (
        <div style={controlsStyle}>
            <button style={rewindForwardButtonStyle}>
                <FaBackward style={rewindForwardIconStyle}/>
            </button>
            <button style={rewindForwardButtonStyle} onClick={skipForward}>
                <TbRewindBackward10 style={rewindForwardIconStyle}/>
            </button>
            { renderToggleButton() }
            <button style={rewindForwardButtonStyle} onClick={skipBackward}>
                <TbRewindForward10 style={rewindForwardIconStyle}/>
            </button>
            <button style={rewindForwardButtonStyle}>
                <FaForward style={rewindForwardIconStyle}/>
            </button>
        </div>
    )
}
interface AudioControlsProps {
    isAudioPlaying: boolean,
    play: () => void,
    pause: () => void,
    updateVolume: () => void,
    callback: () => void,
    skipForward: () => void,
    skipBackward: () => void
}
export default AudioControls