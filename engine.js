/**
 * ENGINE.JS - Liga Petarung v5.0
 * Combat: Stamina / Qi / Postur / Momentum / Celah Emas
 * Dialogue: multi-turn dengan mood
 * Backward compatible dengan story_data v4.0 (scripted rounds)
 */

// ============================================================
// STATE
// ============================================================
let state = {
  currentEpisode: null,
  currentLocationId: null,
  stats: {},
  inventory: [],
  unlockedLocations: [],
  selectedCraftItems: [],
  completedActions: [],
  flags: {},
  jurusMastery: {},
  unlockedEpisodes: [],
  isAudioMuted: false,
  isTypewriterActive: false,
  typewriterTimer: null,
  _saveVersion: 5
};

function defaultStats() {
  const s = {};
  Object.keys(GAME_DATA.stats_config).forEach(k => {
    s[k] = GAME_DATA.stats_config[k].initial;
  });
  return s;
}

// ============================================================
// AUDIO MANAGER
// ============================================================
const AudioManager = {
  bgmAudio: null,
  audioCtx: null,
  init() {
    if (GAME_DATA.audio_config && GAME_DATA.audio_config.bgm) {
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
    const p = GAME_DATA.audio_config ? GAME_DATA.audio_config[type] : null;
    if (p) {
      const s = new Audio(p);
      s.play().catch(() => this.playSynth(type));
    } else this.playSynth(type);
  },
  playSynth(type) {
    try {
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (type === 'sfx_victory') {
        [523, 659, 784, 1047].forEach((f, i) => {
          const o = this.audioCtx.createOscillator(), g = this.audioCtx.createGain();
          o.connect(g); g.connect(this.audioCtx.destination);
          o.frequency.value = f;
          const t = this.audioCtx.currentTime + i * 0.1;
          g.gain.setValueAtTime(0.15, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          o.start(t); o.stop(t + 0.3);
        });
        return;
      }
      if (type === 'sfx_defeat') {
        [392, 330, 262, 196].forEach((f, i) => {
          const o = this.audioCtx.createOscillator(), g = this.audioCtx.createGain();
          o.connect(g); g.connect(this.audioCtx.destination);
          o.frequency.value = f;
          const t = this.audioCtx.currentTime + i * 0.15;
          g.gain.setValueAtTime(0.15, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          o.start(t); o.stop(t + 0.35);
        });
        return;
      }
      const o = this.audioCtx.createOscillator(), g = this.audioCtx.createGain();
      o.connect(g); g.connect(this.audioCtx.destination);
      if (type === 'sfx_danger') {
        o.frequency.setValueAtTime(150, this.audioCtx.currentTime);
        o.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.3);
        g.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      } else {
        o.frequency.setValueAtTime(600, this.audioCtx.currentTime);
        g.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      }
      o.start(); o.stop(this.audioCtx.currentTime + 0.2);
    } catch (e) {}
  }
};

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type = 'info', dur = 3000) {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.innerHTML = msg;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 350);
  }, dur);
}

// ============================================================
// SCREEN EFFECTS
// ============================================================
function shake(level = 'medium') {
  const c = document.getElementById('app-container');
  if (!c) return;
  const cls = 'shake-' + level;
  c.classList.remove('shake-light', 'shake-medium', 'shake-heavy');
  void c.offsetWidth;
  c.classList.add(cls);
  setTimeout(() => c.classList.remove(cls), 450);
}

