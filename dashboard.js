document.addEventListener("DOMContentLoaded", () => {
  // ===== Sidebar Links =====
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
  const sections = {
    Overview: document.getElementById("overviewSection"),
    Analytics: document.getElementById("analyticsSection"),
    Reports: document.getElementById("reportsSection"),
    Settings: document.getElementById("settingsSection"),
  };
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      Object.values(sections).forEach((sec) => sec.classList.remove("active"));
      sections[link.textContent.trim()].classList.add("active");
    });
  });

  // ===== Animated Counters with commas =====
  function animateValue(id, end) {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      document.getElementById(id).innerText =
        Math.floor(start).toLocaleString();
      if (start >= end) {
        document.getElementById(id).innerText = end.toLocaleString();
        clearInterval(counter);
      }
    }, 16);
  }
  animateValue("salesCount", 1234);
  animateValue("usersCount", 567);
  animateValue("sessionsCount", 89);

  // ===== Charts =====
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  let lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales",
          data: [120, 190, 300, 500, 200, 300],
          borderColor: "#4a90e2",
          backgroundColor: "rgba(74,144,226,0.2)",
          tension: 0.4,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#50e3c2",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { tooltip: { mode: "index", intersect: false } },
      interaction: { mode: "nearest", intersect: true },
    },
  });

  const barCtx = document.getElementById("barChart").getContext("2d");
  let barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Chrome", "Firefox", "Safari", "Edge", "Opera"],
      datasets: [
        {
          label: "Users",
          data: [65, 59, 80, 81, 56],
          backgroundColor: "#50e3c2",
          hoverBackgroundColor: "#4a90e2",
        },
      ],
    },
    options: { responsive: true },
  });

  let doughnutChart = new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ["#4a90e2", "#50e3c2", "#ffcd56"],
          hoverOffset: 10,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // ===== Update Button =====
  function updateDashboard() {
    // Update line chart
    const newLineData = Array.from(
      { length: lineChart.data.labels.length },
      () => Math.floor(Math.random() * 600),
    );
    lineChart.data.datasets[0].data = newLineData;
    lineChart.update();

    // Update bar chart
    const newBarData = Array.from({ length: barChart.data.labels.length }, () =>
      Math.floor(Math.random() * 100),
    );
    barChart.data.datasets[0].data = newBarData;
    barChart.update();

    // Update doughnut chart
    const newDoughData = [
      Math.floor(Math.random() * 70) + 10,
      Math.floor(Math.random() * 50) + 5,
      Math.floor(Math.random() * 30) + 1,
    ];
    doughnutChart.data.datasets[0].data = newDoughData;
    doughnutChart.update();

    // Update counters
    animateValue("salesCount", Math.floor(Math.random() * 2000));
    animateValue("usersCount", Math.floor(Math.random() * 1000));
    animateValue("sessionsCount", Math.floor(Math.random() * 200));
  }

  document
    .getElementById("updateData")
    .addEventListener("click", updateDashboard);

  // ===== Live Updates every 5 seconds =====
  setInterval(updateDashboard, 5000);

  // ===== Date Filter =====
  document.getElementById("rangeFilter").addEventListener("change", (e) => {
    const months = parseInt(e.target.value);
    const newData = Array.from({ length: months }, () =>
      Math.floor(Math.random() * 600),
    );
    const newLabels = Array.from({ length: months }, (_, i) => `M${i + 1}`);
    lineChart.data.labels = newLabels;
    lineChart.data.datasets[0].data = newData;
    lineChart.update();
  });

  // ===== Dark Mode =====
  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light",
    );
  });
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});
