/**
 * ENGINE.JS - Core Engine Modular Game Interaktif (v2.0.0)
 * Liga Petarung: Dari Padepokan ke Puncak Dunia
 */

const SAVE_VERSION = "2.0.0";

let state = {
  currentEpisode: null,
  currentLocationId: null,
  stats: {},
  inventory: [],
  unlockedLocations: [],
  selectedCraftItems: [],
  storyFlags: {},
  dayCount: 1,
  timeOfDay: "Pagi",
  activeQuest: "Mulai Perjalanan Sang Juara",
  jurusMastery: {
    jurus_geser_sumbu: { level: 'Terlatih', xp: 50 },
    jurus_siku_tangkis: { level: 'Mentah', xp: 20 },
    jurus_tapak_terbuka: { level: 'Mentah', xp: 0 }
  },
  bestiaryLog: [],
  isAudioMuted: false,
  isTypewriterActive: false,
  typewriterTimer: null,
  activeEncounter: null,
  activeDialogue: null
};

// --- Audio Manager dengan Fallback Offline & Synthesizer ---
const AudioManager = {
  bgmAudio: null,
  audioCtx: null,

  init() {
    if (typeof GAME_DATA !== 'undefined' && GAME_DATA.audio_config && GAME_DATA.audio_config.bgm) {
      this.bgmAudio = new Audio(GAME_DATA.audio_config.bgm);
      this.bgmAudio.loop = true;
    }
  },

  playBGM() {
    if (state.isAudioMuted || !this.bgmAudio) return;
    this.bgmAudio.play().catch(() => {});
  },

  playSFX(type) {
    if (state.isAudioMuted) return;
    let sfxPath = (typeof GAME_DATA !== 'undefined' && GAME_DATA.audio_config) ? GAME_DATA.audio_config[type] : null;
    if (sfxPath) {
      let sfx = new Audio(sfxPath);
      sfx.play().catch(() => this.playSynthSFX(type));
    } else {
      this.playSynthSFX(type);
    }
  },

  playSynthSFX(type) {
    try {
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let osc = this.audioCtx.createOscillator();
      let gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'sfx_hit') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
      } else if (type === 'sfx_block') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      } else if (type === 'sfx_critical') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
      } else if (type === 'sfx_danger') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      }

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.2);
    } catch (e) {}
  }
};

// --- Init Game ---
document.addEventListener("DOMContentLoaded", () => {
  AudioManager.init();
  applyThemeColors();
  renderTitleScreen();
  setupEventListeners();
});

function applyThemeColors() {
  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.theme_colors) {
    document.documentElement.style.setProperty('--bg-color', GAME_DATA.theme_colors.bg);
    document.documentElement.style.setProperty('--panel-color', GAME_DATA.theme_colors.panel);
    document.documentElement.style.setProperty('--accent-color', GAME_DATA.theme_colors.accent);
    document.documentElement.style.setProperty('--text-color', GAME_DATA.theme_colors.text);
  }
  const titleEl = document.getElementById('app-title');
  if (titleEl && typeof GAME_DATA !== 'undefined') {
    titleEl.innerText = GAME_DATA.game_title || "LIGA PETARUNG";
  }
}

function renderTitleScreen() {
  const epContainer = document.getElementById('episode-list');
  if (!epContainer) return;
  epContainer.innerHTML = '';

  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.episodes && GAME_DATA.episodes.length > 0) {
    GAME_DATA.episodes.forEach(ep => {
      let btn = document.createElement('button');
      btn.className = 'btn-main';
      btn.innerText = ep.title;
      btn.onclick = () => startEpisode(ep.id);
      epContainer.appendChild(btn);
    });
  }

  const saveBtn = document.getElementById('btn-continue');
  if (saveBtn) {
    if (localStorage.getItem('liga_petarung_save')) {
      saveBtn.style.display = 'block';
      saveBtn.onclick = () => loadGame();
    } else {
      saveBtn.style.display = 'none';
    }
  }
}

function startEpisode(epId) {
  if (typeof GAME_DATA === 'undefined') return;
  const ep = GAME_DATA.episodes.find(e => e.id === epId);
  if (!ep) return;

  state.currentEpisode = ep;
  state.currentLocationId = ep.start_location_id;
  state.inventory = [];
  state.unlockedLocations = [ep.start_location_id];
  state.storyFlags = {};
  state.dayCount = 1;
  state.timeOfDay = "Pagi";
  state.activeQuest = ep.title || "Lanjutkan Perjalanan Sang Juara";

  Object.keys(GAME_DATA.stats_config).forEach(k => {
    state.stats[k] = GAME_DATA.stats_config[k].initial;
  });

  switchScreen('game-screen');
  const titleEl = document.getElementById('episode-title');
  if (titleEl) titleEl.innerText = ep.title.split(':')[0] || "Episode";
  
  renderHeaderInfo();
  renderStats();
  renderLocation(state.currentLocationId);
  AudioManager.playBGM();
}