function floatDmg(amount, targetId, heal = false) {
  const t = document.getElementById(targetId);
  if (!t) return;
  const r = t.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'floating-damage ' + (heal ? 'heal' : 'dmg');
  el.innerText = heal ? '+' + amount : '-' + Math.abs(amount);
  el.style.left = (r.left + r.width / 2 - 20) + 'px';
  el.style.top = r.top + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function floatStat(key, delta) {
  if (!delta) return;
  const cfg = GAME_DATA.stats_config[key];
  if (!cfg) return;
  const el = document.createElement('div');
  el.className = 'stat-float ' + (delta > 0 ? 'positive' : 'negative');
  el.innerText = (delta > 0 ? '+' : '') + delta + ' ' + cfg.icon;
  el.style.bottom = '140px';
  el.style.left = (20 + Math.random() * 60) + '%';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

// ============================================================
// TRANSITION SCREEN
// ============================================================
function showTransition(text, cb) {
  const el = document.getElementById('transition-screen');
  if (!el) { if (cb) cb(); return; }
  const txt = el.querySelector('.transition-text');
  const hint = el.querySelector('.transition-hint');
  txt.innerText = text;
  hint.style.opacity = '0';
  el.classList.add('active');
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    el.classList.remove('active');
    el.removeEventListener('click', dismiss);
    document.removeEventListener('keydown', kh);
    if (cb) cb();
  };
  const kh = (e) => { if (e.key === 'Enter' || e.key === ' ') dismiss(); };
  setTimeout(() => { hint.style.opacity = '1'; }, 700);
  setTimeout(() => {
    el.addEventListener('click', dismiss);
    document.addEventListener('keydown', kh);
  }, 400);
}

// ============================================================
// COMBAT SYSTEM v5.0
// ============================================================
const CombatSystem = {
  active: false,
  def: null,
  roundIdx: 0,
  playerStamina: 0,
  playerQi: 0,
  playerPostur: 5,
  playerMomentum: 0,
  enemyName: '',
  enemyEmoji: '',
  enemyMaxStamina: 0,
  enemyStamina: 0,
  enemyMaxPostur: 5,
  enemyPostur: 5,
  enemyPattern: 'CEPA T',
  activeDebuffs: [],
  log: [],
  actionIdForRollback: null,
  celahEmasActive: false,

  start(def, actionId) {
    this.active = true;
    this.def = def;
    this.roundIdx = 0;
    this.playerStamina = state.stats.stat1 || 0;
    this.playerQi = state.stats.stat2 || 0;
    this.playerPostur = 5;
    this.playerMomentum = 0;
    this.enemyName = def.enemy_name || def.enemy?.name || 'Lawan';
    this.enemyEmoji = def.enemy_emoji || def.enemy?.emoji || '🥋';
    this.enemyMaxStamina = def.enemy_stamina || def.enemy?.stamina || 100;
    this.enemyStamina = this.enemyMaxStamina;
    this.enemyMaxPostur = def.enemy_postur || def.enemy?.postur || 5;
    this.enemyPostur = this.enemyMaxPostur;
    this.enemyPattern = def.enemy_pattern || def.enemy?.pattern || 'CEPA T';
    this.activeDebuffs = [];
    this.celahEmasActive = false;
    this.actionIdForRollback = actionId || null;
    this.log = ['⚔️ Pertarungan melawan ' + this.enemyName + ' dimulai!'];

    document.getElementById('combat-hud').classList.add('active');
    AudioManager.playSFX('sfx_action');
    this.showIntro();
  },

  showIntro() {
    const hud = document.getElementById('combat-hud');
    hud.querySelector('#combat-enemy-name').innerText = this.enemyEmoji + ' ' + this.enemyName;
    hud.querySelector('#combat-round-indicator').innerText = 'PERTARUNGAN';
    const narr = hud.querySelector('#combat-narration');
    narr.innerHTML = '<p>' + (this.def.intro || 'Pertarungan dimulai.') + '</p>';
    hud.querySelector('#combat-debuffs').innerHTML = '';
    this.updateBars();

    const opts = hud.querySelector('#combat-options');
    opts.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'combat-btn combat-btn-wide';
    btn.innerHTML = '⚔️ Mulai Ronde 1';
    btn.onclick = () => this.renderRound();
    opts.appendChild(btn);
  },

  updateBars() {
    const hud = document.getElementById('combat-hud');
    // Player
    const ps = document.getElementById('combat-player-hp-fill');
    if (ps) ps.style.width = Math.max(0, (this.playerStamina / GAME_DATA.stats_config.stat1.max) * 100) + '%';
    const pst = document.getElementById('combat-player-hp-text');
    if (pst) pst.innerText = this.playerStamina + '/' + GAME_DATA.stats_config.stat1.max;
    const pq = document.getElementById('combat-player-qi-fill');
    if (pq) pq.style.width = Math.max(0, (this.playerQi / GAME_DATA.stats_config.stat2.max) * 100) + '%';
    const pqt = document.getElementById('combat-player-qi-text');
    if (pqt) pqt.innerText = this.playerQi + '/' + GAME_DATA.stats_config.stat2.max;
    // Postur dots
    const pp = document.getElementById('combat-player-postur');
    if (pp) pp.innerHTML = this.renderPosturDots(this.playerPostur, 5);
    // Enemy
    const es = document.getElementById('combat-enemy-hp-fill');
    if (es) es.style.width = Math.max(0, (this.enemyStamina / this.enemyMaxStamina) * 100) + '%';
    const est = document.getElementById('combat-enemy-hp-text');
    if (est) est.innerText = this.enemyStamina + '/' + this.enemyMaxStamina;
    const ep = document.getElementById('combat-enemy-postur');
    if (ep) ep.innerHTML = this.renderPosturDots(this.enemyPostur, this.enemyMaxPostur);
    // Momentum
    const mo = document.getElementById('combat-momentum');
    if (mo) mo.innerHTML = this.renderMomentum(this.playerMomentum);
  },

  renderPosturDots(cur, max) {
    let s = '';
    for (let i = 0; i < max; i++) {
      s += '<span class="postur-dot ' + (i < cur ? 'full' : 'empty') + '"></span>';
    }
    return s;
  },

  renderMomentum(m) {
    let s = '';
    for (let i = -3; i <= 3; i++) {
      if (i === 0) { s += '<span class="momentum-sep">|</span>'; continue; }
      const filled = (i > 0 && i <= m) || (i < 0 && i >= m);
      s += '<span class="momentum-dot ' + (filled ? 'full ' + (i > 0 ? 'pos' : 'neg') : 'empty') + '"></span>';
    }
    return s;
  },

  renderRound() {
    const round = this.def.rounds[this.roundIdx];
    if (!round) { this.endCombat(true); return; }

    const hud = document.getElementById('combat-hud');
    hud.querySelector('#combat-round-indicator').innerText = 'RONDE ' + round.round;

    // Telegraph
    const narr = hud.querySelector('#combat-narration');
    narr.innerHTML = '<p class="telegraph-text">' + round.telegraph + '</p>';

    // Debuffs
    const dEl = hud.querySelector('#combat-debuffs');
    if (this.activeDebuffs.length > 0) {
      dEl.innerHTML = this.activeDebuffs.map(d => '<span class="debuff-badge">⚠️ ' + d.name + '</span>').join('');
    } else {
      dEl.innerHTML = '';
    }

    this.updateBars();

    // Options
    const opts = hud.querySelector('#combat-options');
    opts.innerHTML = '';

    round.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'combat-option';

      // Cek syarat
      const missing = [];
      if (opt.required_stat) {
        Object.keys(opt.required_stat).forEach(k => {
          if ((state.stats[k] || 0) < opt.required_stat[k]) {
            const cfg = GAME_DATA.stats_config[k];
            missing.push(cfg.icon + ' ' + cfg.name + ' ≥ ' + opt.required_stat[k]);
          }
        });
      }
      if (opt.required_postur_lawan === 0 && this.enemyPostur > 0) {
        missing.push('Butuh: Celah Emas');
      }
      if (opt.required_qi && this.playerQi < opt.required_qi) {
        missing.push('Qi ≥ ' + opt.required_qi);
      }

      if (missing.length > 0) {
        btn.disabled = true;
        btn.innerHTML = opt.label + '<br><small class="req-hint">🔒 ' + missing.join(' • ') + '</small>';
      } else {
        const resultLabel = opt.result ? ' [' + opt.result + ']' : '';
        btn.innerText = opt.label;
        btn.onclick = () => this.chooseOption(opt);
      }
      opts.appendChild(btn);
    });
  },

  chooseOption(opt) {
    // Apply effects
    const eff = opt.effects || opt.stat_changes || {};
    if (eff.player_stamina !== undefined) this.playerStamina = Math.max(0, this.playerStamina + eff.player_stamina);
    if (eff.player_qi !== undefined) this.playerQi = Math.max(0, this.playerQi + eff.player_qi);
    if (eff.player_postur !== undefined) this.playerPostur = Math.max(0, Math.min(5, this.playerPostur + eff.player_postur));
    if (eff.player_momentum !== undefined) this.playerMomentum = Math.max(-3, Math.min(3, this.playerMomentum + eff.player_momentum));
    if (eff.enemy_stamina !== undefined) this.enemyStamina = Math.max(0, this.enemyStamina + eff.enemy_stamina);
    if (eff.enemy_postur !== undefined) this.enemyPostur = Math.max(0, Math.min(this.enemyMaxPostur, this.enemyPostur + eff.enemy_postur));

    // Legacy fallback (stat_changes field from v4.0 format)
    if (opt.stat_changes && !opt.effects) {
      if (opt.stat_changes.stat1) this.playerStamina = Math.max(0, this.playerStamina + opt.stat_changes.stat1);
      if (opt.stat_changes.stat2) this.playerQi = Math.max(0, this.playerQi + opt.stat_changes.stat2);
    }

    // Debuff
    if (opt.debuff && !this.activeDebuffs.find(d => d.name === opt.debuff.name)) {
      this.activeDebuffs.push(opt.debuff);
    }

    // Audio + shake
    if (opt.vibrate && navigator.vibrate) navigator.vibrate(200);
    const dmg = Math.abs((opt.effects && opt.effects.player_stamina) || (opt.stat_changes && opt.stat_changes.stat1) || 0);
    if (dmg >= 20) { shake('heavy'); AudioManager.playSFX('sfx_danger'); }
    else if (dmg >= 10) { shake('medium'); AudioManager.playSFX('sfx_danger'); }
    else if (dmg > 0) { shake('light'); AudioManager.playSFX('sfx_danger'); }
    else AudioManager.playSFX('sfx_action');

    if ((opt.effects && opt.effects.player_stamina) || (opt.stat_changes && opt.stat_changes.stat1)) {
      const d = (opt.effects && opt.effects.player_stamina) || (opt.stat_changes && opt.stat_changes.stat1);
      if (d < 0) floatDmg(d, 'combat-player-hp-fill');
    }
    if (opt.effects && opt.effects.enemy_stamina && opt.effects.enemy_stamina < 0) {
      floatDmg(opt.effects.enemy_stamina, 'combat-enemy-hp-fill');
    }

    // Log
    this.log.push(opt.outcome || opt.result || '...');
    this.showOutcome(opt);
  },

  showOutcome(opt) {
    const hud = document.getElementById('combat-hud');
    hud.querySelector('#combat-narration').innerHTML = '<p class="outcome-text">' + (opt.outcome || '') + '</p>';
    this.updateBars();

    const opts = hud.querySelector('#combat-options');
    opts.innerHTML = '';

    // Cek player tumbang
    if (this.playerStamina <= 0) {
      this.log.push('💀 Kau tumbang...');
      this.endCombat(false);
      return;
    }

    // Cek enemy stamina 0
    if (this.enemyStamina <= 0) {
      this.log.push('💥 ' + this.enemyName + ' tumbang!');
      setTimeout(() => this.endCombat(true), 800);
      return;
    }

    // Cek Celah Emas
    if (this.enemyPostur <= 0 && !this.celahEmasActive) {
      this.celahEmasActive = true;
      this.log.push('⚡ CELAH EMAS! ' + this.enemyName + ' goyah!');
      const celahBtn = document.createElement('button');
      celahBtn.className = 'combat-btn combat-btn-wide combat-btn-danger';
      celahBtn.innerHTML = '⚡ MANFAATKAN CELAH EMAS!';
      celahBtn.onclick = () => this.showCelahEmas();
      opts.appendChild(celahBtn);
      return;
    }

    // Lanjut ronde berikutnya
    this.roundIdx++;
    if (this.roundIdx >= this.def.rounds.length) {
      // Kalau masih hidup, menang by decision
      const btn = document.createElement('button');
      btn.className = 'combat-btn combat-btn-wide combat-btn-success';
      btn.innerText = '🏆 Selesaikan Pertarungan';
      btn.onclick = () => this.endCombat(true);
      opts.appendChild(btn);
      return;
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'combat-btn combat-btn-wide';
    nextBtn.innerText = '→ Ronde Berikutnya';
    nextBtn.onclick = () => this.renderRound();
    opts.appendChild(nextBtn);
  },

  showCelahEmas() {
    const hud = document.getElementById('combat-hud');
    hud.querySelector('#combat-narration').innerHTML = '<p class="telegraph-text">Postur ' + this.enemyName + ' hancur! Tubuhnya terbuka lebar, matanya berkunang — kau punya satu kesempatan untuk menghabisi.</p>';
    const opts = hud.querySelector('#combat-options');
    opts.innerHTML = '';

    // Kunci Leher = instan KO
    const finishBtn = document.createElement('button');
    finishBtn.className = 'combat-btn combat-btn-wide combat-btn-success';
    finishBtn.innerHTML = '🗡️ Kunci Leher / Banting — HABISI!';
    finishBtn.onclick = () => this.finishCelahEmas();
    opts.appendChild(finishBtn);

    // Serang lain (kurang efektif)
    const altBtn = document.createElement('button');
    altBtn.className = 'combat-option';
    altBtn.innerText = 'Tapak Terbuka ke celah (+50% dmg)';
    altBtn.onclick = () => {
      const dmg = Math.round(8 * 1.5);
      this.enemyStamina = Math.max(0, this.enemyStamina - dmg);
      this.log.push('Tapak Terbuka ke celah: ' + this.enemyName + ' -' + dmg + ' stamina');
      floatDmg(-dmg, 'combat-enemy-hp-fill');
      this.updateBars();
      this.celahEmasActive = false;
      this.enemyPostur = 2; // reset
      if (this.enemyStamina <= 0) { setTimeout(() => this.endCombat(true), 800); return; }
      this.roundIdx++;
      this.renderRound();
    };
    opts.appendChild(altBtn);
  },

  finishCelahEmas() {
    const dmg = Math.max(20, this.enemyStamina);
    this.enemyStamina = 0;
    this.log.push('Kunci Leher Sempurna: ' + this.enemyName + ' TUMBANG!');
    floatDmg(-dmg, 'combat-enemy-hp-fill');
    shake('heavy');
    this.updateBars();
    const hud = document.getElementById('combat-hud');
    hud.querySelector('#combat-narration').innerHTML = '<p class="outcome-text">Kau mengunci lehernya. Tubuh ' + this.enemyName + ' terhempas ke kanvas. Wasit menghitung. Sepuluh. Pertarungan usai.</p>';
    hud.querySelector('#combat-options').innerHTML = '';
    setTimeout(() => this.endCombat(true), 1200);
  },

  endCombat(victory) {
    const result = victory ? this.def.victory : this.def.defeat;

    if (!victory && this.actionIdForRollback) {
      state.completedActions = state.completedActions.filter(id => id !== this.actionIdForRollback);
    }

    // Sync player stats back
    state.stats.stat1 = Math.max(0, this.playerStamina);
    state.stats.stat2 = Math.max(0, Math.min(GAME_DATA.stats_config.stat2.max, this.playerQi));

    const splash = document.createElement('div');
    splash.className = 'combat-splash ' + (victory ? 'victory' : 'defeat');
    splash.innerHTML = '<div class="splash-title">' + (victory ? '⚔️ KEMENANGAN' : '💀 KEKALAHAN') + '</div>' +
                       '<div class="splash-sub">' + (victory ? this.enemyName + ' tumbang' : 'Kau tumbang di tangan ' + this.enemyName) + '</div>';
    document.body.appendChild(splash);
    AudioManager.playSFX(victory ? 'sfx_victory' : 'sfx_defeat');

    setTimeout(() => {
      splash.remove();
      document.getElementById('combat-hud').classList.remove('active');
      this.active = false;
      this.applyOutcome(result);
    }, 1700);
  },

  applyOutcome(outcome) {
    if (!outcome) { renderLocation(state.currentLocationId); return; }

    if (outcome.stat_changes) {
      Object.keys(outcome.stat_changes).forEach(k => {
        const cfg = GAME_DATA.stats_config[k];
        const max = cfg ? cfg.max : 100;
        const before = state.stats[k] || 0;
        state.stats[k] = Math.max(0, Math.min(max, before + outcome.stat_changes[k]));
        floatStat(k, state.stats[k] - before);
      });
      renderStats();
    }
    if (outcome.unlocked_item_id && !state.inventory.includes(outcome.unlocked_item_id)) {
      state.inventory.push(outcome.unlocked_item_id);
      const it = getAllEpisodeItems().find(i => i.id === outcome.unlocked_item_id);
      if (it) showToast('🎁 Didapat: <strong>' + it.emoji + ' ' + it.name + '</strong>', 'success');
    }
    if (outcome.unlocked_item_ids) {
      outcome.unlocked_item_ids.forEach(id => {
        if (!state.inventory.includes(id)) {
          state.inventory.push(id);
          const it = getAllEpisodeItems().find(i => i.id === id);
          if (it) showToast('🎁 Didapat: <strong>' + it.emoji + ' ' + it.name + '</strong>', 'success');
        }
      });
    }
    if (outcome.sets_flag) {
      if (typeof outcome.sets_flag === 'string') state.flags[outcome.sets_flag] = true;
      else Object.assign(state.flags, outcome.sets_flag);
    }
    if (outcome.unlock_jurus_id) {
      if (!state.jurusMastery[outcome.unlock_jurus_id]) state.jurusMastery[outcome.unlock_jurus_id] = 0;
      showToast('📜 Jurus baru: <strong>' + outcome.unlock_jurus_id + '</strong>', 'success');
    }
    if (outcome.trigger_ending_id && state.currentEpisode.endings) {
      const e = state.currentEpisode.endings[outcome.trigger_ending_id];
      if (e) { showEnding(e); return; }
    }
    if (state.stats.stat1 <= 0 || state.stats.stat2 <= 0 || state.stats.stat3 <= 0) {
      if (checkEndingTriggers({})) return;
    }
    if (outcome.next_location_id) {
      goToLocation(outcome.next_location_id, outcome.transition_text);
    } else if (outcome.outcome) {
      startTypewriter(outcome.outcome, () => renderLocation(state.currentLocationId));
    } else {
      renderLocation(state.currentLocationId);
    }
    saveGame();
  }
};

