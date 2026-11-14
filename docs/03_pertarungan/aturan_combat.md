# Aturan Combat — Liga Petarung

**Versi:** 2.0 | **Berlaku sejak:** Fase 3 (engine baru)

## 1. Tujuan Sistem
Membuat pemain **membaca lawan** dan **memilih jurus**, bukan menebak jawaban benar dari teks. Setiap ronde harus punya risiko dan hadiah.

## 2. Alur Satu Ronde

Pertarungan berlangsung **4-8 ronde** (variabel, tergantung lawan). Berakhir bila:
- Stamina pemain atau lawan = 0
- Postur salah satu pihak = 0 → Celah Emas → biasanya diakhiri di ronde yang sama

## 3. Sumber Daya

| Sumber Daya | Rentang | Fungsi | Reset |
|---|---|---|---|
| **Stamina** | 0-100 | "HP" pemain & lawan | Tidak reset antar ronde |
| **Qi** | 0-100 | Bahan bakar jurus | +10/ronde (pasif) |
| **Postur** | 0-5 | Ketahanan mental/keseimbangan | Tidak reset |
| **Momentum** | -3 s/d +3 | Membuka jurus pamungkas | -1/ronde jika tidak menyerang |

### Detail

**Stamina** = stat1 pemain. Kalau mencapai 0 → kalah (dengan konsekuensi cerita, bukan game over).
**Qi** = stat2 pemain. Berkurang saat pakai jurus. Pulih +10 di awal setiap ronde, atau +10-15 dengan aksi Napas Dalam.
**Postur** = "benteng mental". Mulai di 5. Turun saat menerima hasil Gagal atau saat lawan melakukan serangan tajam. Kalau 0 → **Celah Emas** terbuka.
**Momentum** = akumulasi keunggulan. +1 saat hasil Sempurna. -1 saat hasil Gagal. Reset saat kalah ronde.

## 4. Hasil Bertingkat

| Hasil | Kapan | Efek Umum |
|---|---|---|
| **Sempurna** | Tag jurus cocok + penguasaan ≥ Terlatih + kondisi prima | Lawan -Postur, +Momentum, buka tell |
| **Berhasil** | Tag cocok, atau netral + penguasaan baik | Efek normal, tidak ada penalti |
| **Tertahan** | Tag netral, atau tag lemah + kondisi cukup | Pemain -Stamina sedang, tidak ada progres |
| **Gagal** | Tag lemah + kondisi buruk (debuff, Qi rendah) | Pemain -Stamina besar, -Postur |

Kondisi "prima" = tidak ada debuff aktif, Qi ≥ 40, Stamina ≥ 50.

## 5. Pola Lawan (4 Tag)

Setiap lawan punya **satu pola dominan** (bisa berubah saat fase):

- **CEPAT** — serangan cepat bertubi, susah dipukul, mudah dihindar. Stamina tipis.
- **BERAT** — serangan lambat tapi mematikan. Mudah dihindar, tapi satu hit = -20 s/d -30. Stamina tebal.
- **BERTAHAN** — sabar, tunggu counter, hemat. Menguras kesabaran lawan.
- **TIPUAN** — jebakan, feint, pola berubah. Menghukum pemain yang pakai satu jurus terus.

## 6. Tabel Kecocokan Jurus vs Pola

| Jurus | vs CEPAT | vs BERAT | vs BERTAHAN | vs TIPUAN |
|---|---|---|---|---|
| Geser Sumbu (Hindar) | ✅ Sempurna | Tertahan | Berhasil | Tertahan |
| Siku Penangkis (Tangkis) | Berhasil | ✅ Sempurna | Berhasil | Tertahan |
| Tapak Terbuka (Serang) | Tertahan | Berhasil | ✅ Sempurna | Berhasil |
| Napas Dalam (Napas) | Berhasil | Berhasil | ✅ Sempurna | Berhasil |
| Kunci Leher | — Celah Emas only — | — | — | — |

**Baca:** tanda ✅ = auto-naik 1 tingkat (Berhasil → Sempurna). Tag netral = hasil default. Tag lemah = turun 1 tingkat.

## 7. Celah Emas

Terbuka saat **Postur lawan = 0**. Berlangsung **1 ronde penuh**.

Selama Celah Emas:
- **Kunci Leher / Banting** otomatis Sempurna → lawan -20 Stamina, biasanya habis.
- Jurus serang lain **+50% damage**.
- Setelah Celah Emas ditutup (ronde habis), Postur lawan kembali ke 2.

