# Item Master - Liga Petarung v2.0

## Konvensi Kategori
- HERBAL: bahan jamu pahit
- PELENGKAP: madu/minyak/air
- KITAB: panduan jurus
- PERALATAN: handwrap, pelindung
- BUKTI: tiket, sertifikat (tidak bisa di-craft)
- KONSUMABEL: hasil rakit, sekali pakai

## Episode 1

### item_00 - Handwrap Ayah
Kategori BUKTI | Sumber act_terima_handwrap | Rare unique
Efek: Pasif. Sekali per game, bertahan dari 1 Gagal fatal.
Catatan: anchor emosional, tidak bisa hilang.

### item_01 - Kitab Napas Sumbu Jagat
Kategori KITAB | Sumber act_bersujud_eyang
Efek: Unlock jurus_siku_penangkis.
Resep: rec_jurus_konter.

### item_02 - Rimpang Jahe Merah
Kategori HERBAL | Sumber act_ambil_bahan_jamu
Resep: rec_jamu_stamina, rec_jamu_anti.

### item_03 - Madu Hutan Murni
Kategori PELENGKAP | Sumber act_ambil_bahan_jamu
Resep: rec_jamu_stamina, rec_jamu_qi.

### item_04 - Handwrap Serat Pasak
Kategori PERALATAN | Sumber combat Danu menang
Efek: Tapak Terbuka damage +2.

### item_05 - Minyak Urut Cimande
Kategori PELENGKAP | Sumber act_ambil_minyak
Efek: Konsumabel. Hapus 1 debuff.

### item_06 - Kunyit Tua
Kategori HERBAL | Sumber act_ambil_bahan_jamu (BARU v5.0)
Resep: rec_jamu_qi.

### item_10 - Jamu Oplosan Terlarang
Kategori BUKTI | Sumber act_terima_suplemen
Efek: Tidak bisa dipakai. Bad consequence di Ep 2.

### item_11 - Tiket Seleksi GOR Kecamatan
Kategori BUKTI | Sumber combat Preman menang
Efek: Gate act_hadapi_juara.

### item_jamu_stamina - Jamu Pendekar Stamina
Kategori KONSUMABEL | Sumber craft rec_jamu_stamina
Efek: +30 Stamina, 1x per combat.

## Episode 2

### item_20 - Koper Uang Suap
Kategori BUKTI | Sumber dialog broto_accept
Efek: Bukti skandal.

### item_21 - Sertifikat Integritas
Kategori BUKTI | Sumber broto_refuse/silent
Efek: Reputasi +10 permanen.

### item_22 - Catatan Biomekanika Kickboxing
Kategori KITAB | Sumber act_belajar_biomekanika
Efek: Unlock kelemahan Rangga. Gate act_hadapi_rangga.

### item_23 - Handwrap Pro Gel
Kategori PERALATAN | Sumber act_beli_handwrap
Efek: Siku Penangkis counter +3.

## Planned
- item_jamu_qi: +25 Qi
- item_sabuk_kecamatan: flavor ending

## Anti-Softlock
1. Material punya 2 sumber di episode sama.
2. Material unique hanya untuk resep opsional.
3. Item BUKTI tidak pernah jadi material.
