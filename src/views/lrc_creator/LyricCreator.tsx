import { useState } from "react"
const LyricCreator = () => {
    // States
    const [allInputsReady, setAllInputsReady] = useState<boolean>(false)
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        marginLeft: '30%',
        marginRight: '30%',
        padding: 15,
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 50,
        flex: 1,
        backgroundColor: 'antiquewhite'
    }
    const entryStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: 15
    }
    const buttonStyle = {
        marginTop: 'auto',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    // Render Input
    if (!allInputsReady) {
        return (
            <div style={containerStyle}>
                <span>
                    Don't have a .lrc file to display lyrics for? Follow these instructions to create your own!
                </span>
                <div style={entryStyle}>
                    <span>
                        Song Title
                    </span>
                    <input type='text'/>
                </div>
                <div style={entryStyle}>
                    <span>
                        Song Author
                    </span>
                    <input type='text'/>
                </div>
                <div style={entryStyle}>
                    <span>
                        What kind of song is it?
                    </span>
                    <input type="radio"/>
                </div>
                <div style={entryStyle}>
                    <span>
                        Input a .mp3 file!
                    </span>
                    <input type="file" accept="audio/mp3" id='songMusic'/>
                </div>
                <button style={buttonStyle} disabled={!allInputsReady}>
                    Submit
                </button>
            </div>
        )
    }
    // Render Timeline
    return (
        <div>

        </div>
    )
}

export default LyricCreator