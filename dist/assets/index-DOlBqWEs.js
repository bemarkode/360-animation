import{V as v,S as Q,M as Ve,a as X,B as ce,I as fe,Q as ne,C as A,b as g,c as K,A as Ie,D as ge,H as ke,d as He,P as Ne,W as We,e as Pe,f as Y,g as he,h as $e,F as q,i as le,j as U,k as Ge,l as ze,m as T,U as F,n as N,o as L,p as W,L as je,q as Qe,O as Ke,r as De,s as $,t as G,N as qe,u as Xe,v as Ye,G as Je,w as Ze,x as et}from"./three-RR_pPRk4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();function me(a,e,t){const s=t.length-a-1;if(e>=t[s])return s-1;if(e<=t[a])return a;let i=a,n=s,r=Math.floor((i+n)/2);for(;e<t[r]||e>=t[r+1];)e<t[r]?n=r:i=r,r=Math.floor((i+n)/2);return r}function Se(a,e,t,s){const i=[],n=[],r=[];i[0]=1;for(let o=1;o<=t;++o){n[o]=e-s[a+1-o],r[o]=s[a+o]-e;let l=0;for(let c=0;c<o;++c){const h=r[c+1],u=n[o-c],d=i[c]/(h+u);i[c]=l+h*d,l=u*d}i[o]=l}return i}function tt(a,e,t,s,i,n,r,o){const l=me(a,n,t),c=me(e,r,s),h=Se(l,n,a,t),u=Se(c,r,e,s),d=[];for(let b=0;b<=e;++b){d[b]=new v(0,0,0,0);for(let f=0;f<=a;++f){const S=i[l-a+f][c-e+b].clone(),C=S.w;S.x*=C,S.y*=C,S.z*=C,d[b].add(S.multiplyScalar(h[f]))}}const m=new v(0,0,0,0);for(let b=0;b<=e;++b)m.add(d[b].multiplyScalar(u[b]));m.divideScalar(m.w),o.set(m.x,m.y,m.z)}class st{constructor(e,t,s,i,n){this.degree1=e,this.degree2=t,this.knots1=s,this.knots2=i,this.controlPoints=[];const r=s.length-e-1,o=i.length-t-1;for(let l=0;l<r;++l){this.controlPoints[l]=[];for(let c=0;c<o;++c){const h=n[l][c];this.controlPoints[l][c]=new v(h.x,h.y,h.z,h.w)}}}getPoint(e,t,s){const i=this.knots1[0]+e*(this.knots1[this.knots1.length-1]-this.knots1[0]),n=this.knots2[0]+t*(this.knots2[this.knots2.length-1]-this.knots2[0]);tt(this.degree1,this.degree2,this.knots1,this.knots2,this.controlPoints,i,n,s)}}const it=[[new v(4002.11,-2088.98,-357.08,1),new v(850.3,-2088.98,-850.43,1),new v(-1160.93,-2088.98,-919.62,1),new v(-3691.48,-2088.98,297.74,1)],[new v(4002.11,36.67,785.51,1),new v(850.3,36.67,737.97,1),new v(-1160.93,36.67,-530.51,1),new v(-3691.48,36.67,-254.06,1)],[new v(4002.11,2052.32,-339.91,1),new v(850.3,2052.32,-570.9,1),new v(-1160.93,2052.32,500.07,1),new v(-3691.48,2052.32,1501.25,1)]];function nt(a,e,t){const s=ve(e,a.length),i=ve(t,a[0].length);return new st(e,t,s,i,a)}function ve(a,e){const t=[];for(let s=0;s<=a;s++)t.push(0);for(let s=1;s<e-a;s++)t.push(s/(e-a));for(let s=0;s<=a;s++)t.push(1);return t}const ue=nt(it,2,3);function at(a,e){const t=new Q(15,32,32),s=new Q(25,32,32),i=new Ve({vertexColors:!1,metalness:.1,roughness:.1,emissive:131586}),n=new X({side:ce}),r=a*e,o=new fe(t,i,r),l=new fe(s,n,r),c=new K,h=new g,u=new g(1,1,1),d=[],m=[];for(let f=0;f<r;f++){const S=Math.floor(f/e),C=f%e,B=C/(e-1);let M=S/(a-1);ue.getPoint(B,M,h),c.compose(h,new ne,u),o.setMatrixAt(f,c),l.setMatrixAt(f,c);const P=Math.random()<.75?"good":"bad";d.push({index:f,col:S,row:C,cols:a,rows:e,u:B,v:M,status:P,visible:!0,position:h.clone(),rowor:new A(16777215),isAnimating:!1,scale:new g(1,1,1),rotation:new ne,scanned:!1}),m.push({index:f,col:S,row:C,u:B,v:M,status:P,visible:!1,position:h.clone(),rowor:new A(16777215),isAnimating:!1,scale:new g(0,0,0),rotation:new ne,scanned:!1})}function b(){const f=new K;d.forEach((S,C)=>{f.compose(S.position,S.rotation,S.scale),o.setMatrixAt(C,f)}),m.forEach((S,C)=>{f.compose(S.position,S.rotation,S.scale),l.setMatrixAt(C,f)}),o.instanceMatrix.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0}return gsap.ticker.add(b),{spheres:o,spheresData:d,updateInstancedMesh:b,errorSpheres:l,errorData:m}}function rt(a){const e=new Ie(16777215,1.75);a.add(e);const t=new ge(16777215,1);t.position.set(0,50,50).normalize(),a.add(t);const s=new ge(16777215,1);s.position.set(-400,-100,80),a.add(s);const i=new ke(16777147,526368,.8);a.add(i)}const ot=()=>new He,lt=()=>{const a=new Ne(25,1,.1,2e4),e=new g(0,0,0);return a.position.set(e.x,e.y-4e3,e.z+750),a.lookAt(e),a},ct=()=>{const a=new We({antialias:!0,alpha:!0,powerPreference:"high-performance",stencil:!1,depth:!0});return a.setSize(600,600),a.localClippingEnabled=!0,a};function J(a,e,t){return a.status=Math.random()<.75?"good":"bad",a.scanned=!1,a.visible=!0,a.highlightedIssue=!1,ue.getPoint(a.u,0,a.position),a.row=Math.floor(e/t.cols),a.col=e%t.cols,a.scale.set(1,1,1),a}function Z(a,e){return a.v=(a.v-e+1)%1,ue.getPoint(a.u,a.v,a.position),a}function ee(a){return a.v>.99}function _e(a,e,t){const s=a.visible,i=a.v>=.5&&a.v<.5+e,n=t%10===0,r=!a.scanned;return s&&i&&n&&r}function ht(a){const e=new A;return a.highlightedIssue?e.setHex(16711680):a.status==="good"&&!a.scanned?e.setHex(16777215):a.status==="bad"&&!a.scanned?e.setHex(16759739):a.status==="good"&&a.scanned?e.setHex(65280):e.setHex(16711680),e}function te(a,e,t){const s=ht(a);e.setColorAt(t,s),e.instanceColor.needsUpdate=!0}function se(a,e,t){const s=new K,i=a.visible?a.scale:new g(0,0,0);s.compose(a.position,a.rotation,i),e.setMatrixAt(t,s),e.instanceMatrix.needsUpdate=!0}class ut{constructor(){this.state={renderer:null,camera:null,flowSpeed:3/4900,scene:null,visibilityRange:{u:{min:0,max:.5},v:{min:0,max:.2}},targetVisibilityRange:{u:{min:0,max:.5},v:{min:0,max:.2}}}}setRenderer(e){this.state.renderer=e}getRenderer(){return this.state.renderer}setFlowSpeed(e){this.state.flowSpeed=e}setCamera(e){this.state.camera=e}getCamera(){return this.state.camera}getFlowSpeed(){return this.state.flowSpeed}setScene(e){this.state.scene=e}getScene(){return this.state.scene}setVisibilityRange(e){this.state.visibilityRange=e}getVisibilityRange(){return this.state.visibilityRange}setTargetVisibilityRange(e){this.state.targetVisibilityRange=e}getTargetVisibilityRange(){return this.state.targetVisibilityRange}updateVisibilityRange(e){this.state.visibilityRange=e}}const p=new ut;class dt{constructor(e,t){this.spheresData=t,this.rows=71,this.cols=70,this.scanningActive=!1,this.scanningProgress=0}initializeStage(){this.scanningActive=!0,this.scanningProgress=0}updateSphereStates(e){const t=p.getFlowSpeed();this.spheresData.forEach((s,i)=>{Z(s,t),ee(s)&&J(s,i,this.spheresData)})}async startScanning(e){const t=this.spheresData[e];return t.scanned=!0,await this.handleLogic(e)}async handleLogic(e){if(this.spheresData[e].status==="good")return{action:"moveDown",spheres:[e],scannedSpheres:[e]};const{result:s,badSpheres:i,scannedSpheres:n}=this.propagate(e);return s==="repaired"?{action:"repair",spheres:i,scannedSpheres:n}:{action:"moveDown",spheres:i,scannedSpheres:n}}propagate(e){const t=[e],s=new Set,i=[];for(;t.length>0;){const r=t.pop(),o=this.spheresData[r];s.has(r)||!o.visible||(s.add(r),o.status==="bad"&&(i.push(r),[this.getSphereLeft(r),this.getSphereRight(r)].forEach(c=>{c&&!s.has(c.index)&&t.push(c.index)})))}return{result:this.shouldRepair(i,s)?"repaired":"not repaired",badSpheres:i,scannedSpheres:Array.from(s)}}shouldRepair(e,t){return e.length>0&&t.size>=2}getSphereLeft(e){const t=this.spheresData[e];return t.col===0?this.spheresData[t.index+4900]:this.spheresData[t.index-70]}getSphereRight(e){const t=this.spheresData[e];return t.col===69?this.spheresData[t.index-4900]:this.spheresData[t.index+70]}repair(e){for(const t of e)this.spheresData[t].status="good"}}class pt{constructor(e,t){this.spheresData=t,this.spheres=e,this.scene=p.getScene(),this.scanningSpheres=[]}clearAnimations(){gsap.killTweensOf(this.spheresData),this.scanningSpheres.forEach(e=>this.scene.remove(e)),this.scanningSpheres=[],this.spheresData.forEach(e=>{e.isAnimating=!1})}async animateSphereUp(e){const t=this.spheresData[e];return new Promise(s=>{t.isAnimating=!0;const i=t.scale.x;gsap.to(t.scale,{x:i*1.5,y:i*1.5,z:i*1.5,duration:.25,ease:"power4.inOut",onUpdate:()=>{this.updateSphereMatrix(t,e)},onComplete:()=>{s()}})})}async animateSphereDown(e){const t=this.spheresData[e];return new Promise(s=>{t.isAnimating=!0,t.scale.x,gsap.to(t.scale,{x:1,y:1,z:1,duration:.25,ease:"power4.inOut",onUpdate:()=>{this.updateSphereMatrix(t,e)},onComplete:()=>{t.isAnimating=!1,s()}})})}async animateAllSpheresDown(e){const t=e.map(s=>this.animateSphereDown(s));await Promise.all(t)}async createScanningSphere(e){const t=this.spheresData[e];return new Promise(s=>{const i=t.position.z,n=new Pe(new g(0,-.2,-1),i-28),r=new X({color:1153416,opacity:1,clippingPlanes:[n],side:ce,clipShadows:!0}),o=new Q(28,32,32),l=new Y(o,r);l.position.copy(t.position),this.scene.add(l),gsap.to(n,{constant:i+28,duration:.5,onUpdate:()=>{r.needsUpdate=!0},onComplete:()=>{this.scene.remove(l),s()}})})}updateAllSphereColors(){this.spheresData.forEach((e,t)=>this.updateSphereColor(e,t))}updateSphereColor(e,t){te(e,this.spheres,t)}updateSphereMatrix(e,t){se(e,this.spheres,t)}async animateSpheresUp(e){const t=e.map(s=>this.animateSphereUp(s));await Promise.all(t)}updateVisuals(){this.spheresData.forEach((e,t)=>{this.updateSphereColor(e,t),this.updateSphereMatrix(e,t)})}}const O={stage1:{visibilityRange:{u:{min:.49,max:.5},v:{min:.4,max:.6}}},stage2:{visibilityRange:{u:{min:.49,max:.5},v:{min:.4,max:.6}}},stage3:{visibilityRange:{u:{min:.4,max:.6},v:{min:.3,max:.7}}}},ft="stage1";class gt{constructor(){this.visibilityRange={u:{min:0,max:1},v:{min:0,max:1}},this.initializeVisibilityRange()}initializeVisibilityRange(){this.visibilityRange={...O[ft].visibilityRange},p.setVisibilityRange(this.visibilityRange)}async transitionVisibilityRange(e,t=.5){return console.log("Transitioning visibility range from",this.visibilityRange,"to",e),new Promise(s=>{gsap.to(this.visibilityRange.u,{min:e.u.min,max:e.u.max,duration:t,ease:"power2.inOut",onUpdate:()=>this.updateStore()}),gsap.to(this.visibilityRange.v,{min:e.v.min,max:e.v.max,duration:t,ease:"power2.inOut",onUpdate:()=>this.updateStore(),onComplete:()=>{console.log("Visibility range transition complete:",this.visibilityRange),s()}})})}updateStore(){p.setVisibilityRange({...this.visibilityRange})}async transitionToStage(e){console.log(`Starting visibility transition to ${e}`);const t=O[e].visibilityRange;await this.transitionVisibilityRange(t),console.log(`Completed visibility transition to ${e}`)}isSphereVisible(e){const t=this.visibilityRange;return e.u>=t.u.min&&e.u<=t.u.max&&e.v>=t.v.min&&e.v<=t.v.max&&e.row!==0}updateSphereVisibility(e){return e.visible=this.isSphereVisible(e),e.visible}updateVisibility(e){e.forEach(t=>{this.updateSphereVisibility(t)})}}const j=new gt;class mt{constructor(e,t,s,i,n){this.stageObserver=n,this.logic=s,this.visualization=i,this.spheresData=t,this.spheres=e}update(e){this.updateSphereStates(),this.checkForScanning()}updateSphereStates(){const e=p.getFlowSpeed();this.spheresData.forEach((t,s)=>{t.isAnimating||(Z(t,e),ee(t)&&J(t,s,this.spheresData))}),this.visualization.updateVisuals()}checkForScanning(){const e=p.getFlowSpeed();let t=0;for(let s=0;s<this.spheresData.length;s++){const i=this.spheresData[s];if(s%this.logic.cols===0&&t++,_e(i,e,t)){this.startScanning(s);break}}}async startScanning(e){console.log("Starting scanning",e),p.setFlowSpeed(0);const{result:t,badSpheres:s,scannedSpheres:i}=this.logic.propagate(e);await this.handleScanningVisualization(i),t==="repaired"&&await this.repairSpheres(s),await this.visualization.animateAllSpheresDown(i),await new Promise(n=>setTimeout(n,200)),p.setFlowSpeed(3/4900)}async handleScanningVisualization(e){for(const t of e){const s=this.logic.spheresData[t];await this.visualization.animateSphereUp(t),await this.visualization.createScanningSphere(t),s.scanned=!0,this.visualization.updateSphereColor(s,t)}}async repairSpheres(e){this.logic.repair(e);for(const t of e){const s=this.logic.spheresData[t];this.visualization.updateSphereColor(s,t)}await new Promise(t=>setTimeout(t,200))}}class St{constructor(e,t,s){this.stageObserver=s,this.spheresData=t,this.config=O.stage1,this.logic=new dt(e,t),this.visualization=new pt(e,t),this.control=new mt(e,t,this.logic,this.visualization,this.visibilityRange)}async transitionToNext(){this.update()}async transitionToPrevious(){this.update()}async transitionFromNext(){this.update()}async transitionFromPrevious(){this.update()}update(e){this.control.update(e)}}class vt{constructor(e,t){this.spheresData=t,this.rows=71,this.cols=70,this.scanningActive=!1,this.scanningProgress=0}initializeStage(){this.scanningActive=!0,this.scanningProgress=0}resetStage(){this.scanningActive=!1,this.scanningProgress=0}updateSphereStates(e){const t=p.getFlowSpeed();this.spheresData.forEach((s,i)=>{Z(s,t),ee(s)&&J(s,i,this.spheresData)})}async startScanning(e){const t=this.spheresData[e];return t.scanned=!0,await this.handleLogic(e)}async handleLogic(e){if(this.spheresData[e].status==="good")return{action:"moveDown",spheres:[e],scannedSpheres:[e]};const{result:s,badSpheres:i,scannedSpheres:n}=this.propagate(e);return s==="repaired"?{action:"repair",spheres:i,scannedSpheres:n}:{action:"moveDown",spheres:i,scannedSpheres:n}}propagate(e){const t=[e],s=new Set,i=[];for(;t.length>0;){const r=t.pop(),o=this.spheresData[r];s.has(r)||!o.visible||(s.add(r),o.status==="bad"&&(i.push(r),[this.getSphereLeft(r),this.getSphereRight(r)].forEach(c=>{c&&!s.has(c.index)&&t.push(c.index)})))}return{result:this.shouldRepair(i,s)?"repaired":"not repaired",badSpheres:i,scannedSpheres:Array.from(s)}}shouldRepair(e,t){return e.length>0&&t.size>=2}getSphereLeft(e){const t=this.spheresData[e];return t.col===0?this.spheresData[t.index+4900]:this.spheresData[t.index-70]}getSphereRight(e){const t=this.spheresData[e];return t.col===69?this.spheresData[t.index-4900]:this.spheresData[t.index+70]}repair(e){for(const t of e)this.spheresData[t].status="good"}}class wt{constructor(e,t){this.spheresData=t,this.spheres=e,this.scene=p.getScene(),this.scanningSpheres=[]}async animateSphereUp(e){const t=this.spheresData[e];return new Promise(s=>{t.isAnimating=!0;const i=t.scale.x;gsap.to(t.scale,{x:i*1.5,y:i*1.5,z:i*1.5,duration:.25,ease:"power4.inOut",onUpdate:()=>{this.updateSphereMatrix(t,e)},onComplete:()=>{s()}})})}async animateSphereDown(e){const t=this.spheresData[e];return new Promise(s=>{t.isAnimating=!0,t.scale.x,gsap.to(t.scale,{x:1,y:1,z:1,duration:.25,ease:"power4.inOut",onUpdate:()=>{this.updateSphereMatrix(t,e)},onComplete:()=>{t.isAnimating=!1,s()}})})}async animateAllSpheresDown(e){const t=e.map(s=>this.animateSphereDown(s));await Promise.all(t)}async highlightUndetectedSphere(e){const t=this.spheresData[e];return new Promise(s=>{t.isAnimating=!0,t.highlightedIssue=!0;const i=t.scale.x;gsap.to(t.scale,{x:i*1.5,y:i*1.5,z:i*1.5,duration:.5,ease:"elastic.out(1, 0.3)",onUpdate:()=>{this.updateSphereMatrix(t,e),this.updateSphereColor(t,e)},onComplete:()=>{t.isAnimating=!1,s()}})})}async createScanningSphere(e){const t=this.spheresData[e];return new Promise(s=>{const i=t.position.z,n=new Pe(new g(0,-.2,-1),i-28),r=new X({color:1153416,opacity:1,clippingPlanes:[n],side:ce,clipShadows:!0}),o=new Q(28,32,32),l=new Y(o,r);l.position.copy(t.position),this.scene.add(l),this.scanningSpheres.push(l),gsap.to(n,{constant:i+28,duration:.5,onUpdate:()=>{r.needsUpdate=!0},onComplete:()=>{this.scene.remove(l),s()}})})}updateAllSphereColors(){this.spheresData.forEach((e,t)=>this.updateSphereColor(e,t))}updateSphereColor(e,t){te(e,this.spheres,t)}updateSphereMatrix(e,t){se(e,this.spheres,t)}async animateSpheresUp(e){const t=e.map(s=>this.animateSphereUp(s));await Promise.all(t)}updateVisuals(){this.spheresData.forEach((e,t)=>{this.updateSphereColor(e,t),this.updateSphereMatrix(e,t)})}}class xt{constructor(e,t,s,i,n){this.stageObserver=n,this.spheres=e,this.spheresData=t,this.logic=s,this.visualization=i,this.isScanning=!1}update(e){this.updateSphereStates(),this.checkForScanning()}updateSphereStates(){const e=p.getFlowSpeed();this.spheresData.forEach((t,s)=>{t.isAnimating||(Z(t,e),ee(t)&&J(t,s,this.spheresData))}),this.visualization.updateVisuals()}checkForScanning(){const e=p.getFlowSpeed();let t=0;for(let s=0;s<this.spheresData.length;s++){const i=this.spheresData[s];if(s%this.logic.cols===0&&t++,_e(i,e,t)){this.startScanning(s);break}}}async stopScanning(){this.isScanning=!1,this.isScanningCancelled=!0,p.setFlowSpeed(0),this.spheresData.forEach(e=>{e.scanned=!1,e.isAnimating=!1,e.scale.set(1,1,1),e.highlightedIssue=!1}),this.visualization.updateVisuals(),p.setFlowSpeed(3/4900)}async startScanning(e){this.isScanning=!0,this.isScanningCancelled=!1,console.log("Starting scanning",e),p.setFlowSpeed(0);const{result:t,badSpheres:s,scannedSpheres:i}=this.logic.propagate(e);this.isScanningCancelled||(await this.handleScanningVisualization(i),!this.isScanningCancelled&&(t==="repaired"&&await this.repairSpheres(s),!this.isScanningCancelled&&(await this.highlightUndetectedIssues(i),!this.isScanningCancelled&&(await this.visualization.animateAllSpheresDown(i),await new Promise(n=>setTimeout(n,200)),this.isScanning=!1,p.setFlowSpeed(3/4900)))))}async handleScanningVisualization(e){for(const t of e){if(this.isScanningCancelled)break;const s=this.logic.spheresData[t];await this.visualization.animateSphereUp(t),await this.visualization.createScanningSphere(t),s.scanned=!0,this.visualization.updateSphereColor(s,t)}}async repairSpheres(e){if(!this.isScanningCancelled){this.logic.repair(e);for(const t of e){if(this.isScanningCancelled)break;const s=this.logic.spheresData[t];this.visualization.updateSphereColor(s,t)}await new Promise(t=>setTimeout(t,200))}}async highlightUndetectedIssues(e){if(this.isScanningCancelled)return;const t=Math.min(...e),s=[];for(let n=t-1;n>=Math.max(t-2e3,0);n--){const r=this.spheresData[n];r.status==="bad"&&r.visible&&s.push(n)}const i=s.map(n=>this.visualization.highlightUndetectedSphere(n));await Promise.all(i)}}class yt{constructor(e,t,s){this.stageObserver=s,this.spheresData=t,this.config=O.stage2,this.logic=new vt(e,t),this.visualization=new wt(e,t),this.control=new xt(e,t,this.logic,this.visualization,this.stageObserver),this.camera=p.getCamera()}async transitionToNext(){this.zoomOutCamera(),console.log("Stage2: Preparing to transition to next stage"),this.control.isScanning&&await this.control.stopScanning(),console.log("Stage2: Ready for next stage")}async zoomOutCamera(){const e=new g(this.camera.position.x,this.camera.position.y-1e3,this.camera.position.z+250);return new Promise(t=>{gsap.to(this.camera.position,{x:e.x,y:e.y,z:e.z,duration:.5,ease:"power2.inOut",onUpdate:()=>{this.camera.lookAt(new g(0,0,0))},onComplete:t})})}async transitionToPrevious(){this.update()}async transitionFromNext(){p.setFlowSpeed(3/4900),this.update()}async transitionFromPrevious(){console.log("Stage2: Initializing from previous stage"),this.update(),console.log("Stage2: Initialization complete")}update(e){this.control.update(e)}}const we=new he,I=new g;class Ae extends $e{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new q(e,3)),this.setAttribute("uv",new q(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),s.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new le(t,6,1);return this.setAttribute("instanceStart",new U(s,3,0)),this.setAttribute("instanceEnd",new U(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new le(t,6,1);return this.setAttribute("instanceColorStart",new U(s,3,0)),this.setAttribute("instanceColorEnd",new U(s,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Ge(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new he);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),we.setFromBufferAttribute(t),this.boundingBox.union(we))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ze),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let i=0;for(let n=0,r=e.count;n<r;n++)I.fromBufferAttribute(e,n),i=Math.max(i,s.distanceToSquared(I)),I.fromBufferAttribute(t,n),i=Math.max(i,s.distanceToSquared(I));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}N.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new T(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};W.line={uniforms:F.merge([N.common,N.fog,N.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class de extends L{constructor(e){super({type:"LineMaterial",uniforms:F.clone(W.line.uniforms),vertexShader:W.line.vertexShader,fragmentShader:W.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ae=new v,xe=new g,ye=new g,w=new v,x=new v,z=new v,re=new g,oe=new K,y=new je,be=new g,k=new he,H=new ze,D=new v;let _,E;function Ce(a,e,t){return D.set(0,0,-e,1).applyMatrix4(a.projectionMatrix),D.multiplyScalar(1/D.w),D.x=E/t.width,D.y=E/t.height,D.applyMatrix4(a.projectionMatrixInverse),D.multiplyScalar(1/D.w),Math.abs(Math.max(D.x,D.y))}function bt(a,e){const t=a.matrixWorld,s=a.geometry,i=s.attributes.instanceStart,n=s.attributes.instanceEnd,r=Math.min(s.instanceCount,i.count);for(let o=0,l=r;o<l;o++){y.start.fromBufferAttribute(i,o),y.end.fromBufferAttribute(n,o),y.applyMatrix4(t);const c=new g,h=new g;_.distanceSqToSegment(y.start,y.end,h,c),h.distanceTo(c)<E*.5&&e.push({point:h,pointOnLine:c,distance:_.origin.distanceTo(h),object:a,face:null,faceIndex:o,uv:null,uv1:null})}}function Ct(a,e,t){const s=e.projectionMatrix,n=a.material.resolution,r=a.matrixWorld,o=a.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),u=-e.near;_.at(1,z),z.w=1,z.applyMatrix4(e.matrixWorldInverse),z.applyMatrix4(s),z.multiplyScalar(1/z.w),z.x*=n.x/2,z.y*=n.y/2,z.z=0,re.copy(z),oe.multiplyMatrices(e.matrixWorldInverse,r);for(let d=0,m=h;d<m;d++){if(w.fromBufferAttribute(l,d),x.fromBufferAttribute(c,d),w.w=1,x.w=1,w.applyMatrix4(oe),x.applyMatrix4(oe),w.z>u&&x.z>u)continue;if(w.z>u){const M=w.z-x.z,P=(w.z-u)/M;w.lerp(x,P)}else if(x.z>u){const M=x.z-w.z,P=(x.z-u)/M;x.lerp(w,P)}w.applyMatrix4(s),x.applyMatrix4(s),w.multiplyScalar(1/w.w),x.multiplyScalar(1/x.w),w.x*=n.x/2,w.y*=n.y/2,x.x*=n.x/2,x.y*=n.y/2,y.start.copy(w),y.start.z=0,y.end.copy(x),y.end.z=0;const f=y.closestPointToPointParameter(re,!0);y.at(f,be);const S=Qe.lerp(w.z,x.z,f),C=S>=-1&&S<=1,B=re.distanceTo(be)<E*.5;if(C&&B){y.start.fromBufferAttribute(l,d),y.end.fromBufferAttribute(c,d),y.start.applyMatrix4(r),y.end.applyMatrix4(r);const M=new g,P=new g;_.distanceSqToSegment(y.start,y.end,P,M),t.push({point:P,pointOnLine:M,distance:_.origin.distanceTo(P),object:a,face:null,faceIndex:d,uv:null,uv1:null})}}}class Tt extends Y{constructor(e=new Ae,t=new de({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,s=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let r=0,o=0,l=t.count;r<l;r++,o+=2)xe.fromBufferAttribute(t,r),ye.fromBufferAttribute(s,r),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+xe.distanceTo(ye);const n=new le(i,2,1);return e.setAttribute("instanceDistanceStart",new U(n,1,0)),e.setAttribute("instanceDistanceEnd",new U(n,1,1)),this}raycast(e,t){const s=this.material.worldUnits,i=e.camera;i===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const n=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_=e.ray;const r=this.matrixWorld,o=this.geometry,l=this.material;E=l.linewidth+n,o.boundingSphere===null&&o.computeBoundingSphere(),H.copy(o.boundingSphere).applyMatrix4(r);let c;if(s)c=E*.5;else{const u=Math.max(i.near,H.distanceToPoint(_.origin));c=Ce(i,u,l.resolution)}if(H.radius+=c,_.intersectsSphere(H)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),k.copy(o.boundingBox).applyMatrix4(r);let h;if(s)h=E*.5;else{const u=Math.max(i.near,k.distanceToPoint(_.origin));h=Ce(i,u,l.resolution)}k.expandByScalar(h),_.intersectsBox(k)!==!1&&(s?bt(this,t):Ct(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ae),this.material.uniforms.resolution.value.set(ae.z,ae.w))}}class Le extends Ae{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,s=new Float32Array(2*t);for(let i=0;i<t;i+=3)s[2*i]=e[i],s[2*i+1]=e[i+1],s[2*i+2]=e[i+2],s[2*i+3]=e[i+3],s[2*i+4]=e[i+4],s[2*i+5]=e[i+5];return super.setPositions(s),this}setColors(e){const t=e.length-3,s=new Float32Array(2*t);for(let i=0;i<t;i+=3)s[2*i]=e[i],s[2*i+1]=e[i+1],s[2*i+2]=e[i+2],s[2*i+3]=e[i+3],s[2*i+4]=e[i+4],s[2*i+5]=e[i+5];return super.setColors(s),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Mt extends Tt{constructor(e=new Le,t=new de({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Ee={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class V{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Pt=new Ke(-1,1,1,-1,0,1);class zt extends De{constructor(){super(),this.setAttribute("position",new q([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new q([0,2,0,0,2,0],2))}}const Dt=new zt;class Ue{constructor(e){this._mesh=new Y(Dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Pt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class _t extends V{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof L?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=F.clone(e.uniforms),this.material=new L({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ue(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Te extends V{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const i=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),n.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),n.buffers.stencil.setClear(o),n.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(i.EQUAL,1,4294967295),n.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),n.buffers.stencil.setLocked(!0)}}class At extends V{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Lt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new T);this._width=s.width,this._height=s.height,t=new $(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:G}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new _t(Ee),this.copyPass.material.blending=qe,this.clock=new Xe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let i=0,n=this.passes.length;i<n;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),r.needsSwap){if(s){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Te!==void 0&&(r instanceof Te?s=!0:r instanceof At&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new T);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Et extends V{constructor(e,t,s=null,i=null,n=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new A}render(e,t,s){const i=e.autoClear;e.autoClear=!1;let n,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}}const Ut={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new A(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class R extends V{constructor(e,t,s,i){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=i,this.resolution=e!==void 0?new T(e.x,e.y):new T(256,256),this.clearColor=new A(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let n=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new $(n,r,{type:G}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new $(n,r,{type:G});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const m=new $(n,r,{type:G});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),n=Math.round(n/2),r=Math.round(r/2)}const o=Ut;this.highPassUniforms=F.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new L({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];n=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new T(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new g(1,1,1),new g(1,1,1),new g(1,1,1),new g(1,1,1),new g(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Ee;this.copyUniforms=F.clone(h.uniforms),this.blendMaterial=new L({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ye,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new A,this.oldClearAlpha=1,this.basic=new X,this.fsQuad=new Ue(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(s,i);for(let n=0;n<this.nMips;n++)this.renderTargetsHorizontal[n].setSize(s,i),this.renderTargetsVertical[n].setSize(s,i),this.separableBlurMaterials[n].uniforms.invSize.value=new T(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(e,t,s,i,n){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),n&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=R.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=R.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,n&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new L({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new T(.5,.5)},direction:{value:new T(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new L({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}R.BlurDirectionX=new T(1,0);R.BlurDirectionY=new T(0,1);class Rt{constructor(e,t){this.spheresData=t,this.stage3SpecificState=null}async initializeStage(){this.stage3SpecificState="initialized"}resetStage(){this.stage3SpecificState=null}}class Bt{constructor(e,t){this.spheresData=t,this.spheres=e,this.scene=p.getScene()}updateVisuals(){this.spheresData.forEach((e,t)=>{this.updateSphereColor(e,t),this.updateSphereMatrix(e,t)}),this.spheres.instanceMatrix.needsUpdate=!0}updateSphereColor(e,t){te(e,this.spheres,t)}updateSphereMatrix(e,t){se(e,this.spheres,t)}}class Ft{constructor(e,t,s,i,n){this.stageObserver=n,this.logic=s,this.visualization=i,this.spheresData=t,this.spheres=e}update(e){p.setFlowSpeed(0),this.visualization.updateVisuals()}}class Ot{constructor(e,t,s){this.stageObserver=s,this.spheres=e,this.spheresData=t,this.config=O.stage3,this.logic=new Rt(e,t),this.visualization=new Bt(e,t),this.control=new Ft(e,t,this.logic,this.visualization),this.camera=p.getCamera(),this.scene=p.getScene(),this.renderer=p.getRenderer(),this.scanLine=null,this.scanLinePosition=-4e3,this.scanSpeed=1e3,this.highlightedSpheres=new Set,this.composer=null,this.initScanLine(),this.initPostProcessing(),this.connectedLines=new Je,this.scene.add(this.connectedLines)}async transitionToNext(){this.scene.remove(this.scanLine),this.scanLine.geometry.dispose(),this.scanLine.material.dispose(),this.scanLine=null,this.highlightedSpheres.clear()}async transitionToPrevious(){console.log("Stage3: Preparing to transition to previous stage"),await this.resetCameraPosition(),console.log("Stage3: Ready for previous stage")}async transitionFromNext(){console.log("Stage3: Initializing from next stage"),console.log("Stage3: Initialization complete")}async transitionFromPrevious(){this.spheresData.forEach(e=>{e.scanned=!1,e.scale.set(1,1,1)}),this.spheres.instanceMatrix.needsUpdate=!0,this.spheres.instanceColor.needsUpdate=!0,this.initScanLine(),this.scene.add(this.scanLine),this.scanLinePosition=-4e3,await this.performSweepAnimation(),await new Promise(e=>setTimeout(e,200)),this.postSweepFunctions(),this.update(0)}async performSweepAnimation(){return new Promise(e=>{gsap.to(this,{scanLinePosition:4e3,duration:1,ease:"power2.inOut",onUpdate:()=>{this.updateScanLine(0)},onComplete:e})})}postSweepFunctions(){console.log("Executing post-sweep functions"),this.analyzeAndConnectBadSpheres()}analyzeAndConnectBadSpheres(){const e=this.createGrid(),t=this.findConnectedLines(e);this.highlightConnectedSpheres(t),this.drawConnectionLines(t)}createGrid(){const e={};return this.spheresData.forEach((t,s)=>{if(t.visible&&t.status==="bad"){const i=`${t.row},${t.col}`;e[i]={index:s,position:t.position}}}),e}findConnectedLines(e){const t=[],s=new Set;for(const i in e){const[n,r]=i.split(",").map(Number),o=[[0,1],[1,1],[1,0],[1,-1]];for(const[l,c]of o){const h=[];let u=n,d=r,m=`${u},${d}`;const b=`${m}_${l}_${c}`;if(!s.has(b)){for(;;){const f=u-l,S=d-c,C=`${f},${S}`;if(!e[C])break;u=f,d=S,m=C}for(u=u,d=d,m=`${u},${d}`;e[m];){const f=`${m}_${l}_${c}`;if(s.has(f))break;h.push(e[m]),s.add(f),u+=l,d+=c,m=`${u},${d}`}h.length>=3&&t.push(h)}}}return t}dfs(e,t,s){const i=[e],n=[];for(;i.length>0;){const r=i.pop();if(!s.has(r)){s.add(r),n.push(t[r]);const[o,l]=r.split(",").map(Number),c=[`${o},${l+1}`,`${o},${l-1}`,`${o+1},${l}`,`${o-1},${l}`];for(const h of c)t[h]&&!s.has(h)&&i.push(h)}}return n}highlightConnectedSpheres(e){e.forEach(t=>{t.forEach(s=>{this.spheres.setColorAt(s.index,new A(16711935)),this.updateSphereColor(this.spheresData[s.index],s.index)})}),this.spheres.instanceColor.needsUpdate=!0}drawConnectionLines(e){this.connectedLines.clear(),e.forEach(t=>{if(t.length<2)return;const s=t[0],i=t[t.length-1],n=new De().setFromPoints([s.position,i.position]),r=new Ze({color:16711935}),o=new et(n,r);this.connectedLines.add(o)})}async resetCameraPosition(){const e=new g(0,-4e3,750);return new Promise(t=>{gsap.to(this.camera.position,{x:e.x,y:e.y,z:e.z,duration:.5,ease:"power2.inOut",onUpdate:()=>{this.camera.lookAt(new g(0,0,0))},onComplete:t})})}update(e){this.updateScanLine(e),this.control.update(e),this.highlightIntersectedSpheres(),this.composer.render()}initPostProcessing(){this.composer=new Lt(this.renderer);const e=new Et(this.scene,this.camera);this.composer.addPass(e);const t=new R(new T(window.innerWidth,window.innerHeight),1.5,.4,.85);this.composer.addPass(t)}initScanLine(){const e=new Le,t=new de({color:16777215,linewidth:0,resolution:new T(window.innerWidth,window.innerHeight),dashed:!1});e.setPositions([-200,-400,0,-200,400,0]),this.scanLine=new Mt(e,t)}updateScanLine(e){this.scanLinePosition+=this.scanSpeed*e,this.scanLinePosition>2e3&&(this.scanLinePosition=-2e3);const t=this.scanLine.geometry,s=[-1e3,this.scanLinePosition,0,1e3,this.scanLinePosition,0];t.setPositions(s),this.scanLine.computeLineDistances(),this.scanLine.scale.set(1,1,1)}highlightIntersectedSpheres(){const t=new Set;this.spheresData.forEach((s,i)=>{j.isSphereVisible(s)&&-Math.abs(s.position.x-this.scanLinePosition)<50&&(t.add(i),this.highlightedSpheres.has(i)||this.highlightSphere(i))}),this.highlightedSpheres.forEach(s=>{t.has(s)||this.resetSphereAppearance(s)}),this.highlightedSpheres=t}highlightSphere(e){const t=this.spheresData[e];t.scale.set(1.5,1.5,1.5),this.spheres.setColorAt(e,new A(65535)),this.updateSphereMatrix(t,e)}resetSphereAppearance(e){const t=this.spheresData[e];t.scale.set(1,1,1),this.updateSphereMatrix(t,e),this.updateSphereColor(t,e)}updateSphereColor(e,t){te(e,this.spheres,t)}updateSphereMatrix(e,t){se(e,this.spheres,t)}}class Vt{constructor(){this.currentStage=0,this.element=this.createObserverElement(),this.updateDisplay()}createObserverElement(){const e=document.createElement("div");return e.id="stage-observer",e.style.position="fixed",e.style.top="50px",e.style.left="10px",e.style.padding="10px",e.style.backgroundColor="rgba(0, 0, 0, 0.7)",e.style.color="white",e.style.fontFamily="Arial, sans-serif",e.style.fontSize="14px",e.style.zIndex="1000",e.style.borderRadius="5px",document.body.appendChild(e),e}updateStage(e){this.currentStage=e,this.updateDisplay()}startTransition(){this.updateDisplay()}endTransition(){this.updateDisplay()}updateDisplay(){let e=`Current Stage: ${this.currentStage+1}`;this.element.textContent=e}}gsap.registerPlugin(ScrollTrigger);class It{constructor(e,t){this.spheresData=t,this.currentStageIndex=0,this.stageObserver=new Vt,this.stages=[new St(e,t,this.stageObserver),new yt(e,t,this.stageObserver),new Ot(e,t,this.stageObserver)],this.stageObserver.updateStage(this.currentStageIndex),this.setupScrollTrigger(),this.isTransitioning=!1}setupScrollTrigger(){let e=this.currentStageIndex;const t=this.stages.length;gsap.timeline({scrollTrigger:{trigger:"#animation-container",start:"bottom bottom",end:`+=${3*100}%`,pin:!0,fastScrollEnd:!0,preventOverlaps:!0,markers:!0,onRefresh:s=>{ScrollTrigger.clearScrollMemory(),window.history.scrollRestoration="manual"},onUpdate:s=>{const i=(s.progress-1/t)/(1-1/t);let n=1+Math.floor(i*(t-1));if(n!==e&&n>=-1&&n<t){const r=s.direction===-1;gsap.delayedCall(0,async()=>{this.isTransitioning||(this.isTransitioning=!0,r?await this.transitionToPreviousStage():await this.transitionToNextStage(),e=n,this.updateObserver(),this.isTransitioning=!1)})}}}})}async transitionToNextStage(){this.currentStageIndex<this.stages.length-1&&(console.log(`Transitioning from Stage ${this.currentStageIndex+1} to Stage ${this.currentStageIndex+2}`),await this.stages[this.currentStageIndex].transitionToNext(),this.currentStageIndex++,await j.transitionToStage(`stage${this.currentStageIndex+1}`),console.log(`Visibility transition complete. Now in Stage ${this.currentStageIndex+1}`),await this.stages[this.currentStageIndex].transitionFromPrevious(),this.updateObserver())}async transitionToPreviousStage(){this.currentStageIndex>0&&(console.log(`Transitioning from Stage ${this.currentStageIndex+1} to Stage ${this.currentStageIndex}`),await this.stages[this.currentStageIndex].transitionToPrevious(),this.currentStageIndex--,await j.transitionToStage(`stage${this.currentStageIndex+1}`),console.log(`Visibility transition complete. Now in Stage ${this.currentStageIndex+1}`),await this.stages[this.currentStageIndex].transitionFromNext(),this.updateObserver())}updateObserver(){this.stages[this.currentStageIndex],this.stageObserver.updateStage(this.currentStageIndex)}update(e){j.updateVisibility(this.spheresData),this.stages[this.currentStageIndex].update(e)}}function kt(){let a=gsap.timeline({paused:!0});function e(n,r=0){a.to({},{duration:r,onUpdate:()=>{p.setFlowSpeed(n)},ease:"power2.inOut"})}function t(){e(3/4900,.5),a.play()}function s(){e(0,.5),a.play()}function i(){return p.getFlowSpeed()}return{startFlow:t,stopFlow:s,getFlowSpeed:i,setFlowSpeed:e}}class Ht{constructor(){this.fps=0,this.frames=0,this.lastTime=performance.now(),this.fpsElement=this.createFPSElement()}createFPSElement(){const e=document.createElement("div");return e.id="fpsCounter",e.style.position="fixed",e.style.top="10px",e.style.left="10px",e.style.color="black",e.style.backgroundColor="rgba(0, 0, 0, 0.5)",e.style.padding="5px",e.style.borderRadius="5px",e.style.fontFamily="Arial, sans-serif",e.style.fontSize="14px",e.style.zIndex="1000",e}update(){this.frames++;const e=performance.now();e>=this.lastTime+1e3&&(this.fps=Math.round(this.frames*1e3/(e-this.lastTime)),this.lastTime=e,this.frames=0,this.fpsElement.textContent=`FPS: ${this.fps}`)}addToContainer(e){e.appendChild(this.fpsElement)}}const ie=ot(),Re=lt(),pe=ct(),Be=new Ht;Be.addToContainer(document.getElementById("animation-container"));document.getElementById("animation-container").appendChild(pe.domElement);rt(ie);const Nt=71,Wt=70,{spheres:Fe,spheresData:$t}=at(Nt,Wt);p.setScene(ie);p.setCamera(Re);p.setRenderer(pe);const Gt=kt(),jt=new It(Fe,$t,Gt);ie.add(Fe);let Me=0;function Oe(a){requestAnimationFrame(Oe);const e=(a-Me)/1e3;Me=a,jt.update(e),Be.update(),pe.render(ie,Re)}Oe(0);