// ============================================================
// DIALOGUE SYSTEM
// ============================================================
const DialogueSystem = {
  active: false,
  def: null,
  onComplete: null,

  start(def, cb) {
    this.active = true;
    this.def = def;
    this.onComplete = cb;
    document.getElementById('dialogue-overlay').classList.add('active');
    this.render();
  },

  render() {
    const ov = document.getElementById('dialogue-overlay');
    ov.querySelector('#dialogue-npc').innerText = this.def.npc;
    ov.querySelector('#dialogue-personality').innerText = 'Kepribadian: ' + this.def.npc_personality;
    const expr = ov.querySelector('#dialogue-expressions');
    expr.innerHTML = this.def.micro_expressions.map(e => '<div class="micro-expr">👁️ ' + e + '</div>').join('');
    ov.querySelector('#dialogue-narrative').innerText = this.def.narrative;
    const opts = ov.querySelector('#dialogue-options');
    opts.innerHTML = '';
    this.def.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'dialogue-option';
      const missing = [];
      if (opt.required_stat) {
        Object.keys(opt.required_stat).forEach(k => {
          if ((state.stats[k] || 0) < opt.required_stat[k]) {
            const cfg = GAME_DATA.stats_config[k];
            missing.push(cfg.icon + ' ' + cfg.name + ' ≥ ' + opt.required_stat[k]);
          }
        });
      }
      if (missing.length > 0) {
        btn.disabled = true;
        btn.innerHTML = opt.description + '<br><small class="req-hint">🔒 ' + missing.join(' • ') + '</small>';
      } else {
        btn.innerText = opt.description;
        btn.onclick = () => this.choose(opt);
      }
      opts.appendChild(btn);
    });
  },

  choose(opt) {
    AudioManager.playSFX(opt.is_trap ? 'sfx_danger' : 'sfx_action');
    if (opt.stat_changes) {
      Object.keys(opt.stat_changes).forEach(k => {
        const cfg = GAME_DATA.stats_config[k];
        const max = cfg ? cfg.max : 100;
        const before = state.stats[k] || 0;
        state.stats[k] = Math.max(0, Math.min(max, before + opt.stat_changes[k]));
        floatStat(k, state.stats[k] - before);
      });
      renderStats();
    }
    if (opt.unlocked_item_id && !state.inventory.includes(opt.unlocked_item_id)) {
      state.inventory.push(opt.unlocked_item_id);
      const it = getAllEpisodeItems().find(i => i.id === opt.unlocked_item_id);
      if (it) showToast('🎁 Didapat: <strong>' + it.emoji + ' ' + it.name + '</strong>', 'success');
    }
    if (opt.sets_flag) {
      if (typeof opt.sets_flag === 'string') state.flags[opt.sets_flag] = true;
      else Object.assign(state.flags, opt.sets_flag);
    }
    const ov = document.getElementById('dialogue-overlay');
    ov.querySelector('#dialogue-narrative').innerHTML = '<p class="dialogue-outcome">' + opt.outcome + '</p>';
    ov.querySelector('#dialogue-options').innerHTML = '';
    const cont = document.createElement('button');
    cont.className = 'dialogue-option dialogue-continue';
    cont.innerText = '→ Lanjutkan';
    cont.onclick = () => this.close();
    ov.querySelector('#dialogue-options').appendChild(cont);
  },

  close() {
    this.active = false;
    document.getElementById('dialogue-overlay').classList.remove('active');
    if (this.onComplete) this.onComplete();
    saveGame();
  }
};

