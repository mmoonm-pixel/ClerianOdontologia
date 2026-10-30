(() => {
  const modal = document.getElementById('article-modal');
  const scrollport = modal.querySelector('.article-scroll');
  const content = modal.querySelector('.article-modal-content');
  const progress = modal.querySelector('.article-progress span');
  const motion = window.ClerianMotion;
  const articles = window.ClerianArticles;
  let slug, originTrigger, ownsEntry = false;
  let previousRestoration = history.scrollRestoration;
  function fromURL() { const value = new URL(location.href).searchParams.get('artigo'); return articles[value] ? value : null; }
  function cardFor(value) { return document.querySelector(`.editorial-card[href*="/${value}/"]`); }
  function updateProgress() {
    const distance = scrollport.scrollHeight - scrollport.clientHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1,scrollport.scrollTop/distance) : 0})`;
  }
  function show(value,trigger,push = true) {
    if (!articles[value]) return;
    const opening = !modal.open;
    if (!modal.open) {
      originTrigger = trigger || cardFor(value);
      previousRestoration = history.scrollRestoration;
      history.scrollRestoration = 'manual';
    }
    if (push) {
      const url = new URL(location.href);
      url.searchParams.set('artigo',value);
      const state = {...history.state,clerianArticle:value,clerianArticleScroll:{x:scrollX,y:scrollY}};
      if (modal.open) history.replaceState(state,'',url); else { history.pushState(state,'',url); ownsEntry = true; }
    }
    if (slug !== value || !content.children.length) {
      slug = value;
      content.innerHTML = articles[value].html;
      scrollport.scrollTop = 0;
      updateProgress();
    }
    motion.dialog.open(modal, {
      trigger:originTrigger, initialFocus:modal.querySelector('[data-article-back]'), onRequestClose:requestClose,
      afterClose:() => {
        requestAnimationFrame(() => { if (!modal.open) history.scrollRestoration = previousRestoration; });
      }
    });
    if (opening) { scrollport.scrollTop = 0; updateProgress(); }
  }
  function close() {
    const booking = document.getElementById('booking-modal');
    if (booking.open) return motion.dialog.close(booking).then(() => motion.dialog.close(modal));
    return motion.dialog.close(modal);
  }
  function requestClose() {
    close();
    if (ownsEntry && history.state?.clerianArticle) { ownsEntry = false; history.back(); }
    else {
      const url = new URL(location.href);url.searchParams.delete('artigo');
      const state = {...history.state};delete state.clerianArticle;delete state.clerianArticleScroll;
      history.replaceState(state,'',url);
    }
  }
  modal.querySelector('[data-article-back]').addEventListener('click',requestClose);
  modal.querySelector('[data-article-close]').addEventListener('click',requestClose);
  document.addEventListener('click',event => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('.editorial-card,.reading-related a');
    if (!link || link.target || !link.closest('main,#article-modal')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    const match = url.pathname.match(/^\/conteudos\/([^/]+)\/?$/);
    if (!match || !articles[match[1]]) return;
    event.preventDefault();show(match[1],link);
  });
  modal.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = content.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();
    scrollport.scrollTo({top:target.getBoundingClientRect().top-scrollport.getBoundingClientRect().top+scrollport.scrollTop-20,behavior:motion.reduced.matches?'instant':'smooth'});
  });
  scrollport.addEventListener('scroll',updateProgress,{passive:true});
  addEventListener('popstate',event => {
    const value = fromURL();
    if (value) {
      ownsEntry = !!event.state?.clerianArticle;
      if (!modal.open && event.state?.clerianArticleScroll) {
        const point = event.state.clerianArticleScroll;
        window.scrollTo({left:point.x,top:point.y,behavior:'instant'});
      }
      show(value,cardFor(value),false);
    } else { ownsEntry = false;close(); }
  });
  const initial = fromURL();
  if (initial) {
    // Establish the listing only on a freshly opened shared URL, never on return.
    document.getElementById('conteudos').scrollIntoView({behavior:'instant'});
    show(initial,cardFor(initial),false);
  }
})();
