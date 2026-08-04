/**
 * Admin Panel Dashboard Controller
 * Manages admin authentication, results retrieval, metrics calculation, filtering, modal details, CSV export, and record deletion.
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

    // Filters
    searchInput: document.getElementById("search-input"),
    filterStatus: document.getElementById("filter-status"),
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
      
      // Validate key against API or default key
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
        // Fallback for offline/standalone mode if key matches "admin123"
        if (key === "admin123") {
          sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
          currentAdminKey = key;
          const localData = JSON.parse(localStorage.getItem("quiz_results") || "[]");
          showDashboard(localData);
        } else {
          elements.loginErrorMsg.classList.remove("hidden");
        }
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

    data.forEach((item, index) => {
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
          <button type="button" class="btn-secondary view-btn" style="padding:4px 10px; font-size:0.8rem;">View</button>
        </td>
      `;

      row.querySelector(".view-btn").addEventListener("click", () => showDetailModal(item));
      elements.tableBody.appendChild(row);
    });
  }

  function showDetailModal(item) {
    elements.detailModalTitle.textContent = `Attempt Breakdown: ${item.candidate.name}`;

    let domainHTML = "";
    if (item.domainScores) {
      Object.keys(item.domainScores).forEach((domain) => {
        const stats = item.domainScores[domain];
        const pct = Math.round((stats.correct / stats.total) * 100);
        domainHTML += `
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>${domain}:</span>
            <strong>${stats.correct}/${stats.total} (${pct}%)</strong>
          </div>
        `;
      });
    }

    elements.detailModalBody.innerHTML = `
      <div style="background:rgba(255,255,255,0.03); border:1px solid var(--bg-card-border); border-radius:8px; padding:1rem; margin-bottom:1rem;">
        <div><strong>Candidate Name:</strong> ${escapeHTML(item.candidate.name)}</div>
        <div><strong>Email:</strong> ${escapeHTML(item.candidate.email)}</div>
        <div><strong>Student ID:</strong> ${escapeHTML(item.candidate.id)}</div>
        <div><strong>Date Submitted:</strong> ${escapeHTML(item.formattedDate || item.timestamp)}</div>
        <div><strong>Score Result:</strong> ${item.correctCount}/${item.totalQuestions} (${item.percentage}%) - <strong style="color:${item.passed ? '#34d399' : '#fca5a5'};">${item.passed ? 'PASSED' : 'FAILED'}</strong></div>
        <div><strong>Security Strikes Recorded:</strong> ${item.strikes || 0}</div>
        <div><strong>Time Taken:</strong> ${Math.floor((item.timeSpentSeconds || 0) / 60)} mins ${(item.timeSpentSeconds || 0) % 60} secs</div>
        <div><strong>Auto-Submitted by Proctor:</strong> ${item.isAutoSubmit ? 'Yes (Time or Strikes expired)' : 'No (Normal submission)'}</div>
      </div>

      <h4 style="font-family:var(--font-heading); margin-bottom:0.5rem; color:var(--text-main);">Domain Performance</h4>
      <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:8px; border:1px solid var(--bg-card-border);">
        ${domainHTML || 'No domain telemetry recorded.'}
      </div>
    `;

    elements.detailModal.classList.add("active");
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
