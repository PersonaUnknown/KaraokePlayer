const ProgressStep = ({steps, currIndex}: ProgressStepProps) => {
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row' as const,
    }
    // Render
    const renderStep = () => {
        return (
            steps.map((value, index) => {
                const stepNumber: number = index + 1
                return (
                    <div style={{...containerStyle, gap: 10}} key={index}>
                        <div
                            style={{
                                backgroundColor: currIndex === index ? '#0096FF' : '#949494',
                                width: 35,
                                height: 35,
                                display: 'flex',
                                borderRadius: 20
                            }}
                        >
                            <p 
                                style={{
                                    margin: 'auto',
                                    fontSize: 26,
                                    color: 'white'
                                }}
                            >
                                {stepNumber}
                            </p>
                        </div>
                        <p 
                            style={{
                                margin: 'auto',
                                fontSize: 26,
                                color: currIndex === index ? '#0096FF' : 'black'
                            }}
                        >
                            {value}
                        </p>
                    </div>
                )
            })
        )
    }
    return (
        <div style={{...containerStyle, gap: 20}}>
            { renderStep() }
        </div>
    )
}
interface ProgressStepProps {
    steps: string[],
    currIndex: number
}
export default ProgressStep