function advanceToNextEpisode(nextEpId) {
  if (typeof GAME_DATA === 'undefined') return;
  const nextEp = GAME_DATA.episodes.find(e => e.id === nextEpId);
  if (!nextEp) {
    alert("Episode berikutnya belum tersedia.");
    location.reload();
    return;
  }

  state.currentEpisode = nextEp;
  state.currentLocationId = nextEp.start_location_id;
  
  state.stats.stat3 = (state.stats.stat3 || 20) + 25;
  state.stats.stat1 = Math.min(GAME_DATA.stats_config.stat1.max, (state.stats.stat1 || 100) + 20);
  state.dayCount += 1;
  state.timeOfDay = "Pagi";
  state.activeQuest = nextEp.title || "Kejuaraan Baru";

  if (!state.unlockedLocations.includes(nextEp.start_location_id)) {
    state.unlockedLocations.push(nextEp.start_location_id);
  }

  saveGame();
  switchScreen('game-screen');
  const titleEl = document.getElementById('episode-title');
  if (titleEl) titleEl.innerText = nextEp.title.split(':')[0] || "Episode";
  
  renderHeaderInfo();
  renderStats();
  renderLocation(state.currentLocationId);
  AudioManager.playBGM();
}

function renderHeaderInfo() {
  const questEl = document.getElementById('active-quest');
  const dayEl = document.getElementById('day-time-display');
  
  if (questEl) questEl.innerText = `🎯 ${state.activeQuest || 'Eksplorasi Arena'}`;
  if (dayEl) dayEl.innerText = `📅 Hari ${state.dayCount || 1} (${state.timeOfDay || 'Pagi'})`;
}

