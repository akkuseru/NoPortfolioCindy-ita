document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".btn");
  const popup = document.getElementById("popup");
  const blog = document.getElementById("blog");

  const messages = [
    "Mañana sale Stomin",
    "Pongan PXNDX!!!!!!!!!!",
    "Te juro que esto es un buen UI creeme",
    "Chiclea we, te juro que es asi",
    "Primer reporte de la dictadura de ciudad pastel uwu",
    "Yo Cindy ita declaro a Pripara como patrimonio universal",
    "Cindy ita revela su setup, la distro que ocupa es Lesbian",
    "Cindy ita anuncia su candidatura a presidenta de México",
    "Cindy ita lanza su propia criptomoneda: CINDYCOIN",
    "Cindy ita comparte su tip para ser más productiva: dormir 20 horas al día",
    "Top 10 animes que amo"
  ];

  const messagesMarquee = [
    "Cindy ita Dev",
    "Visita el portafolio de Cindy ita",
    "PXNDX ES VIDA, PXNDX ES AMOR",
    "Te juro que esta pagina es profesional",
    "Pero en serio, visita mi portafolio",
    "Feliz Cumpleaños Cindy ita!",
    "Cindy ita es la mejor desarrolladora",
  ];

  // Marquees
  function randomMarqueeText() {
    let t = "";
    for (let i = 0; i < 10; i++) {
      t += "  " + messagesMarquee[Math.floor(Math.random() * messagesMarquee.length)];
    }
    return t;
  }

  document.getElementById("marqueeTop").textContent = randomMarqueeText();
  document.getElementById("marqueeBottom").textContent = randomMarqueeText();


  function moveRandom(el) {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    el.style.left = x + "px";
    el.style.top = y + "px";
  }

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => moveRandom(btn));
    btn.addEventListener("click", () => {
      showPopup();
    });
  });

  function showPopup() {
    popup.style.display = "block";
    popup.style.top = Math.random() * 60 + "%";
    popup.style.left = Math.random() * 60 + "%";
    setTimeout(() => popup.style.display = "none", 1200);
  }

  setInterval(showPopup, 7000);

  function addPost() {
    const div = document.createElement("div");
    div.className = "post";
    const msg = messages[Math.floor(Math.random() * messages.length)];
    div.textContent = "📝 " + msg;
    blog.appendChild(div);
  }

  for (let i = 0; i < 6; i++) addPost();

  blog.addEventListener("scroll", () => {
    if (blog.scrollTop + blog.clientHeight >= blog.scrollHeight - 10) {
      for (let i = 0; i < 3; i++) addPost();
    }
  });

  // GIFs 
const gifElements = Array.from(document.querySelectorAll(".bouncing-gif"));

const gifs = gifElements.map((el, i) => ({
  el,
  x: Math.random() * (window.innerWidth - 120),
  y: Math.random() * (window.innerHeight - 120),
  vx: (Math.random() * 4 + 1) * (Math.random() < 0.5 ? -1 : 1),
  vy: (Math.random() * 4 + 1) * (Math.random() < 0.5 ? -1 : 1),
  state: "normal",
  timer: 0
}));


function animateGifs() {
  gifs.forEach(g => {
    g.x += g.vx;
    g.y += g.vy;

    const size = 120;

    if (g.x <= 0 || g.x + size >= window.innerWidth) {
      g.vx *= -1;


      g.vx *= 1.5;
      g.vy *= 1.5;


      g.state = "turbo";
      g.timer = 120;
    }

    if (g.y <= 0 || g.y + size >= window.innerHeight) {
      g.vy *= -1;

      g.vx *= 1.5;
      g.vy *= 1.5;

      g.state = "turbo";
      g.timer = 120;
    }

    // Si está en turbo, cuenta tiempo y luego se frena
    if (g.state === "turbo") {
      g.timer--;
      if (g.timer <= 0) {
        g.state = "slow";
        g.vx *= 0.2;
        g.vy *= 0.2;
      }
    }

    // Limite
    const maxSpeed = 25;
    g.vx = Math.max(Math.min(g.vx, maxSpeed), -maxSpeed);
    g.vy = Math.max(Math.min(g.vy, maxSpeed), -maxSpeed);

    g.el.style.left = g.x + "px";
    g.el.style.top = g.y + "px";
  });

  requestAnimationFrame(animateGifs);
}

animateGifs();



  // Autodestruccion
  const destroyBtn = document.getElementById("destroyBtn");
  const overlay = document.getElementById("destroyOverlay");
  const barH = document.getElementById("barH");
  const barV = document.getElementById("barV");

  destroyBtn.addEventListener("click", () => {
  overlay.style.display = "block";
  hProgress = 0;
  vProgress = 0;
  barH.style.height = "0%";
  barV.style.width = "0%";
});


  let hProgress = 0;
  let vProgress = 0;

  // Clicks
barH.parentElement.addEventListener("click", () => {
  if (hProgress < 100) {
    hProgress += 10; 
    if (hProgress > 100) hProgress = 100;
    barH.style.height = hProgress + "%";
    checkDestroy();
  }
});


barV.parentElement.addEventListener("click", () => {
  if (vProgress < 100) {
    vProgress += 10; 
    if (vProgress > 100) vProgress = 100;
    barV.style.width = vProgress + "%";
    checkDestroy();
  }
});


function checkDestroy() {
  if (hProgress >= 100 && vProgress >= 100) {
    overlay.style.display = "none";

    const flash = document.getElementById("flash");

    // FLASH
    flash.style.opacity = "1";
    setTimeout(() => flash.style.opacity = "0", 150);

    // SCREEN SHAKE
    document.body.classList.add("shake-screen");

    gifs.forEach(g => {
      g.vx *= 8;
      g.vy *= 8;
      g.state = "turbo";
      g.timer = 9999;
    });


    const elements = Array.from(document.body.children);

    elements.forEach(el => {
      if (el.id === "destroyOverlay" || el.id === "flash") return;

      const rect = el.getBoundingClientRect();

      el.style.position = "fixed";
      el.style.left = rect.left + "px";
      el.style.top = rect.top + "px";
      el.style.margin = "0";


      const duration = Math.random() * 1.5 + 0.5; // 0.5s a 2s
      el.style.transition = `transform ${duration}s ease-in, opacity ${duration}s ease-in`;

      const dx = (Math.random() - 0.5) * window.innerWidth * 2;
      const dy = (Math.random() - 0.5) * window.innerHeight * 2;
      const rot = (Math.random() - 0.5) * 1080;
      const scale = Math.random() * 0.5 + 0.2;


      el.offsetHeight;

      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${scale})`;
      el.style.opacity = "0";
    });


    setTimeout(() => {
      document.body.classList.remove("shake-screen");
      document.body.innerHTML = "<h1>PÁGINA DESTRUIDA</h1>";
      document.body.style.background = "white";
    }, 2000);
  }
}

});

