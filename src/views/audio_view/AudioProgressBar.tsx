import { motion } from "framer-motion"
import { parseTime } from "../../models/lyrics/time_parser"
import { MouseEventHandler, useRef, useState } from "react"
const AudioProgressBar = ({width, height, backgroundColor, activeBackgroundColor, duration, currTime, onMouseMoveCallback, onMouseDownCallback, onMouseUpCallback}: AudioProgressBarProps) => {
    // State
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: 15,
        width: width,
        height: height,
        marginTop: 'auto',
        marginBottom: 'auto',
    }
    const barStyle = {
        width: '70%',
        height: height,
        flex: 1,
        backgroundColor: backgroundColor,
        borderRadius: height,
        overflow: 'hidden'
    }
    const leftTextStyle = {
        width: '15%',
        margin: 'auto',
        textAlign: 'right' as const
    }
    const rightTextStyle = {
        width: '15%',
        margin: 'auto',
        textAlign: 'left' as const
    }
    const activeBarStyle = {
        backgroundColor: activeBackgroundColor,
        width: currTime === 0 ? 0 : `${currTime / duration * 100}%`,
        height: height
    }
    // Event Handlers
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        if (progressBarRef.current) {
            setIsMouseDown(true)
            onMouseDownCallback(e.nativeEvent.offsetX / progressBarRef.current.clientWidth)
        }
    }
    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (progressBarRef.current && isMouseDown) {
            onMouseMoveCallback(e.nativeEvent.offsetX / progressBarRef.current.clientWidth)
        }
    }
    const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
        if (progressBarRef.current) {
            setIsMouseDown(false)
            onMouseUpCallback()
        }
    }
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
        if (progressBarRef.current) {
            setIsMouseDown(false)
            onMouseUpCallback()
        }
    }
    // Ref
    const progressBarRef = useRef<HTMLHeadingElement | null>(null)
    return (
        <div style={containerStyle}>
            <span style={leftTextStyle}>
                {parseTime(currTime)}
            </span>
            <motion.div 
                style={barStyle} 
                ref={progressBarRef}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                // onTap={onTap}
                // onDrag={onDrag}
            >
                <motion.div 
                    style={activeBarStyle}
                >
                </motion.div>
            </motion.div>
            <span style={rightTextStyle}>
                {parseTime(duration)}
            </span>
        </div>
    )
}
interface AudioProgressBarProps {
    width: string | number,
    height: string | number,
    backgroundColor: string,
    activeBackgroundColor: string,
    duration: number,
    currTime: number,
    onMouseDownCallback: (percentage: number) => void,
    onMouseUpCallback:() => void,
    onMouseMoveCallback: (percentage: number) => void
}
export default AudioProgressBar