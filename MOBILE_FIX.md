# Mobile Responsiveness Fix

## Problem
When typing on mobile devices (iOS/Android), the page zooms in automatically. This happens because:
1. Input font-size is less than 16px
2. Viewport allows user scaling
3. Mobile browsers auto-zoom on inputs with font-size < 16px

## Solution Applied

### 1. Updated `index.html`
- Added `maximum-scale=1.0, user-scalable=no` to viewport meta tag
- Prevents manual zoom and auto-zoom on input focus

### 2. Updated `src/index.css`
- Set all inputs, selects, and textareas to minimum 16px font-size
- Added iOS-specific fixes
- Set minimum touch target size (44px) for better UX
- Fixed body positioning on mobile to prevent keyboard issues

### 3. Updated All Form Pages
- Changed input classes from `text-sm sm:text-base` to `text-base`
- Added inline `style={{ fontSize: '16px' }}` to ensure 16px minimum
- Increased padding on mobile: `py-2 sm:py-3` for better touch targets

## Files Modified
- ✅ `index.html` - Viewport meta tag
- ✅ `src/index.css` - Global input styles
- ✅ `src/pages/PurchasesPage.tsx` - All 6 inputs fixed
- ⚠️ `src/pages/SalesPage.tsx` - Needs update
- ⚠️ `src/pages/CategoriesPage.tsx` - Needs update

## Testing
1. Deploy to Vercel
2. Open on mobile device (iOS Safari or Android Chrome)
3. Tap any input field
4. Page should NOT zoom
5. Keyboard should appear smoothly
6. Content should remain visible

## Key Changes
```css
/* Before */
className="text-sm sm:text-base"  /* 14px on mobile = zoom! */

/* After */
className="text-base"              /* 16px on all screens = no zoom! */
style={{ fontSize: '16px' }}       /* Force 16px minimum */
```

## Why 16px?
- iOS Safari auto-zooms on inputs with font-size < 16px
- Android Chrome has similar behavior
- 16px is the minimum to prevent auto-zoom
- Still readable and user-friendly

## Additional Benefits
- Better touch targets (44px minimum height)
- Smoother keyboard appearance
- No layout shift when typing
- Professional mobile UX

## Deploy
```bash
git add .
git commit -m "Fix mobile zoom issue on input focus"
git push origin master
```

Vercel will auto-deploy and the fix will be live!

