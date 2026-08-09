/**
 * Anti-Cheat & Proctoring Security Module
 * Enforces browser locks, context restrictions, tab switch detection, and fullscreen enforcement.
 */

const AntiCheat = (function () {
  let isExamActive = false;
  let strikeCount = 0;
  const maxStrikes = 3;
  let onViolationCallback = null;
  let onAutoSubmitCallback = null;
  let lastBlurTime = 0;

  function init(options = {}) {
    onViolationCallback = options.onViolation || null;
    onAutoSubmitCallback = options.onAutoSubmit || null;

    attachDOMProtection();
    attachKeyboardProtection();
    attachTabSwitchDetection();
    attachFullscreenDetection();
  }

  function startExam() {
    isExamActive = true;
    strikeCount = 0;
    requestFullscreen();
  }

  function stopExam() {
    isExamActive = false;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function attachDOMProtection() {
    // Disable right click / context menu quietly
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });

    // Disable copy, cut, paste quietly
    ["copy", "cut", "paste"].forEach((eventType) => {
      document.addEventListener(eventType, function (e) {
        if (isExamActive) {
          e.preventDefault();
          return false;
        }
      });
    });

    // Disable text selection & drag quietly
    ["selectstart", "dragstart"].forEach((eventType) => {
      document.addEventListener(eventType, function (e) {
        if (isExamActive) {
          e.preventDefault();
          return false;
        }
      });
    });
  }

  function attachKeyboardProtection() {
    document.addEventListener("keydown", function (e) {
      if (!isExamActive) return;

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      // Intercept dev tools and copy/paste/save/print shortcuts quietly
      if (
        (ctrlOrCmd && ["c", "v", "x", "a", "u", "s", "p"].includes(key)) ||
        e.key === "F12" ||
        (ctrlOrCmd && e.shiftKey && ["i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }

  function attachTabSwitchDetection() {
    document.addEventListener("visibilitychange", function () {
      if (!isExamActive) return;

      if (document.hidden) {
        registerStrike("Tab switch or browser minimize detected");
      }
    });

    window.addEventListener("blur", function () {
      if (!isExamActive) return;
      
      const now = Date.now();
      // Debounce window blur within 1 second of visibility change
      if (now - lastBlurTime > 1000 && !document.hidden) {
        lastBlurTime = now;
        registerStrike("Window lost focus");
      }
    });
  }

  function attachFullscreenDetection() {
    document.addEventListener("fullscreenchange", function () {
      if (!isExamActive) return;
      // Screen stays open and unlocked when exiting fullscreen
    });
  }

  function registerStrike(reason) {
    if (!isExamActive) return;
    strikeCount++;

    if (onViolationCallback) {
      onViolationCallback({ strikeCount, maxStrikes, reason });
    }
    // Strikes are tracked silently in the background without popups or forced auto-submission.
  }

  function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }

  function showToast(message) {
    const toast = document.getElementById("anti-cheat-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function showViolationModal(strikes, max, reason) {
    const modal = document.getElementById("strike-modal");
    const text = document.getElementById("strike-reason-text");
    const count = document.getElementById("strike-count-display");
    if (modal && text && count) {
      text.textContent = reason;
      count.textContent = `${strikes} / ${max}`;
      modal.classList.add("active");
    }
  }

  function hideViolationModal() {
    const modal = document.getElementById("strike-modal");
    if (modal) modal.classList.remove("active");
  }

  function showFullscreenWarning() {
    const fsModal = document.getElementById("fullscreen-modal");
    if (fsModal) fsModal.classList.add("active");
  }

  function hideFullscreenWarning() {
    const fsModal = document.getElementById("fullscreen-modal");
    if (fsModal) fsModal.classList.remove("active");
  }

  return {
    init,
    startExam,
    stopExam,
    requestFullscreen,
    hideViolationModal,
    hideFullscreenWarning,
    getStrikes: () => strikeCount
  };
})();
