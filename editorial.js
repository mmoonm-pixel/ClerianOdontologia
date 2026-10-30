// Native links keep every article readable, shareable and usable without JavaScript.
const progress = document.querySelector('.reading-progress span');
const body = document.querySelector('.reading-body');
const contents = [...document.querySelectorAll('.reading-index a')];
let framePending = false;
function updateReading() {
  framePending = false;
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
document.fonts.ready.then(scheduleReading);
updateReading();
