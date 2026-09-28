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

    try {
        // 1) Geocoding dari MapTiler
        const geo = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json`,
            { params: { key: process.env.MAPTILER_KEY, limit: 1, language: "id" } }
        );

        const feature = geo.data.features[0];
        if (!feature) {
            return res.status(404).json({ message: `Lokasi "${kota}" tidak ditemukan` });
        }

        const [longitude, latitude] = feature.geometry.coordinates;
        const items = [{ id: feature.id, text: feature.text }, ...(feature.context || [])];

        // 2) Suhu dari Open-Meteo
        let suhu = null;
        try {
            const cuaca = await axios.get("https://api.open-meteo.com/v1/forecast", {
                params: { latitude, longitude, current: "temperature_2m" },
            });
            suhu = cuaca.data.current.temperature_2m;
        } catch (e) {
            console.error("Gagal ambil suhu:", e.message);
        }

        res.json({
            lokasi: feature.place_name,
            negara: cari(items, "country"),
            provinsi: cari(items, "region"),
            kecamatan: cari(items, "municipal_district", "joint_submunicipality", "locality", "county"),
            suhu,
            longitude,
            latitude,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Gagal mengambil data dari MapTiler" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});