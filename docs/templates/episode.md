# Episode X: [Judul]

**ID:** `ep_0X_xxx`
**Durasi target:** 15-20 menit
**Status:** draft | playtested | final

## Tujuan Pemain (terlihat di UI)
- ...

## Struktur Tiga Babak
### Babak 1 — [Judul]
...
### Babak 2 — [Judul]
...
### Babak 3 — [Judul]
...

## Lokasi
| ID | Nama | Kategori | Scene | Flag masuk | Flag keluar |
|---|---|---|---|---|---|
| loc_xxx | ... | hub | ... | ... | ... |

## Pertarungan
| Lawan ID | Lokasi | Menang | Kalah |
|---|---|---|---|
| law_xxx | loc_xxx | ... | ... |

## Item Baru
- item_xxx — didapat dari ...

## Jurus Baru
- jurus_xxx — didapat dari ...

## Flag yang Disetel
- `flag_a` — disetel di act_xxx, dibaca di ...

## Flag yang Dibaca
- `flag_b` — dibaca dari episode sebelumnya, memengaruhi ...

## Ending
- true_ending: ...
- stat_zero_ending: ...
- stat3_zero_ending: ...
- (opsional) branch_ending_xxx: ...

## Kait ke Episode Berikutnya
- next_episode_id: `ep_0X+1_xxx`
- Konsekuensi yang terbawa: ...

## Catatan QA
- [ ] Semua flag di Registri terpakai
- [ ] Minimal 2 strategi valid per combat
- [ ] Tidak ada game over tanpa warning
