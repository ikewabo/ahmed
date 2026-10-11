"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const hero=$('#hero-video'),play=$('#hero-play');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
function fmt(s){s=Math.max(0,Math.floor(s||0));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function playbackUI(){play.textContent=hero.ended?'Replay ↻':hero.paused?'Play ▷':'Pause Ⅱ';play.setAttribute('aria-label',hero.ended?'Replay introduction':hero.paused?'Play introduction':'Pause introduction');}
function progress(){const duration=Number.isFinite(hero.duration)?hero.duration:24.59;$('#hero-time').textContent=fmt(hero.currentTime)+' / '+fmt(duration);$('#hero-progress').style.width=(hero.currentTime/duration*100)+'%';}
play.addEventListener('click',()=>{if(hero.ended)hero.currentTime=0;if(hero.paused)hero.play().catch(playbackUI);else hero.pause()});
['play','pause','ended','volumechange'].forEach(e=>hero.addEventListener(e,playbackUI));['timeupdate','loadedmetadata'].forEach(e=>hero.addEventListener(e,progress));
if(reduce.matches){hero.autoplay=false;hero.pause()}else hero.play().catch(playbackUI);
hero.addEventListener('error',()=>{play.textContent='Video unavailable';play.disabled=true});
reduce.addEventListener('change',e=>{if(e.matches)hero.pause()});
// A native non-looping video keeps its final decoded frame when it ends.
playbackUI();progress();
function watch(){if($('#about').open)$('#about').close();$('#watch').scrollIntoView({behavior:reduce.matches?'instant':'smooth'});}
$$('[data-watch]').forEach(b=>b.addEventListener('click',watch));$$('dialog .close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));$('#read-story').addEventListener('click',()=>$('#about').showModal());
$('#share').addEventListener('click',async()=>{const data={title:'Ahmed One Faith — Grace Brought Me Here',text:'One God. One Love. One Voice. Experience Ahmed Revival.',url:location.origin+location.pathname};try{if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(data.url);$('#share-status').textContent='Link copied. Share the journey.'}}catch(e){if(e.name!=='AbortError')$('#share-status').textContent='Share this page by copying its address from your browser.'}});

$$('[data-watch]').forEach(b=>b.addEventListener('click',()=>hero.pause()));
