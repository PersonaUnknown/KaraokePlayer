import { useState } from "react"
import { LyricDetails } from "../../interfaces/song"
import { AudioFileValues } from "./LyricCreationSettings"
import ProgressStep from "./ProgressStep"
import SongDetailsForm from "./SongDetailsForm"
import LyricCreationSettings from "./LyricCreationSettings"
import LyricCreationTimeline from "./LyricCreationTimeline"
const LyricCreator = () => {
    // States
    // const [allInputsReady, setAllInputsReady] = useState<boolean>(false)
    const [currStepIndex, setCurrStepIndex] = useState<number>(0)
    const [inputDetails, setInputDetails] = useState<LyricDetails | null>(null)
    const [inputAudioFile, setInputAudioFile] = useState<LyricSettings | null>(null)
    const [inputTimestamps, setInputTimestamps] = useState<number[][]>([])
    // Logic
    const updateSongDetails = (value: LyricDetails) => {
        setInputDetails(value)
        toNextPage()
    }
    const updateSongSettings = (type: string, audioFile: AudioFileValues) => {
        setInputAudioFile({type: type, name: audioFile.name, url: audioFile.url})
        toNextPage()
    }
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        flex: 1,
        gap: 20,
        margin: 'auto',
        textAlign: 'center' as const,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 25,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        fontFamily: 'Nunito',
        fontSize: 25
    }
    // Form Navigation
    const toNextPage = () => {
        setCurrStepIndex(currStepIndex + 1)
    }
    const toPrevPage = () => {
        setCurrStepIndex(currStepIndex - 1)
    }
    // Render
    const renderFormPage = (index: number) => {
        switch (index) {
            case 0:
                return <SongDetailsForm onSubmitCallback={updateSongDetails}/>
            case 1:
                return <LyricCreationSettings onNextCallback={updateSongSettings} onPrevCallback={toPrevPage}/>
            case 2:
                return <LyricCreationTimeline url={inputAudioFile?.url ?? ""} lyrics={inputDetails?.lyrics ?? ""}/>
            default:
                return <></>
        }
    }
    return (
        <div style={containerStyle}>
            <span>
                Create Karaoke Lyrics For Song
            </span>
            <ProgressStep
                steps={["Song Details", "Settings", "Creation", "Review"]}
                currIndex={currStepIndex}
            />
            { renderFormPage(currStepIndex) }
        </div>
    )
}
interface LyricSettings {
    type: string,
    name: string,
    url: string
}
export default LyricCreator