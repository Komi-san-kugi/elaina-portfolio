import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { FaGithub, FaFacebook, FaDiscord, FaCat, FaEye, FaTimes, FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaList, FaMobileAlt, FaDesktop, FaLaptop } from 'react-icons/fa'
import { SiJavascript, SiPython, SiCss3 } from 'react-icons/si'
import { saveVisitor, getVisitorCount, getVisitors } from './firebase'
import { useAdaptivePerformance } from './hooks/useAdaptivePerformance'
import PerformanceIndicator from './components/PerformanceIndicator'
import './App.css'

// Visitor Counter Component - Hiển thị số người đã xem
const VisitorCounter = () => {
  const [count, setCount] = useState(0)
  const [visitors, setVisitors] = useState([])
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    // Lưu visitor mới
    saveVisitor()

    // Lắng nghe số lượng visitors realtime
    getVisitorCount((newCount) => {
      setCount(newCount)
    })

    // Lắng nghe danh sách visitors
    getVisitors((visitorList) => {
      // Sắp xếp theo thời gian mới nhất
      const sorted = visitorList.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      )
      setVisitors(sorted)
    })
  }, [])

  // Format thời gian
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Icon theo loại thiết bị
  const getDeviceIcon = (deviceName) => {
    if (deviceName.includes('iPhone') || deviceName.includes('Android') || deviceName.includes('Mobile')) {
      return <FaMobileAlt />
    }
    if (deviceName.includes('Mac')) {
      return <FaLaptop />
    }
    return <FaDesktop />
  }

  return (
    <>
      <motion.div
        className="visitor-counter glass"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => setShowList(true)}
        style={{ cursor: 'pointer' }}
        whileHover={{ scale: 1.05 }}
      >
        <FaEye className="visitor-icon" />
        <span className="visitor-count">{count.toLocaleString()}</span>
      </motion.div>

      {/* Visitor List Modal */}
      <AnimatePresence>
        {showList && (
          <motion.div
            className="visitor-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowList(false)}
          >
            <motion.div
              className="visitor-modal glass"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="visitor-modal-header">
                <h3><FaEye /> Danh sách người xem ({count})</h3>
                <button onClick={() => setShowList(false)}><FaTimes /></button>
              </div>
              <div className="visitor-list">
                {visitors.map((visitor, index) => (
                  <motion.div
                    key={visitor.id || index}
                    className="visitor-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="visitor-device-icon">
                      {getDeviceIcon(visitor.deviceName)}
                    </span>
                    <div className="visitor-info">
                      <span className="visitor-device">{visitor.deviceName}</span>
                      <span className="visitor-time">{formatTime(visitor.timestamp)}</span>
                    </div>
                  </motion.div>
                ))}
                {visitors.length === 0 && (
                  <p className="no-visitors">Chưa có ai xem</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Beat detection for audio-reactive animations

// Loading Screen Component - Click để vào và bật nhạc
const LoadingScreen = ({ onComplete }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    if (ready) onComplete()
  }

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      style={{ cursor: ready ? 'pointer' : 'default' }}
    >
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaCat size={50} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {ready ? '✨ Click to Enter ✨' : 'Loading magic...'}
      </motion.p>
    </motion.div>
  )
}

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar glass ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-logo">
        <FaCat size={24} />
        <span>Komi</span>
      </div>
      <div className="nav-links">
        <a href="#hero">Overview</a>
        <a href="#projects">My Projects</a>
        <a href="#contact">Contact Me</a>
      </div>
    </motion.nav>
  )
}


