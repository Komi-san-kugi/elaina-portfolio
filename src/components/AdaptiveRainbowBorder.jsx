import { motion } from 'framer-motion'
import { useAdaptivePerformance } from '../hooks/useAdaptivePerformance'

const AdaptiveRainbowBorder = ({ children, beat = 0, className = '' }) => {
  const { config } = useAdaptivePerformance()
  
  // Calculate dynamic scale based on performance config
  const beatScale = 1 + beat * config.beatSensitivity
  
  return (
    <motion.div
      className={`avatar-container-large rainbow-border ${config.enableGlow ? 'rainbow-border-glow' : ''} ${className}`}
      style={{
        transform: `scale(${beatScale})`,
        '--rainbow-speed': `${config.rainbowSpeed}s`,
        '--animation-duration': `${config.animationDuration}s`
      }}
      animate={{
        scale: beatScale
      }}
      transition={{
        duration: config.animationDuration,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export default AdaptiveRainbowBorder