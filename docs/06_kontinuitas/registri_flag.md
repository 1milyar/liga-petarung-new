# Registri Flag - Liga Petarung v2.0

## Konvensi
Prefix ep1_/ep2_/broto_ | Nilai boolean | Di state.flags, persist localStorage.

## Episode 1

| Flag | Setter | Reader | Tipe |
|---|---|---|---|
| ep1_has_father_wrap | act_terima_handwrap | Narasi | Cerita |
| ep1_has_blessing | act_bersujud_eyang | Dialog Eyang | Cerita |
| ep1_defeated_danu | combat Danu | Dialog Ep 2 | Cabang |
| ep1_earned_danu_respect | combat Danu >=2 Sempurna | Dialog Ep 2 | Cabang utama |
| ep1_lost_to_danu | combat Danu kalah | Dialog Eyang | Cerita minor |
| ep1_refused_bribe | combat Preman | Dialog Ep 2 | Cabang utama |
| ep1_lost_to_preman | combat Preman kalah | Scene Broto | Fail-forward |
| ep1_took_doping | act_terima_suplemen | Dialog Ep 2 | Cabang moral |
| ep1_knows_broto | act_dengar_broto | Dialog Ep 2 | Cerita |
| ep1_lost_gor | combat Juara kalah | Ep 2 entry | Fail-forward |

## Episode 2

| Flag | Setter | Reader | Tipe |
|---|---|---|---|
| ep2_refused_bribe | broto_refuse/provoke/silent | Dialog Rangga | Cabang utama |
| ep2_accepted_bribe | broto_accept | Dialog Rangga | Cabang moral |
| broto_humiliated | broto_provoke | Dialog Rangga | High-risk |
| ep2_defeated_rangga | combat Rangga | Gate final | Gate |
| ep2_lost_semifinal | combat Rangga kalah | Scene Broto | Fail-forward |
| ep2_true_ending | combat Bima | Ending | Ending gate |
| ep2_lost_final | combat Bima kalah | Ending | Fail-forward |

**Total: 17 flag aktif.**

## Planned (Ep 3+)
ep3_committed_poros, ep3_committed_gelombang, ep3_eyang_conflict, ep3_nenek_sick, ep4_danu_betrayal, ep4_danu_sacrifice.

## Detail Flag Kunci

**ep1_earned_danu_respect**
- Setter: combat Danu >=2 Sempurna
- Efek: Danu jadi sekutu di Ep 2

**ep1_refused_bribe**
- Setter: combat Preman menang
- Efek: Broto lebih agresif, Rangga lebih brutal

**ep1_took_doping**
- Setter: act_terima_suplemen
- Efek: Broto ungkit di Ep 2, bad ending lebih berat

**ep1_lost_gor**
- Setter: combat Juara kalah
- Efek: Ep 2 jalur underdog (Ep 1B)
