document.addEventListener("DOMContentLoaded", () => {
  // ===== Animated Counters =====
  function animateValue(id, end) {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      document.getElementById(id).innerText = Math.floor(start);

      if (start >= end) {
        document.getElementById(id).innerText = end;
        clearInterval(counter);
      }
    }, 16);
  }

  animateValue("salesCount", 1234);
  animateValue("usersCount", 567);
  animateValue("sessionsCount", 89);

  // ===== Line Chart =====
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
        },
      ],
    },
    options: { responsive: true },
  });

  // ===== Bar Chart =====
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Chrome", "Firefox", "Safari", "Edge", "Opera"],
      datasets: [
        {
          label: "Users",
          data: [65, 59, 80, 81, 56],
          backgroundColor: "#50e3c2",
        },
      ],
    },
    options: { responsive: true },
  });

  // ===== Doughnut Chart =====
  new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ["#4a90e2", "#50e3c2", "#ffcd56"],
        },
      ],
    },
    options: { responsive: true },
  });

  // ===== Update Line Chart Data Button =====
  document.getElementById("updateData").addEventListener("click", () => {
    const newData = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 600),
    );
    lineChart.data.datasets[0].data = newData;
    lineChart.update();
  });

  // ===== Date Range Filter =====
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

  // ===== Dark Mode Toggle =====
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
