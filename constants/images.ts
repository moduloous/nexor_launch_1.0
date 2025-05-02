export const IMAGES = {
  // Use URL-based placeholder instead of local file
  PLACEHOLDER: 'https://via.placeholder.com/150',
  
  // Add other image URLs here as needed
};

// Function to get a placeholder of a specific size
export const getPlaceholder = (width: number = 150, height: number = 150) => {
  return `https://via.placeholder.com/${width}x${height}`;
}; 