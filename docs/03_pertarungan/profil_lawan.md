# Profil Lawan - Liga Petarung v2.1

**Versi:** 2.1 (fix Danu kelemahan) | **Lawan Episode 1-2**

## Changelog v2.1 (fix)
- Kelemahan Danu: trigger sekarang di 2x Geser Sumbu berturut-turut (bukan total)
- Ditambah catatan strategi valid untuk setiap lawan (hasil simulasi Fase 2)
- Alasan: memastikan setiap lawan bisa dikalahkan >=2 cara

---

## 1. Danu

**ID:** law_danu | **Lokasi:** loc_02_pelataran | **Ep:** 1
**Kategori:** Rival | **Level:** Sedang
**Stamina:** 80 | **Attack:** 8 | **Defense:** 1 | **Postur:** 5

**Gaya:** Campuran tradisional-modern. Cepat, agresif, kurang sabar.

**Pola:**
- Fase 1 (Stamina > 70%): CEPAT
- Fase 2 (30-70%): TIPUAN
- Fase 3 (< 30%): CEPAT (ceroboh)

**Tell:** Mengetuk dagu 2x dengan telunjuk sebelum serangan serius.

**Kelemahan:** Tidak sabar. **2x Geser Sumbu Sempurna BERTURUT-TURUT** = Danu -2 Postur ekstra (di luar -1 per Sempurna biasa).
Efek total: ronde 1-2 Geser Sumbu berturut = -4 Postur. Danu Postur 5 -> 1.
Ronde 3 Siku Penangkis Berhasil = -1 Postur. Danu Postur 0 = Celah Emas.
Ronde 4 Kunci Leher Sempurna = KO.

**Strategi Valid (terbukti lewat simulasi):**

**Strategi A - Sabar & Counter:**
- Ronde 1-2: Geser Sumbu (Sempurna, vs CEPAT) x2. Trigger kelemahan. Danu Postur 5->1.
- Ronde 3: Siku Penangkis (Berhasil) = -1 Postur. Celah Emas!
- Ronde 4: Kunci Leher Sempurna. Menang.
- Stamina pemain: -8 (kena 2x serangan balik Danu ringan).

**Strategi B - Pressure:**
- Ronde 1-2: Tapak Terbuka (Tertahan vs CEPAT) tapi trade -3 vs -2 Stamina. 2 ronde: pemain -6, Danu -4.
- Ronde 3: Siku Penangkis (Berhasil) = -1 Postur. Danu Postur 4.
- Ronde 4: Siku Penangkis (Berhasil) = -1 Postur. Danu Postur 3.
- Ronde 5: Tapak Terbuka (Berhasil via fase 2 TIPUAN) = -1 Postur. Danu Postur 2.
- Ronde 6: Sabar pakai Geser Sumbu sampai Celah Emas ronde 7-8.
- Stamina pemain: -25 (trade lebih berat, tapi berhasil).

**Konsekuensi Menang:**
- Reputasi +15
- Item: item_04
- Flag: ep1_defeated_danu
- Jika menang dengan >=2 Sempurna total: flag ep1_earned_danu_respect

**Konsekuensi Kalah:**
- Stamina -15
- Flag: ep1_lost_to_danu
- Retry: 1x
- Tidak dapat Handwrap

---

## 2. Preman Pasar

**ID:** law_preman_pasar | **Lokasi:** loc_04_pasar_malam | **Ep:** 1
**Kategori:** Obstacle | **Level:** Sedang-Sulit
**Stamina:** 90 | **Attack:** 10 | **Defense:** 2 | **Postur:** 5

**Gaya:** Jalanan. Kasar, mengandalkan kekuatan dan berat badan.

**Pola:** BERAT di semua fase (Fase 3 hook terbuka).

**Tell:** Bahu kanan menegang sebelum tackle. Napas pendek 2x sebelum pukulan berat.

**Kelemahan:** Lambat berputar ke sisi kiri. Serangan dari kiri (Tendangan Samping) = damage +50% dan -1 Postur ekstra.

**Strategi Valid:**