// ============================================================
// EPISODE GATING
// ============================================================
function getUnlockedEpisodes() {
  try { return JSON.parse(localStorage.getItem('liga_petarung_unlocked_episodes') || '[]'); }
  catch (e) { return []; }
}
function isEpisodeUnlocked(epId) {
  if (!GAME_DATA.episodes || GAME_DATA.episodes.length === 0) return false;
  if (epId === GAME_DATA.episodes[0].id) return true;
  return getUnlockedEpisodes().includes(epId);
}
function unlockEpisode(epId) {
  const u = getUnlockedEpisodes();
  if (!u.includes(epId)) {
    u.push(epId);
    localStorage.setItem('liga_petarung_unlocked_episodes', JSON.stringify(u));
  }
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  AudioManager.init();
  applyThemeColors();
  renderTitleScreen();
  setupEventListeners();
});

function applyThemeColors() {
  if (GAME_DATA.theme_colors) {
    document.documentElement.style.setProperty('--bg-color', GAME_DATA.theme_colors.bg);
    document.documentElement.style.setProperty('--panel-color', GAME_DATA.theme_colors.panel);
    document.documentElement.style.setProperty('--accent-color', GAME_DATA.theme_colors.accent);
    document.documentElement.style.setProperty('--text-color', GAME_DATA.theme_colors.text);
  }
  document.getElementById('app-title').innerText = GAME_DATA.game_title || 'LIGA PETARUNG';
}