function renderStats() {
  const container = document.getElementById('stats-container');
  if (!container || typeof GAME_DATA === 'undefined') return;
  container.innerHTML = '';

  Object.keys(GAME_DATA.stats_config).forEach(key => {
    const cfg = GAME_DATA.stats_config[key];
    const val = state.stats[key] !== undefined ? state.stats[key] : cfg.initial;
    const pct = Math.max(0, Math.min(100, (val / cfg.max) * 100));

    container.innerHTML += `
      <div class="stat-box">
        <div class="stat-label">
          <span>${cfg.icon} ${cfg.name}</span>
          <span>${val}</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  });

  // Critical HP Vignette
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    if (state.stats.stat1 <= 30) {
      appContainer.classList.add('critical');
      AudioManager.playSFX('sfx_heartbeat');
    } else {
      appContainer.classList.remove('critical');
    }
  }
}

function renderLocation(locId) {
  saveGame();
  const loc = state.currentEpisode.locations.find(l => l.id === locId);
  if (!loc) return;

  document.getElementById('location-name').innerText = loc.name;

  const imgBox = document.getElementById('scene-visual');
  const imgEl = document.getElementById('scene-img');
  if (loc.image) {
    imgEl.src = loc.image;
    imgBox.style.display = 'block';
    imgEl.onerror = () => { imgBox.style.display = 'none'; };
  } else {
    imgBox.style.display = 'none';
  }

  let narrativeText = loc.narrative;
  if (loc.conditional_narratives) {
    loc.conditional_narratives.forEach(cn => {
      if (cn.flag && state.storyFlags[cn.flag]) {
        narrativeText = cn.narrative;
      }
    });
  }

  startTypewriter(narrativeText, () => {
    renderActions(loc.action_options);
  });
}

function startTypewriter(text, onComplete) {
  const box = document.getElementById('narrative-box');
  const skipBtn = document.getElementById('skip-btn');
  const actionList = document.getElementById('action-list');

  box.innerText = '';
  actionList.innerHTML = '';
  skipBtn.style.display = 'block';
  state.isTypewriterActive = true;

  let i = 0;
  clearInterval(state.typewriterTimer);

  state.typewriterTimer = setInterval(() => {
    box.innerText += text.charAt(i);
    i++;
    if (i >= text.length) {
      completeTypewriter(text, onComplete);
    }
  }, 15);

  skipBtn.onclick = () => {
    completeTypewriter(text, onComplete);
  };
}

function completeTypewriter(text, onComplete) {
  clearInterval(state.typewriterTimer);
  document.getElementById('narrative-box').innerText = text;
  document.getElementById('skip-btn').style.display = 'none';
  state.isTypewriterActive = false;
  if (onComplete) onComplete();
}

function renderActions(actions) {
  const list = document.getElementById('action-list');
  list.innerHTML = '';

  if (!actions) return;

  actions.forEach(act => {
    if (act.required_flags && !act.required_flags.every(f => state.storyFlags[f])) return;
    if (act.forbidden_flags && act.forbidden_flags.some(f => state.storyFlags[f])) return;
    if (act.min_reputation && state.stats.stat3 < act.min_reputation) return;

    let btn = document.createElement('button');
    btn.className = 'btn-action';
    btn.innerText = act.description;
    btn.onclick = () => executeAction(act);
    list.appendChild(btn);
  });
}

function executeAction(act) {
  AudioManager.playSFX('sfx_action');

  if (act.set_flags) {
    act.set_flags.forEach(f => state.storyFlags[f] = true);
  }

  if (act.new_quest) {
    state.activeQuest = act.new_quest;
    renderHeaderInfo();
  }

  if (act.time_advance) {
    advanceTime(act.time_advance);
  }

  if (act.stat_changes) {
    Object.keys(act.stat_changes).forEach(k => {
      const cfg = GAME_DATA.stats_config[k];
      const maxVal = cfg ? cfg.max : 100;
      state.stats[k] = Math.max(0, Math.min(maxVal, (state.stats[k] || 0) + act.stat_changes[k]));
      if (act.stat_changes[k] < 0 && navigator.vibrate) {
        navigator.vibrate(200);
        AudioManager.playSFX('sfx_danger');
        triggerScreenShake();
      }
    });
    renderStats();
  }

  if (act.unlocked_item_id && !state.inventory.includes(act.unlocked_item_id)) {
    state.inventory.push(act.unlocked_item_id);
    showFloatingBadge(`🎒 Item Diterima!`, 'badge-item');
  }

  if (act.unlock_jurus_id && !state.jurusMastery[act.unlock_jurus_id]) {
    state.jurusMastery[act.unlock_jurus_id] = { level: 'Mentah', xp: 0 };
    showFloatingBadge(`🥋 Jurus Baru Dipelajari!`, 'badge-jurus');
  }

  if (act.jurus_xp_gain) {
    Object.keys(act.jurus_xp_gain).forEach(jid => {
      addJurusXP(jid, act.jurus_xp_gain[jid]);
    });
  }

  if (checkEndingTriggers(act)) return;

  if (act.is_dialogue && act.dialogue_tree) {
    startDialogueTree(act.dialogue_tree);
    return;
  }

  if (act.is_combat && act.combat_encounter) {
    startCombatEncounter(act.combat_encounter);
    return;
  }

  if (act.transition_text && act.next_location_id) {
    startTypewriter(act.transition_text, () => {
      const list = document.getElementById('action-list');
      list.innerHTML = '';
      let btn = document.createElement('button');
      btn.className = 'btn-action';
      btn.style.backgroundColor = '#16a34a';
      btn.innerText = 'Tiba di Lokasi Tujuan ➡️';
      btn.onclick = () => {
        state.currentLocationId = act.next_location_id;
        renderLocation(act.next_location_id);
      };
      list.appendChild(btn);
    });
    return;
  }

  if (act.next_location_id) {
    state.currentLocationId = act.next_location_id;
    renderLocation(act.next_location_id);
  } else if (act.outcome) {
    startTypewriter(act.outcome, () => {
      renderLocation(state.currentLocationId);
    });
  }
}

function advanceTime(turns = 1) {
  const times = ['Pagi', 'Sore', 'Malam'];
  let curIdx = times.indexOf(state.timeOfDay);
  curIdx += turns;
  if (curIdx >= times.length) {
    state.dayCount += Math.floor(curIdx / times.length);
    curIdx = curIdx % times.length;
  }
  state.timeOfDay = times[curIdx];
  renderHeaderInfo();
}

function addJurusXP(jurusId, xpAmount) {
  if (!state.jurusMastery[jurusId]) {
    state.jurusMastery[jurusId] = { level: 'Mentah', xp: 0 };
  }

  let cur = state.jurusMastery[jurusId];
  cur.xp += xpAmount;

  if (cur.level === 'Mentah' && cur.xp >= 50) {
    cur.level = 'Terlatih';
    showFloatingBadge(`🌟 Jurus Naik Level: Terlatih!`, 'badge-jurus');
  } else if (cur.level === 'Terlatih' && cur.xp >= 100) {
    cur.level = 'Mahir';
    showFloatingBadge(`🔥 Jurus Dikuasai: MAHIR!`, 'badge-jurus');
  }
}

// --- Combat System Engine ---
function startCombatEncounter(encounter) {
  state.activeEncounter = {
    ...encounter,
    currentHP: encounter.stamina,
    currentPosture: encounter.posture,
    playerMomentum: 0
  };

  if (!state.bestiaryLog.some(b => b.id === encounter.id)) {
    state.bestiaryLog.push({
      id: encounter.id,
      name: encounter.name,
      typeTag: encounter.typeTag,
      tell: encounter.tell
    });
  }

  const nameEl = document.getElementById('location-name');
  if (nameEl) nameEl.innerText = `⚔️ ARENA: ${encounter.name} [${encounter.typeTag}]`;

  renderCombatTurn("Ronde Pertarungan Dimulai! Amati petunjuk visual bahasa tubuh musuh.");
}

function renderCombatTurn(turnMessage) {
  const enc = state.activeEncounter;
  if (!enc) return;

  const box = document.getElementById('narrative-box');
  const actionList = document.getElementById('action-list');

  let statusHeader = `
[ ${enc.name.toUpperCase()} - HP: ${enc.currentHP}/${enc.stamina} | POSTUR: ${enc.currentPosture}/${enc.posture} ]
${enc.currentPosture <= 0 ? '💥 [CELAH EMAS TERBUKA - MUSUH GOYAH!]' : ''}
👁️ TELEGRAPH TELL: "${enc.tell}"

${turnMessage}
  `;

  box.innerText = statusHeader;
  actionList.innerHTML = '';

  let jurusList = [
    { id: 'jurus_geser_sumbu', name: '🥋 Geser Sumbu (Hindar)', qiCost: 0, tag: 'CEPAT' },
    { id: 'jurus_siku_tangkis', name: '🛡️ Siku Penangkis (Tangkis)', qiCost: 10, tag: 'CEPAT' },
    { id: 'jurus_tapak_terbuka', name: '🖐️ Tapak Terbuka (Pecah Postur)', qiCost: 15, tag: 'BERTAHAN' },
    { id: 'jurus_napas_dalam', name: '🧘 Napas Dalam (Pulihkan Qi)', qiCost: -25, tag: 'ALL' },
    { id: 'jurus_kunci_leher', name: '🤼 Tangkapan & Kunci Leher (Banting)', qiCost: 30, tag: 'CELAH_EMAS' }
  ];

  jurusList.forEach(j => {
    let btn = document.createElement('button');
    btn.className = 'btn-action';
    let mastery = state.jurusMastery[j.id] ? state.jurusMastery[j.id].level : 'Mentah';
    btn.innerText = `${j.name} [${mastery}]`;
    btn.onclick = () => executeCombatAction(j);
    actionList.appendChild(btn);
  });
}

function executeCombatAction(jurus) {
  const enc = state.activeEncounter;
  if (!enc) return;

  if (jurus.qiCost > 0 && state.stats.stat2 < jurus.qiCost) {
    AudioManager.playSFX('sfx_danger');
    alert("Ketenangan/Qi tidak mencukupi untuk mengeksekusi jurus ini!");
    return;
  }

  if (jurus.qiCost !== 0) {
    state.stats.stat2 = Math.max(0, Math.min(100, state.stats.stat2 - jurus.qiCost));
    renderStats();
  }

  let resultDegree = "BERHASIL";
  let playerDamage = 0;
  let enemyPostureDamage = 0;
  let enemyHPDamage = 0;
  let logText = "";

  if (enc.currentPosture <= 0 && jurus.id === 'jurus_kunci_leher') {
    resultDegree = "SEMPURNA";
    enemyHPDamage = enc.currentHP;
    logText = "💥 SEMPURNA! Anda memanfaatkan Celah Emas! Kunci leher dan bantingan keras meremukkan pertahanan musuh hingga KO!";
    AudioManager.playSFX('sfx_critical');
    triggerScreenFlash('gold');
  } else if (jurus.tag === enc.typeTag || jurus.id === 'jurus_geser_sumbu') {
    resultDegree = "SEMPURNA";
    enemyPostureDamage = 35;
    enemyHPDamage = 25;
    logText = `💥 SEMPURNA! Anda membaca gerak-gerik [${enc.typeTag}] dan meluncurkan serangan konter presisi!`;
    AudioManager.playSFX('sfx_hit');
    triggerScreenFlash('yellow');
    addJurusXP(jurus.id, 25);
  } else if (jurus.id === 'jurus_siku_tangkis') {
    resultDegree = "BERHASIL";
    enemyPostureDamage = 20;
    playerDamage = 5;
    logText = "🛡️ BERHASIL! Siku keras Anda membelokkan pukulan musuh secara efisien.";
    AudioManager.playSFX('sfx_block');
    triggerScreenFlash('cyan');
  } else if (jurus.id === 'jurus_napas_dalam') {
    resultDegree = "BERHASIL";
    logText = "🧘 BERHASIL! Olah napas diafragma memulihkan +25 Ketenangan Batin (Qi).";
    AudioManager.playSFX('sfx_block');
  } else {
    resultDegree = "TERTAHAN";
    playerDamage = 15;
    enemyPostureDamage = 10;
    logText = "⚠️ TERTAHAN! Musuh menahan dorongan Anda dan melancarkan pukulan balasan.";
    AudioManager.playSFX('sfx_danger');
    triggerScreenShake();
    triggerScreenFlash('red');
  }

  enc.currentPosture = Math.max(0, enc.currentPosture - enemyPostureDamage);
  enc.currentHP = Math.max(0, enc.currentHP - enemyHPDamage);
  if (playerDamage > 0) {
    state.stats.stat1 = Math.max(0, state.stats.stat1 - playerDamage);
    renderStats();
  }

  if (enc.currentHP <= 0) {
    AudioManager.playSFX('sfx_critical');
    showFloatingBadge(`🏆 KEMENANGAN ARENA!`, 'badge-item');
    
    if (enc.winReputation) state.stats.stat3 += enc.winReputation;
    if (enc.winItem && !state.inventory.includes(enc.winItem)) state.inventory.push(enc.winItem);

    startTypewriter(`KEMENANGAN TELAK!\n\nLawan Anda tumbang tak berdaya di lantai ring! ${logText}`, () => {
      const list = document.getElementById('action-list');
      list.innerHTML = '';
      let btn = document.createElement('button');
      btn.className = 'btn-main';
      btn.innerText = 'Lanjutkan Perjalanan ➡️';
      btn.onclick = () => {
        state.activeEncounter = null;
        renderLocation(enc.winLocationId || state.currentLocationId);
      };
      list.appendChild(btn);
    });
    return;
  }

  if (state.stats.stat1 <= 0) {
    startTypewriter(`KEKALAHAN TAKTIS!\n\n${enc.failDialogue || 'Napas Anda terengah-engah dan fisik Anda ambruk.'}`, () => {
      const list = document.getElementById('action-list');
      list.innerHTML = '';
      let btn = document.createElement('button');
      btn.className = 'btn-main';
      btn.innerText = 'Bangkit & Salurkan Tenaga ➡️';
      btn.onclick = () => {
        state.stats.stat1 = 30;
        state.activeEncounter = null;
        renderLocation(enc.failLocationId || state.currentLocationId);
      };
      list.appendChild(btn);
    });
    return;
  }

  renderCombatTurn(logText);
}

// --- Dialogue System ---
function startDialogueTree(tree) {
  state.activeDialogue = {
    tree: tree,
    currentNodeId: tree.start_node_id,
    npcName: tree.npcName,
    moodScore: tree.initialMood || 75
  };
  renderDialogueNode();
}

function renderDialogueNode() {
  const dlg = state.activeDialogue;
  if (!dlg) return;

  const node = dlg.tree.nodes.find(n => n.id === dlg.currentNodeId);
  if (!node) return;

  let moodTag = "😊 Hormat";
  if (dlg.moodScore < 30) moodTag = "😡 Terintimidasi / Murka";
  else if (dlg.moodScore < 50) moodTag = "😠 Curiga";
  else if (dlg.moodScore < 70) moodTag = "😐 Skeptis";

  const nameEl = document.getElementById('location-name');
  if (nameEl) nameEl.innerText = `💬 PERCAKAPAN: ${dlg.npcName} [Mood: ${moodTag}]`;

  startTypewriter(`${dlg.npcName}: "${node.npcText}"\n\n(${node.microExpression || ''})`, () => {
    const list = document.getElementById('action-list');
    list.innerHTML = '';

    if (!node.options || node.options.length === 0) {
      let btn = document.createElement('button');
      btn.className = 'btn-action';
      btn.innerText = 'Akhiri Percakapan ➡️';
      btn.onclick = () => {
        state.activeDialogue = null;
        renderLocation(state.currentLocationId);
      };
      list.appendChild(btn);
      return;
    }

    node.options.forEach(opt => {
      let btn = document.createElement('button');
      btn.className = 'btn-action';
      btn.innerText = `${opt.toneTag || ''} ${opt.text}`;
      btn.onclick = () => executeDialogueOption(opt);
      list.appendChild(btn);
    });
  });
}

function executeDialogueOption(opt) {
  const dlg = state.activeDialogue;
  if (!dlg) return;

  if (opt.moodChange) {
    dlg.moodScore = Math.max(0, Math.min(100, dlg.moodScore + opt.moodChange));
  }

  if (opt.stat_changes) {
    Object.keys(opt.stat_changes).forEach(k => {
      state.stats[k] = Math.max(0, Math.min(100, (state.stats[k] || 0) + opt.stat_changes[k]));
    });
    renderStats();
  }

  if (opt.set_flags) {
    opt.set_flags.forEach(f => state.storyFlags[f] = true);
  }

  if (opt.unlocked_item_id && !state.inventory.includes(opt.unlocked_item_id)) {
    state.inventory.push(opt.unlocked_item_id);
    showFloatingBadge(`🎒 Item Diterima!`, 'badge-item');
  }

  if (opt.nextNodeId) {
    dlg.currentNodeId = opt.nextNodeId;
    renderDialogueNode();
  } else {
    state.activeDialogue = null;
    renderLocation(state.currentLocationId);
  }
}

// --- Visual FX Helpers ---
function triggerScreenShake() {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    appContainer.classList.add('shake');
    setTimeout(() => appContainer.classList.remove('shake'), 400);
  }
}

function triggerScreenFlash(color) {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    appContainer.classList.add(`flash-${color}`);
    setTimeout(() => appContainer.classList.remove(`flash-${color}`), 300);
  }
}

function showFloatingBadge(text, className) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  let badge = document.createElement('div');
  badge.className = `floating-badge ${className || ''}`;
  badge.innerText = text;
  mainContent.appendChild(badge);

  setTimeout(() => badge.remove(), 1800);
}

function checkEndingTriggers(act) {
  let triggeredEnding = null;

  if (act.trigger_ending_id && state.currentEpisode.endings) {
    triggeredEnding = state.currentEpisode.endings[act.trigger_ending_id];
  } else if (state.stats.stat1 <= 0) {
    state.stats.stat1 = 20;
    showFloatingBadge(`🩹 Cedera Fisik! Stamina Pulih Sedikit`, 'badge-item');
  } else if (state.stats.stat3 <= 0) {
    triggeredEnding = state.currentEpisode.endings ? state.currentEpisode.endings['stat3_zero_ending'] : null;
  }

  if (triggeredEnding) {
    showEnding(triggeredEnding);
    return true;
  }
  return false;
}

function showEnding(ending) {
  switchScreen('ending-screen');
  document.getElementById('ending-title').innerText = ending.title;
  document.getElementById('ending-desc').innerText = ending.narrative;

  const endingScreen = document.getElementById('ending-screen');
  let nextBtn = document.getElementById('btn-next-ep');

  if (ending.next_episode_id) {
    if (!nextBtn) {
      nextBtn = document.createElement('button');
      nextBtn.id = 'btn-next-ep';
      nextBtn.className = 'btn-main';
      nextBtn.style.marginTop = '12px';
      nextBtn.style.backgroundColor = '#16a34a';
      endingScreen.appendChild(nextBtn);
    }
    nextBtn.style.display = 'block';
    nextBtn.innerText = 'Lanjut ke Episode Berikutnya ➡️';
    nextBtn.onclick = () => advanceToNextEpisode(ending.next_episode_id);
  } else if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  localStorage.removeItem('liga_petarung_save');
}

// --- Modals, Inventory, Jurus, Bestiary ---
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tab = btn.dataset.tab;

      if (tab === 'inventory') {
        document.getElementById('inventory-panel').classList.add('active');
        renderInventory();
      } else if (tab === 'jurus') {
        document.getElementById('jurus-panel').classList.add('active');
        renderJurusPanel();
      } else if (tab === 'bestiary') {
        document.getElementById('bestiary-panel').classList.add('active');
        renderBestiaryPanel();
      } else if (tab === 'crafting') {
        document.getElementById('crafting-panel').classList.add('active');
        renderCraftingPanel();
      }
    };
  });

  const craftBtn = document.getElementById('btn-execute-craft');
  if (craftBtn) craftBtn.onclick = executeCrafting;

  const restartBtn = document.getElementById('btn-restart');
  if (restartBtn) restartBtn.onclick = () => location.reload();

  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.onclick = () => {
      state.isAudioMuted = !state.isAudioMuted;
      audioBtn.innerText = state.isAudioMuted ? '🔇' : '🔊';
    };
  }
}

function getAllEpisodeItems() {
  let allItems = [];
  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.episodes) {
    GAME_DATA.episodes.forEach(ep => {
      if (ep.items) {
        ep.items.forEach(it => {
          if (!allItems.some(x => x.id === it.id)) {
            allItems.push(it);
          }
        });
      }
    });
  }
  return allItems;
}

function renderInventory() {
  const container = document.getElementById('inventory-list');
  if (!container) return;
  container.innerHTML = '';

  const allItems = getAllEpisodeItems();

  if (state.inventory.length === 0) {
    container.innerHTML = `<p style="grid-column: span 2; font-size:0.85rem; opacity:0.6; text-align:center;">Tas inventaris Anda masih kosong.</p>`;
    return;
  }

  state.inventory.forEach(itemId => {
    const item = allItems.find(i => i.id === itemId);
    if (item) {
      let card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <strong>${item.emoji || '📦'} ${item.name}</strong>
        <p style="font-size:0.75rem; margin-top:4px; opacity:0.8;">${item.description}</p>
      `;
      card.onclick = () => useInventoryItem(item);
      container.appendChild(card);
    }
  });
}