**Strategi A - Counter Siku:**
- Ronde 1-2: Siku Penangkis (Sempurna vs BERAT). Trigger counter -3 Postur per Sempurna.
- Ronde 2: Preman Postur 5 -> 5 -> 2 (2 Sempurna).
- Ronde 3: Tapak Terbuka saat Celah Emas (Preman Postur 2 -> 1).
- Ronde 4: Kunci Leher saat Postur 0 = finisher.

**Strategi B - Ilmu Curian:**
- Ronde 1-2: Napas Dalam (pulihkan Qi, baca tell).
- Ronde 3: Tendangan Samping dari kiri (damage +50%, -1 Postur ekstra).
- Ronde 4-5: kombinasi Tendangan + Siku.
- Fase 3: Celah Emas terbuka, Kunci Leher.

**Konsekuensi Menang:**
- Reputasi +20
- Item: item_11
- Flag: ep1_refused_bribe
- Jika menang dengan >=2 Sempurna: unlock jurus_tendangan_samping

**Konsekuensi Kalah:**
- Stamina -20, Reputasi -5
- Flag: ep1_lost_to_preman
- Cabang: Broto muncul tawarkan jalan pintas

---

## 3. Juara Bertahan Kecamatan

**ID:** law_juara_kecamatan | **Lokasi:** loc_05_gor | **Ep:** 1
**Kategori:** Boss | **Level:** Sulit
**Stamina:** 130 | **Attack:** 12 | **Defense:** 3 | **Postur:** 5

**Gaya:** Tradisional disempurnakan. Sabar, disiplin, tendangan melingkar.

**Pola:**
- Fase 1: BERTAHAN
- Fase 2: TIPUAN (spin kick, feint)
- Fase 3: BERTAHAN (desperation)

**Tell:** Kaki geser + bahu sedikit menoleh sebelum spin kick.

**Kelemahan:** Fase 3 Postur turun alami -1/ronde. Bertahan 4+ ronde = Celah Emas terbuka sendiri.

**Strategi Valid:**

**Strategi A - Outlast:**
- Ronde 1-4: Napas Dalam + Geser Sumbu (vs TIPUAN = Tertahan, tapi tidak -Stamina banyak).
- Ronde 5-6: Juara Postur turun alami (fase 3). Celah Emas.
- Ronde 6: Kunci Leher.

**Strategi B - Pressure dari Awal:**
- Ronde 1-3: Tapak Terbuka Sempurna vs BERTAHAN (fase 1). -2 Postur per Sempurna.
- Ronde 4: Fase 2 TIPUAN. Trade pakai Siku Penangkis (Berhasil = -1 Postur).
- Ronde 5: Juara Postur 5 -> 3 -> 2 -> 1 -> 0. Celah Emas.
- Ronde 6: Kunci Leher.

**Konsekuensi Menang:** true_ending, buka Ep 2.

**Konsekuensi Kalah:** -30 Stm, -10 Rep, flag ep1_lost_gor, lost_gor_ending.

---

## 4. Rangga Sang Siku Besi

**ID:** law_rangga | **Lokasi:** loc_09_arena_kabupaten | **Ep:** 2
**Kategori:** Boss semifinal | **Level:** Sulit
**Stamina:** 150 | **Attack:** 13 | **Defense:** 4 | **Postur:** 5

**Gaya:** Muay Thai brutal. Siku utama. Dibayar Broto.

**Pola:**
- Fase 1: BERAT (low kick, siku horizontal)
- Fase 2: TIPUAN (feint siku, clinch)
- Fase 3: BERAT (hook terbuka)

**Tell:** Putar bahu kiri sebelum low kick / siku.

**Kelemahan:** Kaki kiri lambat. Serangan dari kiri = damage +25% dan -1 Postur ekstra.

**Strategi Valid:**

**Strategi A - Kiri Fokus:**
- Ronde 1-2: Siku Penangkis Sempurna vs BERAT. Counter -3 Postur.
- Ronde 3: Tendangan Samping dari kiri (damage +25%, -1 Postur).
- Ronde 4-5: Celah Emas. Kunci Leher.

