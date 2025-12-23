# 🏪 Clothes Shop POS - භාවිතා කරන්නේ කොහොමද

## 🚀 Run කරන්න

```bash
npm run dev
```

Browser එකේ http://localhost:5173 open වෙනවා

---

## 📋 System Overview - 5 Main Pages

### 1️⃣ **Analysis** (📊 Monthly Reports)
මාසික income, outcome, profit බලන්න

**Features:**
- ✅ Total Income (Sales)
- ✅ Total Outcome (Purchases)
- ✅ Profit/Loss calculation
- ✅ Best performing category
- ✅ Category-wise performance table
- ✅ Month/Year selector
- ✅ Insights & suggestions

**Usage:** මාසික report එක බලන්න මේ page එකෙන්

---

### 2️⃣ **Purchases** (📦 Stock In)
Wholesale ගෙන එන වෙලාවට record කරන්න

**Form fields:**
- Date
- Category (Crop Top, Blouse, etc.)
- Quantity
- Total Cost (LKR)
- Selling Price per Item
- Supplier (optional)

**Auto-calculated:**
- Cost per Item

**Example:**
```
Date: 2025-12-05
Category: Crop Top
Quantity: 150
Total Cost: 40,000
Selling Price: 500
→ Cost per Item: 267 LKR
```

---

### 3️⃣ **Sales** (💰 Stock Out)
විකුණන හැම වෙලාවෙම record කරන්න

**Form fields:**
- Date
- Category
- Quantity Sold
- Selling Price per Item

**Smart features:**
- ✅ Shows available stock per category
- ✅ Prevents overselling
- ✅ Auto-calculates total amount

**Example:**
```
Date: 2025-12-07
Category: Crop Top
Quantity: 3
Price: 500
→ Total: 1,500 LKR
```

---

### 4️⃣ **Inventory** (📋 Current Stock)
හැම category එකේම තියෙන stock බලන්න

**Shows:**
- Total Bought
- Total Sold
- Remaining stock
- Average cost per item
- Selling price
- Stock value (money locked in inventory)

**Alerts:**
- 🟡 Low stock warning (≤ 10 items)
- 🔴 Out of stock warning

**Example:**
```
Category: Crop Top
Bought: 150
Sold: 92
Remaining: 58
Cost/Item: LKR 267
Selling Price: LKR 500
Stock Value: LKR 15,486
```

---

### 5️⃣ **Categories** (📁 Setup)
Categories manage කරන්න

**Actions:**
- ➕ Add new category
- ❌ Delete category

**Pre-loaded categories:**
- Crop Top
- Blouse
- T-Shirt

**Usage:** පළමු වතාවට categories add කරන්න

---

## 🎯 Daily Workflow

### Morning:
1. Check **Inventory** - කොච්චර stock තියෙනවාද
2. Check **Analysis** - මේ මාසෙ progress එක

### When buying wholesale:
1. Go to **Purchases** page
2. Fill the form:
   - Select category
   - Enter quantity & cost
   - Set selling price
3. Click "Add Purchase"

### When making a sale:
1. Go to **Sales** page
2. Fill the form:
   - Select category (check available stock)
   - Enter quantity sold
   - Confirm selling price
3. Click "Add Sale"

### End of day:
1. Check **Inventory** - remaining stock
2. Check **Analysis** - today's profit

### End of month:
1. Go to **Analysis** page
2. Select month & year
3. See:
   - ✅ Total Income
   - ✅ Total Outcome
   - ✅ Profit/Loss
   - ✅ Best category
   - ✅ Complete analysis

---

## 💡 Tips

### 1. Start with Categories
පළමුවෙන්ම **Categories** page එකෙන් categories add කරන්න:
- Crop Top
- Blouse
- T-Shirt
- Frock
- Jeans
- etc.

### 2. Record Every Purchase
Wholesale ගෙන එන හැම වෙලාවෙම **Purchases** page එකෙන් record කරන්න

### 3. Record Every Sale
විකුණන හැම වෙලාවෙම **Sales** page එකෙන් record කරන්න

### 4. Check Stock Daily
**Inventory** page එකෙන් තියෙන stock daily check කරන්න

### 5. Monthly Review
මාසය අවසානයේ **Analysis** page එකෙන් full report එක බලන්න

---

## 📊 Understanding the Analysis Page

### Income (මුදල් ආවේ)
Total sales amount = විකුණපු හැම එකෙන් හම්බුණ මුදල

### Outcome (මුදල් ගියේ)
Total purchase cost = ගෙන එන්න වියදම් කළ මුදල

### Profit (ලාභය)
```
Profit = Income - Outcome
```

**Example:**
```
Income: LKR 94,000 (විකිණීම්)
Outcome: LKR 85,000 (ගෙන එන්න)
Profit: LKR 9,000 ✅
```

### Category Performance
අලංකාර category එක වඩාත් profit ගෙන්වනවාද බලන්න

---

## 🎨 Features

✅ **Simple & Clean UI** - භාවිතයට පහසු  
✅ **Mobile Friendly** - Phone එකෙන් පාවිච්චි කරන්න පුළුවන්  
✅ **Real-time Calculations** - Automatic calculations  
✅ **Stock Validation** - වැඩිපුර විකුණන්න බැහැ  
✅ **Monthly Reports** - සම්පූර්ණ analysis  
✅ **Category-wise Analysis** - හැම category එකම වෙන වෙනම  
✅ **Low Stock Alerts** - අඩු වෙලා තියෙනවා කියලා පෙන්වන්නෙ  

---

## 🔄 Data Flow

```
1. Add Categories → Setup basic categories

2. Add Purchases → Stock increases
   Example: Buy 150 crop tops

3. Add Sales → Stock decreases
   Example: Sell 3 crop tops

4. View Inventory → See current stock
   Example: 147 crop tops remaining

5. View Analysis → See profit/loss
   Example: Made LKR 9,000 this month
```

---

## 🎉 Ready to Use!

```bash
npm run dev
```

පළමුවෙන්ම:
1. Categories add කරන්න
2. First purchase එක add කරන්න
3. First sale එක add කරන්න
4. Analysis page එක check කරන්න

**ඔබේ clothes shop එක manage කරන්න easy වෙනවා!** 🎊




