const { initializeApp, cert, getApps } = require("firebase-admin/app");
const path = require("path");
const fs = require("fs");

// مسار الملف على منصة Render
const renderPath = "/etc/secrets/firebase-service-account.json";
// مسار الملف على جهازك المحلي
const localPath = path.join(__dirname, "config", "firebase-service-account.json");

let serviceAccount;

// التحقق من بيئة التشغيل واستدعاء الملف الصحيح
if (fs.existsSync(renderPath)) {
  serviceAccount = require(renderPath);
} else {
  serviceAccount = require(localPath);
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

console.log("✅ Firebase Admin initialized successfully");
