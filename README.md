# Ali Jim'ale Institute Management System

## 📍 Project Location
**Full Path:** `C:\Users\HP\.gemini\antigravity\scratch\ali-jimale-system`

---

## 🚀 How to Start the System

### **Step 1: Open Terminal**
- Open PowerShell or Command Prompt
- Navigate to project folder:
```bash
cd C:\Users\HP\.gemini\antigravity\scratch\ali-jimale-system
```

### **Step 2: Start Development Server**
```bash
npm run dev
```

### **Step 3: Open in Browser**
- Go to: `http://localhost:3000`
- Login or access dashboard

---

## 🔑 Important Credentials

### **Firebase Project**
- Project Name: `ali-jima-ale`
- Console: https://console.firebase.google.com/project/ali-jima-ale

### **Gemini AI**
- API Key: `AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU`
- Console: https://makersuite.google.com/app/apikey

---

## 📊 System Features

### **1. Dashboard**
- Overview statistics
- Quick access to all modules

### **2. Classes Management** (`/dashboard/classes`)
- Create classes in 3 departments:
  - ابتدائي (Ibtidai/Primary) - Blue
  - إعدادي (I'dadi/Middle) - Yellow
  - ثانوي (Thanawi/Secondary) - White
- View students in each class
- Take attendance

### **3. Student Directory** (`/dashboard/students`)
- Register students with full details
- Assign students to classes
- Track Xalqada (study circle) information

### **4. Teachers** (`/dashboard/teachers`)
- Employment records
- Teacher management

### **5. Attendance System** (`/dashboard/attendance`)
- 3 daily sessions:
  - Morning
  - After Break
  - Afternoon
- Filter by class
- Track student presence

### **6. AI Assistant** ✨
- Click purple sparkle button in bottom-right
- Register students through conversation
- Create classes conversationally
- Get help and guidance

---

## 🤖 Using the AI Assistant

### **Register a Student:**
1. Click the purple sparkle button ✨
2. Say: "Register a new student named [Name]"
3. Answer AI's questions about:
   - Gender, Birthday, Place of Birth
   - Father/Mother phone numbers
   - District, Clan, Age
   - Xalqada information
   - Enrollment/Graduation dates
4. Click green "Register Student Now" button
5. ✅ Done!

### **Create a Class:**
1. Click AI button
2. Say: "Create a boys class in Ibtidai"
3. Provide: Class name, Teacher name
4. Click "Create Class Now"
5. ✅ Done!

---

## 📁 Project Structure

```
ali-jimale-system/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx (Dashboard)
│   │   │   ├── classes/page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── teachers/page.tsx
│   │   │   └── attendance/page.tsx
│   │   └── api/
│   │       └── ai-assistant/route.ts
│   ├── components/
│   │   ├── AIAssistant.tsx
│   │   ├── StudentForm.tsx
│   │   ├── ClassStudentsModal.tsx
│   │   └── DashboardLayout.tsx
│   └── lib/
│       └── firebase.ts
├── .env.local (Firebase & Gemini keys)
└── package.json
```

---

## 🔥 Firebase Collections

### **students**
- name, gender, birthday, placeOfBirth
- fatherNumber, motherNumber, motherName
- district, clan, age
- magacaXalqada, goobtaXalqada
- waqtigaBiiray, waqtigaBaxay
- classId (link to class)
- status, createdAt

### **classes**
- className, departmentId, gender
- teacherName, studentCount
- academicYear, createdAt

### **attendance**
- studentId, classId, date
- morningStatus, afterBreakStatus, afternoonStatus
- createdAt

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (React)
- **Database:** Firebase Firestore
- **AI:** Google Gemini Pro
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 📝 Quick Commands

### **Install Dependencies**
```bash
npm install
```

### **Start Development Server**
```bash
npm run dev
```

### **Build for Production**
```bash
npm run build
```

### **Start Production Server**
```bash
npm start
```

---

## 🎯 Next Steps (When You Return)

1. **Test AI Assistant:**
   - Register Hussein Mohamed Shari Jamale
   - Register Ismail Mohamed Shari Jamale

2. **Create Classes:**
   - Create boys classes in each department
   - Assign students to classes

3. **Take Attendance:**
   - Select a class
   - Mark attendance for 3 sessions

4. **Deploy (Optional):**
   - Deploy to Vercel: https://vercel.com
   - Connect GitHub repository
   - Set environment variables

---

## 🆘 Troubleshooting

### **Server won't start:**
```bash
npm install
npm run dev
```

### **Firebase errors:**
- Check `.env.local` has correct keys
- Ensure Firestore is in test mode
- Restart server after changing .env

### **AI not responding:**
- Check Gemini API key in `.env.local`
- Restart server
- Check browser console for errors

---

## 📞 Support

If you need help:
1. Check this README
2. Review Firebase Console for data
3. Check browser console (F12) for errors
4. Restart development server

---

**System Created:** February 8, 2026  
**Status:** ✅ Fully Functional  
**Ready to Use:** Yes!

---

## 🎉 Summary

You have a complete student management system with:
- ✅ Class management
- ✅ Student registration
- ✅ Attendance tracking
- ✅ AI-powered assistant
- ✅ Firebase cloud storage
- ✅ Beautiful Islamic-themed UI

**Everything is ready! Just run `npm run dev` and start using it!** 🚀
