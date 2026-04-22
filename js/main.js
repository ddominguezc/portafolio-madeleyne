// =============================================
// VIMEO — MUTE / UNMUTE con SDK oficial
// =============================================
const btnMute = document.getElementById('btnMute');
const muteIcon = document.getElementById('muteIcon');
let silenciado = true;
let vimeoPlayer = null;

const iconMuted = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <line x1="23" y1="9" x2="17" y2="15"/>
  <line x1="17" y1="9" x2="23" y2="15"/>
</svg>`;

const iconUnmuted = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
</svg>`;

const vimeoScript = document.createElement('script');
vimeoScript.src = 'https://player.vimeo.com/api/player.js';
vimeoScript.onload = () => {
  const iframe = document.getElementById('vimeoPlayer');
  vimeoPlayer = new Vimeo.Player(iframe);
  vimeoPlayer.setMuted(true);
};
document.head.appendChild(vimeoScript);

if (btnMute) {
  btnMute.addEventListener('click', () => {
    if (!vimeoPlayer) return;
    silenciado = !silenciado;
    vimeoPlayer.setMuted(silenciado).then(() => {
      muteIcon.innerHTML = silenciado ? iconMuted : iconUnmuted;
      btnMute.setAttribute('aria-label', silenciado ? 'Activar sonido' : 'Silenciar');
    });
  });
}

// =============================================
// NAVBAR — scroll y menú móvil
// =============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Crear overlay para cerrar menú al tocar fuera
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

// Función para cerrar menú
const cerrarMenu = () => {
  if (navToggle) navToggle.classList.remove('abierto');
  if (navLinks) navLinks.classList.remove('abierto');
  overlay.classList.remove('activo');
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('abierto');
    navLinks.classList.toggle('abierto');
    overlay.classList.toggle('activo');
  });
}

// Cierra menú al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', cerrarMenu);
});

// Cierra menú al hacer clic en el overlay
overlay.addEventListener('click', cerrarMenu);

// Cierra menú con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarMenu();
});

// =============================================
// GALERÍA ROTATIVA — cada 3 segundos
// =============================================
const grupos = document.querySelectorAll('.galeria-grupo');
const dots = document.querySelectorAll('.dot');
let grupoActual = 0;
let intervaloGaleria;

function mostrarGrupo(index) {
  grupos.forEach(g => g.classList.remove('activo'));
  dots.forEach(d => d.classList.remove('activo'));
  grupos[index].classList.add('activo');
  dots[index].classList.add('activo');
  grupoActual = index;
}

function avanzarGrupo() {
  const siguiente = (grupoActual + 1) % grupos.length;
  mostrarGrupo(siguiente);
}

function iniciarIntervalo() {
  intervaloGaleria = setInterval(avanzarGrupo, 3000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(intervaloGaleria);
    mostrarGrupo(parseInt(dot.dataset.index));
    iniciarIntervalo();
  });
});

if (grupos.length > 0) iniciarIntervalo();

// =============================================
// + 21 PROYECTOS — se activa al hacer scroll
// =============================================
const proyectosToggle = document.getElementById('proyectosToggle');
const clientesGrid = document.getElementById('clientesGrid');

const observerProyectos = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      proyectosToggle.setAttribute('aria-expanded', 'true');
      clientesGrid.classList.add('visible');
      observerProyectos.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (proyectosToggle) observerProyectos.observe(proyectosToggle);

// =============================================
// ANIMACIÓN DE ENTRADA — secciones al scroll
// =============================================
const observerOpts = { threshold: 0.15 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible-anim');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.categorias, .galeria, .proyectos').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});