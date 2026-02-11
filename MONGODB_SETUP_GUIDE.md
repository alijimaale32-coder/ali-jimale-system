# 🗄️ MongoDB Migration Guide
**Ali Jim'ale Islamic Institute Management System**

---

## ✅ STEP 1: Create MongoDB Atlas Account (FREE!)

### 1.1 Sign Up
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with your email
3. Verify your email address

### 1.2 Create Cluster
1. Click **"Build a Database"**
2. Choose **"FREE"** (M0 Sandbox) tier
3. Cloud Provider: **AWS**
4. Region: **N. Virginia (us-east-1)** (fastest for Middle East/Africa)
5. Cluster Name: **`ali-jimale-cluster`**
6. Click **"Create Cluster"** (takes 3-5 minutes)

---

## ✅ STEP 2: Configure Database Access

### 2.1 Create Database User
1. In MongoDB Atlas, go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: **`ali-jimale-admin`**
5. Password: **[Generate Strong Password]** → **SAVE THIS PASSWORD!**
6. Database User Privileges: **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### 2.2 Setup Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This allows connections from anywhere
   - Perfect for Vercel deployment
4. Click **"Confirm"**

---

## ✅ STEP 3: Get Connection String

### 3.1 Get MongoDB URI
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string:

```
mongodb+srv://ali-jimale-admin:<password>@ali-jimale-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 3.2 Important Notes
- Replace `<password>` with your actual password
- The `.xxxxx` part is unique to your cluster
- Keep this connection string **SECRET**!

---

## ✅ STEP 4: Update Environment Variables

### 4.1 Add MongoDB URI to `.env.local`

Open your `.env.local` file and add this line:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://ali-jimale-admin:YOUR_PASSWORD_HERE@ali-jimale-cluster.xxxxx.mongodb.net/ali-jimale-db?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD_HERE` → Your actual MongoDB password
- `.xxxxx` → Your actual cluster ID

### 4.2 Full `.env.local` Example

```env
# Firebase (Keep for migration period)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ali-jima-ale.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ali-jima-ale
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ali-jima-ale.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=881838438806
NEXT_PUBLIC_FIREBASE_APP_ID=1:881838438806:web:bd5b78e5f1cf7bba5a6a29

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU

# MongoDB (NEW!)
MONGODB_URI=mongodb+srv://ali-jimale-admin:YOUR_PASSWORD@ali-jimale-cluster.xxxxx.mongodb.net/ali-jimale-db?retryWrites=true&w=majority
```

---

## ✅ STEP 5: Files Created (Already Done! ✅)

I've already created these files for you:

### 5.1 Database Connection
- **`src/lib/mongodb.ts`** - MongoDB connection with caching

### 5.2 Mongoose Models
- **`src/models/Student.ts`** - Student schema
- **`src/models/Class.ts`** - Class schema  
- **`src/models/Attendance.ts`** - Attendance schema
- **`src/models/Teacher.ts`** - Teacher schema
- **`src/models/User.ts`** - User/Auth schema

### 5.3 Package Installed
- **`mongoose`** - MongoDB ODM ✅ Installed!

---

## ✅ STEP 6: Test MongoDB Connection

### 6.1 Create Test Script

I'll create a test script to verify your connection works!

---

## 🎯 Next Steps

### Option A: Manual Setup (Recommended)
1. **Create MongoDB Atlas account** (5 minutes)
2. **Get connection string** (2 minutes)
3. **Update `.env.local`** (1 minute)
4. **Test connection** (1 minute)
5. **Migrate data** (automated)

### Option B: I Guide You
I can guide you through each step with screenshots and exact instructions!

---

## 📊 Migration Strategy

### Strategy 1: Fresh Start (Recommended)
- Start with clean MongoDB database
- Re-register students using existing forms
- **Fastest and cleanest**

### Strategy 2: Data Migration
- Export Firebase data
- Import into MongoDB
- Takes longer but preserves existing data

Which strategy do you prefer?

---

## 💰 Cost Comparison

| Service | Firebase | MongoDB Atlas |
|---------|----------|---------------|
| **FREE Tier** | 1GB, limited reads | 512MB, unlimited |
| **Paid Tier** | $25+/month | $0-9/month |
| **Scalability** | Expensive | Affordable |
| **Control** | Limited | Full control |

**Savings: $15-25/month!** 💰

---

## 🚀 Ready to Continue?

Tell me:
1. **"I created MongoDB account"** - I'll help you get connection string
2. **"I have connection string"** - I'll help you test it
3. **"Guide me step by step"** - I'll walk you through everything
4. **"Fresh start"** - We'll use empty MongoDB database
5. **"Migrate data"** - We'll copy Firebase data to MongoDB

**Which option do you want?** 🎯
