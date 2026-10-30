const $=s=>document.querySelector(s),services=['Odontopediatria','Ortodontia','Tratamento de canal','Implantes dentários','Próteses dentárias','Clareamento dental','Harmonização orofacial','Avaliação odontológica','Preenchimento labial','Cuidados gengivais'];
const tooth='<path d="M31 21c-18-7-22 7-17 21 5 12 4 33 12 36 7 3 7-24 14-24s7 27 14 24c8-3 7-24 12-36 5-14 1-28-17-21-7 3-11 3-18 0Z"/><path d="M30 27q10 7 20 0"/>';
const icons=[
'<circle cx="45" cy="45" r="25"/><path d="M45 27v36M27 45h36"/>',
'<path d="M16 32q29-17 58 0M16 58q29 17 58 0M20 32v26m13-30v34m12-36v38m12-36v34m13-30v26"/>',
tooth+'<path d="M40 25v38m-8-20 8 9 8-9"/>',
'<path d="M40 10v45m-8 0h16m-16 7h16m-16 7h16m-8 0v11M24 20q16-12 32 0"/>',
'<path d="M14 50q5-27 30-27t31 27q-2 23-31 23T14 50Z M22 46q23-10 45 0"/>',
tooth+'<path d="m70 8 3 9 9 3-9 3-3 9-3-9-9-3 9-3"/>',
'<path d="M47 12q-23 4-23 29l-8 12 10 5q2 22 23 22M47 12q20 0 20 23M37 47q8-6 17 0M40 66q10 5 18-3"/>',
'<circle cx="45" cy="45" r="27"/><path d="M45 27v36M27 45h36"/>',
'<path d="M15 52q28-23 60 0-30 28-60 0Zm0 0q29 8 60 0"/>',
'<path d="M20 35q24-17 50 0M25 49q20 10 40 0M30 60q15 8 30 0"/>'
];
const descriptions=['Cuidado odontológico para crianças.','Alinhamento dos dentes e acompanhamento ortodôntico.','Avaliação e tratamento endodôntico.','Reabilitação de dentes ausentes.','Recuperação de função e estética do sorriso.','Avaliação de clareamento dental.','Avaliação estética e funcional da face.','Orientação individualizada para seu sorriso.','Procedimento sujeito à avaliação e disponibilidade.','Avaliação da saúde gengival e suas necessidades.'];
$('#cards').innerHTML=services.map((s,i)=>`<article class="card"><svg viewBox="0 0 90 90" aria-hidden="true">${icons[i]}</svg><h3>${s}</h3><p>${descriptions[i]}</p><button data-book data-area="${s}" aria-pressed="false">Solicitar avaliação</button><span class="selected-label" hidden>✓ Serviço selecionado</span></article>`).join('');
const modal=$('#booking-modal'),menu=$('#menu'),form=$('#booking-form'),menuButton=$('#menu-open'),header=document.querySelector('header'),shade=document.querySelector('.menu-shade');
// Header focus styling follows the input method, rather than incidental programmatic focus.
let headerKeyboard=false;document.documentElement.dataset.navInput='pointer';
document.addEventListener('pointerdown',()=>{headerKeyboard=false;document.documentElement.dataset.navInput='pointer';},true);
document.addEventListener('keydown',e=>{if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&['Tab','Enter',' ','ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Escape'].includes(e.key)){headerKeyboard=true;document.documentElement.dataset.navInput='keyboard';}},true);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let lockedScroll=0,locked=false,modalTrigger=null,menuState='closed',menuTimer;
function lockPage(){if(locked)return;locked=true;lockedScroll=window.scrollY;window.scrollTo({top:lockedScroll,behavior:'instant'});document.body.style.position='fixed';document.body.style.top=`-${lockedScroll}px`;document.body.style.width='100%';}
function unlockPage(){if(!locked)return;document.body.style.position='';document.body.style.top='';document.body.style.width='';window.scrollTo({top:lockedScroll,behavior:'instant'});locked=false;requestAnimationFrame(updateSection);}
function inertPage(value){document.querySelector('main').inert=value;document.querySelector('footer').inert=value;}
function openMenu(){clearTimeout(menuTimer);menuState='open';lockPage();inertPage(true);menu.hidden=false;menu.inert=false;shade.hidden=false;document.body.classList.add('menu-is-open');menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Fechar menu');requestAnimationFrame(()=>{if(menuState==='open'){header.classList.add('menu-expanded');shade.classList.add('visible');}});if(headerKeyboard)(menu.querySelector('a[aria-current="location"]')||menu.querySelector('a')).focus({preventScroll:true});else menuButton.focus({preventScroll:true});}
function closeMenu(destination){if(menuState==='closed')return;clearTimeout(menuTimer);menuState='closing';menu.inert=true;header.classList.remove('menu-expanded');shade.classList.remove('visible');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');menuButton.focus({preventScroll:true});menuTimer=setTimeout(()=>{menu.hidden=true;shade.hidden=true;menuState='closed';document.body.classList.remove('menu-is-open');inertPage(false);unlockPage();if(destination)document.querySelector(destination)?.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});},reduced.matches?0:360);}
menuButton.onclick=()=>menuState==='open'?closeMenu():openMenu();shade.onclick=()=>closeMenu();menu.querySelectorAll('a').forEach(a=>a.onclick=e=>{e.preventDefault();closeMenu(a.getAttribute('href'));});
addEventListener('keydown',e=>{if(menuState!=='open')return;if(e.key==='Escape'){e.preventDefault();closeMenu();}if(e.key==='Tab'){const items=[menuButton,...menu.querySelectorAll('a')],first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
addEventListener('resize',()=>{if(innerWidth>=768&&menuState!=='closed')closeMenu();});
function closeModal(){if(!modal.open)return;modal.close();}
modal.querySelector('[data-close]').onclick=closeModal;modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});modal.addEventListener('close',()=>{unlockPage();modalTrigger?.focus({preventScroll:true});});
const serviceProfessionals={};
function syncProfessional(){const name=serviceProfessionals[form.elements.area.value]||'';form.elements.profissional.value=name;$('#professional-info').textContent=name?'Profissional da área selecionada: '+name+'.':'O profissional será definido pela área selecionada.';}
form.elements.area.addEventListener('change',syncProfessional);
function openBooking(b){form.reset();for(const option of form.elements.area.options)option.disabled=Boolean(option.value&&b.dataset.prof&&serviceProfessionals[option.value]!==b.dataset.prof);form.elements.nome.setCustomValidity('');$('#form-status').textContent='';if(b.dataset.area){form.elements.area.value=b.dataset.area;document.querySelectorAll('.card').forEach(c=>{const active=c.contains(b);c.classList.toggle('selected',active);c.querySelector('.selected-label').hidden=!active;c.querySelector('button').setAttribute('aria-pressed',String(active));});}syncProfessional();modalTrigger=b;lockPage();modal.showModal();modal.querySelector('.modal-scroll').scrollTop=0;modal.querySelector('[data-close]').focus({preventScroll:true});}
document.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>openBooking(b));
const date=new Date();date.setMinutes(date.getMinutes()-date.getTimezoneOffset());form.elements.data.min=date.toISOString().slice(0,10);
form.elements.nome.oninput=()=>form.elements.nome.setCustomValidity('');
form.onsubmit=e=>{e.preventDefault();syncProfessional();if(!String(form.elements.nome.value).trim())form.elements.nome.setCustomValidity('Informe seu nome completo.');if(!form.reportValidity())return;const f=new FormData(form),lines=['Olá, Clerian Odontologia! Gostaria de solicitar um agendamento.'];for(const[key,label]of[['nome','Nome'],['area','Área de interesse'],['profissional','Profissional'],['data','Data desejada'],['periodo','Período'],['observacoes','Observações']]){let value=String(f.get(key)||'').trim();if(value){if(key==='data')value=value.split('-').reverse().join('/');lines.push(`${label}: ${value}`);}}window.open('https://wa.me/5511934041989?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener,noreferrer');$('#form-status').textContent='Continue no WhatsApp para enviar sua solicitação. A data e o horário dependem da confirmação da equipe.';};
for(const[id,dir]of[['prev',-1],['next',1]])$('#'+id).onclick=()=>$('#cards').scrollBy({left:dir*($('#cards .card').offsetWidth+18),behavior:reduced.matches?'instant':'smooth'});
$('#cards').addEventListener('keydown',e=>{if(e.target!==$('#cards'))return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();$('#cards').scrollBy({left:(e.key==='ArrowRight'?1:-1)*306,behavior:reduced.matches?'instant':'smooth'});}});
$('#year').textContent=new Date().getFullYear();addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40),{passive:true});
const video=$('#hero-video');function videoMode(){if(reduced.matches){video.autoplay=false;video.pause();video.removeAttribute('src');video.querySelector('source').removeAttribute('src');video.load();}else{video.autoplay=true;video.querySelector('source').src=video.querySelector('source').dataset.src;video.load();video.play().catch(()=>{});}}videoMode();reduced.addEventListener('change',videoMode);
// Reveal each section, photograph and card once. Never transform a page ancestor.
if('IntersectionObserver'in window&&!reduced.matches){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.remove('pending-reveal');e.target.classList.add('revealed');observer.unobserve(e.target);}}, {threshold:.08,rootMargin:'0px 0px 25px 0px'});document.querySelectorAll('.reveal,.card,.about-photo').forEach((el,i)=>{el.classList.add('reveal','pending-reveal');if(el.matches('.card'))el.style.transitionDelay=`${i%3*55}ms`;observer.observe(el);});}
function compactHeaderBottom(){const css=getComputedStyle(header),rows=[...header.children].filter(e=>e.id!=='menu').map(e=>e.getBoundingClientRect()).filter(r=>r.height>0);return Math.max(...rows.map(r=>r.bottom))+parseFloat(css.paddingBottom)+parseFloat(css.borderBottomWidth);}
function syncHeader(){document.documentElement.style.setProperty('--header-offset',`${compactHeaderBottom()+16}px`);}new ResizeObserver(syncHeader).observe(header);syncHeader();
function syncViewport(){const v=window.visualViewport;document.documentElement.style.setProperty('--visual-height',`${v?v.height:innerHeight}px`);document.documentElement.style.setProperty('--visual-top',`${v?v.offsetTop:0}px`);}window.visualViewport?.addEventListener('resize',syncViewport);window.visualViewport?.addEventListener('scroll',syncViewport);addEventListener('resize',syncViewport);syncViewport();
header.querySelector('a').addEventListener('click',e=>{if(menuState==='open'){e.preventDefault();closeMenu('#inicio');}});
// Desktop pointer drag complements native touch scrolling; links and buttons remain clickable.
function enableMouseDrag(track){let startX=0,startScroll=0,dragging=false,active=false;track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('a,button,input,select'))return;active=true;dragging=false;startX=e.clientX;startScroll=track.scrollLeft;});track.addEventListener('pointermove',e=>{if(!active)return;const dx=e.clientX-startX;if(Math.abs(dx)>5){dragging=true;track.setPointerCapture(e.pointerId);track.classList.add('is-dragging');track.scrollLeft=startScroll-dx;e.preventDefault();}});function end(){active=false;track.classList.remove('is-dragging');setTimeout(()=>dragging=false,0);}track.addEventListener('pointerup',end);window.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);track.addEventListener('click',e=>{if(dragging){e.preventDefault();e.stopPropagation();}},true);}
enableMouseDrag($('#cards'));const reviewTrack=document.querySelector('.review-cards');if(reviewTrack)enableMouseDrag(reviewTrack);