function renderTitleScreen() {
  const ep = document.getElementById('episode-list');
  ep.innerHTML = '';
  GAME_DATA.episodes.forEach((e, idx) => {
    const unlocked = isEpisodeUnlocked(e.id);
    const btn = document.createElement('button');
    btn.className = 'btn-main episode-btn';
    if (unlocked) {
      btn.innerHTML = e.title + '<br><small class="ep-synopsis">' + (e.synopsis || '') + '</small>';
      btn.onclick = () => startEpisode(e.id);
    } else {
      btn.disabled = true;
      btn.classList.add('episode-locked');
      const prev = GAME_DATA.episodes[idx - 1];
      btn.innerHTML = '🔒 ' + e.title + '<br><small class="ep-synopsis">Selesaikan "' + (prev ? prev.title.split(':')[0] : 'sebelumnya') + '" dulu</small>';
    }
    ep.appendChild(btn);
  });
  const sb = document.getElementById('btn-continue');
  const saved = localStorage.getItem('liga_petarung_save');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      if (s.currentEpisode) {
        sb.style.display = 'block';
        sb.innerHTML = 'Lanjutkan: ' + s.currentEpisode.title.split(':')[0];
        sb.onclick = () => loadGame();
      } else sb.style.display = 'none';
    } catch (e) { sb.style.display = 'none'; }
  } else sb.style.display = 'none';
}

function startEpisode(epId) {
  const e = GAME_DATA.episodes.find(x => x.id === epId);
  if (!e) return;
  state.currentEpisode = e;
  state.currentLocationId = e.start_location_id;
  state.inventory = [];
  state.unlockedLocations = [e.start_location_id];
  state.completedActions = [];
  state.flags = {};
  state.jurusMastery = {};
  state.selectedCraftItems = [];
  state.stats = defaultStats();
  switchScreen('game-screen');
  document.getElementById('episode-title').innerText = e.title.split(':')[0] || 'Episode';
  renderStats();
  renderLocation(state.currentLocationId);
  AudioManager.playBGM();
}

