const PEOPLE=[
  {key:"luca",name:"Luca",color:"#1f2a44"},
  {key:"sylwia",name:"Sylwia",color:"#ff7a00"},
  {key:"oli",name:"Oli",color:"#e10600"},
  {key:"vicky",name:"Vicky",color:"#ff5fa2"},
  {key:"leon",name:"Leon",color:"#8a8a8a"},
  {key:"nela",name:"Nela",color:"#dc143c"}
];
const SELECTED=new Set();

function hexToRgb(hex){const m=hex.replace('#','');const bigint=parseInt(m,16);const r=(bigint>>16)&255;const g=(bigint>>8)&255;const b=bigint&255;return{r,g,b};}
function bestFg(hex){const{r,g,b}=hexToRgb(hex);const yiq=(r*299+g*587+b*114)/1000;return yiq>=140?'#111':'#fff';}

function cardHtml(p){const fg=bestFg(p.color);return`
  <div class="cardP" data-key="${p.key}" style="background:${p.color};color:${fg}">
    <div class="avatar"><img src="assets/avatars/${p.key}.png" alt="${p.name}"></div>
    <div class="cardInfo">${p.name}</div>
  </div>`;}

function renderCards(){const box=document.getElementById('cards');box.innerHTML=PEOPLE.map(cardHtml).join('');box.querySelectorAll('.cardP').forEach(el=>{el.onclick=()=>{const k=el.dataset.key;if(SELECTED.has(k))SELECTED.delete(k);else SELECTED.add(k);el.classList.toggle('selected');document.getElementById('startBtn').disabled=!(SELECTED.size>=2&&SELECTED.size<=4);};});}
renderCards();

let musicOn=false;
document.getElementById('toggleMusic').onclick=()=>{musicOn=!musicOn;localStorage.setItem('music',musicOn?'on':'off');document.getElementById('toggleMusic').textContent=musicOn?'🔊 Muzyka':'🔈 Muzyka';};
document.getElementById('startBtn').onclick=()=>{localStorage.setItem('players',JSON.stringify([...SELECTED]));location.href='game.html';};