// Track the section actually crossing the reading line below the compact header.
const sectionLinks=[...document.querySelectorAll('header nav a[href^="#"],footer nav a[href^="#"]')];
const trackedSections=[...document.querySelectorAll('main section[id]')].filter(section=>sectionLinks.some(link=>link.hash==='#'+section.id));
let currentSection='',sectionFrame;
function markSection(id){if(!id)return;currentSection=id;for(const link of sectionLinks){if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
function updateSection(){if(locked)return;const line=Math.min(innerHeight*.35,compactHeaderBottom()+80);let active=trackedSections[0]?.id;for(const section of trackedSections)if(section.getBoundingClientRect().top<=line)active=section.id;markSection(active);}
function queueSection(){cancelAnimationFrame(sectionFrame);sectionFrame=requestAnimationFrame(updateSection);}
for(const link of sectionLinks)link.addEventListener('click',()=>markSection(link.hash.slice(1)));
addEventListener('scroll',queueSection,{passive:true});addEventListener('resize',queueSection);document.fonts.ready.then(queueSection);queueSection();

// Hero alternatives are selected explicitly; there is no automatic text rotation.
const heroHeadlines={A:'Cuidado que une saúde, estética e bem-estar.',B:'Seu sorriso, sua saúde, seu bem-estar.',C:'Um olhar integrado para cuidar de você.',D:'Cuidado e harmonia em cada detalhe.'};
const heroChoice=new URLSearchParams(location.search).get('hero');if(heroChoice&&Object.hasOwn(heroHeadlines,heroChoice))document.querySelector('.hero h1').textContent=heroHeadlines[heroChoice];

// Keep the portrait-inspired loops small on narrow displays, with vertical continuity.
(()=>{const mobile=matchMedia('(max-width:767px)');function sizePattern(){document.querySelectorAll('.organic-layer').forEach(svg=>svg.setAttribute('viewBox',mobile.matches?'0 0 900 1800':'0 0 1200 900'));}mobile.addEventListener('change',sizePattern);sizePattern();})();