function advanceToNextEpisode(nextId) {
  const e = GAME_DATA.episodes.find(x => x.id === nextId);
  if (!e) { showToast('❌ Episode berikutnya belum tersedia.', 'error'); location.reload(); return; }
  unlockEpisode(nextId);
  state.currentEpisode = e;
  state.currentLocationId = e.start_location_id;
  state.stats.stat3 = Math.min(100, (state.stats.stat3 || 20) + 25);
  state.stats.stat1 = Math.min(100, (state.stats.stat1 || 100) + 20);
  if (!state.unlockedLocations.includes(e.start_location_id)) state.unlockedLocations.push(e.start_location_id);
  state.completedActions = [];
  saveGame();
  switchScreen('game-screen');
  document.getElementById('episode-title').innerText = e.title.split(':')[0] || 'Episode';
  renderStats();
  renderLocation(state.currentLocationId);
  AudioManager.playBGM();
}

function renderStats() {
  const c = document.getElementById('stats-container');
  c.innerHTML = '';
  Object.keys(GAME_DATA.stats_config).forEach(k => {
    const cfg = GAME_DATA.stats_config[k];
    const v = state.stats[k] !== undefined ? state.stats[k] : cfg.initial;
    const pct = Math.max(0, Math.min(100, (v / cfg.max) * 100));
    c.innerHTML += '<div class="stat-box"><div class="stat-label"><span>' + cfg.icon + ' ' + cfg.name + '</span><span>' + v + '</span></div><div class="bar-bg"><div class="bar-fill" style="width:' + pct + '%"></div></div></div>';
  });
}

function getNarrativeForLocation(loc) {
  if (loc.narrative_by_flags) {
    for (const f in loc.narrative_by_flags) if (state.flags[f]) return loc.narrative_by_flags[f];
  }
  return loc.narrative;
}

function renderLocation(locId) {
  saveGame();
  const loc = state.currentEpisode.locations.find(l => l.id === locId);
  if (!loc) return;
  state.currentLocationId = locId;
  document.getElementById('location-name').innerText = loc.name;
  const imgBox = document.getElementById('scene-visual');
  const imgEl = document.getElementById('scene-img');
  if (loc.image) {
    imgEl.src = loc.image;
    imgBox.style.display = 'block';
    imgEl.onerror = () => { imgBox.style.display = 'none'; };
  } else imgBox.style.display = 'none';
  startTypewriter(getNarrativeForLocation(loc), () => renderActions(loc.action_options, loc));
}

function goToLocation(locId, txt) {
  state.currentLocationId = locId;
  if (txt) showTransition(txt, () => renderLocation(locId));
  else renderLocation(locId);
}

function startTypewriter(text, cb) {
  const box = document.getElementById('narrative-box');
  const skip = document.getElementById('skip-btn');
  const list = document.getElementById('action-list');
  box.innerText = '';
  list.innerHTML = '';
  skip.style.display = 'block';
  state.isTypewriterActive = true;
  let i = 0;
  clearInterval(state.typewriterTimer);
  state.typewriterTimer = setInterval(() => {
    box.innerText += text.charAt(i);
    i++;
    if (i >= text.length) completeTypewriter(text, cb);
  }, 16);
  skip.onclick = () => completeTypewriter(text, cb);
}

function completeTypewriter(text, cb) {
  clearInterval(state.typewriterTimer);
  document.getElementById('narrative-box').innerText = text;
  document.getElementById('skip-btn').style.display = 'none';
  state.isTypewriterActive = false;
  if (cb) cb();
}

function renderActions(actions, location) {
  const list = document.getElementById('action-list');
  list.innerHTML = '';
  if (!actions && !location) return;
  const allItems = getAllEpisodeItems();
  const groups = { hub: { label: '🏠 Area Persiapan', actions: [] }, exploration: { label: '🔍 Area Eksplorasi', actions: [] }, arena: { label: '⚔️ Arena Pertarungan', actions: [] }, other: { label: '📋 Aksi', actions: [] } };

  if (actions) {
    actions.forEach(a => {
      if (a.once && state.completedActions.includes(a.action_id)) return;
      const c = a.category || 'other';
      if (groups[c]) groups[c].actions.push(a); else groups.other.actions.push(a);
    });
  }

  if (location && location.rest_available && location.category === 'hub') {
    const rid = 'auto_rest_' + location.id;
    if (!state.completedActions.includes(rid)) {
      groups.hub.actions.push({
        action_id: rid,
        description: '😴 Duduk bersila, atur napas dan pulihkan tubuh',
        category: 'hub',
        once: true,
        outcome: 'Kau menutup mata, menarik napas panjang, dan merasakan aliran Qi kembali mengisi tubuh.',
        stat_changes: { stat1: 15, stat2: 5 }
      });
    }
  }

  Object.keys(groups).forEach(c => {
    const g = groups[c];
    if (g.actions.length === 0) return;
    const h = document.createElement('div');
    h.className = 'action-group-header group-' + c;
    h.innerText = g.label;
    list.appendChild(h);
    g.actions.forEach(a => list.appendChild(createActionButton(a, allItems)));
  });
}

function createActionButton(act, allItems) {
  const btn = document.createElement('button');
  btn.className = 'btn-action';
  const missing = [];
  if (act.required_item_id && !state.inventory.includes(act.required_item_id)) {
    const it = allItems.find(i => i.id === act.required_item_id);
    missing.push('Butuh: ' + (it ? it.name : act.required_item_id));
  }
  if (act.required_stat) {
    Object.keys(act.required_stat).forEach(k => {
      if ((state.stats[k] || 0) < act.required_stat[k]) {
        const cfg = GAME_DATA.stats_config[k];
        missing.push(cfg.icon + ' ' + cfg.name + ' ≥ ' + act.required_stat[k]);
      }
    });
  }
  if (missing.length > 0) {
    btn.disabled = true;
    btn.classList.add('btn-action-disabled');
    btn.innerHTML = act.description + '<br><small class="req-hint">🔒 ' + missing.join(' • ') + '</small>';
  } else {
    if (act.combat) { btn.innerHTML = '⚔️ ' + act.description; btn.classList.add('btn-action-combat'); }
    else if (act.dialogue) { btn.innerHTML = '💬 ' + act.description; btn.classList.add('btn-action-dialogue'); }
    else btn.innerText = act.description;
    btn.onclick = () => executeAction(act);
  }
  return btn;
}

