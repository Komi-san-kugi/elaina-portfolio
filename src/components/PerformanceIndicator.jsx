import { motion } from 'framer-motion'
import { useAdaptivePerformance } from '../hooks/useAdaptivePerformance'
import { FaTachometerAlt } from 'react-icons/fa'

const PerformanceIndicator = () => {
  const { performanceLevel, setPerformanceLevel } = useAdaptivePerformance()
  
  const levelColors = {
    low: '#ff4444',
    medium: '#ffaa00', 
    high: '#44ff44'
  }
  
  const levelLabels = {
    low: 'Tiết kiệm',
    medium: 'Cân bằng',
    high: 'Tối đa'
  }

  return (
    <motion.div
      className="performance-indicator glass"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 15px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.8rem',
        zIndex: 1000,
        cursor: 'pointer'
      }}
      onClick={() => {
        const levels = ['low', 'medium', 'high']
        const currentIndex = levels.indexOf(performanceLevel)
        const nextLevel = levels[(currentIndex + 1) % levels.length]
        setPerformanceLevel(nextLevel)
      }}
      whileHover={{ scale: 1.05 }}
      title="Click để thay đổi chế độ performance"
    >
      <FaTachometerAlt 
        style={{ color: levelColors[performanceLevel] }}
      />
      <span style={{ color: levelColors[performanceLevel] }}>
        {levelLabels[performanceLevel]}
      </span>
    </motion.div>
  )
}

export default PerformanceIndicator