function useInventoryItem(item) {
  if (item.id === 'item_02' || item.id === 'item_03') {
    state.stats.stat1 = Math.min(100, state.stats.stat1 + 25);
    renderStats();
    showFloatingBadge(`🧪 Meminum Jamu: +25 Stamina!`, 'badge-item');
  } else if (item.id === 'item_01') {
    addJurusXP('jurus_geser_sumbu', 30);
    showFloatingBadge(`📜 Membaca Kitab: +30 XP Jurus!`, 'badge-jurus');
  } else {
    alert(`${item.name}: ${item.description}`);
  }
}

function renderJurusPanel() {
  const container = document.getElementById('jurus-list');
  if (!container) return;
  container.innerHTML = '';

  let jurusMasterInfo = {
    jurus_geser_sumbu: { name: 'Geser Sumbu', type: 'Hindar', desc: 'Melangkah samping 45 derajat memindahkan poros tubuh.' },
    jurus_siku_tangkis: { name: 'Siku Penangkis', type: 'Tangkis', desc: 'Membelokkan arah pukulan keras dengan tulang siku.' },
    jurus_tapak_terbuka: { name: 'Tapak Terbuka', type: 'Serang', desc: 'Dorongan telapak tangan bermuatan energi memecah postur.' },
    jurus_napas_dalam: { name: 'Napas Dalam', type: 'Utility', desc: 'Olah napas diafragma memulihkan Ketenangan Batin (Qi).' },
    jurus_kunci_leher: { name: 'Kunci Leher', type: 'Banting', desc: 'Mengunci persendian dan memicu KO saat Celah Emas terbuka.' }
  };

  Object.keys(state.jurusMastery).forEach(jid => {
    let jData = state.jurusMastery[jid];
    let jMeta = jurusMasterInfo[jid] || { name: jid, type: 'Teknik', desc: 'Jurus Bela Diri Sumbu Jagat' };

    container.innerHTML += `
      <div class="jurus-card">
        <div style="display:flex; justify-content:space-between;">
          <strong>🥋 ${jMeta.name} (${jMeta.type})</strong>
          <span style="color:var(--accent-color); font-size:0.75rem; font-weight:bold;">[${jData.level}]</span>
        </div>
        <p style="font-size:0.75rem; margin-top:4px; opacity:0.8;">${jMeta.desc}</p>
        <div class="bar-bg" style="margin-top:6px;">
          <div class="bar-fill" style="width:${Math.min(100, jData.xp)}%"></div>
        </div>
      </div>
    `;
  });
}