function executeAction(act) {
  AudioManager.playSFX('sfx_action');
  if (act.once && !state.completedActions.includes(act.action_id)) state.completedActions.push(act.action_id);
  if (act.sets_flag) {
    if (typeof act.sets_flag === 'string') state.flags[act.sets_flag] = true;
    else Object.assign(state.flags, act.sets_flag);
  }
  if (act.stat_changes) {
    Object.keys(act.stat_changes).forEach(k => {
      const cfg = GAME_DATA.stats_config[k];
      const max = cfg ? cfg.max : 100;
      const before = state.stats[k] || 0;
      state.stats[k] = Math.max(0, Math.min(max, before + act.stat_changes[k]));
      floatStat(k, state.stats[k] - before);
      if (act.stat_changes[k] < 0 && navigator.vibrate) navigator.vibrate(150);
    });
    renderStats();
  }
  if (act.unlocked_item_id && !state.inventory.includes(act.unlocked_item_id)) {
    state.inventory.push(act.unlocked_item_id);
    const it = getAllEpisodeItems().find(i => i.id === act.unlocked_item_id);
    if (it) showToast('🎁 Didapat: <strong>' + it.emoji + ' ' + it.name + '</strong>', 'success');
  }
  if (act.unlocked_item_ids) {
    act.unlocked_item_ids.forEach(id => {
      if (!state.inventory.includes(id)) {
        state.inventory.push(id);
        const it = getAllEpisodeItems().find(i => i.id === id);
        if (it) showToast('🎁 Didapat: <strong>' + it.emoji + ' ' + it.name + '</strong>', 'success');
      }
    });
  }
  if (act.unlock_jurus_id && !state.jurusMastery[act.unlock_jurus_id]) {
    state.jurusMastery[act.unlock_jurus_id] = 0;
    showToast('📜 Jurus baru: <strong>' + act.unlock_jurus_id + '</strong>', 'success');
  }
  if (act.unlock_location_id && !state.unlockedLocations.includes(act.unlock_location_id)) state.unlockedLocations.push(act.unlock_location_id);

  if (checkEndingTriggers(act)) return;

  if (act.combat) {
    CombatSystem.start(act.combat, act.action_id);
    return;
  }
  if (act.dialogue) {
    DialogueSystem.start(act.dialogue, () => {
      if (act.next_location_id) goToLocation(act.next_location_id, act.transition_text);
      else if (act.outcome) startTypewriter(act.outcome, () => renderLocation(state.currentLocationId));
      else renderLocation(state.currentLocationId);
    });
    return;
  }
  if (act.next_location_id) { goToLocation(act.next_location_id, act.transition_text); return; }
  if (act.outcome) startTypewriter(act.outcome, () => renderLocation(state.currentLocationId));
  else renderLocation(state.currentLocationId);
}

function checkEndingTriggers(act) {
  let end = null;
  if (act.trigger_ending_id && state.currentEpisode.endings) end = state.currentEpisode.endings[act.trigger_ending_id];
  else if (state.stats.stat1 <= 0 || state.stats.stat2 <= 0) {
    end = (state.currentEpisode.endings && state.currentEpisode.endings['stat_zero_ending']) || { title: 'BAD ENDING: Keterpurukan Fisik & Cedera', narrative: 'Stamina atau Ketenangan Batin habis total. Kau ambruk.' };
  } else if (state.stats.stat3 <= 0) {
    end = (state.currentEpisode.endings && state.currentEpisode.endings['stat3_zero_ending']) || { title: 'BAD ENDING: Reputasi Hancur', narrative: 'Reputasi menyentuh 0%. Kau dikeluarkan dari liga.' };
  }
  if (end) { showEnding(end); return true; }
  return false;
}

function showEnding(end) {
  switchScreen('ending-screen');
  document.getElementById('ending-title').innerText = end.title;
  document.getElementById('ending-desc').innerText = end.narrative;
  const screen = document.getElementById('ending-screen');
  let nb = document.getElementById('btn-next-ep');
  if (end.next_episode_id) {
    if (!nb) {
      nb = document.createElement('button');
      nb.id = 'btn-next-ep';
      nb.className = 'btn-main';
      nb.style.marginTop = '12px';
      nb.style.backgroundColor = '#16a34a';
      screen.appendChild(nb);
    }
    nb.style.display = 'block';
    nb.innerText = 'Lanjut ke Episode Berikutnya ➡️';
    nb.onclick = () => advanceToNextEpisode(end.next_episode_id);
  } else if (nb) nb.style.display = 'none';
  localStorage.removeItem('liga_petarung_save');
}

function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (tab === 'inventory') { document.getElementById('inventory-panel').classList.add('active'); renderInventory(); }
      else if (tab === 'crafting') { document.getElementById('crafting-panel').classList.add('active'); renderCraftingPanel(); }
      else document.getElementById('main-content').style.display = 'flex';
    };
  });
  document.getElementById('btn-execute-craft').onclick = executeCrafting;
  document.getElementById('btn-restart').onclick = () => location.reload();
  document.getElementById('audio-toggle').onclick = () => {
    state.isAudioMuted = !state.isAudioMuted;
    document.getElementById('audio-toggle').innerText = state.isAudioMuted ? '🔇' : '🔊';
    if (!state.isAudioMuted) AudioManager.playBGM();
  };
}

function getAllEpisodeItems() {
  const all = [];
  if (GAME_DATA.episodes) {
    GAME_DATA.episodes.forEach(ep => {
      if (ep.items) ep.items.forEach(it => {
        if (!all.some(x => x.id === it.id)) all.push(it);
      });
    });
  }
  return all;
}