Celah Emas adalah **satu-satunya cara realistis mengakhiri lawan dengan Stamina tebal** (misal: Preman, Rangga, Bima).

## 8. Fase Lawan

Setiap lawan Boss punya **3 fase**, ditentukan oleh % Stamina:

| Fase | Trigger | Perubahan |
|---|---|---|
| Fase 1 | Stamina > 70% | Pola dasar |
| Fase 2 | 30% ≤ Stamina ≤ 70% | Pola kedua muncul, agresivitas naik |
| Fase 3 | Stamina < 30% | Desperasi: serangan lebih kuat, teknik lebih ceroboh |

**Contoh Danu:**
- Fase 1: CEPAT (serangan bertubi)
- Fase 2: TIPUAN (mulai feint)
- Fase 3: CEPAT (kembali agresif, tapi ceroboh — tag lemahnya terbuka)

## 9. Debuff Aktif Selama Combat

Debuff muncul dari hasil Gagal tertentu, berlaku **sepanjang combat** (tidak hilang):

| Debuff | Sumber | Efek |
|---|---|---|
| Rahang Terbuka | Hasil Gagal vs serangan kepala | Tangkis -1 tingkat |
| Napas Sesak | Hasil Gagal vs serangan badan | Biaya Qi +2 untuk semua jurus |
| Kaki Gemetar | Hasil Gagal vs low kick | Serang -1 tingkat |
| Pelipis Berdarah | Hasil Gagal vs serangan besar | Stamina max -10 (tidak bisa pulih ke 100) |
| Telinga Berdenging | Hasil Gagal vs hook | 10% chance miss (dilempar dadu) |

Debuff **dihapus** di akhir combat (menang atau kalah).

## 10. Item dalam Pertarungan

Pemain bisa pakai **1 item konsumabel per combat** (aksi bonus, tidak menghabiskan giliran):

- Jamu Pendekar → +30 Stamina
- Jamu Qi → +25 Qi
- Minyak Urut → hapus 1 debuff
- Handwrap Ayah (pasif) → sekali per game, bertahan dari 1 hasil Gagal fatal (auto-jadi Tertahan)

## 11. Kalah = Cabang Cerita (Fail-Forward)

Kalah **bukan** game over. Konsekuensi:
- Stamina -10 s/d -20 (persisten setelah pulih)
- Reputasi -5
- **Set flag cabang** → mengubah scene berikutnya

Contoh:
- Kalah dari Preman → Broto muncul di scene berikutnya menawarkan "jalan pintas" (yang sebenarnya suap).
- Kalah dari Juara Kecamatan → tidak jadi juara, tapi tetap lanjut dengan flag `ep1_lost_gor`. Cerita berubah: Provinsi tidak terbuka, tapi ada scene "kesempatan kedua" di kota.

Game over hanya terjadi jika **Stamina 0 di luar combat** (misal: habis karena aksi cerita) — dan ini harus dengan **warning jelas**.

## 12. Timer (Opsional)

Beberapa momen kritis (Celah Emas, pilihan dialog cepat) bisa punya **timer 4-6 detik**. **Default OFF.** Dinyalakan via Settings → "Mode Tegang".

## 13. UI Hints (Yang Ditampilkan ke Pemain)

Di layar combat, tampilkan:
- Bar Stamina pemain & lawan
- Bar Qi
- Indikator Postur (5 titik)
- Momentum (3 titik + / 3 titik -)
- **Tidak ditampilkan:** damage angka eksplisit, kecuali via floating text setelah hit
- **Ditampilkan:** telegraph lawan sebagai paragraf 2-3 baris

## 14. Balancing Notes

- Ronde maksimal: 8 (lelah bermain kalau lebih)
- Opsi maksimal per ronde: 4
- Jurus awal di Ep 1: 5 (cukup untuk eksplorasi, tidak overwhelming)
- Jurus Ilmu Curian: bonus, bukan wajib
- Boss (Juara, Bima): 5-6 ronde minimum, harus pakai Celah Emas untuk menang

## 15. Anti-Design (Jangan Dilakukan)

- ❌ Satu pilihan yang selalu benar
- ❌ Satu pilihan yang selalu salah (kecuali jelas-jelas bunuh diri, misal "menerjang tanpa pertahanan")
- ❌ Telegraph yang memberi jawaban eksplisit ("Dia akan menendang kanan → pilih Tangkis")
- ❌ Ronde lebih dari 8
- ❌ Damaged number mentah ("Lawan -17 HP")
- ❌ Hint label seperti `[Gunakan Qi]`, `[Pilihan Benar]`
