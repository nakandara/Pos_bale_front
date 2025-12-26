// Common dark mode class combinations for reusability

export const darkModeClasses = {
  // Cards and containers
  card: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  cardHover: 'hover:bg-gray-50 dark:hover:bg-gray-750',
  
  // Text colors
  textPrimary: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-400',
  textMuted: 'text-gray-500 dark:text-gray-500',
  
  // Inputs
  input: 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500',
  inputFocus: 'focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400',
  
  // Buttons
  buttonPrimary: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white',
  buttonSecondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
  buttonDanger: 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400',
  
  // Badges/Pills
  badgeBlue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  badgeGreen: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  badgeYellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  badgeRed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  
  // Dividers
  divider: 'border-gray-200 dark:border-gray-700',
  
  // Backgrounds
  bgPrimary: 'bg-gray-50 dark:bg-gray-900',
  bgSecondary: 'bg-gray-100 dark:bg-gray-800',
  
  // Shadows
  shadow: 'shadow-md dark:shadow-gray-900/50',
}

export default darkModeClasses

