// Parses a number into this format -> h:mm:ss (if the input is in seconds)
export const parseTime = (time: number) => {
    if (time <= 0) {
        return "00:00"
    }

    let hours: number = Math.floor(time / 3600)
    let minutes: number = Math.floor(time  % 3600 / 60)
    let seconds: number = Math.floor(time % 60)
    let output: string = ""

    if (hours > 0) {
        output += `${hours}:`
    }
    if (minutes > 0) {
        output += minutes < 10 ? `0${minutes}:` : `${minutes}:`
    } else {
        output += '00:'
    }
    output += seconds < 10 ? `0${seconds}` : `${seconds}`

    return output
}