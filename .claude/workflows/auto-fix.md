# Auto Bug Fix Workflow

## Trigger Phrases
- "sửa lỗi [description]"
- "fix [problem]"
- "không hoạt động"
- "bị lỗi"
- "không chạy được"

## Auto Actions
When user reports bugs, automatically:

### 1. Diagnose Issue
- Analyze error description
- Check related code files
- Identify potential causes
- Review recent changes

### 2. Generate Fix
- Create corrected code
- Add error handling
- Implement fallbacks
- Add debugging logs

### 3. Apply & Test
- Update affected files
- Add preventive measures
- Suggest testing steps
- Document the fix

### 4. Prevention
- Add error boundaries if needed
- Improve validation
- Add monitoring
- Update documentation

## Common Fixes

### "music player không hoạt động"
Auto fixes:
- Check Web Audio API support
- Add browser compatibility
- Implement fallbacks
- Fix mobile issues

### "firebase không kết nối được"
Auto fixes:
- Check configuration
- Add error handling
- Implement retry logic
- Add connection status

### "responsive không đúng"
Auto fixes:
- Check CSS breakpoints
- Fix mobile layouts
- Update media queries
- Test on different screens