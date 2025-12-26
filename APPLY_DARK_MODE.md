# Quick Dark Mode Class Reference

Apply these classes to make components dark-mode compatible:

## Common Patterns

### Text Colors
```
text-gray-900 → text-gray-900 dark:text-white
text-gray-600 → text-gray-600 dark:text-gray-400
text-gray-700 → text-gray-700 dark:text-gray-300
text-gray-500 → text-gray-500 dark:text-gray-400
```

### Backgrounds
```
bg-white → bg-white dark:bg-gray-800
bg-gray-50 → bg-gray-50 dark:bg-gray-700/50
bg-gray-100 → bg-gray-100 dark:bg-gray-700
```

### Borders
```
border-gray-200 → border-gray-200 dark:border-gray-700
border-gray-300 → border-gray-300 dark:border-gray-600
```

### Inputs & Forms
```
bg-white border-gray-300 text-gray-900
→
bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white
```

### Buttons
```
bg-blue-600 hover:bg-blue-700
→
bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600
```

### Badges/Pills
```
bg-blue-100 text-blue-700
→
bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
```

## Add to all cards/containers
```
transition-colors
```

