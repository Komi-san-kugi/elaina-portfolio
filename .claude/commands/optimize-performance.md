# Optimize Performance Command

## Description
Analyze and optimize the portfolio's performance metrics including bundle size, loading times, and runtime performance.

## Usage
Use this command when you want to improve the portfolio's performance or before deployment.

## Actions

### 1. Bundle Analysis
- Analyze webpack bundle size
- Identify large dependencies
- Suggest code splitting opportunities
- Check for duplicate dependencies

### 2. Image Optimization
- Compress images without quality loss
- Convert to modern formats (WebP, AVIF)
- Implement responsive images
- Add lazy loading

### 3. Code Optimization
- Remove unused CSS and JavaScript
- Minify and compress assets
- Implement tree shaking
- Optimize React components

### 4. Caching Strategy
- Implement service worker
- Set up proper cache headers
- Use CDN for static assets
- Implement browser caching

## Implementation Steps

### Step 1: Install Analysis Tools
```bash
npm install --save-dev webpack-bundle-analyzer
npm install --save-dev lighthouse
```

### Step 2: Add Scripts
```json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer dist/static/js/*.js",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html"
  }
}
```

### Step 3: Optimize Components
```jsx
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

// Use React.memo for expensive renders
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>
})

// Optimize re-renders with useMemo and useCallback
const OptimizedComponent = () => {
  const expensiveValue = useMemo(() => computeExpensiveValue(), [dependency])
  const memoizedCallback = useCallback(() => doSomething(), [dependency])
  
  return <div>{/* component */}</div>
}
```

### Step 4: Image Optimization
```jsx
// Responsive images
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

## Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1
- Bundle size: < 500KB gzipped