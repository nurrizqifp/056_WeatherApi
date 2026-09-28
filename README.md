# Geolocation & Cuaca
- **Nama:** Nur Rizqi Febriansyah Putra
- **NIM:** 20240140056

## Teknologi
- Node.js + Express + Axios
- MapTiler Geocoding API (lokasi)
- Open-Meteo API (suhu)
- HTML + Tailwind CSS

## Cara menjalankan
```bash
npm install
cp .env.example .env    # isi MAPTILER_KEY dengan API key kamu
node app.js
```
Buka http://localhost:3000

## Endpoint
`GET /api/lokasi?q=<nama lokasi>`

## Screenshot

### Tampilan web
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/906bcffa-8ff9-412a-9608-218f8d22798d" />

### Hasil GET di browser
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b86cca13-1e4a-4ca1-a886-f573f0cc4e82" />

### Hasil GET di Postman
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/9d89c024-1ea4-43c1-a514-ccd146a9b2c7" />
