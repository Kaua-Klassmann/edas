import{_ as x,u as k,r as d,c as u,a as e,w,b as c,v as m,d as y,e as S,f as C,n as L,F as _,g as V,h as z,o as v,i as E,R as I,t as T,p as B,j as N,k as R}from"./index-D-MA0sTy.js";const i=n=>(B("data-v-717695b2"),n=n(),N(),n),D={class:"d-grid"},F={class:"box p-3 rounded-3"},K=i(()=>e("h1",{class:"text-center"},"Login",-1)),U={class:"my-3 mx-2"},j=i(()=>e("label",{class:"form-label px-2",for:"email"},"Email",-1)),A={class:"my-3 mx-2"},M=i(()=>e("label",{class:"form-label px-2",for:"senha"},"Senha",-1)),P={class:"alinharLoading"},q=i(()=>e("div",{class:"spinner-border"},null,-1)),G=[q],H={__name:"Login",emits:["receberToken"],setup(n,{emit:f}){const b=k(),g=f,a=d({email:"",senha:""}),s=d([]),r=d(!1);function p(){if(s.value=[],!a.value.email||a.value.email.split("@")[1]!="aluno.feliz.ifrs.edu.br"){s.value.push("Email inválido!");return}if(!a.value.senha||a.value.senha.length<6){s.value.push("Senha inválida!");return}async function h(){r.value=!0;const{email:o,senha:t}=a.value;await R.post("session",{email:o,senha:t}).then(l=>{g("receberToken",l.data.token),b.push("/VizualizarProvas")}).catch(l=>{l.response.status=="402"?s.value.push("Senha incorreta!"):l.response.status=="401"?s.value.push("Conta não ativada!"):s.value.push("Algo está errado!")}),r.value=!1}h()}return(h,o)=>(v(),u(_,null,[e("main",D,[e("div",F,[K,e("div",{onKeydown:w(p,["enter"])},[e("div",U,[j,c(e("input",{class:"form-control rounded-4",type:"email",id:"email","onUpdate:modelValue":o[0]||(o[0]=t=>a.value.email=t)},null,512),[[m,a.value.email]])]),e("div",A,[M,c(e("input",{class:"form-control rounded-4",type:"password",id:"senha","onUpdate:modelValue":o[1]||(o[1]=t=>a.value.senha=t)},null,512),[[m,a.value.senha]])]),e("div",{class:"div-botao d-flex p-3"},[e("button",{class:"botao btn text-bg-dark rounded-4",onClick:p},"Entrar")]),y(C(I),{to:"/CriarConta",class:"link float-end"},{default:S(()=>[E("Criar conta")]),_:1}),e("div",{id:"error",class:L(["error",{"alert alert-danger":s.value.length>0}]),role:"alert"},[(v(!0),u(_,null,V(s.value,t=>(v(),u("div",{key:t},T(t),1))),128))],2)],32)])]),c(e("div",P,G,512),[[z,r.value]])],64))}},O=x(H,[["__scopeId","data-v-717695b2"]]);export{O as default};
