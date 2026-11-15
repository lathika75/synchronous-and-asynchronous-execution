const $ = id => document.getElementById(id);
let chart;
let latest = {sync:null, async:null};

function settings(){
  const count = Number($("processCount").value);
  return {
    count,
    delay: Math.max(100, Math.min(3000, Number($("delay").value)||800)),
    processing: Math.max(100, Math.min(2000, Number($("processing").value)||500)),
    response: Math.max(100, Math.min(2000, Number($("response").value)||400))
  };
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function addEvent(time, message, model){
  const row=document.createElement("div"); row.className="event";
  row.innerHTML=`<time>${time} ms</time><div><b>${model}:</b> ${message}</div>`;
  $("timeline").prepend(row);
}
function renderProcesses(target, count, states){
  const el=$(target); el.innerHTML="";
  for(let i=1;i<=count;i++){
    const row=document.createElement("div"); row.className="process-row";
    const state=states[i-1]||"Pending";
    row.innerHTML=`<strong>Process P${i}</strong><span class="${state==='Completed'?'state-done':state==='Waiting'?'state-wait':''}">${state}</span>`;
    el.appendChild(row);
  }
}
function setProgress(model, percent){ $(model+"Progress").style.width=percent+"%"; }
function clearView(){
  $("timeline").innerHTML=""; $("syncTime").textContent="—"; $("asyncTime").textContent="—";
  $("summary").textContent="Run both models to generate a comparison summary.";
  $("runStatus").textContent="Waiting to run"; $("syncProcesses").innerHTML='<p class="empty">Run the simulation to see process activity.</p>';
  $("asyncProcesses").innerHTML='<p class="empty">Run the simulation to see process activity.</p>';
  setProgress("sync",0);setProgress("async",0);latest={sync:null,async:null};
  if(chart){chart.destroy();chart=null;}
}
async function runModel(model, cfg){
  const isSync=model==="sync", label=isSync?"Synchronous":"Asynchronous";
  const target=isSync?"syncProcesses":"asyncProcesses";
  const states=Array(cfg.count).fill("Pending");
  renderProcesses(target,cfg.count,states);setProgress(model,0);$(model+"Time").textContent="Running…";
  let elapsed=0;
  if(isSync){
    for(let i=0;i<cfg.count;i++){
      states[i]="Processing";renderProcesses(target,cfg.count,states);
      addEvent(elapsed,`P${i+1} starts processing.`,label);
      await sleep(cfg.processing);elapsed+=cfg.processing;
      states[i]="Waiting";renderProcesses(target,cfg.count,states);
      addEvent(elapsed,`P${i+1} sends a request and waits for a response.`,label);
      await sleep(cfg.delay);elapsed+=cfg.delay;
      addEvent(elapsed,`Message from P${i+1} is delivered; response received after ${cfg.response} ms.`,label);
      await sleep(cfg.response);elapsed+=cfg.response;
      states[i]="Completed";renderProcesses(target,cfg.count,states);setProgress(model,((i+1)/cfg.count)*100);
    }
  } else {
    const start=performance.now();
    const jobs=states.map(async(_,i)=>{
      states[i]="Processing";renderProcesses(target,cfg.count,states);
      addEvent(0,`P${i+1} starts processing.`,label);
      await sleep(cfg.processing);
      states[i]="Message sent";renderProcesses(target,cfg.count,states);
      addEvent(cfg.processing,`P${i+1} sends a message and continues without waiting.`,label);
      await sleep(cfg.delay);
      addEvent(cfg.processing+cfg.delay,`Message delivered to P${i+1}; response handling begins.`,label);
      await sleep(cfg.response);
      states[i]="Completed";renderProcesses(target,cfg.count,states);
      const done=states.filter(s=>s==="Completed").length;
      setProgress(model,(done/cfg.count)*100);
    });
    await Promise.all(jobs);
    elapsed=Math.round(performance.now()-start);
  }
  $(model+"Time").textContent=elapsed+" ms";
  latest[model]={time:elapsed,config:cfg};
  addEvent(elapsed,"All processes completed.",label);
  return elapsed;
}
function updateChart(){
  if(!latest.sync||!latest.async)return;
  const s=latest.sync.time,a=latest.async.time;
  const ctx=$("comparisonChart").getContext("2d");
  if(chart)chart.destroy();
  chart=new Chart(ctx,{type:"bar",data:{labels:["Synchronous","Asynchronous"],datasets:[{label:"Completion time (ms)",data:[s,a],backgroundColor:["#3979d8","#0a9b8b"],borderRadius:8,maxBarThickness:85}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,title:{display:true,text:"Time (milliseconds)"}},x:{grid:{display:false}}}}});
  const faster=Math.min(s,a), name=s<a?"Synchronous":"Asynchronous";
  const diff=Math.abs(s-a);
  $("summary").innerHTML=`<b>${name}</b> completed faster in this run by <b>${diff} ms</b>. Synchronous: ${s} ms. Asynchronous: ${a} ms. This result is based on the selected simulation settings; it is not a benchmark of real distributed machines.`;
}
async function runOne(model){
  clearView();$("runStatus").textContent="Simulation running";
  await runModel(model,settings());$("runStatus").textContent="Completed";
}
async function runBoth(){
  clearView();const cfg=settings();$("runStatus").textContent="Running both models";
  // Run sequentially to keep the event trace easy to follow; each model uses identical settings.
  await runModel("sync",cfg);await runModel("async",cfg);
  updateChart();$("runStatus").textContent="Comparison ready";
}
$("syncBtn").addEventListener("click",()=>runOne("sync"));
$("asyncBtn").addEventListener("click",()=>runOne("async"));
$("bothBtn").addEventListener("click",runBoth);
$("resetBtn").addEventListener("click",clearView);
clearView();
