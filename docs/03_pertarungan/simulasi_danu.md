# Simulasi Pertarungan Danu - Verifikasi Fase 2

Tujuan: Membuktikan combat Danu bisa dimenangkan minimal 2 strategi berbeda.

## Setup
- Pemain: Stamina 100, Qi 80, Postur 5, Momentum 0
- Jurus: Geser Sumbu, Siku Penangkis, Tapak Terbuka, Napas Dalam
- Danu: Stamina 80, Attack 8, Defense 1, Pola CEPAT

## Simulasi Sebelum Fix (v2.0) - FAIL

### Strategi A - Hindar & Counter (GAGAL)
- Ronde 1-2: Geser Sumbu Sempurna x2 = Postur Danu 5 -> 3 (hanya dari kelemahan -2)
- Ronde 3-4: Siku Berhasil = tidak drain Postur (v2.0)
- BUNTU: Postur Danu terkunci di 3, tidak pernah ke 0.

### Masalah Inti (v2.0)
1. Geser Sumbu Sempurna tidak drain Postur (efek = 0)
2. Siku Penangkis Berhasil tidak drain Postur
3. Kelemahan Danu hanya -2 Postur total (5 -> 3, tidak ke 0)
4. Tidak ada jalur ke Celah Emas

## Fix v2.1 (Disetujui)

- Geser Sumbu Sempurna: -1 Postur lawan (dari 0)
- Siku Penangkis Berhasil: -1 Postur lawan (dari 0)
- Kelemahan Danu: tetap -2 ekstra di 2x Geser Sumbu berturut-turut

## Simulasi Setelah Fix (v2.1) - PASS

### Strategi A - Sabar & Counter (PASS)
- Ronde 1: Geser Sumbu Sempurna (vs CEPAT). Postur Danu 5 -> 4 (Sempurna -1). Kelemahan belum trigger.
- Ronde 2: Geser Sumbu Sempurna. Postur Danu 4 -> 3 (Sempurna -1). PLUS kelemahan -2 (2x berturut) = Postur Danu 3 -> 1.
- Ronde 3: Siku Penangkis Berhasil. Postur Danu 1 -> 0 = CELAH EMAS!
- Ronde 4: Kunci Leher Sempurna = KO. PASS.

Stamina pemain: -8 (kena 2x serangan balik ringan)
Stamina Danu: 80 (belum kena damage langsung), lalu -20 dari finisher = 60. KO by Postur.

### Strategi B - Pressure (PASS)
- Ronde 1-2: Tapak Terbuka Tertahan (trade -3 pemain, -2 Danu per ronde). Stamina: pemain 94, Danu 76.
- Ronde 3-4: Siku Penangkis Berhasil x2 (vs CEPAT). Postur Danu 5 -> 4 -> 3.
- Ronde 5: Tapak Terbuka Berhasil (fase 2 TIPUAN). Postur Danu 3 -> 2.
- Ronde 6: Geser Sumbu Sempurna. Postur Danu 2 -> 1.
- Ronde 7: Geser Sumbu Sempurna. Postur Danu 1 -> 0 = CELAH EMAS!
- Ronde 8: Kunci Leher Sempurna = KO. PASS.

Stamina pemain: ~70, Stamina Danu: ~60 (kena Tapak Berhasil + Siku counter).

## Verifikasi

| Strategi | Ronde Celah Emas | Ronde KO | Stamina Akhir | Status |
|---|---|---|---|---|
| A (Sabar) | 3 | 4 | ~92 | PASS |
| B (Pressure) | 7 | 8 | ~70 | PASS |

## Kesimpulan

Fix v2.1 berhasil. Dua strategi valid:
- Strategi A: cepat menang (4 ronde), tapi butuh sabar & posisi.
- Strategi B: lambat (8 ronde), tapi lebih tahan terhadap RNG jelek.

## Status
PASS - Fase 3 tidak lagi diblokir.
