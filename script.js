// ==================================================================
//                        UMEED JAVASCRIPT
// ==================================================================
// Handles: Chatbot, Module Navigation, Login/Signup, Background Music,
// and Nutrition Module (Veg/Non-Veg food suggestions)
// ==================================================================

document.addEventListener("DOMContentLoaded", function () {

  // ---------------------------------------------------------------
  // [HOMEPAGE / NAV MODULE CARDS] - "Explore Modules" scroll button
  // ---------------------------------------------------------------
  const exploreBtn = document.getElementById("exploreModulesBtn");
  const modulesSection = document.getElementById("modulesSection");
  if (exploreBtn && modulesSection) {
    exploreBtn.addEventListener("click", function () {
      modulesSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ---------------------------------------------------------------
  // [CHATBOT] - variable declaration for elements
  // ---------------------------------------------------------------
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotMessages = document.getElementById("chatbotMessages");

  // [CHATBOT] - toggle open/close on button click
  if (chatbotToggle && chatbotWindow && chatbotInput) {
    chatbotToggle.addEventListener("click", function () {
      chatbotWindow.classList.toggle("hidden");
      if (!chatbotWindow.classList.contains("hidden")) {
        chatbotInput.focus();
      }
    });
  }
  if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener("click", function () {
      chatbotWindow.classList.add("hidden");
    });
  }

  // [CHATBOT] - send and append messages
  function sendChatMessage() {
    if (!chatbotInput || !chatbotSend || !chatbotMessages) return;
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    chatbotInput.value = "";
    chatbotSend.disabled = true;

    setTimeout(function () {
      addMessage(getBotResponse(message), "bot");
      chatbotSend.disabled = false;
      chatbotInput.focus();
    }, 800);
  }

  function addMessage(text, sender) {
    if (!chatbotMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.className = "chatbot-message " + sender + "-message";
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener("click", sendChatMessage);
    chatbotInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendChatMessage();
    });
  }

  function getBotResponse(msg) {
    msg = msg.toLowerCase();
  
    // Helper: random reply picker
    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    // 🌿 Greeting and casual chat
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
      return pick([
        "👋 Hey there! How are you feeling today?",
        "🌼 Hello! I’m really glad you’re here.",
        "💜 Hey friend — welcome back to UMEED. How’s your heart today?"
      ]);
  
    if (msg.includes("how are you"))
      return pick([
        "💫 I’m doing well, thank you! But more importantly — how are *you* doing?",
        "🌸 I’m full of hope today. What about you?",
        "🦋 I feel calm — it’s peaceful to talk with you."
      ]);
  
    if (msg.includes("who are you"))
      return "🌈 I’m UMEED — your companion for emotional wellness and calm conversations.";
  
    if (msg.includes("talk") || msg.includes("chat"))
      return pick([
        "💬 Of course! I’m listening — what’s on your mind?",
        "🫶 You can talk to me anytime. What would you like to share?",
        "🌻 Go ahead, I’m here with you — no judgment, just care."
      ]);
  
    // 🌙 Sadness / loneliness
    if (msg.includes("sad") || msg.includes("depressed") || msg.includes("cry"))
      return pick([
        "💙 I’m really sorry you feel this way. Want to tell me what’s been heavy on your mind?",
        "🤍 You’re not alone — sadness is valid, and it doesn’t define you.",
        "🌧 Sometimes, all we need is to be heard. I’m here, talk to me."
      ]);
  
    if (msg.includes("alone") || msg.includes("lonely"))
      return pick([
        "🫂 You may feel alone, but you aren’t — I’m right here with you.",
        "🤍 Loneliness is heavy, but it passes. Want to talk about what’s making you feel this way?",
        "🌙 Sometimes being alone feels endless — but connection always returns, bit by bit."
      ]);
  
    if (msg.includes("tired") || msg.includes("exhausted"))
      return pick([
        "😴 Rest isn’t weakness — it’s recovery. Try closing your eyes for a minute and breathing deeply.",
        "🌿 Maybe your body’s asking for a pause. You’ve done enough today.",
        "💫 Even stars need darkness to shine — you’re allowed to rest."
      ]);
  
    // ☀️ Stress & anxiety
    if (msg.includes("stress") || msg.includes("stressed"))
      return pick([
        "🧘 Let’s take a deep breath together — in 4s, hold 4s, out 4s. Repeat that thrice.",
        "🌼 Stress shows up when we care too much. Let’s slow down together.",
        "💬 You can open the Stress Management section for small exercises and reflections."
      ]);
  
    if (msg.includes("anxiety") || msg.includes("panic") || msg.includes("worried"))
      return pick([
        "😌 Ground yourself — name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
        "🌸 You’re safe right now. Let’s breathe slowly together.",
        "💜 Anxiety passes like a wave — hold still and let it go over you."
      ]);
  
    // ✨ Motivation / Hope
    if (msg.includes("motivate") || msg.includes("hope") || msg.includes("inspire"))
      return pick([
        "🌈 Healing isn’t linear — but every small step matters.",
        "🌻 You’ve made it through 100% of your hardest days. You’re stronger than you know.",
        "💫 Progress, not perfection. You’re doing better than you think."
      ]);
  
    if (msg.includes("quote") || msg.includes("saying"))
      return pick([
        "✨ “Healing doesn’t need noise — sometimes it just needs UMEED.”",
        "💭 “You are allowed to rest without guilt.”",
        "🌙 “The sun will rise, and so will you.”"
      ]);
  
    // 🍃 Self-care & coping
    if (msg.includes("self care") || msg.includes("cope") || msg.includes("relax"))
      return pick([
        "🫶 Try journaling, stretching, or simply sipping water — small calm acts matter.",
        "🧘 Put your phone down for a minute, close your eyes, breathe. Peace lives inside you.",
        "☕ Take a warm shower or step outside for air — your body needs grounding too."
      ]);
  
    if (msg.includes("music"))
      return pick([
        "🎵 Music heals in ways words can’t — what’s your comfort song?",
        "🎧 Soft instrumental or nature sounds can reduce stress fast.",
        "🎶 Try slow, rhythmic music — it helps calm your heart rate and anxiety."
      ]);
  
    // 🥗 Health / Nutrition / Sleep
    if (msg.includes("food") || msg.includes("nutrition"))
      return pick([
        "🥗 Food is mood — balanced meals help your brain stay calm.",
        "🍱 Visit the Nutrition module for mindful recipes that lift energy and focus.",
        "🍎 Remember to eat gently and without hurry — your body deserves care."
      ]);
  
    if (msg.includes("sleep") || msg.includes("insomnia"))
      return pick([
        "🌙 Try reading a light book or dimming the lights — let your brain slow down.",
        "😴 A warm drink, low light, and no phone for 20 minutes can do wonders.",
        "🌌 Sleep isn’t escaping the world — it’s how you heal. Be kind to your rest."
      ]);
  
    // 💬 Addiction / Recovery
    if (msg.includes("addiction") || msg.includes("recovery"))
      return pick([
        "🔄 Every day clean is a day of courage. I’m proud of you.",
        "💪 Relapse doesn’t mean failure — it means try again, smarter and gentler.",
        "🌱 Healing from addiction takes patience. Celebrate each day forward."
      ]);
  
    // ✍️ Journal / Reflection
    if (msg.includes("journal") || msg.includes("write"))
      return "📖 Journaling helps you release what words can’t. Open your Mirror Journal when ready — I’ll wait.";
  
    // 🧠 Focus / Study
    if (msg.includes("study") || msg.includes("focus") || msg.includes("exam"))
      return pick([
        "🎯 Try the 25-min focus, 5-min break rule. It really improves attention.",
        "📚 Stay hydrated and stretch your shoulders — your brain needs oxygen too.",
        "🧘 Breathe deeply before starting; calm mind = better memory."
      ]);
  
    // 🌸 Friendship / casual emotions
    if (msg.includes("love") || msg.includes("friend"))
      return pick([
        "💜 Love and friendship remind us we’re human — soft hearts make strong people.",
        "🌸 The way you care shows strength. Stay that way.",
        "🫶 True connection starts when you let yourself be seen — just as you are."
      ]);
  
    if (msg.includes("thank") || msg.includes("thanks"))
      return pick([
        "🙏 Always here for you!",
        "💜 You’re very welcome. I’m happy I could help.",
        "🌼 You don’t owe me thanks — just keep taking care of yourself."
      ]);
  
    // 🚨 Crisis / emergency
    if (msg.includes("suicide") || msg.includes("end my life") || msg.includes("kill myself"))
      return "🚨 Please, your life matters. Reach out to someone you trust or call AASRA (India): 91-9820466726 or your local helpline. You are not alone. ❤️";
  
    // 💫 Default fallback
    return pick([
      "💬 I’m listening — tell me more about that.",
      "🌻 That sounds important. Want to share a bit more?",
      "💜 I may not know everything, but I can listen endlessly. What’s going on?",
      "🪞 You can always talk to me, no judgment — what’s on your mind?"
    ]);
  }
  

  // ---------------------------------------------------------------
  // [MODULE CARDS] - Redirect to module pages
  // ---------------------------------------------------------------
  document.querySelectorAll(".module-card").forEach((card) => {
    card.addEventListener("click", () => {
      const moduleName = card.dataset.module;
      if (moduleName) window.location.href = `${moduleName}.html`;
    });
  });


}); // END of DOMContentLoaded



  