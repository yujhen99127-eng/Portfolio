/* 設計系統頁的點擊示範（原生 JavaScript）。
   05：分頁標籤、日曆選日；06：送出狀態、收藏、開關、核取、數字跳動、收合、分頁。 */
(function () {
  var ACCENT = '#2F5BEA', INK = '#16181D';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- 05 分頁標籤（底線樣式） ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var ind = $('[data-m="ind"]', list);
    if (ind) return; // 06 的滑動分頁另外處理
    var panel = list.parentElement.querySelector('[role="tabpanel"]');
    var bodies = ['概覽：專案背景、目標使用者與設計目標。', '研究：訪談、問卷與競品分析的關鍵洞察。', '設計：流程圖、線框稿到高保真介面的演進。', '成果：上線後的數據與使用者回饋。'];
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o, j) {
          var on = i === j;
          o.setAttribute('aria-selected', on ? 'true' : 'false');
          o.style.borderBottomColor = on ? INK : 'transparent';
          o.style.color = on ? INK : '#5B5F68';
          o.style.fontWeight = on ? 600 : 400;
        });
        if (panel) panel.textContent = bodies[i];
      });
    });
  });

  /* ---------- 05 日曆 ---------- */
  var days = $$('button[aria-pressed][aria-label*="月"]');
  if (days.length) {
    var TODAY = 12, EVENTS = [18, 25];
    var field = $('#date-field'), label = $('[data-date-label]');
    function paint(sel) {
      days.forEach(function (b) {
        var m = b.getAttribute('aria-label').match(/(\d+) 月 (\d+) 日/);
        var inMonth = m[1] === '11', n = +m[2];
        var isSel = inMonth && n === sel, isToday = inMonth && n === TODAY;
        b.setAttribute('aria-pressed', isSel ? 'true' : 'false');
        b.style.background = isSel ? INK : 'transparent';
        b.style.color = isSel ? '#FFFFFF' : (inMonth ? (isToday ? ACCENT : INK) : '#A3A6AD');
        b.style.borderColor = isToday && !isSel ? ACCENT : 'transparent';
        b.style.fontWeight = isSel || isToday ? 600 : 400;
        var dot = b.querySelector('span[aria-hidden]');
        if (dot) dot.style.background = inMonth && EVENTS.indexOf(n) > -1 ? (isSel ? '#FFFFFF' : '#E0603A') : 'transparent';
      });
      var text = '2026 / 11 / ' + String(sel).padStart(2, '0');
      if (field) field.value = text;
      if (label) label.textContent = text + ' 可預約時段';
    }
    days.forEach(function (b) {
      b.addEventListener('click', function () {
        var m = b.getAttribute('aria-label').match(/(\d+) 月 (\d+) 日/);
        if (m[1] === '11') paint(+m[2]);
      });
    });
  }

  /* ---------- 06 送出狀態 ---------- */
  var submit = $('button[aria-live="polite"]');
  if (submit) {
    var SPIN = '<svg data-m="spin" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"></path></svg>';
    var CHECK = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';
    var state = 'idle';
    function setSubmit(s) {
      state = s;
      submit.innerHTML = s === 'loading' ? SPIN + '處理中' : (s === 'done' ? CHECK + '已送出' : '送出表單');
      submit.style.background = s === 'done' ? '#1F8A55' : INK;
    }
    submit.addEventListener('click', function () {
      if (state !== 'idle') return;
      setSubmit('loading');
      setTimeout(function () { setSubmit('done'); setTimeout(function () { setSubmit('idle'); }, 1600); }, 1200);
    });
  }

  /* ---------- 06 收藏 ---------- */
  var heart = $('[data-m="heart"]');
  if (heart) heart.addEventListener('click', function () {
    var on = heart.getAttribute('data-on') !== 'true';
    heart.setAttribute('data-on', on ? 'true' : 'false');
    heart.setAttribute('aria-pressed', on ? 'true' : 'false');
    heart.style.background = on ? '#FDECEC' : '#FFFFFF';
    heart.style.borderColor = on ? '#F3B4B4' : '#D6D6D0';
    var svg = heart.querySelector('svg');
    svg.setAttribute('fill', on ? '#E0484D' : 'none');
    svg.setAttribute('stroke', on ? '#E0484D' : INK);
  });

  /* ---------- 06 開關 ---------- */
  var sw = $('[role="switch"]');
  if (sw) sw.addEventListener('click', function () {
    var on = sw.getAttribute('aria-checked') !== 'true';
    sw.setAttribute('aria-checked', on ? 'true' : 'false');
    sw.style.background = on ? ACCENT : '#C9CBD1';
    $('[data-m="knob"]', sw).style.transform = 'translateX(' + (on ? 24 : 0) + 'px)';
  });

  /* ---------- 06 核取方塊 ---------- */
  var ck = $('[role="checkbox"]');
  if (ck) ck.addEventListener('click', function () {
    var on = ck.getAttribute('aria-checked') !== 'true';
    ck.setAttribute('aria-checked', on ? 'true' : 'false');
    var box = $('[data-m="track"]', ck);
    box.style.background = on ? ACCENT : '#FFFFFF';
    box.style.borderColor = on ? ACCENT : '#8A8E98';
    $('[data-m="check"] path', ck).style.strokeDashoffset = on ? 0 : 24;
  });

  /* ---------- 06 數字跳動 ---------- */
  var nums = $$('[data-count]');
  var replay = $('[data-replay]');
  if (nums.length && replay) {
    var raf;
    function play() {
      cancelAnimationFrame(raf);
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var t0 = performance.now(), dur = reduce ? 1 : 900;
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        nums.forEach(function (el) {
          var v = parseFloat(el.getAttribute('data-count')), dec = +(el.getAttribute('data-dec') || 0);
          el.textContent = (dec ? (v * e).toFixed(dec) : Math.round(v * e)) + (el.getAttribute('data-suffix') || '');
        });
        if (p < 1) raf = requestAnimationFrame(tick);
      })(t0);
    }
    replay.addEventListener('click', play);
  }

  /* ---------- 06 收合說明（一次只開一個） ---------- */
  var accBtns = $$('button[aria-expanded]');
  accBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      accBtns.forEach(function (b) {
        var on = b === btn && open;
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
        $('[data-m="chev"]', b).style.transform = 'rotate(' + (on ? 180 : 0) + 'deg)';
        b.nextElementSibling.style.gridTemplateRows = on ? '1fr' : '0fr';
      });
    });
  });

  /* ---------- 06 分頁切換（滑動指示塊） ---------- */
  var ind = $('[data-m="ind"]');
  if (ind) {
    var list = ind.parentElement, tabs = $$('[role="tab"]', list), body = $('[data-m="reveal"]');
    var texts = ['背景：專案目標、我的角色與團隊。', '研究：訪談、人物誌與旅程地圖的洞察。', '設計：流程、Wireframe 到高保真介面。', '成果：上線後的數據與下一步。'];
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o, j) {
          var on = i === j;
          o.setAttribute('aria-selected', on ? 'true' : 'false');
          o.style.color = on ? INK : '#5B5F68';
          o.style.fontWeight = on ? 600 : 500;
        });
        ind.style.transform = 'translateX(' + i * 100 + '%)';
        if (body) { body.textContent = texts[i]; body.setAttribute('data-k', 'k' + i); }
      });
    });
  }
})();
