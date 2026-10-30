// The 24 texts and five-star ratings were supplied/confirmed by the site owner.
(() => {
 const track=document.querySelector('#reviews-track');if(!track)return;
 const cards=[...track.querySelectorAll('.review-card')];
 const prev=document.querySelector('#reviews-prev'),next=document.querySelector('#reviews-next');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,frame,gesture,suppressUntil=0;
 function sync(){
  const inset=parseFloat(getComputedStyle(track).paddingLeft),target=track.scrollLeft+inset;
  active=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.offsetLeft-target)<Math.abs(cards[best].offsetLeft-track.offsetLeft-target)?i:best,0);
  cards.forEach((card,i)=>card.classList.toggle('is-active',i===active));
  prev.disabled=active===0;next.disabled=active===cards.length-1;
 }
 function go(index){const card=cards[Math.max(0,Math.min(cards.length-1,index))];track.scrollTo({left:card.offsetLeft-track.offsetLeft-parseFloat(getComputedStyle(track).paddingLeft),behavior:reduced.matches?'instant':'smooth'})}
 prev.addEventListener('click',()=>go(active-1));next.addEventListener('click',()=>go(active+1));
 track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync)},{passive:true});
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();go(event.key==='Home'?0:event.key==='End'?cards.length-1:active+(event.key==='ArrowRight'?1:-1))}});
 track.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;gesture={id:event.pointerId,x:event.clientX,y:event.clientY,scroll:track.scrollLeft,moved:false,type:event.pointerType}});
 track.addEventListener('pointermove',event=>{if(!gesture||gesture.id!==event.pointerId)return;const dx=event.clientX-gesture.x;if(Math.hypot(dx,event.clientY-gesture.y)>8)gesture.moved=true;if(gesture.moved&&gesture.type==='mouse'){track.setPointerCapture(event.pointerId);track.classList.add('is-dragging');track.scrollLeft=gesture.scroll-dx;event.preventDefault()}});
 function finish(event){if(!gesture||gesture.id!==event.pointerId)return;if(gesture.moved||event.type==='pointercancel')suppressUntil=performance.now()+250;if(gesture.type==='mouse'&&gesture.moved){track.classList.remove('is-dragging');sync();go(active)}gesture=null}
 track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);window.addEventListener('pointerup',finish);
 track.addEventListener('click',event=>{
  const button=event.target.closest('.review-more');if(!button)return;
  if(event.detail!==0&&performance.now()<suppressUntil){event.preventDefault();return;}
  const card=button.closest('.review-card'),expanded=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(expanded));card.querySelector('.review-rest').hidden=!expanded;card.querySelector('.review-ellipsis').hidden=expanded;
  button.textContent=expanded?'Recolher relato':'Ler relato completo';
 });
 new ResizeObserver(sync).observe(track);sync();
})();
