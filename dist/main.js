(()=>{"use strict";let e;let t,o,c,n=0;const r=document.querySelector(".popup"),a=document.querySelector(".popup-content"),s=()=>{document.body.addEventListener("input",(e=>{var t;e.target.matches("select, .calc-square, .calc-count, .calc-day")||(e.target.value="user_name"===(t=e.target).name?(e=>{const t=e.toLowerCase();return(e=(e=(e=t.replace(/(^[а-яё])/gi,(e=>e.toUpperCase()))).replace(/[^а-яё-\s]/gim,"")).replace(/((^-|-$)|(\s(?=\s)))/gim,"")).replace(/-{2}/gm,"-")})(t.value):"user_email"===t.name?t.value.replace(/[^\w\d@\.\!~\*\'_-]/gi,"").replace(/((^-|-$)|(\s(?=\s)))/g,"").replace(/-{2}/g,"-"):"user_phone"===t.name?t.value.replace(/[^\d()+]/g,"").replace(/(^-|-$)/g,"").replace(/-{2}/g,"-"):"user_message"===t.name?t.value.replace(/[^а-яё\.\?\!-\"\';\:,]/gi,"").replace(/((^-|-$)|(\s(?=\s)))/gim,"").replace(/-{2}/gm,"-"):void 0)}),!0),document.querySelector(".calc-block").addEventListener("blur",(e=>{e.target.matches(".calc-square, .calc-count, .calc-day")&&(e.target.value=e.target.value.replace(/\D/g,""))}),!0)},l=e=>{const t=document.getElementById(e),o=document.createElement("div");t.matches("#form1")?o.style.cssText="font-size: 2rem":t.matches("#form3")?o.style.cssText="font-size: 1.5rem; color: #fff;\n            padding-bottom: 20px":t.matches("#form2")&&(o.style.cssText="font-size: 2rem; \n            margin-top: 30px"),s(),t.addEventListener("submit",(e=>{e.preventDefault(),t.appendChild(o),o.textContent="Загрузка...";const c=new FormData(t),n={};c.forEach(((e,t)=>{n[e]=t})),(e=>fetch("server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(n).then((e=>{if(200!==e.status)throw new Error("status network is not 200");o.textContent="Спасибо! Мы скоро с вами свяжемся!"})).catch((e=>{o.textContent="Что-то пошло не так...",console.error(e)}))}))};(t=>{const o=document.querySelector("#timer-hours"),c=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");e=setInterval((()=>{const r=(()=>{const e=(new Date(t).getTime()-(new Date).getTime())/1e3,o=Math.floor(e%60),c=Math.floor(e/60%60);return{timeRemaining:e,hours:Math.floor(e/60/60),minutes:c,seconds:o}})();r.timeRemaining>0?(String(r.hours).length<2?o.textContent="0"+r.hours:o.textContent=r.hours,String(r.minutes).length<2?c.textContent="0"+r.minutes:c.textContent=r.minutes,String(r.seconds).length<2?n.textContent="0"+r.seconds:n.textContent=r.seconds):(clearInterval(e),o.textContent="00",c.textContent="00",n.textContent="00")}),1e3)})("31 october 2021"),(()=>{const e=document.querySelector("menu");document.addEventListener("click",(t=>{const o=t.target;var c;(o.closest(".menu")||o.closest("menu"))&&(c=o,e.classList.contains("active-menu")?c.matches("a")&&e.classList.remove("active-menu"):e.classList.add("active-menu"))}))})(),(()=>{c=document.body.clientWidth>=768&&document.body.clientWidth<=1e3?400:document.body.clientWidth>1e3&&document.body.clientWidth<1200?1e3:300;const e=()=>{if(document.body.clientWidth>=768){const e=Date.now();o=setInterval((()=>{const t=Date.now()-e;if(t>=c+500)return clearInterval(o),void(r.style.display="none");a.style.top=n-2*t+"px"}),1)}else r.style.display="none"};document.querySelectorAll(".popup-btn").forEach((e=>{e.addEventListener("click",(()=>{if(document.body.clientWidth>=768){const e=Date.now();t=setInterval((()=>{const o=Date.now()-e;if(o>=c)return clearInterval(t),void(n=o);r.style.display="block",a.style.left=r.clientWidth/2-a.clientWidth/2+60+"px",a.style.top=o+"px"}),2)}else r.style.display="block"}))})),r.addEventListener("click",(t=>{let o=t.target;o.classList.contains("popup-close")?e():(o=o.closest(".popup-content"),o||e())}))})(),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{let c=e.target;c=c.closest(".service-header-tab"),c&&t.forEach(((e,n)=>{e===c&&(e=>{for(let c=0;c<o.length;c++)e===c?(t[c].classList.add("active"),o[c].classList.remove("d-none")):(t[c].classList.remove("active"),o[c].classList.add("d-none"))})(n)}))}))})(),(()=>{const e=document.querySelectorAll(".portfolio-item"),t=document.querySelector(".portfolio-content"),o=document.querySelector(".portfolio-dots");let c,n=0;(()=>{for(let t=0;t<e.length;t++){const e=document.createElement("li");e.classList.add("dot"),o.appendChild(e)}})();const r=document.querySelectorAll(".dot"),a=(e,t,o)=>{e[t].classList.remove(o)},s=(e,t,o)=>{e[t].classList.add(o)},l=()=>{a(e,n,"portfolio-item-active"),a(r,n,"dot-active"),n++,n>=e.length&&(n=0),s(e,n,"portfolio-item-active"),s(r,n,"dot-active")},i=(e=3e3)=>{c=setInterval(l,e)};t.addEventListener("click",(t=>{t.preventDefault();const o=t.target;o.matches(".portfolio-btn, .dot")&&(a(e,n,"portfolio-item-active"),a(r,n,"dot-active"),o.matches("#arrow-right")?n++:o.matches("#arrow-left")?n--:o.matches(".dot")&&r.forEach(((e,t)=>{e===o&&(n=t)})),n>=e.length&&(n=0),n<0&&(n=e.length-1),s(e,n,"portfolio-item-active"),s(r,n,"dot-active"))})),t.addEventListener("mouseover",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(c)})),t.addEventListener("mouseout",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&i()})),i(1500)})(),document.querySelectorAll("#command img").forEach((e=>{const t=e.src;e.addEventListener("mouseenter",(e=>{e.target.src=e.target.dataset.img})),e.addEventListener("mouseleave",(e=>{e.target.src=t}))})),((e=100)=>{const t=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),c=document.querySelector(".calc-day"),n=document.querySelector(".calc-count"),r=document.getElementById("total");s(),document.querySelector(".calc-block").addEventListener("change",(a=>{const s=a.target;(s.matches("select")||s.matches("input"))&&(()=>{let a=0,s=1,l=1;const i=t.options[t.selectedIndex].value,d=o.value;n.value>1&&(s+=(n.value-1)/10),c.value&&c.value<5?l*=2:c.value&&c.value<10&&(l*=1.5),i&&d&&(a=e*i*d*s*l),isNaN(a)||(r.textContent=a.toFixed(2))})()}))})(100),l("form1"),l("form3"),l("form2")})();