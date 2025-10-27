/**
 * J2ME Loader for CloudFone
 * Main entry point - Optimized for CloudFone platform
 */

// Import modules
import { Storage } from './storage.js';
import { Database } from './database.js';
import { FileBrowser } from './file-browser.js';
import { EmulatorCore } from './emulator-core.js';

// Make modules available globally
window.Storage = Storage;
window.Database = Database;
window.FileBrowser = FileBrowser;
window.EmulatorCore = EmulatorCore;

// CloudFone Platform Detection and Setup
const CloudFonePlatform = {
  init() {
    console.log('J2ME Loader for CloudFone starting up...');
    
    // Detect CloudFone device
    if (window.CloudFoneDetection && window.CloudFoneDetection.isCloudFoneDevice()) {
      const deviceModel = window.CloudFoneDetection.getDeviceModel();
      console.log('CloudFone device detected:', deviceModel);
      
      // Set up CloudFone specific configurations
      this.setupCloudFoneFeatures();
    } else {
      console.log('Running on standard web browser');
    }
    
    // Initialize application
    this.loadApplication();
  },
  
  setupCloudFoneFeatures() {
    // Enable Wake Lock for CloudFone devices
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(err => {
        console.log('Wake lock not supported:', err);
      });
    }
    
    // Optimize for small screens
    this.optimizeForSmallScreen();
  },
  
  optimizeForSmallScreen() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0';
    }
  },
  
  loadApplication() {
    // Load the application script
    const appScript = document.createElement('script');
    appScript.src = 'js/app.js';
    appScript.onerror = function() {
      console.error('Failed to load app.js');
      if (window.SoftKeys) {
        window.SoftKeys.update('', 'Error', 'Retry');
        window.SoftKeys.setActions(null, null, () => location.reload());
      }
    };
    document.body.appendChild(appScript);
  }
};

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  CloudFonePlatform.init();
});

// Handle global errors
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, 'at', source, lineno, colno, error);
  
  // Show error to user for critical errors
  if (error && error.isCritical) {
    alert(`An error occurred: ${message}`);
  }
  
  return true; // Prevent default error handling
};
