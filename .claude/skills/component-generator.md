# Component Generator Skill

## Purpose
Generate new React components following the portfolio's design system and patterns.

## Design System

### Color Palette
```css
:root {
  --primary: #8b5cf6;      /* Purple */
  --secondary: #ec4899;     /* Pink */
  --background: #0a0a0f;    /* Dark */
  --glass: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

### Component Template
```jsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './ComponentName.css'

const ComponentName = ({ prop1, prop2, ...props }) => {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    // Component logic
  }, [])

  return (
    <motion.div
      className="component-name glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Component content */}
    </motion.div>
  )
}

export default ComponentName
```

### CSS Template
```css
.component-name {
  background: var(--glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.component-name:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}
```

## Component Types

### Interactive Elements
- Buttons with hover effects
- Form inputs with validation
- Modal dialogs
- Dropdown menus
- Tabs and accordions

### Display Components
- Cards with glassmorphism
- Image galleries
- Progress bars
- Loading spinners
- Notification toasts

### Layout Components
- Grid systems
- Flex containers
- Sidebar navigation
- Header/footer
- Section dividers

## Animation Patterns
```jsx
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Scale on hover
const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```