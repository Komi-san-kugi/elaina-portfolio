# Auto Feature Development Workflow

## Trigger Phrases
- "thêm [feature name]"
- "tạo [component name]"
- "add [feature]"
- "làm [tính năng]"

## Auto Actions
When user requests new features, automatically:

### 1. Understand Request
- Parse feature requirements
- Identify component type
- Check design system compatibility

### 2. Generate Code
- Create component with proper structure
- Add styling following glassmorphism pattern
- Include animations and responsive design
- Add TypeScript types if needed

### 3. Integration
- Update App.jsx to include new component
- Add necessary imports
- Update CSS files
- Add to navigation if needed

### 4. Testing & Documentation
- Generate basic tests
- Add component documentation
- Update README if significant feature

## Examples

### "thêm blog section"
Auto generates:
- BlogSection component
- Blog post card components
- Markdown support
- Responsive grid layout
- Integration with main app

### "tạo contact form"
Auto generates:
- ContactForm component
- Form validation
- Email integration
- Success/error states
- Accessibility features

### "làm theme switcher"
Auto generates:
- ThemeContext
- ThemeToggle component
- Dark/light CSS variables
- Smooth transitions
- Persistence in localStorage