function renderBestiaryPanel() {
  const container = document.getElementById('bestiary-list');
  if (!container) return;
  container.innerHTML = '';

  if (state.bestiaryLog.length === 0) {
    container.innerHTML = `<p style="grid-column: span 2; font-size:0.85rem; opacity:0.6; text-align:center;">Belum ada catatan analisis lawan.</p>`;
    return;
  }

  state.bestiaryLog.forEach(b => {
    container.innerHTML += `
      <div class="item-card">
        <strong>🥊 ${b.name} [Tipe: ${b.typeTag}]</strong>
        <p style="font-size:0.75rem; margin-top:4px; opacity:0.85;">👁️ <strong>Telegraph Tell:</strong> "${b.tell}"</p>
      </div>
    `;
  });
}

function renderCraftingPanel() {
  const container = document.getElementById('craft-inventory-list');
  if (!container) return;
  container.innerHTML = '';
  state.selectedCraftItems = [];

  const allItems = getAllEpisodeItems();

  if (state.inventory.length === 0) {
    container.innerHTML = `<p style="grid-column: span 2; font-size:0.85rem; opacity:0.6; text-align:center;">Belum ada item di tas untuk dirakit.</p>`;
    return;
  }

  state.inventory.forEach(itemId => {
    const item = allItems.find(i => i.id === itemId);
    if (item) {
      let card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `<strong>${item.emoji || '📦'} ${item.name}</strong>`;
      card.onclick = () => {
        if (state.selectedCraftItems.includes(itemId)) {
          state.selectedCraftItems = state.selectedCraftItems.filter(id => id !== itemId);
          card.classList.remove('selected');
        } else if (state.selectedCraftItems.length < 3) {
          state.selectedCraftItems.push(itemId);
          card.classList.add('selected');
        }
      };
      container.appendChild(card);
    }
  });
}

