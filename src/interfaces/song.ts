export interface SongWord {
    word: string,
    timestamp: number // The starting timestamp of the entire word
}

export interface SongLine {
    line: SongWord[]
}

export interface Song {
    title: string,
    artist: string,
    album: string,
    author: string,
    length: number,
    lyrics: SongLine[],
}

export interface Playlist {
    songs: Song[]
}