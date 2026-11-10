const menu=document.querySelector('.menu');const nav=document.querySelector('#nav-links');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelector('#year').textContent=new Date().getFullYear();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}

// Email chooser: mailto links do nothing on machines without a configured mail app,
// so offer webmail and copy options that always work.
(function(){
  const EMAIL='vaibhavskolekar@gmail.com', SUBJECT="Let's connect";
  const enc=encodeURIComponent;
  const m=document.createElement('div');
  m.className='mail-modal';m.hidden=true;
  m.innerHTML=`<div class="mail-backdrop" data-close></div>
  <div class="mail-box" role="dialog" aria-modal="true" aria-labelledby="mail-title">
    <button class="mail-x" data-close aria-label="Close">✕</button>
    <div class="section-tag" id="mail-title">GET IN TOUCH</div>
    <p class="mail-addr">${EMAIL}</p>
    <div class="mail-opts">
      <a class="mail-opt primary-opt" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&to=${enc(EMAIL)}&su=${enc(SUBJECT)}">Gmail <span>↗</span></a>
      <a class="mail-opt" target="_blank" rel="noopener" href="https://outlook.office.com/mail/deeplink/compose?to=${enc(EMAIL)}&subject=${enc(SUBJECT)}">Outlook <span>↗</span></a>
      <a class="mail-opt" href="mailto:${EMAIL}?subject=${enc(SUBJECT)}">Mail app <span>↗</span></a>
      <button class="mail-opt" type="button" data-copy>Copy email <span>⧉</span></button>
    </div>
  </div>`;
  document.body.appendChild(m);
  const copyBtn=m.querySelector('[data-copy]');
  let last=null;
  const open=()=>{last=document.activeElement;m.hidden=false;document.body.style.overflow='hidden';m.querySelector('.mail-opt').focus()};
  const close=()=>{m.hidden=true;document.body.style.overflow='';copyBtn.innerHTML='Copy email <span>⧉</span>';last&&last.focus()};
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{if(!m.contains(a))a.addEventListener('click',e=>{e.preventDefault();open()})});
  m.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close();else if(e.target.closest('.mail-opt:not([data-copy])'))setTimeout(close,300)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!m.hidden)close()});
  copyBtn.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(EMAIL)}catch(_){const t=document.createElement('textarea');t.value=EMAIL;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
    copyBtn.innerHTML='Copied! <span>✓</span>';
  });
})();
