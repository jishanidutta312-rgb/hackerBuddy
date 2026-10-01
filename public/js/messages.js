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

  const storedUser = localStorage.getItem("hackerBuddyUser");
  const user = storedUser ? JSON.parse(storedUser) : { name: "Builder" };
  const currentUsername = user.name || "Builder";
  const userAvatar = user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUsername)}`;

  const navAvatar = document.getElementById("nav-avatar");
  const drawerAvatar = document.getElementById("drawer-avatar");
  const drawerUserName = document.getElementById("drawer-user-name");
  const drawerUserTag = document.getElementById("drawer-user-tag");

  if (navAvatar) navAvatar.src = userAvatar;
  if (drawerAvatar) drawerAvatar.src = userAvatar;
  if (drawerUserName) drawerUserName.innerText = currentUsername;
  if (drawerUserTag) drawerUserTag.innerText = `@${currentUsername.toLowerCase().replace(/\s+/g, "_")}`;

  const chatStream = document.getElementById("chat-stream");
  const currentChatTitle = document.getElementById("current-chat-title");
  const currentChatDesc = document.getElementById("current-chat-desc");
  const currentChatIcon = document.getElementById("current-chat-icon");
  const messageInput = document.getElementById("message-input");
  const composerForm = document.getElementById("composer-form");

  const chatChannels = {
    neurotrace: {
      title: "NeuroTrace",
      desc: "3 members • HackOdisha 2026 Sprint",
      icon: "⚡",
      messages: [
        { sender: "Priya Patel", seed: "Priya", text: "Hey team! The vision diagnostic model training hit 94% accuracy.", time: "11:58 PM", outgoing: false },
        { sender: "Rohan Verma", seed: "Rohan", text: "The UI wireframes are done. Aarav, can we hook up the prediction API endpoint next?", time: "12:04 AM", outgoing: false }
      ]
    },
    chainvote: {
      title: "ChainVote",
      desc: "2 members • EthIndia 2026",
      icon: "🔗",
      messages: [
        { sender: "Neha Gupta", seed: "Neha", text: "Smart contract deployed to Sepolia testnet! Checking gas fees.", time: "Yesterday", outgoing: false }
      ]
    },
    priya: {
      title: "Priya Patel",
      desc: "ML / Python Engineer",
      icon: "🤖",
      messages: [
        { sender: "Priya Patel", seed: "Priya", text: "Sent the PyTorch weights link over Google Drive. Take a look when free!", time: "11:50 PM", outgoing: false }
      ]
    },
    rohan: {
      title: "Rohan Verma",
      desc: "UI/UX Designer",
      icon: "🎨",
      messages: [
        { sender: "Rohan Verma", seed: "Rohan", text: "Let's connect right after the hackathon judging round.", time: "Sep 20", outgoing: false }
      ]
    }
  };

  let activeChatKey = "neurotrace";

  function renderStream(key) {
    const data = chatChannels[key];
    if (!data) return;

    currentChatTitle.innerText = data.title;
    currentChatDesc.innerText = data.desc;
    currentChatIcon.innerText = data.icon;
    messageInput.placeholder = `Message #${data.title}...`;

    chatStream.innerHTML = "";

    data.messages.forEach(msg => {
      appendBubble(msg.sender, msg.seed, msg.text, msg.time, msg.outgoing);
    });

    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function appendBubble(sender, seed, text, time, isOutgoing) {
    const group = document.createElement("div");
    group.className = `message-group ${isOutgoing ? "outgoing" : "incoming"}`;

    const avatarSrc = isOutgoing 
      ? userAvatar 
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;

    group.innerHTML = `
      <img class="msg-avatar" src="${avatarSrc}" alt="${sender}" />
      <div class="msg-bubble-wrap">
        <div class="msg-author">${sender} <span class="msg-timestamp">${time}</span></div>
        <div class="msg-text">${text}</div>
      </div>
    `;

    chatStream.appendChild(group);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  document.querySelectorAll(".chat-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".chat-item").forEach(c => c.classList.remove("active"));
      item.classList.add("active");
      activeChatKey = item.getAttribute("data-chat-id");
      renderStream(activeChatKey);
    });
  });

  if (composerForm) {
    composerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (!text) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      appendBubble(currentUsername, currentUsername, text, timeStr, true);

      if (chatChannels[activeChatKey]) {
        chatChannels[activeChatKey].messages.push({
          sender: currentUsername,
          seed: currentUsername,
          text: text,
          time: timeStr,
          outgoing: true
        });
      }

      messageInput.value = "";
    });
  }
  renderStream(activeChatKey);
});