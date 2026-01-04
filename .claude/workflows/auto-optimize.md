# Auto Optimization Workflow

## Trigger Phrases
- "tối ưu trang web"
- "làm cho nhanh hơn"
- "optimize performance"
- "cải thiện tốc độ"

## Auto Actions
When user says optimization phrases, automatically:

### 1. Analyze Current Performance
- Check bundle size
- Identify heavy components
- Find optimization opportunities

### 2. Apply Optimizations
- Optimize imports (React Icons)
- Add lazy loading
- Compress images
- Memoize components

### 3. Generate Optimized Code
- Create optimized versions of components
- Update imports
- Add performance monitoring

### 4. Report Results
- Show before/after metrics
- List improvements made
- Suggest next steps

## Implementation
```javascript
// Auto-detect optimization needs
const optimizationNeeds = analyzeProject()

// Apply fixes automatically
const optimizedCode = applyOptimizations(optimizationNeeds)

// Update files
updateProjectFiles(optimizedCode)

// Report results
generatePerformanceReport()
```