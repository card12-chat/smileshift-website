/**
 * SmileShift Utilities
 */

// Generate a random unique ID for event tracking
function generateEventId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
}
