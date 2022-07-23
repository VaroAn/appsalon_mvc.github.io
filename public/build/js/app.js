let paso=1;const pasoI=1,pasoF=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),btnPaginador(),pgSig(),pgAnt(),consultarAPI(),idCliente(),nomCliente(),selecFecha(),selecHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso"+paso).classList.add("mostrar");const t=document.querySelector(".actual");e&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),btnPaginador()}))})}function btnPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function pgAnt(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,btnPaginador())}))}function pgSig(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,btnPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nom-serv"),n.textContent=o;const c=document.createElement("P");c.classList.add("pre-serv"),c.textContent="$"+a;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServ=t,r.onclick=function(){selecServ(e)},r.appendChild(n),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function selecServ(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-serv="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nomCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function idCliente(){const e=document.querySelector("#id").value;cita.id=e}function selecFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fuera de servicio los fines de semana","error",".formulario")):cita.fecha=e.target.value}))}function selecHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Horario no Valido","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),a&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Favor de agregar los campos necesarios","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:a,servicios:n}=cita,c=document.createElement("H3");c.textContent="Resumen de Servicios";const r=document.createElement("H3");r.textContent="Resumen de Servicios",e.appendChild(c),n.forEach(t=>{const{id:o,precio:a,nombre:n}=t,c=document.createElement("DIV");c.classList.add("cont-serv");const r=document.createElement("P");r.textContent=n;const s=document.createElement("P");s.innerHTML="<span>Precio:</span>$"+a,c.appendChild(r),c.appendChild(s),e.appendChild(c)});const s=document.createElement("P");s.innerHTML="<span>Nombre:</span> "+t;const i=new Date(o),d=i.getMonth(),l=i.getDate()+2,u=i.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML="<span>Fecha:</span> "+m;const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${a} horas`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(r),e.appendChild(s),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:a,id:n}=cita,c=a.map(e=>e.id),r=new FormData;r.append("fecha",t),r.append("hora",o),r.append("usuarioid",n),r.append("servicios",c);try{const e="http://localhost:3000/api/citas",t=await fetch(e,{method:"POST",body:r});(await t.json()).resultado&&Swal.fire({title:"Cita Creada",text:"Tu Cita Se Agendo Correctamente",imageUrl:"http://www.sonesu.com/wp-content/uploads/2010/04/ok.png",imageWidth:400,imageHeight:200,imageAlt:"Custom image"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error de comunicacion!"})}console.log(resultado)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));