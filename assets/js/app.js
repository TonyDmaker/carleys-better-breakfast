const reviews = [
  {name:"Jess R.", text:"Fast, hot, and actually scratch-made. New fave on my commute!", stars:5},
  {name:"Mike D.", text:"The biscuit roll with gravy is dangerous. In a good way.", stars:5},
  {name:"Erin K.", text:"Got a waffle sandwich and a free coffee at opening. I'm hooked.", stars:4}
];

let reviewIndex = 0;
function rotateReviews(){
  const box = document.getElementById('reviews-box');
  const r = reviews[reviewIndex % reviews.length];
  box.innerHTML = `<div class="review"><b>${"★".repeat(r.stars)}</b> — ${r.text}<br><small class="muted">– ${r.name}</small></div>`;
  reviewIndex++;
}
setInterval(rotateReviews, 3500);
document.addEventListener('DOMContentLoaded', rotateReviews);

// Menu Builder
const prices = {
  base:{Biscuit:3.75,Pancake:3.75,Waffle:3.75,"Tortilla wrap":3.25},
  protein:{None:0,Bacon:1.75,"Sausage patty":1.75,"Country Ham":2.25},
  egg:{Fried:0.75,Scrambled:0.75},
  cheese:{None:0,American:0.50,Cheddar:0.75},
  plate:{None:0,"+2 waffles":2.5,"+2 pancakes":2.0,"+1 biscuit":1.5}
};
function q(id){return document.getElementById(id)}
function calcPrice(){
  const base = document.querySelector('input[name="base"]:checked')?.value || "Biscuit";
  const protein = document.querySelector('input[name="protein"]:checked')?.value || "Bacon";
  const egg = document.querySelector('input[name="egg"]:checked')?.value || "Fried";
  const cheese = document.querySelector('input[name="cheese"]:checked')?.value || "American";
  const plate = document.querySelector('input[name="plate"]:checked')?.value || "None";
  const total = prices.base[base] + prices.protein[protein] + prices.egg[egg] + prices.cheese[cheese] + prices.plate[plate];
  q('build-summary').textContent = `${base} • ${protein} • ${egg} egg • ${cheese}${plate!=="None"?" • "+plate:""}`;
  q('build-price').textContent = `$${total.toFixed(2)}`;
}
document.addEventListener('change', (e)=>{
  if(e.target.matches('input[type="radio"]')) calcPrice();
});
document.addEventListener('DOMContentLoaded', calcPrice);

// Modal
function openModal(id){document.getElementById(id).style.display="flex"}
function closeModal(id){document.getElementById(id).style.display="none"}

// Fake socials loader
function loadSocial(){
  const feed = document.getElementById('social-feed');
  const posts = [
    {img:'assets/img/waffle.png', text:"60-second waffle sandwich test ✅ #BetterBreakfast"},
    {img:'assets/img/biscuit.png', text:"Biscuit Roll with Gravy: pocket of joy."},
    {img:'assets/img/pancake.png', text:"Pancake Sandwich = commute fuel."}
  ];
  feed.innerHTML = posts.map(p=>`<div class="card"><img src="${p.img}"><div class="pad">${p.text}</div></div>`).join('');
}
document.addEventListener('DOMContentLoaded', loadSocial);
