import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as a}from"./assets/vendor-77e16229.js";let o=null,i=null;const r=document.querySelector("button[data-start]");r.addEventListener("click",T);r.setAttribute("disabled","disabled");const h=document.querySelector("span[data-days]"),y=document.querySelector("span[data-hours]"),S=document.querySelector("span[data-minutes]"),g=document.querySelector("span[data-seconds]"),v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onOpen(){clearInterval(o),o=null,d(0)},onClose(e){i=e[0].getTime(),D(i)}};f("#datetime-picker",v);function D(e){const t=new Date().getTime();e>t?r.removeAttribute("disabled"):(a.error({title:"Error",message:"Please choose a date in the future"}),r.setAttribute("disabled","disabled"))}function T(e){if(e.preventDefault(),o){a.warning({title:"Warning",message:"The timer has already started!"});return}r.setAttribute("disabled","disabled"),document.querySelector("#datetime-picker").setAttribute("disabled","disabled"),o=setInterval(()=>{const t=new Date().getTime(),n=i-t;if(n<=0){a.success({title:"Success",message:"Timer is completed!"}),clearInterval(o),d(0),document.querySelector("#datetime-picker").removeAttribute("disabled");return}d(n)},1e3)}function d(e){const{days:t,hours:n,minutes:c,seconds:u}=q(e);h.textContent=s(t),y.textContent=s(n),S.textContent=s(c),g.textContent=s(u)}function q(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),p=Math.floor(e%864e5%36e5/6e4),b=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:p,seconds:b}}function s(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
