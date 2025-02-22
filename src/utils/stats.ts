import { FileItem } from '../types';

// Initialize stats in localStorage if they don't exist
const initializeStats = () => {
  const stats = {
    totalFiles: 0,
    uniqueVisitors: [], // Store as array instead of Set
    lastVisit: Date.now(),
    processingTime: [] as number[],
  };

  if (!localStorage.getItem('fileRenameStats')) {
    localStorage.setItem('fileRenameStats', JSON.stringify(stats));
  }
};

// Generate a unique visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Track a new visitor
const trackVisitor = () => {
  const stats = JSON.parse(localStorage.getItem('fileRenameStats') || '{}');
  const visitorId = getVisitorId();
  
  // Initialize uniqueVisitors as array if it doesn't exist
  if (!Array.isArray(stats.uniqueVisitors)) {
    stats.uniqueVisitors = [];
  }
  
  // Add visitor if not already tracked
  if (!stats.uniqueVisitors.includes(visitorId)) {
    stats.uniqueVisitors.push(visitorId);
    localStorage.setItem('fileRenameStats', JSON.stringify(stats));
  }
};

// Track file processing
const trackFileProcessing = (file: FileItem, processingTime: number) => {
  const stats = JSON.parse(localStorage.getItem('fileRenameStats') || '{}');
  
  stats.totalFiles = (stats.totalFiles || 0) + 1;
  
  // Initialize processingTime as array if it doesn't exist
  if (!Array.isArray(stats.processingTime)) {
    stats.processingTime = [];
  }
  
  stats.processingTime.push(processingTime);
  localStorage.setItem('fileRenameStats', JSON.stringify(stats));
};

// Calculate average processing time savings
const calculateTimeSavings = (): number => {
  const stats = JSON.parse(localStorage.getItem('fileRenameStats') || '{}');
  
  // Ensure processingTime is an array
  if (!Array.isArray(stats.processingTime)) {
    return 0;
  }
  
  const processingTimes = stats.processingTime;
  
  if (processingTimes.length === 0) return 0;
  
  // Assume manual renaming takes 30 seconds per file on average
  const manualTime = 30 * processingTimes.length;
  const actualTime = processingTimes.reduce((a, b) => a + b, 0) / 1000; // Convert to seconds
  
  const savings = ((manualTime - actualTime) / manualTime) * 100;
  return Math.min(Math.round(savings), 99); // Cap at 99%
};

// Get current stats
const getStats = () => {
  const stats = JSON.parse(localStorage.getItem('fileRenameStats') || '{}');
  return {
    totalFiles: stats.totalFiles || 0,
    uniqueVisitors: Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors.length : 0,
    timeSavings: calculateTimeSavings()
  };
};

// Reset stats (useful for testing)
const resetStats = () => {
  const emptyStats = {
    totalFiles: 0,
    uniqueVisitors: [],
    lastVisit: Date.now(),
    processingTime: [],
  };
  localStorage.setItem('fileRenameStats', JSON.stringify(emptyStats));
};

// Initialize stats on module load
initializeStats();

export const statsService = {
  trackVisitor,
  trackFileProcessing,
  getStats,
  resetStats
};