// Native links keep every article readable, shareable and usable without JavaScript.
const progress = document.querySelector('.reading-progress span');
const body = document.querySelector('.reading-body');
const contents = [...document.querySelectorAll('.reading-index a')];
let framePending = false;
function updateReading() {
  framePending = false;
  if (window.ClerianMotion.scroll.isLocked) return;
  const start = body.getBoundingClientRect().top + scrollY;
  const end = start + body.offsetHeight - innerHeight + 120;
  const value = Math.max(0, Math.min(1, (scrollY - start + 120) / Math.max(1, end - start + 120)));
  progress.style.transform = `scaleX(${value})`;
  let current;
  contents.forEach(link => {
    const section = document.getElementById(link.hash.slice(1));
    if (section && section.getBoundingClientRect().top < 180) current = link;
    link.removeAttribute('aria-current');
  });
  current?.setAttribute('aria-current', 'location');
}
function scheduleReading() {
  if (!framePending) { framePending = true; requestAnimationFrame(updateReading); }
}
addEventListener('scroll', scheduleReading, { passive:true });
addEventListener('resize', scheduleReading);
addEventListener('pageshow', scheduleReading);
document.addEventListener('clerian:motion-resume',scheduleReading);
document.fonts.ready.then(scheduleReading);
updateReading();

// Open the existing scheduling form in place, without leaving the article.
(() => {
  const modal = document.getElementById('booking-modal');
  const form = document.getElementById('booking-form');
  if (!modal || !form) return;
  const close = modal.querySelector('.modal-close');
  const status = document.getElementById('form-status');
  const motion = window.ClerianMotion;
  document.querySelectorAll('[data-article-book]').forEach(button => {
    button.addEventListener('click', () => {
      if (modal.open) return;
      form.reset();
      form.elements.nome.setCustomValidity('');
      status.textContent = '';
      motion.dialog.open(modal,{trigger:button,initialFocus:close});
    });
  });
  close.addEventListener('click',()=>motion.dialog.close(modal));
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  form.elements.data.min = today.toISOString().slice(0, 10);
  form.elements.nome.addEventListener('input', () => form.elements.nome.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.elements.nome.value.trim()) form.elements.nome.setCustomValidity('Informe seu nome para continuar.');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = ['Olá, Clerian! Gostaria de conversar sobre um atendimento.'];
    for (const [key, label] of [['nome','Nome'],['area','Área de interesse'],['data','Data de preferência'],['periodo','Período'],['observacoes','Observações']]) {
      let value = String(data.get(key) || '').trim();
      if (!value) continue;
      if (key === 'data') value = value.split('-').reverse().join('/');
      lines.push(`${label}: ${value}`);
    }
    window.open(`https://wa.me/5511992584747?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
    status.textContent = 'Continue no WhatsApp para enviar sua mensagem. O atendimento será confirmado pela equipe.';
  });
})();
