/**
 * J2ME Loader for CloudFone
 * Navigation and keyboard handling optimized for CloudFone platform
 */

// CloudFone device detection
const CloudFoneDetection = {
  isCloudFoneDevice() {
    const userAgent = navigator.userAgent;
    return userAgent.includes('Cloud Phone') || userAgent.includes('Puffin');
  },
  
  getDeviceModel() {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/Cloud Phone; ([^)]+)\)/);
    return match ? match[1] : 'Generic';
  },
  
  init() {
    if (this.isCloudFoneDevice()) {
      document.body.classList.add('cloudfone-device');
      console.log('CloudFone device detected:', this.getDeviceModel());
    }
  }
};

// Navigation state
const navState = {
  // Current focused element in each screen
  focusMap: {
    'app-list': {
      selector: '#apps li',
      currentIndex: 0
    },
    'app-details': {
      selector: '.button-container button',
      currentIndex: 0
    },
    'app-settings': {
      selector: '#settings-form select, #settings-form input[type="checkbox"]',
      currentIndex: 0
    },
    'file-browser': {
      selector: '#file-list li',
      currentIndex: 0
    }
  }
};

// Initialize navigation for the current screen
function initNavigation(screenId) {
  const navConfig = navState.focusMap[screenId];
  if (!navConfig) return;
  
  const elements = document.querySelectorAll(navConfig.selector);
  if (elements.length === 0) return;
  
  // Reset current index if out of bounds
  if (navConfig.currentIndex >= elements.length) {
    navConfig.currentIndex = 0;
  }
  
  // Set focus on the current element
  setFocus(screenId, navConfig.currentIndex);
}

// Set focus on an element in the current screen
function setFocus(screenId, index) {
  const navConfig = navState.focusMap[screenId];
  if (!navConfig) return;
  
  const elements = document.querySelectorAll(navConfig.selector);
  if (elements.length === 0) return;
  
  // Remove focus from all elements
  elements.forEach(el => {
    el.classList.remove('focused');
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
      el.blur();
    }
  });
  
  // Set focus on the specified element
  const element = elements[index];
  element.classList.add('focused');
  
  if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
    element.focus();
  }
  
  // Update current index
  navConfig.currentIndex = index;
}

// Navigate to the next element in the current screen
function navNext(screenId) {
  const navConfig = navState.focusMap[screenId];
  if (!navConfig) return;
  
  const elements = document.querySelectorAll(navConfig.selector);
  if (elements.length === 0) return;
  
  let nextIndex = navConfig.currentIndex + 1;
  if (nextIndex >= elements.length) {
    nextIndex = 0; // Wrap around
  }
  
  setFocus(screenId, nextIndex);
}

// Navigate to the previous element in the current screen
function navPrev(screenId) {
  const navConfig = navState.focusMap[screenId];
  if (!navConfig) return;
  
  const elements = document.querySelectorAll(navConfig.selector);
  if (elements.length === 0) return;
  
  let prevIndex = navConfig.currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = elements.length - 1; // Wrap around
  }
  
  setFocus(screenId, prevIndex);
}

// Activate the currently focused element
function activateFocused(screenId) {
  const navConfig = navState.focusMap[screenId];
  if (!navConfig) return;
  
  const elements = document.querySelectorAll(navConfig.selector);
  if (elements.length === 0) return;
  
  const element = elements[navConfig.currentIndex];
  
  if (element.tagName === 'INPUT' && element.type === 'checkbox') {
    element.checked = !element.checked;
    return;
  }
  
  if (element.tagName === 'SELECT') {
    // Toggle dropdown
    if (element === document.activeElement) {
      element.blur();
    } else {
      element.focus();
    }
    return;
  }
  
  // Simulate a click event
  element.click();
}

// Handle D-pad navigation
function handleDPad(key, screenId) {
  switch (key) {
    case 'ArrowUp':
      navPrev(screenId);
      break;
    case 'ArrowDown':
      navNext(screenId);
      break;
    case 'ArrowLeft':
      // Handle left navigation if needed
      break;
    case 'ArrowRight':
      // Handle right navigation if needed
      break;
    case 'Enter':
      activateFocused(screenId);
      break;
  }
}

// CloudFone Soft Key Management
const SoftKeys = {
  update(leftText = '', centerText = '', rightText = '') {
    const leftKey = document.getElementById('softkey-left');
    const centerKey = document.getElementById('softkey-center');
    const rightKey = document.getElementById('softkey-right');
    
    if (leftKey) leftKey.textContent = leftText;
    if (centerKey) centerKey.textContent = centerText;
    if (rightKey) rightKey.textContent = rightText;
  },
  
  setActions(leftAction = null, centerAction = null, rightAction = null) {
    this.leftAction = leftAction;
    this.centerAction = centerAction;
    this.rightAction = rightAction;
  },
  
  handleSoftKeyPress(position) {
    switch (position) {
      case 'left':
        if (this.leftAction) this.leftAction();
        break;
      case 'center':
        if (this.centerAction) this.centerAction();
        break;
      case 'right':
        if (this.rightAction) this.rightAction();
        break;
    }
  }
};

// CloudFone Keyboard Event Handler
function handleCloudFoneKeyboard(event) {
  const key = event.key;
  const activeScreen = document.querySelector('.screen.active');
  const screenId = activeScreen ? activeScreen.id : null;
  
  // Prevent default for navigation keys
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(key)) {
    event.preventDefault();
  }
  
  // Handle CloudFone specific keys
  switch (key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'Enter':
      handleDPad(key, screenId);
      break;
    case 'Escape':
    case 'Backspace':
      // Handle back navigation
      SoftKeys.handleSoftKeyPress('right');
      break;
    case 'F1':
    case 'ContextMenu':
      // Left soft key
      SoftKeys.handleSoftKeyPress('left');
      break;
    case 'F2':
      // Center soft key (Enter alternative)
      SoftKeys.handleSoftKeyPress('center');
      break;
    // Handle T9 keys (0-9, *, #)
    case 'Digit0':
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
    case 'NumpadMultiply':
      // Handle T9 input if needed
      break;
  }
}

// Export functions for use in other modules
window.Navigation = {
  init: initNavigation,
  setFocus: setFocus,
  next: navNext,
  prev: navPrev,
  activate: activateFocused,
  handleDPad: handleDPad
};

window.SoftKeys = SoftKeys;
window.CloudFoneDetection = CloudFoneDetection;

// Initialize CloudFone detection and keyboard handling
document.addEventListener('DOMContentLoaded', () => {
  CloudFoneDetection.init();
  
  // Add CloudFone keyboard event listener
  document.addEventListener('keydown', handleCloudFoneKeyboard);
  
  // Add soft key click handlers
  document.getElementById('softkey-left')?.addEventListener('click', () => {
    SoftKeys.handleSoftKeyPress('left');
  });
  
  document.getElementById('softkey-center')?.addEventListener('click', () => {
    SoftKeys.handleSoftKeyPress('center');
  });
  
  document.getElementById('softkey-right')?.addEventListener('click', () => {
    SoftKeys.handleSoftKeyPress('right');
  });
});
