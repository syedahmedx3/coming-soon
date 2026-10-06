(function () {
  "use strict";
  var $ = function (id) {
    return document.getElementById(id);
  };
  var svg = $("crane"),
    stage = $("stage"),
    stat = $("static"),
    building = $("building"),
    trolley = $("trolley"),
    cable = $("cable"),
    hook = $("hook"),
    load = $("load"),
    carry = $("carry");

  /* ---- Geometry (SVG units). G = ground line, recalculated so the crane fills the screen ---- */
  var W = 520,
    G = 390,
    BH = 18,
    BW = 36,
    PILE_X = 70,
    TRAVEL = 112,
    HOOK_TO_BOTTOM = 30;
  var COLS = [149, 187, 225],
    ROWS = 4;
  function rowsFor(g) {
    return Math.max(3, Math.min(9, Math.floor((g - 150) / 40)));
  }

  function staticParts(G) {
    var mast = [],
      jib = [],
      cj = [],
      k;
    for (k = 0; 68 + k * 12 <= G; k++)
      mast.push((k % 2 ? 372 : 360) + "," + (68 + k * 12));
    for (k = 0; k < 27; k++) jib.push(360 - k * 12 + "," + (k % 2 ? 68 : 60));
    for (k = 0; k < 11; k++) cj.push(372 + k * 11 + "," + (k % 2 ? 68 : 60));
    return (
      '<path class="l" d="M360 60 V' +
      G +
      " M372 60 V" +
      G +
      '"/>' +
      '<polyline class="t" points="' +
      mast.join(" ") +
      '"/>' +
      '<path class="l" d="M360 60 L366 28 L372 60"/>' +
      '<path class="t" d="M366 28 L120 60 M366 28 L478 60"/>' +
      '<path class="l" d="M372 60 H38 L42 68 H360"/><polyline class="t" points="' +
      jib.join(" ") +
      '"/>' +
      '<path class="l" d="M372 60 H482 V68 H372"/><polyline class="t" points="' +
      cj.join(" ") +
      '"/>' +
      '<rect class="f" x="456" y="68" width="24" height="18" rx="2"/>' +
      '<rect x="372" y="69" width="16" height="13" rx="2" fill="rgba(50,50,123,.12)" stroke="#32327B" stroke-width=".9"/>' +
      '<rect class="f" x="350" y="' +
      (G - 4) +
      '" width="32" height="4" rx="1" opacity=".6"/>' +
      '<rect class="f" x="52" y="' +
      (G - 18) +
      '" width="36" height="18" rx="1.5" opacity=".85"/>' +
      '<rect class="f" x="52" y="' +
      (G - 36) +
      '" width="36" height="18" rx="1.5" opacity=".7"/>'
    );
  }

  function blockMarkup(i) {
    var x = COLS[i % 3],
      yb = G - Math.floor(i / 3) * BH;
    return (
      '<g class="placed"><rect class="f" x="' +
      (x - BW / 2 + 1) +
      '" y="' +
      (yb - BH) +
      '" width="' +
      (BW - 2) +
      '" height="' +
      BH +
      '" rx="1.5"/>' +
      '<path class="seam" d="M' +
      (x - 6) +
      " " +
      (yb - BH) +
      " V" +
      yb +
      " M" +
      (x + 6) +
      " " +
      (yb - BH) +
      " V" +
      yb +
      '"/></g>'
    );
  }

  /* ---- State ---- */
  var slot = 0,
    x = PILE_X,
    bottom = G - 36,
    swing = 0,
    loaded = true;
  var queue = [],
    cur = null,
    t0 = 0,
    bottomG = true;

  function fit() {
    var r = stage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var g = Math.round((W * r.height) / r.width);
    g = Math.max(250, Math.min(g, 820));
    if (g === G && stat.firstChild) return;
    var dy = g - G;
    G = g;
    svg.setAttribute("viewBox", "0 0 " + W + " " + G);
    stat.innerHTML = staticParts(G);
    var html = "";
    for (var i = 0; i < slot; i++) html += blockMarkup(i);
    building.innerHTML = html;
    /* keep ground-relative targets on the ground; travel height stays put */
    queue.forEach(function (s) {
      if (s.g) s.to += dy;
    });
    if (cur && cur.type === "move" && cur.prop === "bottom") {
      if (cur.g) cur.to += dy;
      if (cur.fromG) cur.from += dy;
      bottom = cur.from + (cur.to - cur.from) * (cur.e || 0);
    } else if (bottomG) {
      bottom += dy;
    }
    if (slot > rowsFor(G) * 3) {
      slot = 0;
      building.innerHTML = "";
    }
    ROWS = rowsFor(G);
    draw();
  }

  /* Only touch the DOM when a value actually changed (most frames during
     waits change nothing), which keeps style/paint work to a minimum. */
  var last = { x: "", hy: "", sw: "", ld: null };
  function draw() {
    var xs = x.toFixed(1),
      hy = (bottom - HOOK_TO_BOTTOM).toFixed(1),
      sw = Math.abs(swing) < 0.01 ? "0" : swing.toFixed(2);
    if (xs !== last.x) {
      trolley.setAttribute("transform", "translate(" + xs + " 0)");
      last.x = xs;
    }
    if (hy !== last.hy) {
      cable.setAttribute("y2", hy);
      hook.setAttribute("transform", "translate(0 " + hy + ")");
      last.hy = hy;
    }
    if (sw !== last.sw) {
      load.setAttribute("transform", "rotate(" + sw + ")");
      last.sw = sw;
    }
    if (loaded !== last.ld) {
      carry.style.opacity = loaded ? 1 : 0;
      last.ld = loaded;
    }
  }

  /* Refit when the stage box changes size (resize, rotation, font swap). */
  function watchSize() {
    var pending = 0;
    function schedule() {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = 0;
        fit();
      });
    }
    if ("ResizeObserver" in window) new ResizeObserver(schedule).observe(stage);
    else window.addEventListener("resize", schedule, { passive: true });
  }

  /* Static fallback if motion is reduced: a half-built site */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  fit();
  ROWS = rowsFor(G);
  if (reduced) {
    slot = 7;
    x = 187;
    bottom = 150;
    loaded = true;
    var h = "";
    for (var i = 0; i < slot; i++) h += blockMarkup(i);
    building.innerHTML = h;
    draw();
    watchSize();
    return;
  }

  function target() {
    return { x: COLS[slot % 3], bottom: G - Math.floor(slot / 3) * BH };
  }
  function move(prop, to, ms, g) {
    queue.push({ type: "move", prop: prop, to: to, ms: ms, g: !!g });
  }
  function wait(ms, fn) {
    queue.push({ type: "wait", ms: ms, fn: fn });
  }

  function cycle() {
    var tg = target();
    move("bottom", TRAVEL, 1600);
    move("x", tg.x, 2200);
    move("bottom", tg.bottom, 1700, true);
    wait(350, place);
    move("bottom", TRAVEL, 1400);
    move("x", PILE_X, 2200);
    move("bottom", G - 36, 1600, true);
    wait(450, function () {
      loaded = true;
    });
    wait(0, next);
  }

  function place() {
    building.insertAdjacentHTML("beforeend", blockMarkup(slot));
    loaded = false;
    slot++;
  }

  function next() {
    if (slot >= COLS.length * ROWS) {
      wait(2600, function () {
        building.classList.add("clear");
      });
      wait(900, function () {
        building.innerHTML = "";
        building.classList.remove("clear");
        slot = 0;
        ROWS = rowsFor(G);
      });
    }
    cycle();
  }

  function ease(p) {
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }

  function frame(now) {
    if (!cur) {
      cur = queue.shift();
      if (!cur) {
        cycle();
        cur = queue.shift();
      }
      cur.from = cur.type === "move" ? (cur.prop === "x" ? x : bottom) : 0;
      cur.fromG = bottomG;
      t0 = now;
    }
    var p = cur.ms ? Math.min(1, (now - t0) / cur.ms) : 1;
    if (cur.type === "move") {
      cur.e = ease(p);
      var v = cur.from + (cur.to - cur.from) * cur.e;
      if (cur.prop === "x") {
        x = v;
        var dir = cur.to > cur.from ? 1 : -1;
        swing = -dir * 4 * Math.sin(p * Math.PI * 2) * (1 - p * 0.6);
      } else {
        bottom = v;
        swing *= 0.9;
      }
    } else {
      swing *= 0.9;
    }
    draw();
    if (p >= 1) {
      if (cur.type === "move" && cur.prop === "bottom") bottomG = cur.g;
      if (cur.type === "wait" && cur.fn) cur.fn();
      cur = null;
    }
    requestAnimationFrame(frame);
  }

  /* Browsers pause rAF in background tabs; shift the step clock on return so
     the crane resumes where it left off instead of jumping ahead. */
  var hiddenAt = 0;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) hiddenAt = performance.now();
    else if (hiddenAt) {
      t0 += performance.now() - hiddenAt;
      hiddenAt = 0;
    }
  });

  watchSize();
  requestAnimationFrame(frame);
})();
