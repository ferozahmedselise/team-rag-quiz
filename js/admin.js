/**
 * Admin Panel Dashboard Controller
 * Manages admin authentication, results retrieval, metrics calculation, filtering, modal details, JSON & CSV export, and record deletion.
 */

document.addEventListener("DOMContentLoaded", () => {
  const ADMIN_KEY_STORAGE = "quiz_admin_authenticated";
  let activeResults = [];
  let currentAdminKey = "";

  const elements = {
    loginCard: document.getElementById("admin-login-card"),
    loginForm: document.getElementById("admin-login-form"),
    adminPassword: document.getElementById("admin-password"),
    loginErrorMsg: document.getElementById("login-error-msg"),
    logoutBtn: document.getElementById("admin-logout-btn"),
    dashboard: document.getElementById("admin-dashboard"),
    
    // Metrics
    metricTotal: document.getElementById("metric-total"),
    metricPassed: document.getElementById("metric-passed"),
    metricRate: document.getElementById("metric-rate"),
    metricStrikes: document.getElementById("metric-strikes"),

    // Filters & Buttons
    searchInput: document.getElementById("search-input"),
    filterStatus: document.getElementById("filter-status"),
    exportJsonBtn: document.getElementById("export-json-btn"),
    exportCsvBtn: document.getElementById("export-csv-btn"),
    clearAllBtn: document.getElementById("clear-all-btn"),

    // Table
    tableBody: document.getElementById("results-table-body"),
    noResultsMsg: document.getElementById("no-results-msg"),

    // Modal
    detailModal: document.getElementById("detail-modal"),
    detailModalTitle: document.getElementById("detail-candidate-title"),
    detailModalBody: document.getElementById("detail-modal-body"),
    detailModalClose: document.getElementById("detail-modal-close")
  };

  // Check existing session
  const savedKey = sessionStorage.getItem(ADMIN_KEY_STORAGE);
  if (savedKey) {
    currentAdminKey = savedKey;
    showDashboard();
  }

  // Login handler
  if (elements.loginForm) {
    elements.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = elements.adminPassword.value.trim();
      verifyAdminKey(entered);
    });
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      currentAdminKey = "";
      elements.dashboard.classList.add("hidden");
      elements.logoutBtn.classList.add("hidden");
      elements.loginCard.classList.remove("hidden");
    });
  }

  // Filter & Search events
  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", applyFilters);
  }
  if (elements.filterStatus) {
    elements.filterStatus.addEventListener("change", applyFilters);
  }

  if (elements.exportJsonBtn) {
    elements.exportJsonBtn.addEventListener("click", exportToJSON);
  }
  if (elements.exportCsvBtn) {
    elements.exportCsvBtn.addEventListener("click", exportToCSV);
  }

  if (elements.clearAllBtn) {
    elements.clearAllBtn.addEventListener("click", clearAllResults);
  }

  if (elements.detailModalClose) {
    elements.detailModalClose.addEventListener("click", () => {
      elements.detailModal.classList.remove("active");
    });
  }

  function verifyAdminKey(key) {
    fetch(`/api/results?key=${encodeURIComponent(key)}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Invalid admin key");
        }
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
        currentAdminKey = key;
        showDashboard(data);
      })
      .catch(() => {
        elements.loginErrorMsg.classList.remove("hidden");
      });
  }

  function showDashboard(initialData = null) {
    elements.loginCard.classList.add("hidden");
    elements.dashboard.classList.remove("hidden");
    elements.logoutBtn.classList.remove("hidden");

    if (initialData) {
      activeResults = initialData;
      renderMetrics();
      applyFilters();
    } else {
      loadResultsData();
    }
  }

  function loadResultsData() {
    fetch(`/api/results?key=${encodeURIComponent(currentAdminKey)}`)
      .then((res) => res.json())
      .then((data) => {
        activeResults = data;
        renderMetrics();
        applyFilters();
      })
      .catch(() => {
        const localData = JSON.parse(localStorage.getItem("quiz_results") || "[]");
        activeResults = localData;
        renderMetrics();
        applyFilters();
      });
  }

  function renderMetrics() {
    const total = activeResults.length;
    const passed = activeResults.filter((r) => r.passed).length;
    const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const totalStrikes = activeResults.reduce((acc, r) => acc + (r.strikes || 0), 0);

    elements.metricTotal.textContent = total;
    elements.metricPassed.textContent = passed;
    elements.metricRate.textContent = `${rate}%`;
    elements.metricStrikes.textContent = totalStrikes;
  }

  function applyFilters() {
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    const statusFilter = elements.filterStatus.value;

    const filtered = activeResults.filter((r) => {
      const matchSearch =
        !searchTerm ||
        r.candidate.name.toLowerCase().includes(searchTerm) ||
        r.candidate.email.toLowerCase().includes(searchTerm) ||
        r.candidate.id.toLowerCase().includes(searchTerm);

      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PASS" && r.passed) ||
        (statusFilter === "FAIL" && !r.passed);

      return matchSearch && matchStatus;
    });

    renderTable(filtered);
  }

  function renderTable(data) {
    elements.tableBody.innerHTML = "";

    if (data.length === 0) {
      elements.noResultsMsg.classList.remove("hidden");
      return;
    }
    elements.noResultsMsg.classList.add("hidden");

    data.forEach((item) => {
      const row = document.createElement("tr");

      const timeMins = Math.floor((item.timeSpentSeconds || 0) / 60);
      const timeSecs = (item.timeSpentSeconds || 0) % 60;
      const formattedTime = `${timeMins}m ${timeSecs}s`;

      row.innerHTML = `
        <td>${escapeHTML(item.formattedDate || new Date(item.timestamp).toLocaleDateString())}</td>
        <td>
          <strong>${escapeHTML(item.candidate.name)}</strong><br>
          <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(item.candidate.email)}</span>
        </td>
        <td><code>${escapeHTML(item.candidate.id)}</code></td>
        <td><strong>${item.correctCount}/${item.totalQuestions}</strong> (${item.percentage}%)</td>
        <td>
          <span class="pass-fail-badge ${item.passed ? "badge-pass" : "badge-fail"}" style="padding:2px 10px; font-size:0.75rem;">
            ${item.passed ? "PASS" : "FAIL"}
          </span>
        </td>
        <td>
          <span style="color: ${item.strikes > 0 ? 'var(--danger-color)' : 'var(--text-muted)'}; font-weight:600;">
            ${item.strikes || 0}
          </span>
        </td>
        <td>${formattedTime}</td>
        <td>
          <button type="button" class="btn-secondary view-btn" style="padding:4px 10px; font-size:0.8rem;">View Full Result UI</button>
        </td>
      `;

      row.querySelector(".view-btn").addEventListener("click", () => showDetailModal(item));
      elements.tableBody.appendChild(row);
    });
  }

  function showDetailModal(item) {
    elements.detailModalTitle.textContent = `Submission Details: ${item.candidate.name}`;

    const strokeDashoffset = 339 - (339 * item.percentage) / 100;
    const strokeColor = item.passed ? "#10b981" : "#ef4444";

    let domainHTML = "";
    if (item.domainScores) {
      Object.keys(item.domainScores).forEach((domain) => {
        const stats = item.domainScores[domain];
        const domPct = Math.round((stats.correct / stats.total) * 100);

        domainHTML += `
          <div class="domain-card">
            <div class="domain-header">
              <span class="domain-name">${domain}</span>
              <span class="domain-score">${stats.correct}/${stats.total} (${domPct}%)</span>
            </div>
            <div class="domain-progress-bar">
              <div class="domain-progress-fill" style="width: ${domPct}%; background-color: ${domPct >= 80 ? '#10b981' : '#f59e0b'};"></div>
            </div>
          </div>
        `;
      });
    }

    let reviewHTML = "";
    if (item.questionsReview && item.questionsReview.length > 0) {
      item.questionsReview.forEach((q, idx) => {
        const isCorrect = q.chosenIndex === q.correctIndex;
        const isUnanswered = q.chosenIndex === undefined;

        let optionsHTML = "";
        q.options.forEach((optText, optIdx) => {
          let optClass = "review-option";
          let optIcon = "";

          if (optIdx === q.correctIndex) {
            optClass += " opt-correct";
            optIcon = "✓ Correct Answer";
          } else if (optIdx === q.chosenIndex && !isCorrect) {
            optClass += " opt-user-incorrect";
            optIcon = "✗ Candidate Answer";
          }

          const letter = String.fromCharCode(65 + optIdx);
          optionsHTML += `
            <div class="${optClass}">
              <div class="opt-left">
                <span class="review-letter">${letter}</span>
                <span>${escapeHTML(optText)}</span>
              </div>
              ${optIcon ? `<span class="opt-tag">${optIcon}</span>` : ""}
            </div>
          `;
        });

        reviewHTML += `
          <div class="review-card ${isCorrect ? "review-correct" : "review-incorrect"}">
            <div class="review-card-header">
              <span class="review-q-num">Q${idx + 1}. [${q.category}]</span>
              <span class="review-status-badge ${isCorrect ? "badge-green" : "badge-red"}">
                ${isCorrect ? "Correct (+1)" : isUnanswered ? "Unanswered (0)" : "Incorrect (0)"}
              </span>
            </div>
            <h4 class="review-question-text">${escapeHTML(q.question)}</h4>
            <div class="review-options-list">${optionsHTML}</div>
            <div class="review-explanation">
              <strong>💡 Explanation:</strong> ${escapeHTML(q.explanation)}
            </div>
          </div>
        `;
      });
    } else {
      reviewHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted);">No detailed question breakdown stored for this attempt.</div>`;
    }

    const timeMins = Math.floor((item.timeSpentSeconds || 0) / 60);
    const timeSecs = (item.timeSpentSeconds || 0) % 60;

    elements.detailModalBody.innerHTML = `
      <div class="results-card" style="margin:0; max-width:100%; border:none; padding:1.5rem; background:transparent; box-shadow:none;">
        
        <div class="results-header">
          <div class="pass-fail-badge ${item.passed ? 'badge-pass' : 'badge-fail'}">
            ${item.passed ? `🏆 CERTIFIED - PASS (${item.percentage}%)` : `❌ NOT PASSED (${item.percentage}%)`}
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.6rem; margin-bottom:0.25rem;">${escapeHTML(item.candidate.name)}</h2>
          <div class="candidate-meta">
            <span>ID: ${escapeHTML(item.candidate.id)}</span> | Email: <span>${escapeHTML(item.candidate.email)}</span><br>
            Submitted: <span>${escapeHTML(item.formattedDate || item.timestamp)}</span> | Time Spent: <span>${timeMins}m ${timeSecs}s</span> | Strikes: <span style="color:${item.strikes > 0 ? 'var(--danger-color)' : 'var(--success-color)'}; font-weight:700;">${item.strikes || 0}</span>
          </div>
        </div>

        <div class="score-overview" style="margin-bottom:2rem;">
          <div class="circle-score-wrapper">
            <svg class="circle-svg" viewBox="0 0 120 120">
              <circle class="circle-bg" cx="60" cy="60" r="54"></circle>
              <circle class="circle-fill" cx="60" cy="60" r="54" style="stroke-dashoffset: ${strokeDashoffset}; stroke: ${strokeColor};"></circle>
            </svg>
            <div class="circle-text">
              <div class="score-percent-val">${item.percentage}%</div>
              <div class="score-fraction-val">${item.correctCount} / ${item.totalQuestions}</div>
            </div>
          </div>
        </div>

        <h3 class="section-heading">Domain Mastery Breakdown</h3>
        <div class="domain-grid" style="margin-bottom:2rem;">
          ${domainHTML}
        </div>

        <h3 class="section-heading">Question-by-Question Candidate Review</h3>
        <div>
          ${reviewHTML}
        </div>

      </div>
    `;

    elements.detailModal.classList.add("active");
  }

  function exportToJSON() {
    if (activeResults.length === 0) {
      alert("No data available to export.");
      return;
    }

    const jsonString = JSON.stringify(activeResults, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `results_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportToCSV() {
    if (activeResults.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Timestamp", "Candidate Name", "Email", "Student ID", "Score", "Total", "Percentage", "Status", "Strikes", "Time (sec)", "Auto Submitted"];
    const rows = activeResults.map((r) => [
      `"${r.formattedDate || r.timestamp}"`,
      `"${r.candidate.name}"`,
      `"${r.candidate.email}"`,
      `"${r.candidate.id}"`,
      r.correctCount,
      r.totalQuestions,
      `${r.percentage}%`,
      r.passed ? "PASS" : "FAIL",
      r.strikes || 0,
      r.timeSpentSeconds || 0,
      r.isAutoSubmit ? "Yes" : "No"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AI_Exam_Results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clearAllResults() {
    if (!confirm("Are you sure you want to PERMANENTLY delete all recorded candidate results? This action cannot be undone.")) {
      return;
    }

    localStorage.removeItem("quiz_results");

    fetch(`/api/results?key=${encodeURIComponent(currentAdminKey)}`, {
      method: "DELETE"
    })
      .then(() => {
        activeResults = [];
        renderMetrics();
        applyFilters();
      })
      .catch(() => {
        activeResults = [];
        renderMetrics();
        applyFilters();
      });
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
