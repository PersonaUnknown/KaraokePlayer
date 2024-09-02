import { useRef, DragEvent } from "react"
import { FaUpload } from "react-icons/fa6"
import { AudioFileValues } from "./LyricCreationSettings"
const FileUpload = ({onUploadCallback}: FileUploadProps) => {
    // Ref
    const inputRef = useRef<HTMLInputElement>(null)
    // Logic
    const onClick = () => {
        if (inputRef.current === null) {
            return
        }
        inputRef.current.click()
    }
    const onDrop = (e: DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (inputRef.current === null) {
            return
        }
        const file: File = e.dataTransfer.files[0]
        const url = URL.createObjectURL(file)
        onUploadCallback({name: file.name, url: url})
    }
    const onDropEnterExit =  (e: DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }
    const onFileUpload = (e: React.FormEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const url = URL.createObjectURL(file)
        onUploadCallback({name: file.name, url: url})
    }
    // Styles
    const buttonStyle = {
        width: 250,
        height: 250,
        display: 'flex',
        flexDirection: 'column' as const,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 25,
        cursor: 'pointer',
        borderStyle: 'dotted'
    }
    const browseStyle = {
        backgroundColor: "#0096FF", 
        padding: 5, 
        width: '50%', 
        borderRadius: 25, 
        fontSize: 20, 
        fontFamily: 'Nunito',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    // Render
    const Divider = () => {
        const DividerStyle = {
            flex: 1,
            height: 2,
            backgroundColor: '#949494',
            marginTop: 'auto',
            marginBottom: 'auto'
        }
        return (
            <div
                style={DividerStyle}
            />
        )
    }
    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onDrop={onDrop}
            onDragEnter={onDropEnterExit}
            onDragOver={onDropEnterExit}
            onChange={onFileUpload}
        >
            <div style={{display: 'flex', margin: 'auto', flexDirection: 'column', gap: 10}}>
                <FaUpload color="#0096FF" style={{width: 50, height: 50, marginLeft: 'auto', marginRight: 'auto', marginTop: 5, marginBottom: 5}}/>
                <input 
                    ref={inputRef}
                    type="file" 
                    accept="audio/mp3" 
                    id='songMusic' 
                    hidden
                />
                <span style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 24, fontFamily: 'Nunito'}}>
                    Drag and Drop File
                </span>
                <div style={{display: 'flex', flexDirection: 'row', gap: 5, marginLeft: 25, marginRight: 25}}>
                    <Divider/>
                    <span style={{fontFamily: 'Nunito', fontSize: 18}}>
                        or
                    </span>
                    <Divider/>
                </div>
                <div style={browseStyle}>
                    Browse
                </div>
            </div>
        </button>
    )
}
interface FileUploadProps {
    onUploadCallback: (values: AudioFileValues) => void
}
export default FileUpload