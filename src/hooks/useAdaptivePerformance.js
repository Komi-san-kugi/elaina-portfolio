import { useState, useEffect, useCallback } from 'react'
import { getOptimizedConfig } from '../utils/performance'

export const useAdaptivePerformance = () => {
  const [performanceLevel, setPerformanceLevel] = useState('high')
  const [config, setConfig] = useState(getOptimizedConfig())

  // Measure FPS to adjust performance
  const measureFPS = useCallback(() => {
    let frames = 0
    let lastTime = performance.now()
    
    const countFrames = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime))
        
        // Adjust performance based on FPS
        if (fps < 30) {
          setPerformanceLevel('low')
        } else if (fps < 50) {
          setPerformanceLevel('medium')
        } else {
          setPerformanceLevel('high')
        }
        
        frames = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(countFrames)
    }
    
    requestAnimationFrame(countFrames)
  }, [])

  // Update config based on performance level
  useEffect(() => {
    const baseConfig = getOptimizedConfig()
    
    const performanceConfigs = {
      low: {
        ...baseConfig,
        enableHeavyEffects: false,
        rainbowSpeed: 12, // Very slow
        audioUpdateInterval: 200, // Very slow updates
        animationDuration: 1.2, // Slower animations
        beatSensitivity: 0.01, // Minimal beat response
        enableGlow: false
      },
      medium: {
        ...baseConfig,
        enableHeavyEffects: true,
        rainbowSpeed: 8, // Medium speed
        audioUpdateInterval: 100, // Medium updates
        animationDuration: 0.8,
        beatSensitivity: 0.03,
        enableGlow: true
      },
      high: {
        ...baseConfig,
        enableHeavyEffects: true,
        rainbowSpeed: 3, // Fast and beautiful
        audioUpdateInterval: 16, // Smooth 60fps
        animationDuration: 0.6,
        beatSensitivity: 0.05,
        enableGlow: true
      }
    }
    
    setConfig(performanceConfigs[performanceLevel])
  }, [performanceLevel])

  // Start FPS monitoring
  useEffect(() => {
    measureFPS()
  }, [measureFPS])

  return {
    performanceLevel,
    config,
    setPerformanceLevel // Manual override
  }
}