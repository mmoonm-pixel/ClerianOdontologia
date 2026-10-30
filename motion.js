// Shared motion, nested native dialogs and iOS-compatible scroll preservation.
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const owners = new Set();
  const records = new WeakMap();
  const stack = [];
  let saved, freezeVersion = 0, originalAnchor;
  const bodyProperties = ['position','top','left','width'];
  const scroll = {
    get isLocked() { return owners.size > 0; },
    lock(owner) {
      if (owners.has(owner)) return;
      owners.add(owner);
      if (owners.size > 1) return;
      ++freezeVersion;
      if (!root.dataset.motionFrozen) originalAnchor = root.style.overflowAnchor;
      root.style.overflowAnchor = 'none';
      saved = { x:scrollX, y:scrollY, styles:bodyProperties.map(key => document.body.style[key]), overflow:root.style.overflow, gutter:root.style.scrollbarGutter };
      root.dataset.motionFrozen = 'true';
      root.dataset.scrollLocked = 'true';
      const width = root.clientWidth;
      // Reserve space only if a real classic scrollbar was consuming it.
      if (innerWidth - width > 0) root.style.scrollbarGutter = 'stable';
      Object.assign(document.body.style, { position:'fixed', top:`-${saved.y}px`, left:`-${saved.x}px`, width:`${width}px` });
      root.style.overflow = 'hidden';
    },
    unlock(owner) {
      if (!owners.delete(owner) || owners.size) return;
      bodyProperties.forEach((key,index) => document.body.style[key] = saved.styles[index]);
      root.style.overflow = saved.overflow;
      root.style.scrollbarGutter = saved.gutter;
      // The global scroll behaviour is auto; restoration is always immediate.
      window.scrollTo({ left:saved.x, top:saved.y, behavior:'instant' });
      delete root.dataset.scrollLocked;
      const version = ++freezeVersion;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!owners.size && version === freezeVersion) {
          root.style.overflowAnchor = originalAnchor;
          delete root.dataset.motionFrozen;
          document.dispatchEvent(new Event('clerian:motion-resume'));
        }
      }));
    }
  };
  function duration(name) {
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
  }
  function token(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  function viewport() {
    if (!stack.length) return;
    const visual = window.visualViewport;
    root.style.setProperty('--dialog-viewport', `${visual?.height || innerHeight}px`);
    root.style.setProperty('--dialog-viewport-top', `${visual?.offsetTop || 0}px`);
    root.classList.toggle('dialog-keyboard', !!visual && visual.height < innerHeight * .78);
  }
  function syncStack() {
    stack.forEach((dialog,index) => dialog.setAttribute('aria-modal', String(index === stack.length - 1)));
    if (!stack.length) root.classList.remove('dialog-keyboard');
    viewport();
  }
  function outside(dialog,event) {
    const box = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom);
  }
  function register(dialog) {
    if (records.has(dialog)) return records.get(dialog);
    const record = { generation:0, closing:null, animation:null, options:{} };
    records.set(dialog,record);
    dialog.classList.add('motion-dialog');
    dialog.setAttribute('aria-modal','true');
    let pointerOutside = false;
    dialog.addEventListener('pointerdown', event => pointerOutside = outside(dialog,event));
    dialog.addEventListener('pointercancel', () => pointerOutside = false);
    dialog.addEventListener('click', event => {
      if (pointerOutside && outside(dialog,event)) requestClose(dialog);
      pointerOutside = false;
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); requestClose(dialog); });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || stack.at(-1) !== dialog) return;
      const targets = [...dialog.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.disabled && element.getClientRects().length && !element.closest('[hidden],[inert]'));
      if (!targets.length) { event.preventDefault(); dialog.focus({preventScroll:true}); return; }
      const first = targets[0], last = targets.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus({preventScroll:true}); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus({preventScroll:true}); }
    });
    dialog.addEventListener('close', () => {
      ++record.generation;
      record.animation?.cancel();
      delete dialog.dataset.phase;
      const index = stack.indexOf(dialog);
      if (index !== -1) stack.splice(index,1);
      scroll.unlock(dialog);
      syncStack();
      const trigger = record.options.trigger;
      if (trigger?.isConnected && !trigger.closest('[inert]') && (!stack.length || stack.at(-1).contains(trigger))) trigger.focus({preventScroll:true});
      record.options.afterClose?.();
    });
    return record;
  }
  function open(dialog,options = {}) {
    const record = register(dialog);
    const wasOpen = dialog.open;
    if (wasOpen && !record.closing) return;
    const current = wasOpen ? getComputedStyle(dialog) : null;
    const from = wasOpen ? { opacity:current.opacity, transform:current.transform } : {
      opacity:0, transform:`translate3d(0,${token('--motion-distance')},0) scale(${token('--motion-scale')})`
    };
    ++record.generation;
    record.animation?.cancel();
    record.closing = null;
    record.options = options;
    dialog.style.setProperty('--backdrop-opacity-start', wasOpen ? getComputedStyle(dialog,'::backdrop').opacity : '0');
    dialog.dataset.phase = 'entering';
    if (!wasOpen) {
      scroll.lock(dialog);
      stack.push(dialog);
      dialog.showModal();
      syncStack();
      dialog.scrollTop = 0;
      (options.initialFocus || dialog.querySelector('button') || dialog).focus({preventScroll:true});
    }
    if (reduced.matches) { dialog.dataset.phase = 'open'; return; }
    const generation = record.generation;
    record.animation = dialog.animate([from,{opacity:1,transform:'translate3d(0,0,0) scale(1)'}], {
      duration:duration('--motion-dialog'), easing:token('--motion-enter')
    });
    record.animation.finished.then(() => { if (record.generation === generation) dialog.dataset.phase = 'open'; }).catch(() => {});
  }
  function close(dialog) {
    const record = register(dialog);
    if (!dialog.open) return Promise.resolve();
    if (record.closing) return record.closing;
    const style = getComputedStyle(dialog);
    const from = {opacity:style.opacity,transform:style.transform};
    dialog.style.setProperty('--backdrop-opacity-start',getComputedStyle(dialog,'::backdrop').opacity);
    const generation = ++record.generation;
    record.animation?.cancel();
    dialog.dataset.phase = 'closing';
    if (reduced.matches) { dialog.close(); return Promise.resolve(); }
    const animation = record.animation = dialog.animate([from,{opacity:0,transform:`translate3d(0,12px,0) scale(${token('--motion-scale')})`}], {
      duration:duration('--motion-exit'), easing:token('--motion-leave'), fill:'forwards'
    });
    record.closing = animation.finished.then(() => {
      if (record.generation === generation) dialog.close();
    }).catch(() => {}).finally(() => { if (record.generation === generation) record.closing = null; });
    return record.closing;
  }
  function requestClose(dialog) {
    const callback = records.get(dialog)?.options.onRequestClose;
    return callback ? callback() : close(dialog);
  }
  window.ClerianMotion = { scroll, dialog:{open,close,requestClose}, reduced };
  window.visualViewport?.addEventListener('resize',viewport);
  window.visualViewport?.addEventListener('scroll',viewport);

  // Smooth scrolling belongs only to deliberate anchor navigation.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.closest('#article-modal')) return;
    const url = new URL(link.href);
    if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    if (!target) return;
    event.preventDefault();
    history.replaceState(history.state,'',url.href);
    target.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
  });
  const atmosphericSections = [...document.querySelectorAll('.services,.essence,.editorial-section,.reviews-section,.faq-section,.booking')];
  const atmosphere = new IntersectionObserver(entries => entries.forEach(entry => {
    if (root.dataset.motionFrozen) return;
    entry.target.classList.toggle('atmosphere-active',entry.isIntersecting);
  }), {rootMargin:'100px'});
  atmosphericSections.forEach(section => atmosphere.observe(section));
  document.addEventListener('clerian:motion-resume',() => {
    // Re-evaluate visibility without removing classes or restarting any animation.
    atmosphere.disconnect();
    atmosphericSections.forEach(section => atmosphere.observe(section));
  });
})();