function executeCrafting() {
  let allRecipes = [];
  if (typeof GAME_DATA !== 'undefined' && GAME_DATA.episodes) {
    GAME_DATA.episodes.forEach(ep => {
      if (ep.recipes) {
        allRecipes = allRecipes.concat(ep.recipes);
      }
    });
  }

  const match = allRecipes.find(r => {
    return r.required_item_ids.length === state.selectedCraftItems.length &&
      r.required_item_ids.every(id => state.selectedCraftItems.includes(id));
  });

  if (match) {
    AudioManager.playSFX('sfx_action');
    alert(`BERHASIL DIRAKIT: ${match.result_item_name}\n${match.description}`);
    if (match.reward_stat_changes) {
      Object.keys(match.reward_stat_changes).forEach(k => {
        const cfg = GAME_DATA.stats_config[k];
        const maxVal = cfg ? cfg.max : 100;
        state.stats[k] = Math.min(maxVal, (state.stats[k] || 0) + match.reward_stat_changes[k]);
      });
      renderStats();
    }
  } else {
    AudioManager.playSFX('sfx_danger');
    alert("GAGAL: Kombinasi item tidak cocok atau tidak menghasilkan reaksi apapun!");
  }
}

// --- Save v2.0.0 Engine System dengan Migration Support ---
function saveGame() {
  if (!state.currentEpisode) return;
  
  const saveData = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    episodeId: state.currentEpisode ? state.currentEpisode.id : null,
    locationId: state.currentLocationId,
    stats: state.stats,
    inventory: state.inventory,
    unlockedLocations: state.unlockedLocations,
    storyFlags: state.storyFlags || {},
    dayCount: state.dayCount || 1,
    timeOfDay: state.timeOfDay || 'Pagi',
    activeQuest: state.activeQuest || '',
    jurusMastery: state.jurusMastery || {},
    bestiaryLog: state.bestiaryLog || []
  };

  localStorage.setItem('liga_petarung_save', JSON.stringify(saveData));
}

