let keyboardInput=false;
document.documentElement.dataset.input='pointer';
document.addEventListener('pointerdown',()=>{keyboardInput=false;document.documentElement.dataset.input='pointer'},true);
document.addEventListener('keydown',event=>{if(['Tab','Enter',' '].includes(event.key)){keyboardInput=true;document.documentElement.dataset.input='keyboard'}},true);
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
  requestAnimationFrame(() => {document.body.classList.add('menu-is-open');$('.menu-close').focus({preventScroll:true})});
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
$('.menu-close').addEventListener('click',()=>closeMenu());
addEventListener('resize',()=>{if(innerWidth>=960&&!menu.hidden)closeMenu(null,true)});
shade.addEventListener('click', () => closeMenu());
menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); closeMenu(link.hash);
}));
$('.brand').addEventListener('click', () => { if (!menu.hidden) closeMenu('#inicio'); });
document.addEventListener('keydown', event => {
  if (menu.hidden || menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
  if (event.key === 'Tab') {
    const targets = [...menu.querySelectorAll('button,a')];
    const first = targets[0], last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().bottom + 20}px`);
}).observe(header);

function openBooking(trigger) {
  if (!menu.hidden) closeMenu(null, true);
  form.reset(); form.elements.nome.setCustomValidity('');
  $('#form-status').textContent = '';
  form.elements.area.value = trigger.dataset.area || '';
  modalTrigger = trigger;
  const selectedCard=trigger.closest('.service-card');
  if(selectedCard){const index=cards.indexOf(selectedCard);track.scrollTo({left:selectedCard.offsetLeft-track.offsetLeft-parseFloat(getComputedStyle(track).paddingLeft),behavior:'instant'});syncCarousel();}
  lockPage(); modal.showModal();
  modal.scrollTop = 0;
  $('.modal-close').focus({ preventScroll: true });
}
document.querySelectorAll('[data-book]:not(.service-card [data-book])').forEach(button => button.addEventListener('click', () => openBooking(button)));
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
function videoPreference() {
  if (reducedMotion.matches || document.hidden) { video.autoplay = false; video.pause(); }
  else { video.autoplay = true; video.play().catch(() => {}); }
}
reducedMotion.addEventListener('change', videoPreference);
document.addEventListener('visibilitychange', videoPreference);
videoPreference();

const reveals = [...document.querySelectorAll('.reveal')];
let revealObserver;
function configureReveals() {
  revealObserver?.disconnect();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    document.body.classList.remove('motion-ready');
    reveals.forEach(element => element.classList.add('is-visible'));
    return;
  }
  document.body.classList.add('motion-ready');
  document.querySelectorAll('main section').forEach(section => {
    section.querySelectorAll('.reveal').forEach((element,index) => element.style.setProperty('--reveal-delay',`${Math.min(index,2)*120}ms`));
  });
  // Enter at 15%; re-arm only after leaving the viewport completely.
  revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= .15) entry.target.classList.add('is-visible');
      else if (!entry.isIntersecting) entry.target.classList.remove('is-visible');
    }
  }, {threshold:[0,.15],rootMargin:'-12px 0px -12px 0px'});
  reveals.forEach(element => revealObserver.observe(element));
}
configureReveals();
reducedMotion.addEventListener('change',configureReveals);
const links = [...document.querySelectorAll('.mobile-menu nav a,.desktop-nav a')];
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

// Native touch scrolling, precise scroll snap, keyboard and pointer-drag navigation.
const track = $('#service-track');
const cards = [...track.querySelectorAll('.service-card')];
const dots = $('.carousel-dots');
cards.forEach((card,index) => {
  card.setAttribute('role','group');
  card.setAttribute('aria-roledescription','slide');
  card.setAttribute('aria-label',`${index + 1} de ${cards.length}: ${card.querySelector('h3').textContent}`);
  const dot = document.createElement('button');
  dot.type='button'; dot.setAttribute('aria-label',`Ver ${card.querySelector('h3').textContent}`);
  dot.addEventListener('click',() => goTo(index)); dots.append(dot);
});
let activeCard=0, carouselFrame;
function goTo(index) {
  const bounded=Math.max(0,Math.min(cards.length-1,index));
  const inset=parseFloat(getComputedStyle(track).paddingLeft);
  track.scrollTo({left:cards[bounded].offsetLeft-track.offsetLeft-inset,behavior:reducedMotion.matches?'instant':'smooth'});
}
function syncCarousel() {
  const inset=parseFloat(getComputedStyle(track).paddingLeft);
  const target=track.scrollLeft+inset;
  activeCard=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.offsetLeft-target)<Math.abs(cards[best].offsetLeft-track.offsetLeft-target)?i:best,0);
  cards.forEach((card,i)=>{card.classList.toggle('is-active',i===activeCard);const dot=dots.children[i];dot.setAttribute('aria-pressed',String(i===activeCard));});
  $('#service-prev').disabled=activeCard===0;
  $('#service-next').disabled=activeCard===cards.length-1;
  $('.carousel-count').textContent=`${String(activeCard+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
}
track.addEventListener('scroll',()=>{cancelAnimationFrame(carouselFrame);carouselFrame=requestAnimationFrame(syncCarousel)},{passive:true});
$('#service-prev').addEventListener('click',()=>goTo(activeCard-1));
$('#service-next').addEventListener('click',()=>goTo(activeCard+1));
track.addEventListener('keydown',event=>{
  if(event.target!==track)return;
  if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){
    event.preventDefault();goTo(event.key==='Home'?0:event.key==='End'?cards.length-1:activeCard+(event.key==='ArrowRight'?1:-1));
  }
});
let gesture, suppressClickUntil=0, scrolling=false, settleTimer, pendingCard;
track.addEventListener('scroll',()=>{
  scrolling=true;clearTimeout(settleTimer);
  settleTimer=setTimeout(()=>{scrolling=false;if(pendingCard){const card=pendingCard;pendingCard=null;openBooking(card.querySelector('[data-book]'));}},180);
},{passive:true});
track.addEventListener('pointerdown',event=>{
  if(event.button!==0 && event.pointerType==='mouse')return;
  pendingCard=null;
  gesture={x:event.clientX,y:event.clientY,scroll:track.scrollLeft,id:event.pointerId,moved:false,type:event.pointerType,startedMoving:scrolling};
});
track.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(Math.hypot(dx,dy)>8)gesture.moved=true;
  if(gesture.type==='mouse'&&gesture.moved){
    track.setPointerCapture(event.pointerId);track.classList.add('is-dragging');
    track.scrollLeft=gesture.scroll-dx;event.preventDefault();
  }
});
function finishGesture(event){
  if(!gesture||event.pointerId!==gesture.id)return;
  if(gesture.moved||event.type==='pointercancel')suppressClickUntil=performance.now()+250;
  if(gesture.type==='mouse'&&gesture.moved){track.classList.remove('is-dragging');syncCarousel();goTo(activeCard);}
  gesture=null;
}
track.addEventListener('pointerup',finishGesture);track.addEventListener('pointercancel',finishGesture);
window.addEventListener('pointerup',finishGesture);
// One delegated activation for the whole card and its existing keyboard button.
track.addEventListener('click',event=>{
  const card=event.target.closest('.service-card');if(!card)return;
  if(event.detail!==0&&performance.now()<suppressClickUntil){event.preventDefault();return;}
  if(event.detail!==0&&scrolling){pendingCard=card;return;}
  openBooking(card.querySelector('[data-book]'));
});
new ResizeObserver(syncCarousel).observe(track);syncCarousel();

// Small route chooser, shared by the map popup and address card.
const routeModal=$('#route-modal');let routeTrigger;
function openRoutes(trigger){
 if(routeModal.open)return;
 if(!menu.hidden)closeMenu(null,true);
 routeTrigger=trigger;lockPage();routeModal.showModal();$('.route-close').focus({preventScroll:true});
}
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-route]');if(trigger)openRoutes(trigger)});
$('.location-details').addEventListener('click',event=>{if(!event.target.closest('button,a'))openRoutes($('.route-trigger'))});
document.addEventListener('clerian:routes',event=>openRoutes(event.detail));
$('.route-close').addEventListener('click',()=>routeModal.close());
routeModal.addEventListener('click',event=>{if(event.target===routeModal){const r=routeModal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)routeModal.close()}});
routeModal.addEventListener('close',()=>{unlockPage();routeTrigger?.focus({preventScroll:true})});
