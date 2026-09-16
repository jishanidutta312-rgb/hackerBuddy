document.addEventListener('DOMContentLoaded', () => {
 
  const toggleBtn = document.getElementById('sidebar-toggle');
  const drawer = document.getElementById('side-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerProfileLink = document.getElementById('drawer-profile-link');

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('active');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
  };

  toggleBtn.onclick = openDrawer;
  closeBtn.onclick = closeDrawer;
  backdrop.onclick = closeDrawer;

  drawerProfileLink.onclick = () => {
    closeDrawer();
  };

  const modal = document.getElementById('edit-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const form = document.getElementById('edit-profile-form');
  const avatarInput = document.getElementById('avatar-input');
  const avatarImg = document.getElementById('profile-avatar');
  const navAvatar = document.getElementById('nav-avatar');
  const drawerAvatar = document.getElementById('drawer-avatar');


  openModalBtn.onclick = () => modal.classList.add('active');
  closeModalBtn.onclick = () => modal.classList.remove('active');
  cancelModalBtn.onclick = () => modal.classList.remove('active');

 
  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newSrc = event.target.result;
        avatarImg.src = newSrc;
        navAvatar.src = newSrc;
        drawerAvatar.src = newSrc;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-name').value;
    const role = document.getElementById('input-role').value;
    const college = document.getElementById('input-college').value;
    const bio = document.getElementById('input-bio').value;
    const skills = document.getElementById('input-skills').value;

    document.getElementById('display-name').innerText = name;
    document.getElementById('drawer-user-name').innerText = name;
    document.getElementById('display-role-college').innerText = `${role} • ${college}`;
    document.getElementById('display-bio').innerText = bio;

    const skillsContainer = document.getElementById('display-skills');
    skillsContainer.innerHTML = '';
    skills.split(',').forEach(skill => {
      const trimmed = skill.trim();
      if (trimmed) {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.innerText = trimmed;
        skillsContainer.appendChild(span);
      }
    });

    modal.classList.remove('active');
  });
});