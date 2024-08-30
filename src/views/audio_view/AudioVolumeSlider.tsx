import { useState, forwardRef, useImperativeHandle } from "react"
import { FaVolumeHigh, FaVolumeLow, FaVolumeOff, FaVolumeXmark } from "react-icons/fa6"
const AudioVolumeSlider = forwardRef<AudioVolumeSliderRef, AudioVolumeSliderProps>(({width, height}: AudioVolumeSliderProps, ref) => {
    const [currValue, setCurrValue] = useState<number>(100)
    const [isMuted, setIsMuted] = useState<boolean>(false)
    useImperativeHandle(ref, () => ({
        getCurrValue() {
            return currValue
        },
        getMuteState() {
            return isMuted
        },
    }))
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newCurrValue: number = parseFloat(e.target.value)
        setCurrValue(newCurrValue)
    }
    const toggleMute = () => {
        setIsMuted(prev => !prev)
    }
    const containerStyle = {
        display: 'flex',
        width: width,
        height: height,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    const volumeButtonStyle = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: 5
    }
    const iconStyle = {
        flex: 1,
        marginLeft: '5%',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 25,
        height: 25
    }
    const sliderStyle = {
        flex: 5,
        marginRight: '5%'
    }
    const blankStyle = {
        flex: 2
    }
    return (
        <div style={containerStyle}>
            <div style={blankStyle}/>
            {
                currValue >= 51 && 
                <button onClick={toggleMute} style={volumeButtonStyle}>
                    {isMuted ? <FaVolumeXmark style={iconStyle}/> : <FaVolumeHigh style={iconStyle}/>}
                </button>
            }
            {
                currValue >= 1 && 
                currValue <= 50 && 
                <button onClick={toggleMute} style={volumeButtonStyle}>
                    {isMuted ? <FaVolumeXmark style={iconStyle}/> : <FaVolumeLow style={iconStyle}/>}
                </button>
            }
            {
                currValue === 0 && 
                <button onClick={toggleMute} style={volumeButtonStyle}>
                    {isMuted ? <FaVolumeXmark style={iconStyle}/> : <FaVolumeOff style={iconStyle}/>}
                </button>
            }
            <input type='range' min={0} max={100} style={sliderStyle} onChange={onChange} defaultValue={100}/>
            <div style={blankStyle}/>
        </div>
    )
})
export interface AudioVolumeSliderRef {
    getCurrValue: () => number,
    getMuteState: () => boolean
}
interface AudioVolumeSliderProps {
    width: string | number,
    height: string | number,
}

export default AudioVolumeSlider