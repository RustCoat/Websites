var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function l(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}function u(t,n,e){return t.set(e),n}function i(t,n){t.appendChild(n)}function s(t,n,e){t.insertBefore(n,e||null)}function a(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function h(){return d("")}function m(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function g(t){return function(n){return n.preventDefault(),t.call(this,n)}}function $(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function b(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function v(t,n){t.value=null==n?"":n}function k(t,n,e,o){null===e?t.style.removeProperty(n):t.style.setProperty(n,e,o?"important":"")}let y;function x(t){y=t}function _(){if(!y)throw new Error("Function called outside component initialization");return y}const w=[],E=[],j=[],q=[],C=Promise.resolve();let M=!1;function N(t){j.push(t)}const z=new Set;let A=0;function S(){const t=y;do{for(;A<w.length;){const t=w[A];A++,x(t),T(t.$$)}for(x(null),w.length=0,A=0;E.length;)E.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];z.has(n)||(z.add(n),n())}j.length=0}while(w.length);for(;q.length;)q.pop()();M=!1,z.clear(),x(t)}function T(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const L=new Set;let O;function P(t,n){t&&t.i&&(L.delete(t),t.i(n))}function B(t,n,e,o){if(t&&t.o){if(L.has(t))return;L.add(t),O.c.push((()=>{L.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function D(t,n){const e=n.token={};function r(t,r,c,l){if(n.token!==e)return;n.resolved=l;let u=n.ctx;void 0!==c&&(u=u.slice(),u[c]=l);const i=t&&(n.current=t)(u);let s=!1;n.block&&(n.blocks?n.blocks.forEach(((t,e)=>{e!==r&&t&&(O={r:0,c:[],p:O},B(t,1,1,(()=>{n.blocks[e]===t&&(n.blocks[e]=null)})),O.r||o(O.c),O=O.p)})):n.block.d(1),i.c(),P(i,1),i.m(n.mount(),n.anchor),s=!0),n.block=i,n.blocks&&(n.blocks[r]=i),s&&S()}if((c=t)&&"object"==typeof c&&"function"==typeof c.then){const e=_();if(t.then((t=>{x(e),r(n.then,1,n.value,t),x(null)}),(t=>{if(x(e),r(n.catch,2,n.error,t),x(null),!n.hasCatch)throw t})),n.current!==n.pending)return r(n.pending,0),!0}else{if(n.current!==n.then)return r(n.then,1,n.value,t),!0;n.resolved=t}var c}function F(t){t&&t.c()}function H(t,e,c,l){const{fragment:u,on_mount:i,on_destroy:s,after_update:a}=t.$$;u&&u.m(e,c),l||N((()=>{const e=i.map(n).filter(r);s?s.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(N)}function G(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function I(t,n){-1===t.$$.dirty[0]&&(w.push(t),M||(M=!0,C.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function J(n,r,c,l,u,i,s,f=[-1]){const d=y;x(n);const p=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:u,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:e(),dirty:f,skip_bound:!1,root:r.target||d.$$.root};s&&s(p.root);let h=!1;if(p.ctx=c?c(n,r.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return p.ctx&&u(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),h&&I(n,t)),e})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!l&&l(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();r.intro&&P(n.$$.fragment),H(n,r.target,r.anchor,r.customElement),S()}x(d)}class K{$destroy(){G(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Q(t,n,e){const o=t.slice();return o[1]=n[e],o}function R(n){let e;return{c(){e=f("h2"),e.textContent="No results",$(e,"style","text-align: center; important")},m(t,n){s(t,e,n)},p:t,d(t){t&&a(e)}}}function U(t){let n,e=t[0].data.items,o=[];for(let n=0;n<e.length;n+=1)o[n]=V(Q(t,e,n));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();n=h()},m(t,e){for(let n=0;n<o.length;n+=1)o[n].m(t,e);s(t,n,e)},p(t,r){if(1&r){let c;for(e=t[0].data.items,c=0;c<e.length;c+=1){const l=Q(t,e,c);o[c]?o[c].p(l,r):(o[c]=V(l),o[c].c(),o[c].m(n.parentNode,n))}for(;c<o.length;c+=1)o[c].d(1);o.length=e.length}},d(t){!function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(o,t),t&&a(n)}}}function V(t){let n,e,o,r,c,l,u,h,m,g,v,y=t[1].name+"",x=X(t[1].description,60)+"",_=t[1].published_at.split("T")[0]+"";return{c(){n=f("div"),e=f("a"),o=d(y),c=p(),l=f("p"),u=d(x),h=p(),m=f("p"),g=d(_),v=p(),$(e,"href",r=t[1].url),$(e,"target","_blank;"),$(l,"class","svelte-sll86s"),k(m,"text-align","right"),$(m,"class","svelte-sll86s"),$(n,"class","result svelte-sll86s")},m(t,r){s(t,n,r),i(n,e),i(e,o),i(n,c),i(n,l),i(l,u),i(n,h),i(n,m),i(m,g),i(n,v)},p(t,n){1&n&&y!==(y=t[1].name+"")&&b(o,y),1&n&&r!==(r=t[1].url)&&$(e,"href",r),1&n&&x!==(x=X(t[1].description,60)+"")&&b(u,x),1&n&&_!==(_=t[1].published_at.split("T")[0]+"")&&b(g,_)},d(t){t&&a(n)}}}function W(n){let e;function o(t,n){return null!=t[0]&&"data"in t[0]&&"items"in t[0].data&&t[0].data.items.length>0?U:t[0]&&0==t[0].data.items.length?R:void 0}let r=o(n),c=r&&r(n);return{c(){e=f("div"),c&&c.c()},m(t,n){s(t,e,n),c&&c.m(e,null)},p(t,[n]){r===(r=o(t))&&c?c.p(t,n):(c&&c.d(1),c=r&&r(t),c&&(c.c(),c.m(e,null)))},i:t,o:t,d(t){t&&a(e),c&&c.d()}}}function X(t,n){if(null==t)return"No description";let e=0,o="";for(let r=0;r<t.length;r++){if(" "==t[r]&&e++,e>=n)return o+"...";o+=t[r]}return console.log(e),t}function Y(t,n,e){let{json:o}=n;return t.$$set=t=>{"json"in t&&e(0,o=t.json)},[o]}class Z extends K{constructor(t){super(),J(this,t,Y,W,c,{json:0})}}const tt=[];const nt=function(n,e=t){let o;const r=new Set;function l(t){if(c(n,t)&&(n=t,o)){const t=!tt.length;for(const t of r)t[1](),tt.push(t,n);if(t){for(let t=0;t<tt.length;t+=2)tt[t][0](tt[t+1]);tt.length=0}}}return{set:l,update:function(t){l(t(n))},subscribe:function(c,u=t){const i=[c,u];return r.add(i),1===r.size&&(o=e(l)||t),c(n),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}();function et(t){let n,e,r,c,l,u,d;return{c(){n=f("div"),e=f("h3"),e.textContent="Miskolczi",r=p(),c=f("form"),l=f("input"),k(e,"display","inline-block"),k(e,"margin-right","1em"),$(e,"class","svelte-6ucvdq"),$(l,"placeholder","Search"),$(l,"class","svelte-6ucvdq"),k(c,"display","inline-block"),$(c,"class","svelte-6ucvdq"),$(n,"class","svelte-6ucvdq")},m(o,a){s(o,n,a),i(n,e),i(n,r),i(n,c),i(c,l),v(l,t[1]),u||(d=[m(l,"input",t[6]),m(c,"submit",g(t[7]))],u=!0)},p(t,n){2&n&&l.value!==t[1]&&v(l,t[1])},d(t){t&&a(n),u=!1,o(d)}}}function ot(t){let n,e,r,c,l,u;return{c(){n=f("h1"),n.textContent="Miskolczi",e=p(),r=f("form"),c=f("input"),k(n,"font-size","5em"),$(n,"class","svelte-6ucvdq"),$(c,"placeholder","Search"),$(c,"class","svelte-6ucvdq"),$(r,"class","svelte-6ucvdq")},m(o,a){s(o,n,a),s(o,e,a),s(o,r,a),i(r,c),v(c,t[1]),l||(u=[m(c,"input",t[4]),m(r,"submit",g(t[5]))],l=!0)},p(t,n){2&n&&c.value!==t[1]&&v(c,t[1])},d(t){t&&a(n),t&&a(e),t&&a(r),l=!1,o(u)}}}function rt(n){let e;function o(t,n){return t[0]?et:ot}let r=o(n),c=r(n);return{c(){c.c(),e=h()},m(t,n){c.m(t,n),s(t,e,n)},p(t,[n]){r===(r=o(t))&&c?c.p(t,n):(c.d(1),c=r(t),c&&(c.c(),c.m(e.parentNode,e)))},i:t,o:t,d(t){c.d(t),t&&a(e)}}}function ct(t,n,e){let o;l(t,nt,(t=>e(2,o=t)));let r,c=!1;async function i(){const t=await fetch("https://demo.dataverse.org/api/search?q="+r),n=await t.json();if(t.ok)return n;throw new Error(n)}return[c,r,o,i,function(){r=this.value,e(1,r)},()=>{u(nt,o=i(),o),e(0,c=!0)},function(){r=this.value,e(1,r)},()=>{u(nt,o=i(),o)}]}class lt extends K{constructor(t){super(),J(this,t,ct,rt,c,{})}}function ut(n){let e;return{c(){e=f("div"),e.innerHTML='<svg viewBox="0 0 300 300" style="width: 300px; height: 300px"><circle r="5px" fill="#706E65"><animateMotion dur="1" repeatCount="indefinite" path="M 150 250 A 50 50 0 1 1 150 50 A 50 50 0 1 1 150 250"></animateMotion></circle></svg>'},m(t,n){s(t,e,n)},p:t,i:t,o:t,d(t){t&&a(e)}}}class it extends K{constructor(t){super(),J(this,t,null,ut,c,{})}}function st(n){let e,o,r=n[2].message+"";return{c(){e=f("h2"),o=d(r)},m(t,n){s(t,e,n),i(e,o)},p(t,n){1&n&&r!==(r=t[2].message+"")&&b(o,r)},i:t,o:t,d(t){t&&a(e)}}}function at(t){let n,e;return n=new Z({props:{json:t[1]}}),{c(){F(n.$$.fragment)},m(t,o){H(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.json=t[1]),n.$set(o)},i(t){e||(P(n.$$.fragment,t),e=!0)},o(t){B(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function ft(n){let e,o;return e=new it({}),{c(){F(e.$$.fragment)},m(t,n){H(e,t,n),o=!0},p:t,i(t){o||(P(e.$$.fragment,t),o=!0)},o(t){B(e.$$.fragment,t),o=!1},d(t){G(e,t)}}}function dt(t){let n,e,o,r,c;e=new lt({});let l={ctx:t,current:null,token:null,hasCatch:!0,pending:ft,then:at,catch:st,value:1,error:2,blocks:[,,,]};return D(r=t[0],l),{c(){n=f("main"),F(e.$$.fragment),o=p(),l.block.c()},m(t,r){s(t,n,r),H(e,n,null),i(n,o),l.block.m(n,l.anchor=null),l.mount=()=>n,l.anchor=null,c=!0},p(n,[e]){t=n,l.ctx=t,1&e&&r!==(r=t[0])&&D(r,l)||function(t,n,e){const o=n.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,e)}(l,t,e)},i(t){c||(P(e.$$.fragment,t),P(l.block),c=!0)},o(t){B(e.$$.fragment,t);for(let t=0;t<3;t+=1){B(l.blocks[t])}c=!1},d(t){t&&a(n),G(e),l.block.d(),l.token=null,l=null}}}function pt(t,n,e){let o;return l(t,nt,(t=>e(0,o=t))),[o]}return new class extends K{constructor(t){super(),J(this,t,pt,dt,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
