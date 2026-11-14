# Jurus Master - Liga Petarung v2.2

**Versi:** 2.2 (Stamina column split) | **Jurus awal Episode 1:** 5 + 1 Ilmu Curian

## Konvensi
- Tipe: Serang / Tangkis / Hindar / Napas
- Penguasaan: Mentah, Terlatih, Mahir
- Efek per hasil (Sempurna / Berhasil / Tertahan / Gagal) di tabel.

## Changelog
- v2.1: Fix Postur drain (Geser Sumbu Sempurna -1, Siku Berhasil -1)
- v2.2: Pecah kolom Stamina jadi Stm Pemain + Stm Lawan (hilangkan ambiguitas target)

---

## 1. Geser Sumbu

**ID:** jurus_geser_sumbu
**Tipe:** Hindar
**Biaya Qi:** 2
**Sumber:** Eyang Suryo (default)
**Muncul sejak:** Episode 1

Filosofi: Poros yang tidak bergerak meski dunia berputar. Menghindar bukan melarikan diri, memindahkan titik pertemuan.

Tag: Kuat vs CEPAT | Lemah vs serangan menyapu lebar

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | 0 | -2 | -1 (lawan) | +1 | Buka tell |
| Berhasil | 0 | 0 | -2 | 0 | 0 | — |
| Tertahan | -5 | 0 | -2 | 0 | 0 | Kena sebagian |
| Gagal | -15 | 0 | -2 | -1 (pemain) | 0 | Terkena penuh |

Penguasaan:
| Tingkat | Syarat | Efek Tambahan |
|---|---|---|
| Mentah | Default | — |
| Terlatih | Pakai berhasil 3x / latihan 1x | Biaya Qi -1 |
| Mahir | Pakai berhasil 8x | Sempurna -2 Postur lawan (dari -1) |

---

## 2. Siku Penangkis

**ID:** jurus_siku_penangkis
**Tipe:** Tangkis
**Biaya Qi:** 3
**Sumber:** Eyang Suryo (kitab, setelah act_bersujud)
**Muncul sejak:** Episode 1

Filosofi: Siku = tulang terkuat. Dipakai bukan untuk memukul, tapi menerima.

Tag: Kuat vs pukulan lurus/hook | Lemah vs BERAT

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | 0 | -3 | -3 (lawan) | +1 | Counter kuat |
| Berhasil | 0 | 0 | -3 | -1 (lawan) | 0 | Counter ringan |
| Tertahan | -8 | 0 | -3 | 0 | 0 | Sebagian |
| Gagal | -15 | 0 | -3 | -1 (pemain) | 0 | Kena penuh |

Penguasaan:
| Tingkat | Syarat | Efek Tambahan |
|---|---|---|
| Mentah | Default | — |
| Terlatih | Pakai berhasil 3x | Sempurna -4 Postur (dari -3) |
| Mahir | Pakai berhasil 8x | Sempurna biaya Qi 0 |

---

## 3. Tapak Terbuka

**ID:** jurus_tapak_terbuka
**Tipe:** Serang
**Biaya Qi:** 4
**Sumber:** Eyang Suryo
**Muncul sejak:** Episode 1

Filosofi: Telapak terbuka = pukulan tanpa amarah. Kekuatan dari pinggul berputar dan napas keluar.

Tag: Kuat vs BERTAHAN | Lemah vs CEPAT

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | -8 | -4 | -2 (lawan) | +1 | — |
| Berhasil | 0 | -5 | -4 | -1 (lawan) | 0 | — |
| Tertahan | -3 | -2 | -4 | 0 | 0 | Trade: pemain -3, lawan -2 (parry backlash) |
| Gagal | -12 | 0 | -4 | -1 (pemain) | 0 | Kena counter |

Penguasaan:
| Tingkat | Syarat | Efek Tambahan |
|---|---|---|
| Mentah | Default | — |
| Terlatih | Pakai berhasil 3x | Sempurna -3 Postur (dari -2) |
| Mahir | Pakai berhasil 8x | Berhasil +1 Momentum |

---

## 4. Napas Dalam

**ID:** jurus_napas_dalam
**Tipe:** Napas
**Biaya Qi:** 0
**Sumber:** Eyang Suryo (default)
**Muncul sejak:** Episode 1

Filosofi: Tindakan paling berani adalah tidak menyerang. Menarik napas = menolak ritme lawan.

