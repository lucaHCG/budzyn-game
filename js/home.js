// js/home.js
(() => {
  // --- Simple debug banner so we know JS actually runs ---
  function banner(msg, ok=true){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = `position:fixed;left:8px;bottom:8px;padding:6px 10px;border-radius:8px;
      font:12px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Inter,Roboto,Arial;
      color:${ok?'#064e3b':'#7f1d1d'};background:${ok?'#d1fae5':'#fee2e2'};z-index:9999`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 2500);
  }

  // ---- Data ----
  const PEOPLE = [
    {key:"luca",  name:"Luca",  color:"#1f2a44"},
    {key:"sylwia",name:"Sylwia",color:"#ff7a00"},
    {key:"oli",   name:"Oli",   color:"#e10600"},
    {key:"vicky", name:"Vicky", color:"#ff5fa2"},
    {key:"leon",  name:"Leon",  color:"#8a8a8a"},
    {key:"nela",  name:"Nela",  color:"#dc143c"},
  ];
  const SELECTED = new Set();

  // ---- Helpers ----
  function hexToRgb(hex){
    const m = hex.replace('#','');
    const r = m.length===3 ? parseInt(m[0]+m[0],16) : parseInt(m.slice(0,2),16);
    const g = m.length===3 ? parseInt(m[1]+m[1],16) : parseInt(m.slice(2,4),16);
    const b = m.length===3 ? parseInt(m[2]+m[2],16) : parseInt(m.slice(4,6),16);
    return {r,g,b};
  }
  function bestFg(hex){
    const {r,g,b} = hexToRgb(hex);
    const yiq = (r*299 + g*587 + b*114) / 1000;
    return yiq >= 140 ? '#111' : '#fff';
  }

  function renderCards(){
    const box = document.getElementById('cards');
    if(!box){ banner('Nie znaleziono #cards', false); return; }
    box.innerHTML = '';

    PEOPLE.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'cardP';
      card.style.setProperty('--bg', p.color);
      card.style.setProperty('--fg', bestFg(p.color));
      card.dataset.key = p.key;

      const avatar = document.createElement('div');
      avatar.className = 'avatar';

      const img = document.createElement('img');
      img.src = `assets/avatars/${p.key}.png`;
      img.alt = p.name;
      img.onerror = ()=>{ img.remove(); avatar.textContent = p.name[0]; };

      const info = document.createElement('div');
      info.className = 'cardInfo';
      const b = document.createElement('b');
      b.textContent = p.name;
      info.appendChild(b);

      avatar.appendChild(img);
      card.appendChild(avatar);
      card.appendChild(info);

      card.addEventListener('click', ()=>{
        const k = card.dataset.key;
        if(SELECTED.has(k)) SELECTED.delete(k); else SELECTED.add(k);
        card.classList.toggle('selected');
        document.getElementById('startBtn').disabled = !(
