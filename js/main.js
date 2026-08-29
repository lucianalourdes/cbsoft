// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile menu toggle ----------
var menuToggle = document.getElementById('menu-toggle');
var mobileMenu = document.getElementById('mobile-menu');
var menuOpen = false;
function setMenu(open){
  menuOpen = open;
  menuToggle.setAttribute('aria-expanded', String(open));
  if(open){
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    mobileMenu.style.opacity = '1';
  } else {
    mobileMenu.style.maxHeight = '0px';
    mobileMenu.style.opacity = '0';
  }
  var bars = menuToggle.querySelectorAll('[data-bar]');
  bars[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
  bars[1].style.opacity = open ? '0' : '1';
  bars[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
}
menuToggle.addEventListener('click', function(){ setMenu(!menuOpen); });
mobileMenu.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){ setMenu(false); });
});

// ---------- Language toggle (PT default / EN via data-en attributes) ----------
var i18nEls = document.querySelectorAll('[data-en]');
i18nEls.forEach(function(el){ el.dataset.pt = el.innerHTML; });
function setLang(lang){
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  i18nEls.forEach(function(el){
    el.innerHTML = lang === 'pt' ? el.dataset.pt : el.dataset.en;
  });
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  try { localStorage.setItem('cbsoft-lang', lang); } catch(e){}
}
document.querySelectorAll('.lang-btn').forEach(function(btn){
  btn.addEventListener('click', function(){ setLang(btn.dataset.lang); });
});
(function(){
  var saved = 'pt';
  try { saved = localStorage.getItem('cbsoft-lang') || 'pt'; } catch(e){}
  if(saved === 'en') setLang('en');
})();

// ---------- Countdown to submission deadline ----------
var deadline = new Date('2027-03-15T23:59:59-03:00').getTime();
function tickCountdown(){
  var now = Date.now();
  var diff = Math.max(0, deadline - now);
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  var pad = function(n){ return String(n).padStart(2,'0'); };
  document.querySelector('[data-cd="d"]').textContent = pad(d);
  document.querySelector('[data-cd="h"]').textContent = pad(h);
  document.querySelector('[data-cd="m"]').textContent = pad(m);
  document.querySelector('[data-cd="s"]').textContent = pad(s);
}
tickCountdown();
setInterval(tickCountdown, 1000);

// ---------- Scroll reveal ----------
var revealTargets = document.querySelectorAll('#sobre, #eventos, #cfp, #palestrantes, #inscricoes, #comite, #patrocinio');
revealTargets.forEach(function(el){ el.classList.add('reveal'); });
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(function(el){ io.observe(el); });
} else {
  revealTargets.forEach(function(el){ el.classList.add('in'); });
}