function loadGame() {
  let rawSaved = localStorage.getItem('liga_petarung_save');
  if (!rawSaved || typeof GAME_DATA === 'undefined') return;

  try {
    let parsed = JSON.parse(rawSaved);
    let episodeId = parsed.episodeId || (parsed.currentEpisode ? parsed.currentEpisode.id : null);

    // Save Migration Helper v1 -> v2.0.0
    if (!parsed.version || parsed.version !== SAVE_VERSION) {
      parsed.version = SAVE_VERSION;
      parsed.storyFlags = parsed.storyFlags || {};
      parsed.dayCount = parsed.dayCount || 1;
      parsed.timeOfDay = parsed.timeOfDay || 'Pagi';
      parsed.activeQuest = parsed.activeQuest || 'Lanjutkan Perjalanan Sang Juara';
      parsed.jurusMastery = parsed.jurusMastery || {
        jurus_geser_sumbu: { level: 'Terlatih', xp: 50 },
        jurus_siku_tangkis: { level: 'Mentah', xp: 20 },
        jurus_tapak_terbuka: { level: 'Mentah', xp: 0 }
      };
      parsed.bestiaryLog = parsed.bestiaryLog || [];
    }

    const ep = GAME_DATA.episodes.find(e => e.id === episodeId) || GAME_DATA.episodes[0];
    state.currentEpisode = ep;
    state.currentLocationId = parsed.locationId || ep.start_location_id;
    state.stats = parsed.stats || {};
    state.inventory = parsed.inventory || [];
    state.unlockedLocations = parsed.unlockedLocations || [ep.start_location_id];
    state.storyFlags = parsed.storyFlags || {};
    state.dayCount = parsed.dayCount || 1;
    state.timeOfDay = parsed.timeOfDay || 'Pagi';
    state.activeQuest = parsed.activeQuest || ep.title || '';
    state.jurusMastery = parsed.jurusMastery || {};
    state.bestiaryLog = parsed.bestiaryLog || [];

    switchScreen('game-screen');
    const titleEl = document.getElementById('episode-title');
    if (titleEl) titleEl.innerText = ep.title.split(':')[0] || "Episode";

    renderHeaderInfo();
    renderStats();
    renderLocation(state.currentLocationId);
    AudioManager.playBGM();
  } catch (e) {
    console.error("Failed to load save file:", e);
  }
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}
