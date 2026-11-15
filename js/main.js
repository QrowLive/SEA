'use strict';

// Fiches des personnages : cette zone peut être enrichie au fil du projet.
const characters = {
  blaze: {
    name: 'BLAZE', category: '01 / INGÉNIEURE', status: 'GAMEPLAY VALIDÉ EN TEST',
    description: "Une ingénieure qui installe, répare et améliore ses équipements pour façonner le terrain de combat.",
    abilities: ['Lance-grenades', 'Tourelles de dégâts, de soins ou de bouclier', 'Mines et grappin de déplacement', 'Tablette de gestion à distance']
  },
  myranda: {
    name: 'MYRANDA', category: '02 / COLOSSE', status: 'GAMEPLAY VALIDÉ EN TEST',
    description: "Une combattante de première ligne qui alterne protection de l'équipe et offensive à l'épée d'énergie.",
    abilities: ['Épée d’énergie et bouclier frontal', 'Modes défensif et offensif', 'Intervention sur un allié', 'Ultime aérien à onde de choc']
  },
  cardistral: {
    name: 'CARDISTRAL', category: '03 / CARTOMANCIEN', status: 'EN CONCEPTION',
    description: "Un héros tactique qui assemble des symboles de cartes pour créer différentes combinaisons de sorts.",
    abilities: ['Combinaisons de cartes de soutien, hybrides et offensives', 'Trèfle comme amplificateur', 'Téléportation et déplacements tactiques', 'Gestion d’une réserve d’énergie']
  },
  qrow: {
    name: 'QROW', category: '04 / ARCHER', status: 'EN CONCEPTION',
    description: "Un archer furtif axé sur l'anticipation, le mouvement et la reconnaissance.",
    abilities: ['Arc à charge variable', 'Camouflage et outils de détection', 'Mobilité avancée et courses murales envisagées', 'Flèche de téléportation']
  },
  operateur: {
    name: 'OPÉRATEUR', category: '05 / PILOTE DISTANT', status: 'EN CONCEPTION',
    description: "Un contrôleur qui n'apparaît pas physiquement dans l'arène : ses robots combattent à sa place.",
    abilities: ['Contrôle à distance de trois mékas', 'Déploiement de drones et autres robots', 'Gestion tactique à distance', 'Rôle asymétrique par rapport aux autres héros']
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!menuToggle || !nav) return;
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const heroCards = document.querySelectorAll('.character-card');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  const filter = btn.dataset.filter;
  heroCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.status !== filter; });
}));

const dialog = document.getElementById('character-dialog');
const dialogClose = document.getElementById('dialog-close');
if (dialog) {
  document.querySelectorAll('[data-character]').forEach(btn => btn.addEventListener('click', () => {
    const data = characters[btn.dataset.character];
    if (!data) return;
    document.getElementById('dialog-category').textContent = data.category;
    document.getElementById('dialog-title').textContent = data.name;
    document.getElementById('dialog-status').textContent = data.status;
    document.getElementById('dialog-description').textContent = data.description;
    const list = document.getElementById('dialog-abilities');
    list.replaceChildren();
    data.abilities.forEach(ability => {
      const item = document.createElement('li');
      item.textContent = ability;
      list.appendChild(item);
    });
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }));
  if (dialogClose) dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const bounds = dialog.getBoundingClientRect();
    if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) dialog.close();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Animation minimale de la barre de progression à la lecture.
const progress = document.querySelector('.scroll-progress');
let ticking = false;
function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateScrollProgress); }
}, { passive: true });
updateScrollProgress();
