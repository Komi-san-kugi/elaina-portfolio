// Mobile Performance Utilities

export const isMobile = () => {
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const isLowEndDevice = () => {
  // Detect low-end devices
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4
  
  return slowConnection || lowMemory
}

export const getOptimizedConfig = () => {
  const mobile = isMobile()
  const lowEnd = isLowEndDevice()
  
  return {
    // Animation settings
    animationDuration: mobile ? 1.0 : 0.6,
    reducedMotion: lowEnd,
    
    // Audio settings - Mobile giảm mạnh để tăng performance
    audioFFTSize: mobile ? 64 : 256,
    audioUpdateInterval: mobile ? 200 : 16,
    
    // Visual effects - Mobile tắt hết hiệu ứng nặng
    enableHeavyEffects: !mobile && !lowEnd,
    rainbowSpeed: mobile ? 15 : 3, // Mobile chậm hơn nhiều
    
    // Beat detection - Mobile giảm sensitivity
    beatSensitivity: mobile ? 0.01 : 0.05,
    
    // Performance
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableGlow: !mobile // Tắt glow trên mobile
  }
}

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  if (end - start > 16) { // Longer than 1 frame
    console.warn(`Performance warning: ${name} took ${end - start}ms`)
  }
  
  return result
}

// Debounce for expensive operations
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}