# J2ME Loader Testing Guide

## 🎮 Test Apps Included

### 1. Hello World Test (`HelloWorldMIDlet.java`)
- **Purpose**: Basic functionality test
- **Features**: Simple UI, Command handling, Exit functionality
- **Keyboard**: Escape key to exit

### 2. Simple Game Test (`SimpleGameMIDlet.java`)
- **Purpose**: Comprehensive keyboard testing
- **Features**: 
  - Arrow key movement (↑↓←→)
  - T9 keypad detection (0-9, *, #)
  - Real-time key display
  - Game loop with graphics
- **Controls**: Arrow keys to move red square, number keys for input

## 🧪 How to Test

### Option 1: Use Pre-built JAR files
1. Find sample J2ME JAR files online:
   - Search "J2ME games download"
   - Visit Archive.org mobile software collection
   - Check RetroGaming communities

### Option 2: Test with CloudFone Simulator
1. Access CloudFone Simulator: https://developer.cloudfone.com/docs/guides/developer-tools/
2. Load the J2ME Loader website
3. Test keyboard functionality

### Option 3: Manual Testing
1. Open the J2ME Loader: https://phucph0501.github.io/j2me-loader-cloudfone
2. Test keyboard navigation:
   - **Arrow Keys**: Navigate through menus
   - **Enter**: Select items
   - **Escape/Backspace**: Go back
   - **Numbers 0-9**: Quick selection
   - **Soft Keys**: Context actions

## 🔧 CloudFone Features to Test

### ✅ Device Detection
- Check console for "CloudFone device detected" message
- Verify User Agent contains "Cloud Phone" or "Puffin"

### ✅ Keyboard Mapping
- **Standard Keys**: ↑↓←→, Enter, Escape
- **T9 Keypad**: 0-9, *, #
- **Soft Keys**: F1 (Left), F2 (Right), ContextMenu

### ✅ Screen Compatibility
- Test on different screen sizes
- QQVGA (128x160), QVGA (240x320)
- Responsive design

### ✅ Navigation Flow
- App list navigation
- Install functionality
- Settings navigation
- Emulator controls

## 🐛 Known Issues to Test

1. **Focus Management**: Ensure proper focus indication
2. **Soft Key Context**: Verify correct soft key labels
3. **Keyboard Response**: Test all key mappings
4. **Screen Scaling**: Check small screen compatibility
5. **Memory Management**: Test with multiple apps

## 📱 CloudFone Specific Tests

### User Agent Detection
```javascript
// Should detect CloudFone devices
const isCloudFone = navigator.userAgent.includes('Cloud Phone') || 
                   navigator.userAgent.includes('Puffin');
```

### Key Event Mapping
```javascript
// CloudFone key mappings
document.addEventListener('keydown', (e) => {
  console.log('CloudFone Key:', {
    key: e.key,
    keyCode: e.keyCode,
    code: e.code
  });
});
```

## 🎯 Test Checklist

- [ ] Website loads correctly
- [ ] CloudFone device detection works
- [ ] Arrow key navigation functions
- [ ] Soft keys display correct labels
- [ ] T9 keypad input works
- [ ] Install button functions
- [ ] File browser opens
- [ ] App list navigation
- [ ] Settings screen accessible
- [ ] Back navigation works
- [ ] Exit functionality
- [ ] Small screen compatibility
- [ ] Console shows debug info

## 📝 Expected Results

### ✅ Success Indicators
- No JavaScript errors in console
- Smooth keyboard navigation
- Proper focus indicators
- Correct soft key context
- CloudFone detection logs

### ❌ Failure Indicators
- JavaScript errors
- Unresponsive keys
- Incorrect focus
- Missing soft key labels
- Navigation failures

## 🔗 Useful Links

- **Live Demo**: https://phucph0501.github.io/j2me-loader-cloudfone
- **CloudFone Developer**: https://developer.cloudfone.com
- **J2ME Archive**: https://archive.org/details/mobilephone_software
- **GitHub Repo**: https://github.com/phucph0501/j2me-loader-cloudfone

## 📞 CloudFone Platform Info

- **Supported Devices**: Nokia, Viettel, HMD, itel phones
- **Screen Sizes**: 1.8-2.4" QQVGA/QVGA displays
- **Input Methods**: T9 keypad, Arrow keys, Soft keys
- **Platform**: Chromium-based remote browser
- **APIs**: CloudFone-compatible Web APIs