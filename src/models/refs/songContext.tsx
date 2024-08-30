import { createContext, useState, ReactNode } from "react"
import { Song } from "../../interfaces/song"

// Define the type for the context value
export interface SongContextType {
    currSongLyrics: Song | null;
    setCurrSongLyrics: React.Dispatch<React.SetStateAction<Song | null>>;
}
export const SongContext = createContext<SongContextType | undefined>(undefined)
export const SongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currSongLyrics, setCurrSongLyrics] = useState<Song | null>(null)
    return (
        <SongContext.Provider value={{ currSongLyrics, setCurrSongLyrics }}>
            {children}
        </SongContext.Provider>
    )
}