Tag: Kuat vs BERTAHAN | Netral vs lainnya | Penalti: lawan dapat 1 giliran gratis

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | 0 | +15 | 0 | 0 | Buka tell |
| Berhasil | 0 | 0 | +10 | 0 | 0 | — |
| Tertahan | -8 | 0 | +5 | 0 | 0 | Lawan serang |
| Gagal | -15 | 0 | 0 | -1 (pemain) | 0 | Lawan serang penuh |

Penguasaan:
| Tingkat | Syarat | Efek Tambahan |
|---|---|---|
| Mentah | Default | — |
| Terlatih | Pakai berhasil 3x | Sempurna +20 Qi |
| Mahir | Pakai berhasil 8x | Tertahan tidak -Postur |

---

## 5. Kunci Leher / Banting

**ID:** jurus_kunci_banting
**Tipe:** Serang khusus
**Biaya Qi:** 6
**Sumber:** Diajarkan Eyang setelah kalah 1x
**Muncul sejak:** Episode 1 (setelah kalah minimal sekali)

Filosofi: Jurus pamungkas. Tidak diajarkan ke murid baru karena tidak berguna sampai tahu cara membaca celah.

Tag: Hanya dipakai saat Celah Emas (Postur lawan = 0). Di luar Celah Emas: tombol disabled.

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | -20 | -6 | 0 | +2 | Finisher |
| Berhasil | 0 | -12 | -6 | -2 (lawan) | +1 | — |
| Tertahan | -5 | 0 | -6 | 0 | 0 | Berontak |
| Gagal | -10 | 0 | -6 | -1 (pemain) | 0 | Lolos |

Penguasaan:
| Tingkat | Syarat | Efek Tambahan |
|---|---|---|
| Mentah | Default | — |
| Terlatih | Pakai berhasil 2x | Berhasil -16 Stm |
| Mahir | Pakai berhasil 5x | Sempurna = instan KO |

---

## 6. Tendangan Samping (Ilmu Curian)

**ID:** jurus_tendangan_samping
**Tipe:** Serang
**Biaya Qi:** 5
**Sumber:** Ilmu Curian - menang dari Preman dengan >=2 Sempurna
**Muncul sejak:** Episode 1 (conditional)

Filosofi: Bukan jurus Sumbu Jagat. Ini ilmu yang kau curi dari jalanan.

Tag: Kuat vs BERAT | Lemah vs CEPAT

| Hasil | Stm Pemain | Stm Lawan | Qi | Postur | Momentum | Catatan |
|---|---|---|---|---|---|---|
| Sempurna | 0 | -7 | -5 | -2 (lawan) | +1 | — |
| Berhasil | 0 | -5 | -5 | -1 (lawan) | 0 | — |
| Tertahan | -5 | 0 | -5 | 0 | 0 | Lawan blok |
| Gagal | -12 | 0 | -5 | -1 (pemain) | 0 | Kena counter |

Penguasaan: sama seperti Tapak Terbuka (3x / 8x).

---

## Tabel Ringkas

| Jurus | Tipe | Qi | Kuat vs | Lemah vs | Sumber |
|---|---|---|---|---|---|
| Geser Sumbu | Hindar | 2 | CEPAT | sapuan | Eyang (default) |
| Siku Penangkis | Tangkis | 3 | lurus/hook | BERAT | Eyang (kitab) |
| Tapak Terbuka | Serang | 4 | BERTAHAN | CEPAT | Eyang |
| Napas Dalam | Napas | 0 | BERTAHAN | — | Eyang (default) |
| Kunci Leher | Serang-khusus | 6 | Celah Emas | — | Setelah kalah 1x |
| Tendangan Samping | Serang | 5 | BERAT | CEPAT | Ilmu Curian |

## Jalur Gaya (Episode 2+)

Setelah Juara Kecamatan, pemain commit ke salah satu jalur:
- Jalan Poros: sabar, counter, hemat Qi. Bonus: Geser Sumbu & Siku Penangkis +1 efektivitas Postur.
- Jalan Gelombang: agresif, boros Qi. Bonus: Tapak Terbuka & Tendangan Samping +25% damage.

## Penguasaan Global

- Disimpan di state.jurusMastery[id]
- Nilai: 0=Mentah, 1=Terlatih, 2=Mahir
- Naik dari pemakaian berhasil / latihan hub
