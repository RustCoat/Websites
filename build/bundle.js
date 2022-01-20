var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function i(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(e,n,r){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function u(t){return null==t?"":t}const l="undefined"!=typeof window;let c=l?()=>window.performance.now():()=>Date.now(),a=l?t=>requestAnimationFrame(t):t;const f=new Set;function h(t){f.forEach((e=>{e.c(t)||(f.delete(e),e.f())})),0!==f.size&&a(h)}function d(t,e){t.appendChild(e)}function m(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function b(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function y(){return v(" ")}function w(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t){return""===t?null:+t}function k(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function _(t,e){t.value=null==e?"":e}function A(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}let E;function T(t){E=t}const S=[],C=[],I=[],R=[],j=Promise.resolve();let M=!1;function B(t){I.push(t)}let P=!1;const z=new Set;function N(){if(!P){P=!0;do{for(let t=0;t<S.length;t+=1){const e=S[t];T(e),O(e.$$)}for(T(null),S.length=0;C.length;)C.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];z.has(e)||(z.add(e),e())}I.length=0}while(S.length);for(;R.length;)R.pop()();M=!1,P=!1,z.clear()}}function O(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const D=new Set;function H(t,e){-1===t.$$.dirty[0]&&(S.push(t),M||(M=!0,j.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(o,s,u,l,c,a,f,h=[-1]){const d=E;T(o);const m=o.$$={fragment:null,ctx:null,props:a,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(d?d.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:s.target||d.$$.root};f&&f(m.root);let g=!1;if(m.ctx=u?u(o,s.props||{},((t,e,...n)=>{const r=n.length?n[0]:e;return m.ctx&&c(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),g&&H(o,t)),e})):[],m.update(),g=!0,r(m.before_update),m.fragment=!!l&&l(m.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);m.fragment&&m.fragment.l(t),t.forEach(p)}else m.fragment&&m.fragment.c();s.intro&&((b=o.$$.fragment)&&b.i&&(D.delete(b),b.i(v))),function(t,n,o,s){const{fragment:u,on_mount:l,on_destroy:c,after_update:a}=t.$$;u&&u.m(n,o),s||B((()=>{const n=l.map(e).filter(i);c?c.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(B)}(o,s.target,s.anchor,s.customElement),N()}var b,v;T(d)}const L=[];function F(t){return"[object Date]"===Object.prototype.toString.call(t)}function U(t,e,n,r){if("number"==typeof n||F(n)){const i=r-n,o=(n-e)/(t.dt||1/60),s=(o+(t.opts.stiffness*i-t.opts.damping*o)*t.inv_mass)*t.dt;return Math.abs(s)<t.opts.precision&&Math.abs(i)<t.opts.precision?r:(t.settled=!1,F(n)?new Date(n.getTime()+s):n+s)}if(Array.isArray(n))return n.map(((i,o)=>U(t,e[o],n[o],r[o])));if("object"==typeof n){const i={};for(const o in n)i[o]=U(t,e[o],n[o],r[o]);return i}throw new Error(`Cannot spring ${typeof n} values`)}function W(e,n={}){const r=function(e,n=t){let r;const i=new Set;function s(t){if(o(e,t)&&(e=t,r)){const t=!L.length;for(const t of i)t[1](),L.push(t,e);if(t){for(let t=0;t<L.length;t+=2)L[t][0](L[t+1]);L.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(o,u=t){const l=[o,u];return i.add(l),1===i.size&&(r=n(s)||t),o(e),()=>{i.delete(l),0===i.size&&(r(),r=null)}}}}(e),{stiffness:i=.15,damping:s=.8,precision:u=.01}=n;let l,d,m,p=e,g=e,b=1,v=0,y=!1;function w(t,n={}){g=t;const i=m={};if(null==e||n.hard||x.stiffness>=1&&x.damping>=1)return y=!0,l=c(),p=t,r.set(e=g),Promise.resolve();if(n.soft){const t=!0===n.soft?.5:+n.soft;v=1/(60*t),b=0}return d||(l=c(),y=!1,d=function(t){let e;return 0===f.size&&a(h),{promise:new Promise((n=>{f.add(e={c:t,f:n})})),abort(){f.delete(e)}}}((t=>{if(y)return y=!1,d=null,!1;b=Math.min(b+v,1);const n={inv_mass:b,opts:x,settled:!0,dt:60*(t-l)/1e3},i=U(n,p,e,g);return l=t,p=e,r.set(e=i),n.settled&&(d=null),!n.settled}))),new Promise((t=>{d.promise.then((()=>{i===m&&t()}))}))}const x={set:w,update:(t,n)=>w(t(g,e),n),subscribe:r.subscribe,stiffness:i,damping:s,precision:u};return x}class G{constructor(t,e){this.validateTime(t,e)&&(this.hour=t,this.minute=e,this.minuteRevolution=0,this.hourRevolition=0)}setAlarm(t,e){this.validateTime(t,e)&&(this.alarmHour=t,this.alarmMinute=e,this.alarmIsActive=!0,this.alarmTriggered=!1)}validateTime(t,e){if(t>=24||t<0)throw RangeError("hour value must be >= 0 and < 24");if(e>=60||e<0)throw new RangeError("minute value must be >= 0 and < 60");return!0}tick(){this.minute<59?this.minute++:(this.minute=0,this.minuteRevolution++,this.hour<23?this.hour++:(this.hour=0,this.hourRevolition++)),this.alarmIsActive&&this.hour==this.alarmHour&&this.minute==this.alarmMinute&&(this.alarmTriggered=!0)}get time(){return(1==this.hour.toString().length?"0"+this.hour.toString():this.hour)+":"+(1==this.minute.toString().length?"0"+this.minute.toString():this.minute)}}function J(t,e,n){const r=t.slice();return r[20]=e[n],r}function K(t){let e,n;return{c(){e=b("line"),x(e,"y1","-36"),x(e,"y2","-40"),A(e,"stroke","white"),x(e,"transform",n="rotate("+30*t[20]+")")},m(t,n){m(t,e,n)},d(t){t&&p(e)}}}function Q(e){let n,r,i;return{c(){n=g("h1"),n.textContent="Wake Up!"},m(t,o){m(t,n,o),r||(i=w(n,"click",e[13]),r=!0)},p:t,d(t){t&&p(n),r=!1,i()}}}function V(e){let n,i,o,s,l,c,a,f,h,$,E,T,S,C,I,R,j,M,B,P,z,N,O,D,H,q,L,F,U,W,G,V,X,Y,Z,tt,et,nt,rt,it,ot,st,ut,lt,ct,at,ft,ht,dt,mt,pt,gt,bt,vt,yt,wt,xt,$t,kt,_t,At,Et,Tt,St,Ct,It,Rt,jt=e[0].time+"",Mt=e[0].minute+"",Bt=e[0].hour+"",Pt=[0,1,2,3,4,5,6,7,8,9,10,11],zt=[];for(let t=0;t<12;t+=1)zt[t]=K(J(e,Pt,t));let Nt=e[0].alarmTriggered&&Q(e);return{c(){n=g("main"),i=g("div"),o=g("h1"),o.textContent="Best website ever!",s=y(),l=g("h2"),c=v(jt),a=y(),f=g("div"),h=b("svg"),$=b("rect"),T=b("rect"),C=y(),I=b("svg"),R=b("circle");for(let t=0;t<12;t+=1)zt[t].c();j=b("line"),B=b("line"),z=y(),N=b("svg"),O=b("circle"),D=b("g"),H=b("line"),q=b("text"),L=v(Mt),U=b("g"),W=b("line"),G=b("text"),V=v(Bt),Y=y(),Z=g("div"),Nt&&Nt.c(),tt=y(),et=g("div"),nt=g("div"),rt=g("h1"),rt.textContent="Hour",it=y(),ot=g("input"),st=g("p"),ut=v(e[2]),lt=g("br"),ct=y(),at=g("h1"),at.textContent="Minute",ft=y(),ht=g("input"),dt=g("p"),mt=v(e[1]),pt=g("br"),gt=y(),bt=g("button"),bt.textContent="Set",vt=g("br"),yt=y(),wt=g("button"),xt=v("Toggle Alarm "),kt=g("br"),_t=y(),At=g("button"),At.textContent="Tick",Tt=y(),St=g("button"),St.textContent="...",x($,"x","52"),x($,"y","2"),x($,"rx","2px"),x($,"ry","2px"),x($,"height",E=4*e[4]+3),x($,"width","47"),A($,"stroke","white"),A($,"fill","none"),x(T,"x","1"),x(T,"y","2"),x(T,"rx","2px"),x(T,"ry","2px"),x(T,"height",S=1.6*e[5]+3),x(T,"width","48"),A(T,"stroke","white"),A(T,"fill","none"),x(h,"viewBox","0 0 100 100"),x(h,"style","width:25%; height=25%"),A(R,"stroke","white"),A(R,"fill","none"),x(R,"r","48"),x(j,"y1","-45"),x(j,"y2","-48"),A(j,"stroke","white"),x(j,"transform",M="rotate("+6*e[6]+")"),x(B,"y1","-42"),x(B,"y2","-48"),A(B,"stroke","white"),x(B,"transform",P="rotate("+30*e[7]+")"),x(I,"viewBox","-50 -50 100 100"),x(I,"style","width:25%; height=25%"),A(O,"stroke","white"),A(O,"fill","none"),x(O,"r","48"),x(H,"y1","-45"),x(H,"y2","-48"),A(H,"stroke","white"),x(q,"y","-30"),x(q,"x","-4.5"),A(q,"fill","white"),x(D,"transform",F="rotate("+6*e[6]+")"),x(W,"y1","-42"),x(W,"y2","-48"),A(W,"stroke","white"),x(G,"y","-30"),x(G,"x","-4.5"),A(G,"fill","white"),x(U,"transform",X="rotate("+30*e[7]+")"),x(N,"viewBox","-50 -50 100 100"),x(N,"style","width:25%; height=25%"),x(f,"id","adjust"),x(f,"class","svelte-15193of"),x(ot,"type","range"),x(ot,"max","23"),x(ht,"type","range"),x(ht,"max","59"),x(wt,"class",$t=u(e[0].alarmIsActive?"checked":"")+" svelte-15193of"),x(nt,"style",Et=e[3]?"visibility: hidden":""),A(St,"position","absolute"),A(St,"top","50%"),A(St,"right","1%"),x(et,"class",Ct=u(e[3]?"hidden":"shown")+" svelte-15193of"),A(et,"position","fixed"),A(et,"top","0%"),A(et,"height","100%"),A(et,"width","25%"),A(et,"background","linear-gradient(-140deg, gray, black)"),A(et,"border-radius","5px"),x(n,"class","svelte-15193of")},m(t,r){m(t,n,r),d(n,i),d(i,o),d(i,s),d(i,l),d(l,c),d(n,a),d(n,f),d(f,h),d(h,$),d(h,T),d(f,C),d(f,I),d(I,R);for(let t=0;t<12;t+=1)zt[t].m(I,null);d(I,j),d(I,B),d(f,z),d(f,N),d(N,O),d(N,D),d(D,H),d(D,q),d(q,L),d(N,U),d(U,W),d(U,G),d(G,V),d(n,Y),d(n,Z),Nt&&Nt.m(Z,null),d(n,tt),d(n,et),d(et,nt),d(nt,rt),d(nt,it),d(nt,ot),_(ot,e[2]),d(nt,st),d(st,ut),d(nt,lt),d(nt,ct),d(nt,at),d(nt,ft),d(nt,ht),_(ht,e[1]),d(nt,dt),d(dt,mt),d(nt,pt),d(nt,gt),d(nt,bt),d(nt,vt),d(nt,yt),d(nt,wt),d(wt,xt),d(nt,kt),d(nt,_t),d(nt,At),d(et,Tt),d(et,St),It||(Rt=[w(ot,"change",e[14]),w(ot,"input",e[14]),w(ht,"change",e[15]),w(ht,"input",e[15]),w(bt,"click",e[16]),w(wt,"click",e[17]),w(At,"click",e[18]),w(St,"click",e[19])],It=!0)},p(t,[e]){1&e&&jt!==(jt=t[0].time+"")&&k(c,jt),16&e&&E!==(E=4*t[4]+3)&&x($,"height",E),32&e&&S!==(S=1.6*t[5]+3)&&x(T,"height",S),64&e&&M!==(M="rotate("+6*t[6]+")")&&x(j,"transform",M),128&e&&P!==(P="rotate("+30*t[7]+")")&&x(B,"transform",P),1&e&&Mt!==(Mt=t[0].minute+"")&&k(L,Mt),64&e&&F!==(F="rotate("+6*t[6]+")")&&x(D,"transform",F),1&e&&Bt!==(Bt=t[0].hour+"")&&k(V,Bt),128&e&&X!==(X="rotate("+30*t[7]+")")&&x(U,"transform",X),t[0].alarmTriggered?Nt?Nt.p(t,e):(Nt=Q(t),Nt.c(),Nt.m(Z,null)):Nt&&(Nt.d(1),Nt=null),4&e&&_(ot,t[2]),4&e&&k(ut,t[2]),2&e&&_(ht,t[1]),2&e&&k(mt,t[1]),1&e&&$t!==($t=u(t[0].alarmIsActive?"checked":"")+" svelte-15193of")&&x(wt,"class",$t),8&e&&Et!==(Et=t[3]?"visibility: hidden":"")&&x(nt,"style",Et),8&e&&Ct!==(Ct=u(t[3]?"hidden":"shown")+" svelte-15193of")&&x(et,"class",Ct)},i:t,o:t,d(t){t&&p(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(zt,t),Nt&&Nt.d(),It=!1,r(Rt)}}}function X(t,e,n){let r,i,o,u,l=new G(0,0),c=W(l.minute);s(t,c,(t=>n(6,o=t)));let a=W(l.hour);s(t,a,(t=>n(7,u=t)));let f=W(l.minute);s(t,f,(t=>n(5,i=t)));let h=W(l.hour);function d(){l.tick(),n(0,l),c.set(l.minute+60*l.minuteRevolution),a.set(l.hour+24*l.hourRevolition),f.set(l.minute),h.set(l.hour)}s(t,h,(t=>n(4,r=t))),setInterval(d,1e3);let m=0,p=0,g=!0;return[l,m,p,g,r,i,o,u,c,a,f,h,d,()=>{n(0,l.alarmTriggered=!1,l)},function(){p=$(this.value),n(2,p)},function(){m=$(this.value),n(1,m)},()=>{n(0,l.alarmIsActive=!1,l),l.setAlarm(p,m)},()=>{n(0,l.alarmIsActive=!l.alarmIsActive,l)},()=>{d()},()=>{n(3,g=!g)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),q(this,t,X,V,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