function renderInventory() {
  const c = document.getElementById('inventory-list');
  c.innerHTML = '';
  const all = getAllEpisodeItems();
  if (state.inventory.length === 0) { c.innerHTML = '<p style="grid-column:span 2;font-size:0.85rem;opacity:0.6;text-align:center;">Tas kosong.</p>'; return; }
  state.inventory.forEach(id => {
    const it = all.find(i => i.id === id);
    if (it) {
      const cat = it.category ? '[' + it.category.toUpperCase() + ']' : '';
      c.innerHTML += '<div class="item-card"><strong>' + (it.emoji || '📦') + ' ' + it.name + '</strong>' + (cat ? '<div class="item-category">' + cat + '</div>' : '') + '<p style="font-size:0.75rem;margin-top:4px;opacity:0.8;">' + it.description + '</p></div>';
    }
  });
}

function renderCraftingPanel() {
  const c = document.getElementById('craft-inventory-list');
  c.innerHTML = '';
  state.selectedCraftItems = [];
  const all = getAllEpisodeItems();
  if (state.inventory.length === 0) { c.innerHTML = '<p style="grid-column:span 2;font-size:0.85rem;opacity:0.6;text-align:center;">Belum ada item untuk dirakit.</p>'; return; }
  state.inventory.forEach(id => {
    const it = all.find(i => i.id === id);
    if (it) {
      const card = document.createElement('div');
      card.className = 'item-card';
      const cat = it.category ? '[' + it.category.toUpperCase() + ']' : '';
      card.innerHTML = '<strong>' + (it.emoji || '📦') + ' ' + it.name + '</strong>' + (cat ? '<div class="item-category">' + cat + '</div>' : '');
      card.onclick = () => {
        if (state.selectedCraftItems.includes(id)) {
          state.selectedCraftItems = state.selectedCraftItems.filter(x => x !== id);
          card.classList.remove('selected');
        } else if (state.selectedCraftItems.length < 3) {
          state.selectedCraftItems.push(id);
          card.classList.add('selected');
        }
      };
      c.appendChild(card);
    }
  });
}

function executeCrafting() {
  const allRecipes = [];
  GAME_DATA.episodes.forEach(ep => { if (ep.recipes) allRecipes = allRecipes.concat(ep.recipes); });
  const selected = state.selectedCraftItems.map(id => getAllEpisodeItems().find(i => i.id === id)).filter(Boolean);
  const catCount = {};
  selected.forEach(it => { if (it.category) catCount[it.category] = (catCount[it.category] || 0) + 1; });

  // Prioritas 1: specific_item_ids (paling spesifik)
  let match = allRecipes.find(r => r.required_item_ids && r.required_item_ids.length === state.selectedCraftItems.length && r.required_item_ids.every(id => state.selectedCraftItems.includes(id)));
  // Prioritas 2: required_categories
  if (!match) {
    match = allRecipes.find(r => {
      if (!r.required_categories) return false;
      const rk = Object.keys(r.required_categories);
      const sk = Object.keys(catCount);
      if (rk.length !== sk.length) return false;
      return rk.every(k => r.required_categories[k] === catCount[k]);
    });
  }

  if (match) {
    AudioManager.playSFX('sfx_action');
    if (match.required_item_ids) {
      match.required_item_ids.forEach(id => { const i = state.inventory.indexOf(id); if (i > -1) state.inventory.splice(i, 1); });
    } else {
      state.selectedCraftItems.forEach(id => { const i = state.inventory.indexOf(id); if (i > -1) state.inventory.splice(i, 1); });
    }
    showToast('✅ <strong>' + match.result_item_name + '</strong><br><small>' + match.description + '</small>', 'success', 3800);
    if (match.reward_stat_changes) {
      Object.keys(match.reward_stat_changes).forEach(k => {
        const cfg = GAME_DATA.stats_config[k];
        const max = cfg ? cfg.max : 100;
        const before = state.stats[k] || 0;
        state.stats[k] = Math.min(max, before + match.reward_stat_changes[k]);
        floatStat(k, state.stats[k] - before);
      });
      renderStats();
    }
    state.selectedCraftItems = [];
    renderCraftingPanel();
    const loc = state.currentEpisode.locations.find(l => l.id === state.currentLocationId);
    if (loc) renderActions(loc.action_options, loc);
    saveGame();
  } else {
    AudioManager.playSFX('sfx_danger');
    showToast('❌ <strong>GAGAL DIRAKIT</strong><br>Kombinasi tidak cocok. Perhatikan kategori item.', 'error', 3200);
  }
}

function saveGame() {
  if (CombatSystem.active || DialogueSystem.active) return;
  localStorage.setItem('liga_petarung_save', JSON.stringify(state));
}

function loadGame() {
  const saved = localStorage.getItem('liga_petarung_save');
  if (!saved) return;
  let parsed;
  try { parsed = JSON.parse(saved); }
  catch (e) { showToast('⚠️ Save corrupt, mulai baru.', 'error'); localStorage.removeItem('liga_petarung_save'); location.reload(); return; }

  // Migration v4 -> v5
  if (!parsed._saveVersion || parsed._saveVersion < 5) {
    parsed.jurusMastery = parsed.jurusMastery || {};
    parsed.unlockedEpisodes = parsed.unlockedEpisodes || getUnlockedEpisodes();
    parsed._saveVersion = 5;
  }
  state = parsed;
  if (!state.completedActions) state.completedActions = [];
  if (!state.selectedCraftItems) state.selectedCraftItems = [];
  if (!state.flags) state.flags = {};
  if (!state.unlockedLocations) state.unlockedLocations = [];
  if (!state.jurusMastery) state.jurusMastery = {};
  switchScreen('game-screen');
  if (state.currentEpisode) document.getElementById('episode-title').innerText = state.currentEpisode.title.split(':')[0] || 'Episode';
  renderStats();
  renderLocation(state.currentLocationId);
  AudioManager.playBGM();
}

function switchScreen(sid) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(sid).classList.add('active');
}