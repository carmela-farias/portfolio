/* ---------------------------------------------------------------
   Barranca — live token editing and the layer build sequence.

   The build sequence is not a simulation. It disables the real
   stylesheets and re-enables them in cascade order, so what you
   watch is this page's actual architecture assembling itself.
   --------------------------------------------------------------- */
(function () {
  "use strict";

  var root   = document.documentElement;
  var sheets = Array.prototype.slice.call(
                 document.querySelectorAll('link[data-layer]'));
  var chips  = Array.prototype.slice.call(
                 document.querySelectorAll('.layer'));
  var calm   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function out(id, value) {
    var el = document.getElementById(id);
    if (el) { el.textContent = value; }
  }

  /* ---------- accent ---------- */
  document.querySelectorAll(".sw").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.dataset.accent;
      root.style.setProperty("--accent", "var(--" + name + ")");
      document.querySelectorAll(".sw").forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === btn));
      });
      out("o-accent", "var(--" + name + ")");
      out("n-accent", name);
    });
  });

  /* ---------- radius ---------- */
  var radius = document.getElementById("r-radius");
  radius.addEventListener("input", function () {
    var value = radius.value + "px";
    root.style.setProperty("--radius", value);
    out("o-radius", value);
    out("n-radius", value);
  });

  /* ---------- type scale ---------- */
  var scale = document.getElementById("r-scale");
  scale.addEventListener("input", function () {
    var ratio = parseFloat(scale.value);
    root.style.setProperty("--scale",  ratio.toFixed(2));
    root.style.setProperty("--step-1", ratio.toFixed(2));
    root.style.setProperty("--step-5", Math.pow(ratio, 5).toFixed(3));
    out("o-scale", ratio.toFixed(2));
    out("n-scale", ratio.toFixed(2));
  });

  /* ---------- spacing unit ---------- */
  document.querySelectorAll(".seg button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.dataset.unit + "px";
      root.style.setProperty("--unit", value);
      document.querySelectorAll(".seg button").forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === btn));
      });
      out("o-unit", value);
      out("n-unit", value);
    });
  });

  /* ---------- the build sequence ---------- */
  var timers = [];
  var STEP   = 420;

  function finish() {
    timers.forEach(clearTimeout);
    timers = [];
    sheets.forEach(function (s) { s.disabled = false; });
    chips.forEach(function (c) { c.classList.add("on"); });
  }

  document.getElementById("replay").addEventListener("click", function () {
    finish();
    if (calm) { return; }

    sheets.forEach(function (s) { s.disabled = true; });
    chips.forEach(function (c) { c.classList.remove("on"); });

    sheets.forEach(function (sheet, i) {
      timers.push(setTimeout(function () {
        sheet.disabled = false;
        var chip = chips[i];
        if (chip) { chip.classList.add("on"); }
      }, (i + 1) * STEP));
    });

    timers.push(setTimeout(finish, (sheets.length + 1) * STEP));
  });

  chips.forEach(function (c) { c.classList.add("on"); });
}());
