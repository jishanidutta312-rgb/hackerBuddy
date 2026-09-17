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

 
  const modal = document.getElementById("team-modal");
  const openModalBtn = document.getElementById("open-team-modal");
  const closeModalBtn = document.getElementById("close-team-modal");
  const cancelModalBtn = document.getElementById("cancel-team-modal");

  if (openModalBtn) openModalBtn.onclick = () => modal.classList.add("active");
  if (closeModalBtn) closeModalBtn.onclick = () => modal.classList.remove("active");
  if (cancelModalBtn) cancelModalBtn.onclick = () => modal.classList.remove("active");

  const form = document.getElementById("create-team-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.classList.remove("active");
      alert("Squad created successfully! Open slots are now discoverable.");
      form.reset();
    });
  }
});