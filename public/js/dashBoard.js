document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("sidebar-toggle");
  const drawer = document.getElementById("side-drawer");
  const closeBtn = document.getElementById("drawer-close-btn");
  const backdrop = document.getElementById("drawer-backdrop");
  const drawerProfileLink = document.getElementById("drawer-profile-link");

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
  if (drawerProfileLink) drawerProfileLink.onclick = closeDrawer;


  const displayName = document.getElementById("display-name");
  const drawerUserName = document.getElementById("drawer-user-name");
  const drawerUserTag = document.getElementById("drawer-user-tag");
  const displayRoleCollege = document.getElementById("display-role-college");
  const displayBio = document.getElementById("display-bio");
  const displaySkills = document.getElementById("display-skills");
  const profileAvatar = document.getElementById("profile-avatar");
  const navAvatar = document.getElementById("nav-avatar");
  const drawerAvatar = document.getElementById("drawer-avatar");


  const modal = document.getElementById("edit-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const form = document.getElementById("edit-profile-form");
  const avatarInput = document.getElementById("avatar-input");

  const inputName = document.getElementById("input-name");
  const inputRole = document.getElementById("input-role");
  const inputCollege = document.getElementById("input-college");
  const inputBio = document.getElementById("input-bio");
  const inputSkills = document.getElementById("input-skills");

  const urlParams = new URLSearchParams(window.location.search);
  const paramUser = urlParams.get("user");

  let user;

  if (paramUser) {
    user = {
      name: paramUser.trim(),
      role: "",
      college: "",
      bio: "",
      skills: [],
      avatar: "",
      participations: 0,
      hackathonsWon: 0,
      invitesCount: 0,
      activeSquad: "No Active Squad"
    };
    localStorage.setItem("hackerBuddyUser", JSON.stringify(user));

    window.history.replaceState({}, document.title, "/dashboard");
  } else {
    const rawData = localStorage.getItem("hackerBuddyUser");
    user = rawData ? JSON.parse(rawData) : null;
    if (!user || user.name === "Aarav Sharma") {
      user = {
        name: "Builder",
        role: "",
        college: "",
        bio: "",
        skills: [],
        avatar: "",
        participations: 0,
        hackathonsWon: 0,
        invitesCount: 0,
        activeSquad: "No Active Squad"
      };
      localStorage.setItem("hackerBuddyUser", JSON.stringify(user));
    }
  }
  function renderProfile() {
    const currentName = user.name || "Builder";

    if (displayName) displayName.innerText = currentName;
    if (drawerUserName) drawerUserName.innerText = currentName;
    if (drawerUserTag) drawerUserTag.innerText = `@${currentName.toLowerCase().replace(/\s+/g, "_")}`;
    if (inputName) inputName.value = currentName;

    const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentName)}`;
    const chosenAvatar = user.avatar || fallbackAvatar;

    if (profileAvatar) profileAvatar.src = chosenAvatar;
    if (navAvatar) navAvatar.src = chosenAvatar;
    if (drawerAvatar) drawerAvatar.src = chosenAvatar;

    if (displayRoleCollege) {
      if (user.role || user.college) {
        displayRoleCollege.innerText = [user.role, user.college].filter(Boolean).join(" • ");
        displayRoleCollege.style.display = "block";
      } else {
        displayRoleCollege.style.display = "none";
      }
    }
    if (inputRole) inputRole.value = user.role || "";
    if (inputCollege) inputCollege.value = user.college || "";

    if (displayBio) {
      if (user.bio && user.bio.trim() !== "") {
        displayBio.innerText = user.bio;
      } else {
        displayBio.innerText = "Click 'Edit Profile' to add your bio, role, college, and tech stack.";
      }
    }
    if (inputBio) inputBio.value = user.bio || "";

    if (displaySkills) {
      displaySkills.innerHTML = "";
      if (user.skills && user.skills.length > 0) {
        user.skills.forEach(skill => {
          const span = document.createElement("span");
          span.className = "skill-tag";
          span.innerText = skill;
          displaySkills.appendChild(span);
        });
      }
    }
    if (inputSkills) inputSkills.value = (user.skills || []).join(", ");
  }

  renderProfile();

  if (openModalBtn) openModalBtn.onclick = () => modal.classList.add("active");
  if (closeModalBtn) closeModalBtn.onclick = () => modal.classList.remove("active");
  if (cancelModalBtn) cancelModalBtn.onclick = () => modal.classList.remove("active");

  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          user.avatar = event.target.result;
          localStorage.setItem("hackerBuddyUser", JSON.stringify(user));
          renderProfile();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      user.name = inputName.value.trim() || user.name;
      user.role = inputRole.value.trim();
      user.college = inputCollege.value.trim();
      user.bio = inputBio.value.trim();

      user.skills = inputSkills.value
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      localStorage.setItem("hackerBuddyUser", JSON.stringify(user));
      renderProfile();
      modal.classList.remove("active");
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("hackerBuddyUser");
    });
  }
});