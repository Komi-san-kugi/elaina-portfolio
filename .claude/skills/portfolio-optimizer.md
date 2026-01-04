# Portfolio Optimizer Skill

## Purpose
Optimize the Komi Portfolio for performance, accessibility, and user experience.

## Capabilities

### Performance Optimization
- Analyze bundle size and suggest optimizations
- Implement lazy loading for components
- Optimize images and assets
- Minimize CSS and JavaScript
- Implement service worker for caching

### Code Quality
- Refactor components for better maintainability
- Add TypeScript types for better development experience
- Implement error boundaries
- Add unit tests for critical components
- Code splitting for better loading

### Accessibility Improvements
- Add ARIA labels and roles
- Implement keyboard navigation
- Ensure color contrast compliance
- Add screen reader support
- Test with accessibility tools

### SEO Enhancement
- Generate meta tags dynamically
- Implement structured data
- Optimize for social media sharing
- Add sitemap generation
- Implement analytics tracking

## Usage Examples

### Optimize Component
```javascript
// Before: Heavy component
const HeavyComponent = () => {
  // Lots of logic and rendering
}

// After: Optimized with memo and lazy loading
const OptimizedComponent = React.memo(React.lazy(() => import('./HeavyComponent')))
```

### Add TypeScript
```typescript
interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  views: number;
}
```

### Accessibility
```jsx
<button 
  aria-label="Play music"
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyPress}
>
  <FaPlay />
</button>
```