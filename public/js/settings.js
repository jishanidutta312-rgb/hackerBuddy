document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const drawer = document.getElementById("side-drawer");
  const closeBtn = document.getElementById("drawer-close-btn");
  const backdrop = document.getElementById("drawer-backdrop");

  const openDrawer = () => {
    drawer.classList.add("open");
    backdrop.classList.add("active");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("active");
  };

  if (toggleBtn) toggleBtn.onclick = openDrawer;
  if (closeBtn) closeBtn.onclick = closeDrawer;
  if (backdrop) backdrop.onclick = closeDrawer;

  const forms = [document.getElementById("account-form"), document.getElementById("matching-form")];
  forms.forEach((form) => {
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector(".save-settings-btn");
        const originalText = btn.innerText;
        btn.innerText = "Saved ✓";
        btn.style.background = "#2ecc71";
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = "blueviolet";
        }, 1600);
      });
    }
  });
});