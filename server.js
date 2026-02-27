// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
const PORT = 5000;

app.use(cors()); // مهم جداً عشان الإكستنشن تقدر تكلم السيرفر
app.use(express.json({ limit: "50mb" })); // زودنا الليميت لأن داتا تويتر بتبقى كبيرة

app.post("/api/sync-bookmarks", (req, res) => {
  const data = req.body;

  console.log("✅ استلمت داتا من الإكستنشن!");

  // حفظ الداتا في ملف للتجربة
  fs.writeFile("bookmarks_test.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("❌ حصل مشكلة وأنا بكتب الملف:", err);
      return res.status(500).send("Error saving file");
    }
    console.log("📂 الداتا اتحفظت بنجاح في bookmarks_test.json");
    res.send("Data received and saved!");
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
