# 00_AI_BRIEF.md — INSTRUKSI UTAMA PENGEMBANGAN AI

## 1. ATURAN EMAS (GOLDEN RULES)
1. **Single Source of Truth**: Dokumen di dalam `docs/` adalah acuan mutlak. Jangan menambah karakter, jurus, item, atau flag tanpa mencatatnya terlebih dahulu di dokumen acuan ini dan menandainya sebagai "USULAN BARU".
2. **Desain Dulu, Kode Kemudian**: Tidak ada penulisan data/kode game sebelum struktur cerita, sistem combat, dan registri flag disetujui di dokumentasi kanon.
3. **No Meta Labels**: DILARANG keras menyertakan label mekanik kepada pemain di dalam narasi atau dialog (seperti `[Pilihan Benar]`, `[Kepribadian: ...]`, atau `[Gunakan Qi]`). Semuanya harus disampaikan secara implisit melalui petunjuk visual (*Telegraphed Visual Cue*).
4. **Fail-Forward**: Kekalahan dalam pertarungan tidak pernah memicu "Game Over" mendadak, melainkan mengarahkan ke cabang cerita baru yang realistis.
5. **ID Consistency**: ID di dokumen wajib sama persis dengan ID di kode (misal `item_01`, `act_hadapi_danu`, `ep1_danu_friendship`).

## 2. FORMAT PROMPT UNTUK AI
Setiap kali meminta AI menulis narasi atau kode baru, gunakan format berikut:
```text
[Tempel 00_AI_BRIEF.md]
[Tempel file master relevan: misal jurus_master.md / registri_flag.md]
[Tempel file episode yang sedang dikerjakan]

TUGAS: ...
ATURAN: Patuhi dokumen acuan di atas; jangan menambah elemen tanpa izin.
```
