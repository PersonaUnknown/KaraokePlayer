import { motion } from "framer-motion"
const KaraokeLine = ({words, percentage}: KaraokeLineProps) => {
    return (
        <motion.div 
            style={{
                position: 'relative', 
                display: 'inline-block', 
            }}
        >
            <motion.div 
                style={{
                    whiteSpace: 'nowrap',
                    fontSize: '60px',
                    color: 'white',
                    textShadow: '2px 2px 2px black,-2px 2px 2px black, -2px -2px 2px black, 2px -2px 2px black',
                }}>
                {words}
            </motion.div>
            <motion.div 
                style={{
                    whiteSpace: 'nowrap',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    fontSize: '60px',
                    color: percentage < 0.05 ? 'white' : 'blue',
                    overflow: 'hidden',
                    zIndex: 1,
                    width: 0,
                    textShadow: percentage < 0.05 ? '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black': '-2px 0 blue, 0 2px blue, 2px 0 blue, 0 -2px blue'
                }}
                animate={{ width: `${percentage}%` }}
            >
                {words}
            </motion.div>
        </motion.div> 
    )
}
interface KaraokeLineProps {
    words: string,
    percentage: number
}
export default KaraokeLine