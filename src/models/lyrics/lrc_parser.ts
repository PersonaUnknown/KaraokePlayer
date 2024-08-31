import { Song, SongLine, SongWord } from "../../interfaces/song"

// Helper functions
const ParseLength = (length: string) => {
    const colonIndex: number = length.indexOf(":")
    const minutes: string = length.substring(0, colonIndex)
    const seconds: string = length.substring(colonIndex + 1)
    return parseInt(minutes) * 60 + parseInt(seconds)
}
const ParseLineTimeStamp = (line: string) => {
    let timestamp = line.substring(1, line.length - 1)
    let colonIndex = timestamp.indexOf(":")
    let minutes = timestamp.substring(0, colonIndex)
    let seconds = timestamp.substring(colonIndex + 1)
    return parseInt(minutes) * 60 + parseFloat(seconds)
}
const ParseLine = (words: Array<string>) => {
    let currentTimeStamp = -1
    let arr = [] as Array<SongWord>
    for (let i = 0; i < words.length; i++) {
        let word: string = words[i]
        if (((word.includes("[") && word.includes("]")) || (word.includes("<") && word.includes(">"))) && word.includes(":")) {
            // Change current time stamp
            let timestamp: number = ParseLineTimeStamp(word)
            currentTimeStamp = timestamp
        } else {
            // Set the current word's timestamp to that
            if (currentTimeStamp >= 0 && word.length > 0) {
                let newWord = {} as SongWord
                newWord.word = word
                newWord.timestamp = currentTimeStamp
                arr.push(newWord)
            }
        }
    }
    return arr
}
// Given the file contents of a .lrc file, return a parsed JSON object
export const ParseLRC = async (fileContents: Array<string>) => {
    let parsedContents = {} as Song
    let parsedLyrics = [] as Array<SongLine>
    let timestamps = [] as Array<Array<number>>
    for (let i = 0; i < fileContents.length; i++) {
        const line: string = fileContents[i]
        const firstColonIndex: number = line.indexOf(":")
        const keyword: string = line.substring(1, firstColonIndex)
        const restOfLine: string = line.substring(firstColonIndex + 2, line.length - 1)
        switch(keyword) {
            case "ti":
                parsedContents.title = restOfLine
                break
            case "ar":
                parsedContents.artist = restOfLine
                break
            case "au":
                parsedContents.author = restOfLine
                break
            case "al":
                parsedContents.album = restOfLine
                break
            case "lr":
                break
            case "length":
                parsedContents.length = ParseLength(restOfLine) // [mm:ss]
                break
            default:
                // Parse individual line [mm:ss.xx]
                let lyric = {} as SongLine 
                let words: Array<string> = line.split(" ")
                let parsedWords: Array<SongWord> = ParseLine(words)
                if (parsedWords.length > 0) {
                    let lineTimestamps = new Set<number>()
                    for (let i = 0; i < parsedWords.length; i++) {
                        let parsedWord: SongWord = parsedWords[i]
                        lineTimestamps.add(parsedWord.timestamp)
                    }
                    let convertedLineTimestamps = Array.from(lineTimestamps)
                    timestamps.push(convertedLineTimestamps)
                    lyric.line = parsedWords
                    parsedLyrics.push(lyric)
                }
                break
        }
    }
    parsedContents.timestamps = timestamps
    parsedContents.lyrics = parsedLyrics
    console.log(parsedContents)
    return parsedContents
}