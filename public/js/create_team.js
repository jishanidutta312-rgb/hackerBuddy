document.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem("hackerBuddyUser");
  const navAvatar = document.getElementById("nav-avatar");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name || "Builder")}`;
    if (navAvatar) {
      navAvatar.src = user.avatar || fallbackAvatar;
    }
  }

  const form = document.getElementById("create-team-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const teamName = document.getElementById("team-name").value.trim();
      const targetEvent = document.getElementById("target-event").value;
      const pitch = document.getElementById("project-pitch").value.trim();
      const capacity = document.getElementById("max-members").value;

     
      const checkedBoxes = form.querySelectorAll(".role-chip input:checked");
      const openRoles = Array.from(checkedBoxes).map(cb => cb.value);

      const newSquad = {
        name: teamName,
        hackathon: targetEvent,
        pitch: pitch,
        capacity: capacity,
        openRoles: openRoles,
        createdAt: new Date().toISOString()
      };

     
      const existingSquads = JSON.parse(localStorage.getItem("hackerBuddySquads") || "[]");
      existingSquads.push(newSquad);
      localStorage.setItem("hackerBuddySquads", JSON.stringify(existingSquads));

      window.location.href = "/teams";
    });
  }
});