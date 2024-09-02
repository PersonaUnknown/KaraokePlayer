import { Tab } from "../../interfaces/tabs"
import { useState } from "react"
import { motion } from 'framer-motion'
const TabBar = ({ tabLabels, tabComponents, alignment, gap, padding, buttonStyle, activeButtonStyle }: TabBarProps) => {
    // States
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
    // Tab Button
    const OnTabClick = (index: number) => {
        if (selectedTabIndex === index) {
            return
        }
        setSelectedTabIndex(index)
    }
    const TabButton = (label: string, index: number) => {
        return (
            <motion.button 
                style={index === selectedTabIndex ? ActiveTabBarButtonStyle : TabBarButtonStyle}
                onClick={() => { OnTabClick(index) }}
            >
               {label} 
            </motion.button>
        )
    }
    // Styles
    const ContainerStyle = {
        display: 'flex',
        flex: 1,
        flexDirection: 'column' as const
    }
    const TabBarButtonStyle = {
        fontFamily: "Nunito",
        backgroundColor: buttonStyle?.backgroundColor,
        borderColor: buttonStyle?.borderColor,
        color: buttonStyle?.textColor,
        borderRadius: buttonStyle?.borderRadius,
        fontSize: buttonStyle?.fontSize,
        paddingLeft: buttonStyle?.paddingHorizontal,
        paddingRight: buttonStyle?.paddingHorizontal,
        paddingTop: buttonStyle?.paddingVertical,
        paddingBottom: buttonStyle?.paddingVertical
    }
    const ActiveTabBarButtonStyle = {
        fontFamily: "Nunito",
        backgroundColor: activeButtonStyle?.backgroundColor,
        borderColor: activeButtonStyle?.borderColor,
        color: activeButtonStyle?.textColor,
        borderRadius: activeButtonStyle?.borderRadius,
        fontSize: activeButtonStyle?.fontSize,
        paddingLeft: activeButtonStyle?.paddingHorizontal,
        paddingRight: activeButtonStyle?.paddingHorizontal,
        paddingTop: activeButtonStyle?.paddingVertical,
        paddingBottom: activeButtonStyle?.paddingVertical
    }
    const TabBarStyle = {
        display: 'flex',
        marginLeft: alignment === "right" || alignment === "center" ? 'auto' : 0,
        marginRight: alignment === "left" || alignment === "center" ? 'auto' : 0,
        gap: gap ?? 0,
        padding: padding === null ? 10 : typeof padding === "number" ? padding : parseFloat(padding as string),
    }
    // Render
    return (
        <div style={ContainerStyle}>
            <div style={TabBarStyle}>
                { TabButton("Audio Player", 0) }
                { TabButton("LRC Viewer", 1) }
                { TabButton("LRC Creator", 2) }
                { TabButton("Karaoke Tester", 3) }
            </div>
            { tabComponents[selectedTabIndex] }
        </div>
    )
}
interface ButtonStyleProps {
    backgroundColor?: string,
    borderColor?: string,
    borderRadius?: string | number,
    textColor?: string,
    activeTextColor?: string,
    fontSize?: string | number,
    paddingVertical?: string | number,
    paddingHorizontal?: string | number
}
interface TabBarProps {
    tabLabels: Array<Tab>,
    tabComponents: Array<React.ReactElement>,
    alignment?: string,
    gap?: number,
    padding?: number | string
    buttonStyle?: ButtonStyleProps,
    activeButtonStyle? : ButtonStyleProps
}
export default TabBar