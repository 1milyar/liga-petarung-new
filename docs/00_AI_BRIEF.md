# 00_AI_BRIEF — Liga Petarung

## Tentang Proyek
Interactive Text RPG berbasis web, offline-first, vanilla JS. Judul: **Liga Petarung: Dari Padepokan ke Puncak Dunia**. Tema: perjalanan petarung tradisional Indonesia dari padepokan desa menuju arena internasional, dihadapkan pada intrik industri, doping, match-fixing, dan pilihan moral.

## Stack
- HTML + CSS + Vanilla JavaScript
- Tanpa framework, tanpa build tool
- Data tersimpan di `localStorage`

## Struktur
- `index.html` — UI utama
- `engine.js` — engine (combat, dialog, save, effects)
- `story_data.js` — Episode 1
- `story_data2.js` — Episode 2
- `docs/` — Story Bible (dokumen ini)

## Aturan Wajib untuk AI/Kontributor
1. **Jangan menambah karakter/jurus/item/flag yang tidak ada di dokumen `docs/`** tanpa menandai `USULAN BARU` di respons.
2. **Selalu tempel dokumen relevan** saat meminta bantuan AI: `00_AI_BRIEF.md` + file master (karakter/jurus/item) + file episode yang dikerjakan.
3. **Konsistensi ID:** ID di dokumen = ID di kode. Contoh `item_01`, `ep1_defeated_danu`, `act_hadapi_danu`, `jurus_geser_sumbu`.
4. **Panduan gaya bicara wajib dipatuhi** — lihat `01_dunia_dan_gaya/panduan_gaya.md`.
5. **Setiap akhir episode**, update `06_kontinuitas/changelog.md` dan master terkait.

## Gaya Bahasa Ringkas
- Narasi: orang kedua ("kau"), tidak "Anda" atau "kamu"
- Dialog NPC: formal untuk yang lebih tua, informal untuk sebaya
- Tone: grounded-realistis, kadang keras, kadang melankolis
- Dilarang: bahasa gaul internet, emoji di narasi, klise anime

## Peta Dokumen
- `01_dunia_dan_gaya/` — setting & panduan gaya
- `02_karakter/` — satu file per karakter
- `03_pertarungan/` — aturan combat, jurus, profil lawan
- `04_item/` — item master & resep
- `05_cerita/` — arc besar & episode per file
- `06_kontinuitas/` — registri flag, linimasa, changelog
- `templates/` — template untuk dokumen baru