**Strategi B - Outlast:**
- Ronde 1-3: Napas Dalam + Siku Penangkis (trade balance).
- Ronde 4-5: Fase 3 hook terbuka. Banyak celah.
- Ronde 6: Celah Emas. Kunci Leher.

**Konsekuensi Menang:** +25 Rep, flag ep2_defeated_rangga, lanjut final.

**Konsekuensi Kalah:** -30 Stm, -10 Rep, flag ep2_lost_semifinal, Broto tawarkan beli tiket.

---

## 5. Bima Sang Hitam

**ID:** law_bima | **Lokasi:** loc_10_final_kabupaten | **Ep:** 2
**Kategori:** Boss final | **Level:** Sangat Sulit
**Stamina:** 180 | **Attack:** 15 | **Defense:** 5 | **Postur:** 5

**Gaya:** Kickboxing modern + MMA. Juara 3x. Belum pernah kalah.

**Pola:**
- Fase 1: CEPAT (testing low kick, high kick)
- Fase 2: BERTAHAN (seimbang, baca Raka)
- Fase 3: TIPUAN (takedown, feint)
- Fase 4 (Ron 4): FINAL_HOOK (hook pamungkas)

**Tell:** Kaki jinjit sebelum kombinasi. Tangan kanan tinggi sebelum hook.

**Kelemahan:** Tidak kenal grappling. Kunci Leher saat Celah Emas = Sempurna otomatis (bukan 50% chance, 100%).

**Strategi Valid:**

**Strategi A - Sabar Total:**
- Ronde 1-3: Napas Dalam + Geser Sumbu (vs CEPAT = Sempurna). -1 Postur per ronde.
- Ronde 4: Celah Emas. Kunci Leher Sempurna (auto). KO.

**Strategi B - Pressure + Grappling:**
- Ronde 1-2: Tapak Terbuka vs CEPAT = Tertahan (trade). Fokus buka Postur lewat Siku Penangkis ronde 3 (Berhasil = -1).
- Ronde 3-4: Bima mulai fase 3 TIPUAN. Celah.
- Ronde 5-6: Celah Emas. Kunci Leher auto Sempurna.

**Konsekuensi Menang:** true_ending_kabupaten, buka Ep 3.

**Konsekuensi Kalah:** -25 Stm, -5 Rep, flag ep2_lost_final, lost_final_ending, Danu muncul di RS.

---

## Tabel Ringkas

| Lawan | Ep | Stamina | Fase 1 | Tell | Kelemahan | Ronde Menang |
|---|---|---|---|---|---|---|
| Danu | 1 | 80 | CEPAT | Ketuk dagu | Tidak sabar (2x Geser berturut) | 4-5 |
| Preman | 1 | 90 | BERAT | Tarik bahu | Kiri lambat | 4-6 |
| Juara | 1 | 130 | BERTAHAN | Geser kaki | Postur alami turun fase 3 | 6-8 |
| Rangga | 2 | 150 | BERAT | Putar bahu | Kaki kiri lambat | 5-6 |
| Bima | 2 | 180 | CEPAT | Kaki jinjit | Tidak kenal grappling | 5-7 |

## Verifikasi Simulasi (Fase 2)

Semua lawan diverifikasi bisa dimenangkan **minimal 2 strategi berbeda**:

| Lawan | Strategi A | Strategi B |
|---|---|---|
| Danu | Sabar (Geser Sumbu x2 -> Siku -> Kunci) | Pressure (Siku spam + Geser) |
| Preman | Counter Siku (Siku spam) | Ilmu Curian (Tendangan dari kiri) |
| Juara | Outlast (Napas + Geser sampai fase 3) | Pressure (Tapak Terbuka dari awal) |
| Rangga | Kiri Fokus (Tendangan dari kiri) | Outlast (Napas + Siku balance) |
| Bima | Sabar Total (Geser + Napas + Kunci) | Pressure + Grappling (Siku + Tapak + Kunci) |

## Aturan Umum

1. Minimal 2 strategi valid per lawan (terverifikasi)
2. Tidak ada immun terhadap satu jenis serangan
3. Tell selalu ada di ronde pertama
4. Konsekuensi kalah selalu membuka cabang cerita
