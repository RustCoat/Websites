var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,l;function i(t,e){return s||(s=document.createElement("a")),s.href=e,t===s.href}function u(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function m(){return p(" ")}function g(){return p("")}function $(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function v(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t){l=t}const b=[],x=[],w=[],_=[],k=Promise.resolve();let A=!1;function B(t){w.push(t)}const E=new Set;let N=0;function C(){const t=l;do{for(;N<b.length;){const t=b[N];N++,y(t),F(t.$$)}for(y(null),b.length=0,N=0;x.length;)x.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];E.has(e)||(E.add(e),e())}w.length=0}while(b.length);for(;_.length;)_.pop()();A=!1,E.clear(),y(t)}function F(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const M=new Set;let T;function j(){T={r:0,c:[],p:T}}function L(){T.r||o(T.c),T=T.p}function I(t,e){t&&t.i&&(M.delete(t),t.i(e))}function O(t,e,n,o){if(t&&t.o){if(M.has(t))return;M.add(t),T.c.push((()=>{M.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function P(t,n,c,s){const{fragment:l,on_mount:i,on_destroy:u,after_update:a}=t.$$;l&&l.m(n,c),s||B((()=>{const n=i.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(B)}function S(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){-1===t.$$.dirty[0]&&(b.push(t),A||(A=!0,k.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,r,c,s,i,u,a,d=[-1]){const h=l;y(e);const p=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(h?h.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||h.$$.root};a&&a(p.root);let m=!1;if(p.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&i(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&H(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!s&&s(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(f)}else p.fragment&&p.fragment.c();r.intro&&I(e.$$.fragment),P(e,r.target,r.anchor,r.customElement),C()}y(h)}class q{$destroy(){S(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function D(t){let e,n,o,r,c,s,l,d,g,y,b,x,w=t[0].Name+"";return{c(){e=h("div"),n=h("h1"),o=p(w),r=m(),c=h("video"),s=h("track"),l=h("source"),g=m(),y=h("p"),y.textContent="Close",v(n,"position","absolute"),v(n,"top","1em"),v(n,"class","svelte-xghtpe"),v(s,"kind","captions"),i(l.src,d=t[0].File)||v(l,"src",d),v(l,"type","video/mp4"),v(c,"height","90%"),v(c,"width","90%"),c.controls=!0,c.muted=!0,c.autoplay=!0,v(y,"class","close svelte-xghtpe"),v(e,"class","video svelte-xghtpe")},m(i,f){a(i,e,f),u(e,n),u(n,o),u(e,r),u(e,c),u(c,s),u(c,l),u(e,g),u(e,y),b||(x=$(y,"click",t[5]),b=!0)},p(t,e){1&e&&w!==(w=t[0].Name+"")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,w),1&e&&!i(l.src,d=t[0].File)&&v(l,"src",d)},d(t){t&&f(e),b=!1,x()}}}function V(t){let e,n=t[1]&&D(t);return{c(){n&&n.c(),e=g()},m(t,o){n&&n.m(t,o),a(t,e,o)},p(t,o){t[1]?n?n.p(t,o):(n=D(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&f(e)}}}function z(e){let n,o,r,s,l,u,d=e[1],p=V(e);return{c(){n=h("img"),r=m(),p.c(),s=g(),i(n.src,o=e[0].Image)||v(n,"src",o),v(n,"alt",""),v(n,"class","svelte-xghtpe")},m(t,o){a(t,n,o),a(t,r,o),p.m(t,o),a(t,s,o),l||(u=$(n,"click",e[4]),l=!0)},p(t,[e]){1&e&&!i(n.src,o=t[0].Image)&&v(n,"src",o),2&e&&c(d,d=t[1])?(p.d(1),p=V(t),p.c(),p.m(s.parentNode,s)):p.p(t,e)},i:t,o:t,d(t){t&&f(n),t&&f(r),t&&f(s),p.d(t),l=!1,u()}}}function G(t,e,n){let{movie:o}=e;var r=!1;function c(){window.hasFocused||(n(1,r=!0),window.hasFocused=!0)}function s(){r&&(n(1,r=!1),window.hasFocused=!1)}return t.$$set=t=>{"movie"in t&&n(0,o=t.movie)},[o,r,c,s,()=>{c()},()=>{s()}]}class J extends q{constructor(t){super(),R(this,t,G,z,c,{movie:0})}}function K(t,e,n){const o=t.slice();return o[3]=e[n],o[5]=n,o}function Q(t,e,n){const o=t.slice();return o[3]=e[n],o[5]=n,o}function U(e){let n,o;return n=new J({props:{movie:e[1][Math.floor(Math.random()*e[1].length)]}}),{c(){var t;(t=n.$$.fragment)&&t.c()},m(t,e){P(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){O(n.$$.fragment,t),o=!1},d(t){S(n,t)}}}function W(t){let e,n,o,r,c,s,l,i=t[0][t[5]]+"",g=Array(5),$=[];for(let e=0;e<g.length;e+=1)$[e]=U(Q(t,g,e));const y=t=>O($[t],1,1,(()=>{$[t]=null}));return{c(){e=h("div"),n=h("h2"),o=p(i),r=m(),c=h("div");for(let t=0;t<$.length;t+=1)$[t].c();s=m(),v(n,"class","category svelte-1l330v3"),v(c,"class","row svelte-1l330v3")},m(t,i){a(t,e,i),u(e,n),u(n,o),u(e,r),u(e,c);for(let t=0;t<$.length;t+=1)$[t].m(c,null);u(e,s),l=!0},p(t,e){if(2&e){let n;for(g=Array(5),n=0;n<g.length;n+=1){const o=Q(t,g,n);$[n]?($[n].p(o,e),I($[n],1)):($[n]=U(o),$[n].c(),I($[n],1),$[n].m(c,null))}for(j(),n=g.length;n<$.length;n+=1)y(n);L()}},i(t){if(!l){for(let t=0;t<g.length;t+=1)I($[t]);l=!0}},o(t){$=$.filter(Boolean);for(let t=0;t<$.length;t+=1)O($[t]);l=!1},d(t){t&&f(e),d($,t)}}}function X(t){let e,n,o,r,c,s=Array(5),l=[];for(let e=0;e<s.length;e+=1)l[e]=W(K(t,s,e));const i=t=>O(l[t],1,1,(()=>{l[t]=null}));return{c(){e=h("main"),n=h("div"),n.innerHTML='<img src="Netflix.jpg" alt="" style="width: 100px; height 100px"/> \n\t\t<p>TV Shows</p> \n\t\t<p>Movies</p> \n\t\t<p>Recently Added</p> \n\t\t<p>My List</p>',o=m(),r=h("div");for(let t=0;t<l.length;t+=1)l[t].c();v(n,"class","banner svelte-1l330v3"),v(r,"class","column svelte-1l330v3"),v(e,"class","svelte-1l330v3")},m(t,s){a(t,e,s),u(e,n),u(e,o),u(e,r);for(let t=0;t<l.length;t+=1)l[t].m(r,null);c=!0},p(t,[e]){if(3&e){let n;for(s=Array(5),n=0;n<s.length;n+=1){const o=K(t,s,n);l[n]?(l[n].p(o,e),I(l[n],1)):(l[n]=W(o),l[n].c(),I(l[n],1),l[n].m(r,null))}for(j(),n=s.length;n<l.length;n+=1)i(n);L()}},i(t){if(!c){for(let t=0;t<s.length;t+=1)I(l[t]);c=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)O(l[t]);c=!1},d(t){t&&f(e),d(l,t)}}}function Y(t){window.hasFocused=!1;class e{constructor(t,e,n){this.File=t,this.Image=e,this.Name=n}}return[["Drama","Horror","Thriller","Romance","Action"],[new e("https://sveltejs.github.io/assets/caminandes-llamigos.mp4","https://raw.githubusercontent.com/PalCoat/assets/main/Caminandes.png","The Caminandes Adventure"),new e("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","https://raw.githubusercontent.com/PalCoat/assets/main/BigBunny.png","Big Buck Bunny")]]}return new class extends q{constructor(t){super(),R(this,t,Y,X,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