// Hero Section Component
const HeroSection = ({ beat }) => {
  const [showAvatar, setShowAvatar] = useState(false)
  
  // Mobile optimization: Reduce beat sensitivity
  const isMobile = window.innerWidth <= 768
  const beatScale = isMobile 
    ? 1 + beat * 0.02  // Less scaling on mobile
    : 1 + beat * 0.05  // Normal scaling on desktop
  
  const skills = [
    { name: 'HTML/CSS', icon: <SiCss3 /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'Purr', icon: <FaCat /> },
  ]

  return (
    <section id="hero" className="hero-section">
      <LayoutGroup>
        {/* Left Content */}
        <motion.div
          className="hero-content"
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            layout: { type: "spring", stiffness: 100, damping: 20 }
          }}
        >
          <motion.div
            className="hero-name-wrapper"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="hero-name clickable"
              layout
              onClick={() => setShowAvatar(!showAvatar)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Komi
            </motion.h1>
            {!showAvatar && (
              <motion.span 
                className="click-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Click me!
              </motion.span>
            )}
          </motion.div>

          <motion.p
            className="hero-role"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Indie web developer & AI Student
          </motion.p>

          <motion.div
            className="skills-container"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill.name}
                className="skill-badge glass"
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px #8b5cf6' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {skill.icon}
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Big Avatar (Hidden initially, appears on click) */}
        <AnimatePresence>
          {showAvatar && (
            <motion.div
              className="hero-avatar-large"
              initial={{ opacity: 0, scale: 0.5, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 100 }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 18,
                mass: 0.8
              }}
            >
            <motion.div
              className="avatar-container-large rainbow-border rainbow-border-glow"
              style={{
                transform: `scale(${beatScale})`
              }}
            >
              <img
                src="/images/avatar.png"
                alt="Komi Avatar Large"
                className="avatar-large"
                onError={(e) => {
                  e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Elaina&backgroundColor=8b5cf6'
                }}
              />
            </motion.div>
            {/* Close button */}
            <motion.button
              className="avatar-close-btn"
              onClick={() => setShowAvatar(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  )
}


// Project Data
const projectsData = [
  {
    id: 1,
    title: 'Elaina Theme',
    description: 'A beautiful VS Code theme inspired by Wandering Witch',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    views: 1234,
    github: 'https://github.com',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    ]
  },
  {
    id: 2,
    title: 'Auto Ban Bot',
    description: 'Discord bot for automatic moderation',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
    views: 567,
    github: 'https://github.com',
    images: [
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    ]
  },
  {
    id: 3,
    title: 'Anime Wallpaper API',
    description: 'REST API serving high-quality anime wallpapers',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
    views: 890,
    github: 'https://github.com',
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800',
    ]
  },
  {
    id: 4,
    title: 'Cat Translator',
    description: 'AI-powered app that translates cat meows',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    views: 2345,
    github: 'https://github.com',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
    ]
  },
]

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0)

  if (!project) return null

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content glass"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-slider">
          <img src={project.images[currentImage]} alt={project.title} />
          <div className="slider-dots">
            {project.images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        <h2>{project.title}</h2>
        <p>{project.description}</p>
        
        <div className="modal-stats">
          <span><FaEye /> {project.views} views</span>
        </div>

        <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn">
          <FaGithub /> Go to GitHub
        </a>
      </motion.div>
    </motion.div>
  )
}


