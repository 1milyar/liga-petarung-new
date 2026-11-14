#!/usr/bin/env node
/**
 * validate.js - Story Bible <-> Story Data Validator
 * Jalankan: node tools/validate.js
 * Cek: item, flag, jurus, lawan di code vs docs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const STORY_FILES = ['story_data.js', 'story_data2.js'];
const DOC_FILES = {
  item:   'docs/04_item/item_master.md',
  flag:   'docs/06_kontinuitas/registri_flag.md',
  jurus:  'docs/03_pertarungan/jurus_master.md',
  lawan:  'docs/03_pertarungan/profil_lawan.md'
};

function loadStory() {
  let src = '';
  STORY_FILES.forEach(f => {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) src += fs.readFileSync(p, 'utf8') + '\n';
  });
  return src;
}

function loadMd(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf8');
}

function extractIds(src, prefix) {
  const re = new RegExp('["\x27`]?(' + prefix + '[a-zA-Z0-9_]+)["\x27`]?', 'g');
  const set = new Set();
  let m;
  while ((m = re.exec(src))) set.add(m[1]);
  return [...set];
}

function diff(a, b) {
  return a.filter(x => !b.includes(x));
}

console.log('=== VALIDATOR STORY BIBLE ===\n');

const storySrc = loadStory();

// --- ITEM ---
const codeItems = extractIds(storySrc, 'item_');
const masterItems = extractIds(loadMd(DOC_FILES.item), 'item_');
const itemsMissingInDocs = diff(codeItems, masterItems);
const itemsMissingInCode = diff(masterItems, codeItems);

if (itemsMissingInDocs.length) {
  console.log('[WARN] Item di CODE tapi tidak di item_master.md:');
  itemsMissingInDocs.forEach(i => console.log('    - ' + i));
} else console.log('[OK] Item: semua di code ada di master.');

if (itemsMissingInCode.length) {
  console.log('[WARN] Item di item_master.md tapi tidak dipakai di code:');
  itemsMissingInCode.forEach(i => console.log('    - ' + i));
}

// --- FLAG ---
const codeFlags = extractIds(storySrc, 'ep[0-9]+_');
const masterFlags = extractIds(loadMd(DOC_FILES.flag), 'ep[0-9]+_');
const flagsMissingInDocs = diff(codeFlags, masterFlags);
const flagsMissingInCode = diff(masterFlags, codeFlags);

if (flagsMissingInDocs.length) {
  console.log('\n[WARN] Flag di code tapi tidak di registri_flag.md:');
  flagsMissingInDocs.forEach(f => console.log('    - ' + f));
} else console.log('\n[OK] Flag: semua di code ada di registri.');

if (flagsMissingInCode.length) {
  console.log('[WARN] Flag di registri tapi tidak dipakai di code:');
  flagsMissingInCode.forEach(f => console.log('    - ' + f));
}

// --- JURUS ---
const codeJurus = extractIds(storySrc, 'jurus_');
const masterJurus = extractIds(loadMd(DOC_FILES.jurus), 'jurus_');
const jurusMissingInDocs = diff(codeJurus, masterJurus);
const jurusMissingInCode = diff(masterJurus, codeJurus);

if (jurusMissingInDocs.length) {
  console.log('\n[WARN] Jurus di code tapi tidak di jurus_master.md:');
  jurusMissingInDocs.forEach(j => console.log('    - ' + j));
} else console.log('\n[OK] Jurus: semua di code ada di master.');

if (jurusMissingInCode.length) {
  console.log('[WARN] Jurus di master tapi tidak dipakai di code (mungkin wajar, belum diimplement):');
  jurusMissingInCode.forEach(j => console.log('    - ' + j));
}

// --- LAWAN ---
const codeLawan = extractIds(storySrc, 'law_');
const masterLawan = extractIds(loadMd(DOC_FILES.lawan), 'law_');
const lawanMissingInDocs = diff(codeLawan, masterLawan);

if (lawanMissingInDocs.length) {
  console.log('\n[WARN] Lawan di code tapi tidak di profil_lawan.md:');
  lawanMissingInDocs.forEach(l => console.log('    - ' + l));
} else console.log('\n[OK] Lawan: semua di code ada di profil.');

// --- RINGKASAN ---
const totalIssues =
  itemsMissingInDocs.length + itemsMissingInCode.length +
  flagsMissingInDocs.length + flagsMissingInCode.length +
  jurusMissingInDocs.length +
  lawanMissingInDocs.length;

console.log('\n=== RINGKASAN ===');
if (totalIssues === 0) {
  console.log('[OK] Semua konsisten. Story Bible = Story Data.');
  process.exit(0);
} else {
  console.log('[WARN] ' + totalIssues + ' issue ditemukan. Perbaiki sebelum commit.');
  process.exit(1);
}