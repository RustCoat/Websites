var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,l;function i(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function a(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function m(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function g(){return d("")}function v(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t){l=t}const b=[],w=[],x=[],_=[],k=Promise.resolve();let C=!1;function A(t){x.push(t)}const B=new Set;let N=0;function E(){const t=l;do{for(;N<b.length;){const t=b[N];N++,y(t),F(t.$$)}for(y(null),b.length=0,N=0;w.length;)w.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];B.has(e)||(B.add(e),e())}x.length=0}while(b.length);for(;_.length;)_.pop()();C=!1,B.clear(),y(t)}function F(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const T=new Set;let M;function j(){M={r:0,c:[],p:M}}function P(){M.r||o(M.c),M=M.p}function I(t,e){t&&t.i&&(T.delete(t),t.i(e))}function L(t,e,n,o){if(t&&t.o){if(T.has(t))return;T.add(t),M.c.push((()=>{T.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function H(t,n,r,c){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,r),c||A((()=>{const n=i.map(e).filter(s);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(A)}function R(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&(b.push(t),C||(C=!0,k.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(e,s,r,c,i,a,u,m=[-1]){const h=l;y(e);const d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(h?h.$$.context:[])),callbacks:n(),dirty:m,skip_bound:!1,root:s.target||h.$$.root};u&&u(d.root);let p=!1;if(d.ctx=r?r(e,s.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),p&&S(e,t)),n})):[],d.update(),p=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(f)}else d.fragment&&d.fragment.c();s.intro&&I(e.$$.fragment),H(e,s.target,s.anchor,s.customElement),E()}y(h)}class O{$destroy(){R(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function V(t){let e,n,o,s,r,c,l,m,g,y,b,w,x=t[0].Name+"";return{c(){e=h("div"),n=h("h1"),o=d(x),s=p(),r=h("video"),c=h("track"),l=h("source"),g=p(),y=h("p"),y.textContent="Close",$(n,"position","absolute"),$(n,"top","1em"),$(n,"class","svelte-1rdfh3n"),$(c,"kind","captions"),i(l.src,m=t[0].File)||$(l,"src",m),$(l,"type","video/mp4"),$(r,"height","90%"),$(r,"width","90%"),r.controls=!0,r.muted=!0,r.autoplay=!0,$(y,"class","close svelte-1rdfh3n"),$(e,"class","video svelte-1rdfh3n")},m(i,f){u(i,e,f),a(e,n),a(n,o),a(e,s),a(e,r),a(r,c),a(r,l),a(e,g),a(e,y),b||(w=v(y,"click",t[5]),b=!0)},p(t,e){1&e&&x!==(x=t[0].Name+"")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,x),1&e&&!i(l.src,m=t[0].File)&&$(l,"src",m)},d(t){t&&f(e),b=!1,w()}}}function U(t){let e,n=t[1]&&V(t);return{c(){n&&n.c(),e=g()},m(t,o){n&&n.m(t,o),u(t,e,o)},p(t,o){t[1]?n?n.p(t,o):(n=V(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&f(e)}}}function W(e){let n,o,s,c,l,a,m=e[1],d=U(e);return{c(){n=h("img"),s=p(),d.c(),c=g(),i(n.src,o=e[0].Image)||$(n,"src",o),$(n,"alt",""),$(n,"class","svelte-1rdfh3n")},m(t,o){u(t,n,o),u(t,s,o),d.m(t,o),u(t,c,o),l||(a=v(n,"click",e[4]),l=!0)},p(t,[e]){1&e&&!i(n.src,o=t[0].Image)&&$(n,"src",o),2&e&&r(m,m=t[1])?(d.d(1),d=U(t),d.c(),d.m(c.parentNode,c)):d.p(t,e)},i:t,o:t,d(t){t&&f(n),t&&f(s),t&&f(c),d.d(t),l=!1,a()}}}function q(t,e,n){let{movie:o}=e;var s=!1;function r(){window.hasFocused||(n(1,s=!0),window.hasFocused=!0)}function c(){s&&(n(1,s=!1),window.hasFocused=!1)}return t.$$set=t=>{"movie"in t&&n(0,o=t.movie)},[o,s,r,c,()=>{r()},()=>{c()}]}class J extends O{constructor(t){super(),D(this,t,q,W,r,{movie:0})}}function Q(t,e,n){const o=t.slice();return o[3]=e[n],o[5]=n,o}function z(t,e,n){const o=t.slice();return o[3]=e[n],o[5]=n,o}function G(e){let n,o;return n=new J({props:{movie:e[1][Math.floor(Math.random()*e[1].length)]}}),{c(){var t;(t=n.$$.fragment)&&t.c()},m(t,e){H(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){L(n.$$.fragment,t),o=!1},d(t){R(n,t)}}}function K(t){let e,n,o,s,r,c,l,i=t[0][t[5]]+"",g=Array(5),v=[];for(let e=0;e<g.length;e+=1)v[e]=G(z(t,g,e));const y=t=>L(v[t],1,1,(()=>{v[t]=null}));return{c(){e=h("div"),n=h("h2"),o=d(i),s=p(),r=h("div");for(let t=0;t<v.length;t+=1)v[t].c();c=p(),$(n,"class","category svelte-m1h44o"),$(r,"class","row svelte-m1h44o")},m(t,i){u(t,e,i),a(e,n),a(n,o),a(e,s),a(e,r);for(let t=0;t<v.length;t+=1)v[t].m(r,null);a(e,c),l=!0},p(t,e){if(2&e){let n;for(g=Array(5),n=0;n<g.length;n+=1){const o=z(t,g,n);v[n]?(v[n].p(o,e),I(v[n],1)):(v[n]=G(o),v[n].c(),I(v[n],1),v[n].m(r,null))}for(j(),n=g.length;n<v.length;n+=1)y(n);P()}},i(t){if(!l){for(let t=0;t<g.length;t+=1)I(v[t]);l=!0}},o(t){v=v.filter(Boolean);for(let t=0;t<v.length;t+=1)L(v[t]);l=!1},d(t){t&&f(e),m(v,t)}}}function X(t){let e,n,o,s,r,c,l,i=Array(5),d=[];for(let e=0;e<i.length;e+=1)d[e]=K(Q(t,i,e));const g=t=>L(d[t],1,1,(()=>{d[t]=null}));return{c(){e=h("main"),n=h("div"),n.innerHTML='<img src="Netflix.jpg" alt="" style="width: 100px; height 100px"/> \n\t\t<p class="svelte-m1h44o">TV Shows</p> \n\t\t<p class="svelte-m1h44o">Movies</p> \n\t\t<p class="svelte-m1h44o">Recently Added</p> \n\t\t<p class="svelte-m1h44o">My List</p>',o=p(),s=h("div");for(let t=0;t<d.length;t+=1)d[t].c();r=p(),c=h("div"),c.innerHTML='<img src="Netflix.jpg" alt="" style="width: 150px; height: 150px;"/> \n\t\t<div style="width: fit-content;"><div class="bottom-row svelte-m1h44o"><p class="svelte-m1h44o">FAQ</p>  <p class="svelte-m1h44o">Help Centre</p>  <p class="svelte-m1h44o">Investor Relations</p>  <p class="svelte-m1h44o">Jobs</p></div> \n\t\t\t<div class="bottom-row svelte-m1h44o"><p class="svelte-m1h44o">Redeem gift</p>  <p class="svelte-m1h44o">Buy gift cards</p>  <p class="svelte-m1h44o">Ways to Watch</p>  <p class="svelte-m1h44o">Terms of Use</p></div> \n\t\t\t<div class="bottom-row svelte-m1h44o"><p class="svelte-m1h44o">Privacy</p>  <p class="svelte-m1h44o">Cookie Preferences</p>  <p class="svelte-m1h44o">Corporate Information</p>  <p class="svelte-m1h44o">Contact Us</p></div></div>',$(n,"class","banner svelte-m1h44o"),$(s,"class","column svelte-m1h44o"),$(c,"class","bottom svelte-m1h44o"),$(e,"class","svelte-m1h44o")},m(t,i){u(t,e,i),a(e,n),a(e,o),a(e,s);for(let t=0;t<d.length;t+=1)d[t].m(s,null);a(e,r),a(e,c),l=!0},p(t,[e]){if(3&e){let n;for(i=Array(5),n=0;n<i.length;n+=1){const o=Q(t,i,n);d[n]?(d[n].p(o,e),I(d[n],1)):(d[n]=K(o),d[n].c(),I(d[n],1),d[n].m(s,null))}for(j(),n=i.length;n<d.length;n+=1)g(n);P()}},i(t){if(!l){for(let t=0;t<i.length;t+=1)I(d[t]);l=!0}},o(t){d=d.filter(Boolean);for(let t=0;t<d.length;t+=1)L(d[t]);l=!1},d(t){t&&f(e),m(d,t)}}}function Y(t){window.hasFocused=!1;class e{constructor(t,e,n){this.File=t,this.Image=e,this.Name=n}}return[["Drama","Horror","Thriller","Romance","Action"],[new e("https://sveltejs.github.io/assets/caminandes-llamigos.mp4","https://raw.githubusercontent.com/PalCoat/assets/main/Caminandes.png","The Caminandes Adventure"),new e("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","https://raw.githubusercontent.com/PalCoat/assets/main/BigBunny.png","Big Buck Bunny"),new e("https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SintelVideo.mp4","https://raw.githubusercontent.com/PalCoat/assets/main/Duran.png","Duran")]]}return new class extends O{constructor(t){super(),D(this,t,Y,X,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
