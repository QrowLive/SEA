'use strict';

// Fiches des personnages : cette zone peut être enrichie au fil du projet.
const characters = {
  blaze: {
    name: 'BLAZE', category: '01 / INGÉNIEURE', status: 'GAMEPLAY VALIDÉ EN TEST',
    description: "Ingénieure de l’escouade 07, Blaze contrôle le terrain grâce à ses constructions : cinq tourelles actives au maximum, des mines, un grappin et une tablette de gestion à distance.",
    abilities: ["700 PV · lance-grenades à deux rebonds","Q · tourelles : dégâts, soins ou bouclier (5 actives au maximum)","E · mines déployables (3 au sol)","R · réparer et améliorer les constructions","F · tablette : gestion à distance","Shift · grappin (portée : 30 m)"],
    stats: ["700 PV","5 tourelles","30 m de grappin"]
  },
  myranda: {
    name: 'MYRANDA', category: '02 / COLOSSE', status: 'GAMEPLAY VALIDÉ EN TEST',
    description: "Colosse de première ligne, Myranda combat à l’épée d’énergie et protège son équipe derrière son bouclier frontal. Lorsque celui-ci se brise, son style devient plus offensif.",
    abilities: ["Bouclier frontal : 500 points","Mode défensif : épée à une main, protection active","Mode offensif : dégâts renforcés après la rupture du bouclier","Énergie synectique : 150 points maximum","Intervention : rejoindre et soutenir un allié","Ultime aérien : atterrissage et onde de choc"],
    stats: ["700 PV de référence","500 PB","150 énergie"]
  },
  cardistral: {
    name: 'CARDISTRAL', category: '03 / CARTOMANCIEN', status: 'EN CONCEPTION',
    description: "Cartomancien en conception, Cardistral assemble trois cartes pour lancer des sorts. Les familles Cœur, Carreau et Pique déterminent leur orientation ; le Trèfle amplifie la combinaison.",
    abilities: ["27 combinaisons envisagées : 9 soutien, 9 hybrides et 9 offensives","♥ Cœur : soutien · ♦ Carreau : hybride · ♠ Pique : offensif","♣ Trèfle : amplificateur","Réserve d’énergie : 100 PE","Shift · téléportation par carte (30 m, recharge de 14 s)","Équilibrage et implémentation encore en conception"],
    stats: ["100 PE","27 combinaisons","30 m de téléportation"]
  },
  qrow: {
    name: 'QROW', category: '04 / ARCHER', status: 'EN CONCEPTION',
    description: "Archer furtif en conception, Qrow mise sur une mobilité extrême. Ses déplacements techniques et son contrôle aérien ouvrent des angles d’attaque inattendus.",
    abilities: ["Arc à charge variable, sans dispersion envisagée","Camouflage : le tir rompt la furtivité","Shift · accélération et conservation de vitesse","Wallrun, walljumps et autres mouvements avancés envisagés selon le profil","Flèches de sonde, ricochet et explosive","Clic droit · flèche de téléportation alimentée par les tirs réussis"],
    stats: ["Archer mobile","Furtivité","Flèche TP"]
  },
  operateur: {
    name: 'OPÉRATEUR', category: '05 / PILOTE DISTANT', status: 'EN CONCEPTION',
    description: "Opérateur reste hors de la carte : le joueur combat en dirigeant à distance trois mékas et différents drones ou robots. Un rôle asymétrique encore en conception.",
    abilities: ["Le personnage contrôleur n’est jamais physiquement sur la carte","Contrôle distant de trois mékas","Drones et robots pour couvrir le terrain","Décisions tactiques prises depuis une position hors arène","Les commandes, statistiques et équilibrages restent à définir"],
    stats: ["3 mékas","Drones","Hors arène"]
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
    const stats = document.getElementById('dialog-stats');
    if (stats) {
      stats.replaceChildren();
      (data.stats || []).forEach(value => {
        const item = document.createElement('span');
        item.textContent = value;
        stats.appendChild(item);
      });
    }
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