// Projects Section Component
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="projects-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card glass"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [showDiscord, setShowDiscord] = useState(false)
  const discordUsername = 'komi_elaina'
  
  const socials = [
    { name: 'Facebook', icon: <FaFacebook size={24} />, url: 'https://www.facebook.com/komilacuatoi.me', color: '#1877f2' },
    { name: 'GitHub', icon: <FaGithub size={24} />, url: 'https://github.com/Komi-san-kugi', color: '#333' },
  ]

  return (
    <section id="contact" className="contact-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      <motion.div
        className="contact-avatar"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/avatar-contact.png"
          alt="Contact Avatar"
          onError={(e) => {
            e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=ElainaCute&backgroundColor=ec4899'
          }}
        />
      </motion.div>

      <div className="social-links">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${social.color}` }}
            title={social.name}
          >
            {social.icon}
            <span className="tooltip">{social.name}</span>
          </motion.a>
        ))}
        
        {/* Discord Button with Popup */}
        <motion.div
          className="discord-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="social-btn glass discord-btn"
            onClick={() => setShowDiscord(!showDiscord)}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px #5865F2' }}
          >
            <FaDiscord size={24} />
            <span className="tooltip">Discord</span>
          </motion.button>
          
          <AnimatePresence>
            {showDiscord && (
              <motion.div
                className="discord-popup glass"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <span className="discord-label">Username:</span>
                <span className="discord-username">{discordUsername}</span>
                <button 
                  className="discord-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(discordUsername)
                    alert('Đã copy username!')
                  }}
                >
                  Copy
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}


// ============================================
// PLAYLIST - THAY ĐỔI DANH SÁCH NHẠC Ở ĐÂY
// ============================================
// Bỏ file .mp3 vào thư mục: public/music/
// Đặt tên: music1.mp3, music2.mp3, music3.mp3...
// Chỉ cần sửa title và artist bên dưới
// ============================================
const playlist = [
  { 
    id: 1, 
    title: 'Tháng 6 và em ❤️',      // ← Sửa tên bài
    artist: 'Elaina',       // ← Sửa tên ca sĩ
    src: '/music/music1.mp3'
  },
  { 
    id: 2, 
    title: 'Làm người yêu em nhé', 
    artist: '',
    src: '/music/music2.mp3'
  },
  { 
    id: 3, 
    title: 'Kỵ sĩ ánh sao', 
    artist: '',
    src: '/music/music3.mp3'
  },
]

// Format time
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Music Player Component
const MusicPlayer = ({ onBeatChange }) => {
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const audioContextRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const currentSong = playlist[currentTrack]
  const progress = duration ? (currentTime / duration) * 100 : 0

  // Setup Audio Analyser with mobile optimization
  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        const audioContext = new AudioContextClass()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaElementSource(audioRef.current)
        
        source.connect(analyser)
        analyser.connect(audioContext.destination)
        
        // Mobile optimization: Smaller FFT size
        const isMobile = window.innerWidth <= 768
        analyser.fftSize = isMobile ? 128 : 256 // Smaller on mobile
        
        audioContextRef.current = audioContext
        analyserRef.current = analyser
        
        // Analyze beat with mobile optimization
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        const updateInterval = isMobile ? 100 : 16 // Less frequent on mobile
        
        const updateBeat = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray)
            // Lấy bass frequencies (0-10) để detect beat
            const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10
            const normalizedBeat = Math.min(bass / 255, 1)
            onBeatChange(normalizedBeat)
          }
          setTimeout(updateBeat, updateInterval)
        }
        updateBeat()
      } catch (e) {
        console.log('Audio context error:', e)
      }
    }
  }, [onBeatChange])

  // Autoplay khi vào trang
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentTrack])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleEnded = () => handleNext()

  const handlePrev = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0
    } else {
      setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))
    }
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === playlist.length - 1 ? 0 : prev + 1))
  }

  const handleTrackSelect = (index) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    setShowPlaylist(false)
  }

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      audioRef.current.currentTime = (clickX / rect.width) * duration
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Playlist Modal */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            className="playlist-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPlaylist(false)}
          >
            <motion.div
              className="playlist-modal glass"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="playlist-header">
                <h3><FaMusic /> Playlist</h3>
                <button onClick={() => setShowPlaylist(false)}><FaTimes /></button>
              </div>
              <div className="playlist-items">
                {playlist.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                    onClick={() => handleTrackSelect(index)}
                    whileHover={{ x: 5, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                  >
                    <div className="track-info">
                      <span className="track-title">{track.title}</span>
                      <span className="track-artist">{track.artist}</span>
                    </div>
                    {index === currentTrack && isPlaying && (
                      <div className="playing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player */}
      <motion.div
        className="music-player glass"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="music-info">
          <div className="music-cover"><FaMusic /></div>
          <div className="music-text">
            <span className="music-title">{currentSong.title}</span>
            <span className="music-artist">{currentSong.artist}</span>
          </div>
        </div>

        <div className="music-progress-wrapper">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="music-progress-container" onClick={handleProgressClick}>
            <div className="music-progress">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="music-controls">
          <button className="control-btn" onClick={handlePrev}><FaStepBackward /></button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn" onClick={handleNext}><FaStepForward /></button>
        </div>

        <div className="music-extra">
          <div className="volume-control">
            <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false) }}
              className="volume-slider"
            />
          </div>
          <button className="control-btn playlist-btn" onClick={() => setShowPlaylist(true)}>
            <FaList />
          </button>
        </div>
      </motion.div>
    </>
  )
}

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    let animationId
    const handleMouseMove = (e) => {
      // Dùng requestAnimationFrame để tối ưu performance
      if (animationId) cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`
        }
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  )
}

// Detect device type
const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent)
  const isSmallScreen = window.innerWidth <= 768
  return (isMobile || isSmallScreen) ? 'mobile' : 'desktop'
}

// Main App Component
function App() {
  const [deviceType, setDeviceType] = useState(() => detectDevice())
  const [loading, setLoading] = useState(true)
  const [beat, setBeat] = useState(0)
  const { performanceLevel, config } = useAdaptivePerformance()

  // Auto detect device and apply class to body
  useEffect(() => {
    document.body.classList.remove('mobile-mode', 'desktop-mode')
    document.body.classList.add(`${deviceType}-mode`)
    
    // Add performance class
    document.body.classList.remove('performance-low', 'performance-medium', 'performance-high')
    document.body.classList.add(`performance-${performanceLevel}`)

    // Listen for resize to update device type
    const handleResize = () => {
      const newDevice = detectDevice()
      if (newDevice !== deviceType) {
        setDeviceType(newDevice)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [deviceType, performanceLevel])

  // Debounced beat change for performance
  const debouncedSetBeat = debounce(setBeat, config.audioUpdateInterval)

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {deviceType === 'desktop' && <CustomCursor />}
          <div className="bg-fixed" />
          <div className="bg-overlay" />
          <Navbar />
          <VisitorCounter />
          <PerformanceIndicator />
          <main>
            <HeroSection beat={beat} />
            <ProjectsSection />
            <ContactSection />
          </main>
          <MusicPlayer onBeatChange={debouncedSetBeat} />
        </>
      )}
    </>
  )
}

export default App
