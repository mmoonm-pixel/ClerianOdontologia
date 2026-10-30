const $ = selector => document.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const header = $('#site-header');
const menu = $('#mobile-menu');
const menuButton = $('.menu-toggle');
const shade = $('.menu-shade');
const modal = $('#booking-modal');
const form = $('#booking-form');
const whatsapp = 'https://wa.me/5511992584747';
let lockedScroll = 0, pageLocked = false, modalTrigger;
let menuClosingTimer;

function lockPage() {
  if (pageLocked) return;
  pageLocked = true;
  lockedScroll = scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScroll}px`;
  document.body.style.width = '100%';
}
function unlockPage() {
  if (!pageLocked) return;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  scrollTo({ top: lockedScroll, behavior: 'instant' });
  pageLocked = false;
}
function inertContent(value) {
  $('main').inert = value;
  $('footer').inert = value;
}
function openMenu() {
  clearTimeout(menuClosingTimer);
  lockPage(); inertContent(true);
  menu.hidden = false; menu.inert = false; shade.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Fechar menu');
  requestAnimationFrame(() => document.body.classList.add('menu-is-open'));
}
function closeMenu(destination, immediate = false) {
  if (menu.hidden) return;
  clearTimeout(menuClosingTimer);
  menu.inert = true;
  document.body.classList.remove('menu-is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menuButton.focus({ preventScroll: true });
  const finish = () => {
    menu.hidden = true; shade.hidden = true;
    inertContent(false); unlockPage();
    if (destination) $(destination)?.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  if (immediate || reducedMotion.matches) finish();
  else menuClosingTimer = setTimeout(finish, 300);
}
menuButton.addEventListener('click', () => menuButton.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
shade.addEventListener('click', () => closeMenu());
menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); closeMenu(link.hash);
}));
$('.brand').addEventListener('click', () => { if (!menu.hidden) closeMenu('#inicio'); });
document.addEventListener('keydown', event => {
  if (menu.hidden || menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
  if (event.key === 'Tab') {
    const targets = [menuButton, ...menu.querySelectorAll('a')];
    const first = targets[0], last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
addEventListener('resize', () => { if (innerWidth >= 960 && !menu.hidden) closeMenu(null, true); });
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().bottom + 20}px`);
}).observe(header);

function openBooking(trigger) {
  if (!menu.hidden) closeMenu(null, true);
  form.reset(); form.elements.nome.setCustomValidity('');
  $('#form-status').textContent = '';
  form.elements.area.value = trigger.dataset.area || '';
  modalTrigger = trigger; lockPage(); modal.showModal();
  modal.scrollTop = 0;
  $('.modal-close').focus({ preventScroll: true });
}
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => openBooking(button)));
$('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target !== modal) return;
  const box = modal.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) modal.close();
});
modal.addEventListener('close', () => { unlockPage(); modalTrigger?.focus({ preventScroll: true }); });
form.elements.nome.addEventListener('input', () => form.elements.nome.setCustomValidity(''));
const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
form.elements.data.min = today.toISOString().slice(0, 10);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.elements.nome.value.trim()) form.elements.nome.setCustomValidity('Informe seu nome para continuar.');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const lines = ['Olá, Clerian! Gostaria de conversar sobre um atendimento.'];
  for (const [key, label] of [['nome','Nome'],['area','Área de interesse'],['data','Data de preferência'],['periodo','Período'],['observacoes','Observações']]) {
    let value = String(data.get(key) || '').trim();
    if (value) {
      if (key === 'data') value = value.split('-').reverse().join('/');
      lines.push(`${label}: ${value}`);
    }
  }
  window.open(`${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  $('#form-status').textContent = 'Continue no WhatsApp para enviar sua mensagem. O atendimento será confirmado pela equipe.';
});
$('#year').textContent = new Date().getFullYear();

const video = $('#hero-video');
const videoButton = $('.video-control');
let userPausedVideo = false;
function showVideoState() {
  const paused = video.paused;
  videoButton.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
  videoButton.setAttribute('aria-pressed', String(paused));
  videoButton.innerHTML = paused ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
}
function videoPreference() {
  if (reducedMotion.matches) { video.autoplay = false; video.pause(); }
  else if (!userPausedVideo && !document.hidden) { video.autoplay = true; video.play().catch(() => {}); }
}
videoButton.addEventListener('click', () => {
  if (video.paused) { userPausedVideo = false; video.play().catch(() => {}); }
  else { userPausedVideo = true; video.pause(); }
});
video.addEventListener('play', showVideoState); video.addEventListener('pause', showVideoState);
reducedMotion.addEventListener('change', videoPreference);
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else videoPreference(); });
videoPreference(); showVideoState();

const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }, { threshold: .06, rootMargin: '0px 0px -12px 0px' });
  reveals.forEach(element => observer.observe(element));
}
const links = [...document.querySelectorAll('.desktop-nav a,.mobile-menu nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
let scrollFrame;
function updateScroll() {
  if (pageLocked) return;
  const readingLine = header.getBoundingClientRect().bottom + 80;
  header.classList.toggle('scrolled', $('#inicio').getBoundingClientRect().bottom < readingLine);
  let current = sections[0].id;
  for (const section of sections) if (section.getBoundingClientRect().top <= readingLine) current = section.id;
  links.forEach(link => { if (link.hash === `#${current}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
}
addEventListener('scroll', () => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(updateScroll); }, { passive: true });
addEventListener('resize', updateScroll); updateScroll();
