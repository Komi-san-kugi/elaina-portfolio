import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, get, query, orderByChild, equalTo } from 'firebase/database'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const firebaseConfig = {
  apiKey: "AIzaSyBxaJjmhUJ5tRObMRq-TJywBytye4QS9K8",
  authDomain: "komi-project.firebaseapp.com",
  databaseURL: "https://komi-project-default-rtdb.firebaseio.com",
  projectId: "komi-project",
  storageBucket: "komi-project.firebasestorage.app",
  messagingSenderId: "465960879354",
  appId: "1:465960879354:web:d2c6bd5ee5e357eaa93543",
  measurementId: "G-H2RMVMHBK9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Lấy fingerprint của thiết bị (unique cho mỗi máy)
const getFingerprint = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}

// Lấy tên thiết bị chi tiết hơn
export const getDeviceName = () => {
  const userAgent = navigator.userAgent
  
  // Detect mobile devices với model cụ thể
  if (/iPhone/.test(userAgent)) {
    return 'iPhone'
  }
  if (/iPad/.test(userAgent)) {
    return 'iPad'
  }
  if (/Android/.test(userAgent)) {
    // Lấy model Android chi tiết
    const match = userAgent.match(/Android[^;]*;\s*([^)]+?)\s*(?:Build|;|\))/)
    if (match && match[1]) {
      let model = match[1].trim()
      // Loại bỏ các ký tự không cần thiết
      model = model.replace(/\s+/g, ' ').trim()
      if (model && model.length > 1) {
        return model
      }
    }
    return 'Android Device'
  }
  
  // Desktop - lấy thông tin browser + OS
  const platform = navigator.platform || ''
  let os = 'Unknown'
  
  if (/Win/.test(platform)) {
    os = 'Windows'
  } else if (/Mac/.test(platform)) {
    os = 'MacOS'
  } else if (/Linux/.test(platform)) {
    os = 'Linux'
  }
  
  // Lấy tên browser
  let browser = ''
  if (/Edg/.test(userAgent)) {
    browser = 'Edge'
  } else if (/Chrome/.test(userAgent)) {
    browser = 'Chrome'
  } else if (/Firefox/.test(userAgent)) {
    browser = 'Firefox'
  } else if (/Safari/.test(userAgent)) {
    browser = 'Safari'
  }
  
  return `${os} - ${browser}`
}

// Lưu visitor mới vào database (dùng fingerprint để tránh trùng)
export const saveVisitor = async () => {
  try {
    const fingerprint = await getFingerprint()
    
    // Kiểm tra xem fingerprint này đã tồn tại chưa
    const visitorsRef = ref(database, 'visitors')
    const snapshot = await get(visitorsRef)
    const data = snapshot.val()
    
    if (data) {
      // Tìm xem có visitor nào có cùng fingerprint không
      const existingVisitor = Object.values(data).find(v => v.fingerprint === fingerprint)
      if (existingVisitor) {
        // Đã tồn tại, không lưu lại
        return false
      }
    }
    
    const deviceName = getDeviceName()
    const timestamp = new Date().toISOString()
    
    await push(visitorsRef, {
      deviceName,
      timestamp,
      fingerprint,
      id: fingerprint
    })
    
    return true
  } catch (error) {
    console.error('Error saving visitor:', error)
    return false
  }
}

// Lấy tổng số visitors
export const getVisitorCount = (callback) => {
  const visitorsRef = ref(database, 'visitors')
  
  onValue(visitorsRef, (snapshot) => {
    const data = snapshot.val()
    const count = data ? Object.keys(data).length : 0
    callback(count)
  })
}

// Lấy danh sách visitors
export const getVisitors = (callback) => {
  const visitorsRef = ref(database, 'visitors')
  
  onValue(visitorsRef, (snapshot) => {
    const data = snapshot.val()
    const visitors = data ? Object.values(data) : []
    callback(visitors)
  })
}

export { database }
