# Changelog - Liga Petarung

Format: Keep a Changelog. Versioning: SemVer.

## [Unreleased] - v5.0 - Fase 3

### Ditambahkan
- Story Bible lengkap: karakter (6), dunia, aturan combat, jurus (6), profil lawan (5), item (16), resep, flag (17), linimasa
- 00_AI_BRIEF.md, templates/, tools/validate.js
- simulasi_danu.md (Fase 2 verification)

### Akan Berubah
- engine.js: CombatSystem baru (Stamina/Qi/Postur/Momentum), DialogueSystem multi-giliran
- story_data.js: Ep 1 rewrite
- story_data2.js: Ep 2 rewrite
- index.html: CSS combat telegraph, dialogue overlay, action groups

### Akan Dihapus
- Data mati v4.0: pattern_hint, correct_for
- Sistem HP/ATK/DEF lama

## [4.0.0] - 2026-11-14

### Ditambahkan
- Telegraphed Combat (5 pertarungan scripted)
- Adaptive Dialogue (Broto encounter)
- Narrative Bridge (12 transition_text)
- Location Grouping
- Category Crafting
- Episode Gating
- Rest System
- Anti-spam, anti-infinite-craft
- Fail-forward
- Bad ending fallback
- Screen shake, floating damage, toast, combat HUD

### Diubah
- Story Ep 1 (8 lokasi), Ep 2 (Broto dialogue)
- Nama MC: Raka
- Tone: grounded-realistis melankolis
- Crafting: berbasis kategori
- Save format: + flags, completedActions

### Diperbaiki
- Syntax error 9x di story_data
- Drop resep bisa didapat
- Resep Ep 2 tidak softlock
- Ending fallback default

## [3.0.0] - 2026-11-13

### Ditambahkan
- Combat turn-based, stance system, cross-episode flags, requirement validation, screen shake, toast

### Diperbaiki
- Syntax error, infinite crafting, bad ending fallback

## [2.0.0] - 2026-11-13

### Ditambahkan
- Once:true, required_item_id, toast system

### Diperbaiki
- Syntax error 9x di story_data2.js

## [1.0.0] - 2026-11-13

### Ditambahkan
- Game engine modular, Ep 1+2, audio fallback, save/load, typewriter, inventory, tab nav

### Keterbatasan
- Combat statis, dialog satu layar, lokasi linear, Ep 2 langsung terbuka

## Versi Saat Ini
- Kode: v4.0.0
- Story Bible: v5.0 (Fase 3)
- Target: v5.0.0
