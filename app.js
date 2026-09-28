require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const cari = (items, ...tipe) => {
    for (const t of tipe) {
        const hasil = items.find((i) => i.id && i.id.startsWith(t + "."));
        if (hasil) return hasil.text;
    }
    return "-";
};

app.get("/api/lokasi", async (req, res) => {
    const kota = (req.query.q || "").trim();
    if (!kota) {
        return res.status(400).json({ message: "Parameter q (nama lokasi) wajib diisi" });
    }

});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});