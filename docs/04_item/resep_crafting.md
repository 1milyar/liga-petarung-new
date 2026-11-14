# Resep Crafting - Liga Petarung v2.0

## Formula Kategori
- HERBAL + PELENGKAP = Jamu Pemulihan
- KITAB + PERALATAN = Taktik
- 2x HERBAL = Ramuan Kuat (planned)

## Hint Naratif (dapur Ep 1)
Catatan Eyang: "Yang pahit menyembuhkan. Yang manis memberi tenaga. Yang licin melindungi sendi."
- Pahit = HERBAL
- Manis = PELENGKAP madu
- Licin = PELENGKAP minyak

## Episode 1

### rec_jamu_stamina
- Tipe specific | Prioritas 1
- Material: item_02 + item_03
- Hasil: item_jamu_stamina, +30 Stamina

### rec_jamu_qi
- Tipe specific | Prioritas 1
- Material: item_06 + item_03
- Hasil: +25 Qi instan

### rec_jamu_anti
- Tipe specific | Prioritas 1
- Material: item_02 + item_05
- Hasil: Hapus 1 debuff

### rec_jurus_konter
- Tipe category | Prioritas 2
- Material: KITAB + PERALATAN
- Hasil: +10 Qi instan

### rec_jamu_generic (fallback)
- Tipe category | Prioritas 3
- Material: HERBAL + PELENGKAP
- Hasil: +15 Stamina atau Qi random

## Episode 2

### rec_hibrida
- Tipe category | Prioritas 1
- Material: HERBAL + PERALATAN
- Hasil: +40 Stamina sekali pakai

### rec_jurus_konter_modern
- Tipe specific | Prioritas 1
- Material: item_22 + item_23
- Hasil: Unlock kelemahan Rangga permanen

## Schema Teknis
- recipe_id, result_item_name, priority
- required_item_ids (opsional) atau required_categories (opsional)
- reward_stat_changes, narration (opsional)
Engine cocokkan prioritas 1 -> 2 -> 3.
