import { useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   OPPORTUNITIES CENTER — O-STAFF ENTERPRISE
   Système RH complet · Niveau SAP/Workday
   Paie Pi + FCFA · Contrats · Évaluations · O-AI RH
   CEO : Ulrich Bakouma · Congo Brazzaville
═══════════════════════════════════════════════════════════════════ */

const T = {
  blue:"#1B4B8A",sky:"#29ABE2",orange:"#F07A1A",orangeLt:"#F8A252",
  gold:"#F59E0B",goldLt:"#FCD34D",pi:"#6B21A8",piLt:"#9333EA",
  green:"#10B981",red:"#EF4444",yellow:"#F59E0B",teal:"#00838F",
  dark:"#07080F",s1:"#0E0F18",s2:"#14151F",s3:"#1A1B28",
  border:"rgba(255,255,255,0.06)",border2:"rgba(255,255,255,0.11)",
  text:"#E8E4F0",mid:"#8880A0",dim:"#45425A",
};
const GCV = 314159;
const LOGO = "data:image/jpeg;base64,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";

async function ai(system, user, onChunk) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:900, stream:true,
      system, messages:[{role:"user",content:user}] })
  });
  const reader = r.body.getReader(); const dec = new TextDecoder(); let buf="";
  while(true){
    const {done,value}=await reader.read(); if(done) break;
    buf+=dec.decode(value,{stream:true});
    const lines=buf.split("\n"); buf=lines.pop();
    for(const l of lines){
      if(l.startsWith("data: ")){const d=l.slice(6).trim();if(d==="[DONE]")return;
        try{const j=JSON.parse(d);if(j?.delta?.text)onChunk(j.delta.text);}catch{}}
    }
  }
}

function Spin({size=16,color="#29ABE2"}){
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{animation:"spin 1s linear infinite",flexShrink:0}}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" fill="none" strokeDasharray="60" strokeDashoffset="20"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
}

// ── EMPLOYEES DATA ─────────────────────────────────────────────
const EMPLOYEES = [
  { id:1, name:"Ulrich Bakouma", role:"CEO & Fondateur", dept:"Direction", salary_fcfa:1500000, salary_pi:0.00477,
    status:"Actif", join:"2023-01-01", phone:"+242 06 123 4567", email:"ceo@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:5, rating:5.0, avatar:"UB", color:"#1B4B8A",
    skills:["Leadership","Pi Network","IA","Business"],
    tasks:["Stratégie Q1 2026","Réunion investisseurs","Lancement O-Series"] },
  { id:2, name:"Antonin Mougani", role:"1er Vice-CEO", dept:"Direction", salary_fcfa:1200000, salary_pi:0.00382,
    status:"Actif", join:"2023-02-15", phone:"+242 06 234 5678", email:"1er.vceo@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:8, rating:4.8, avatar:"AM", color:"#6B21A8",
    skills:["Management","Finance","Pi Network","RH"],
    tasks:["Rapport mensuel O-Series","KPI Q4","Recrutement dev"] },
  { id:3, name:"Medhi Houatoma", role:"2e Vice-CEO", dept:"Tech", salary_fcfa:1100000, salary_pi:0.00350,
    status:"Actif", join:"2023-03-01", phone:"+242 06 345 6789", email:"2e.vceo@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:3, rating:4.9, avatar:"MH", color:"#0D47A1",
    skills:["Développement","React","Pi SDK","API"],
    tasks:["Intégration Pi Mainnet","O-Wallet v2","API documentation"] },
  { id:4, name:"Sarah Moukala", role:"Directrice Marketing", dept:"Marketing", salary_fcfa:850000, salary_pi:0.00270,
    status:"Actif", join:"2023-06-01", phone:"+242 06 456 7890", email:"marketing@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:12, rating:4.7, avatar:"SM", color:"#AD1457",
    skills:["Marketing Digital","SEO","Social Media","Contenu"],
    tasks:["Campagne Pionniers Pi","Newsletter OC","Stratégie TikTok"] },
  { id:5, name:"Patrick Nganga", role:"Développeur Senior", dept:"Tech", salary_fcfa:700000, salary_pi:0.00223,
    status:"Actif", join:"2023-09-01", phone:"+242 06 567 8901", email:"dev@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:2, rating:4.6, avatar:"PN", color:"#00695C",
    skills:["JavaScript","React","Node.js","Pi SDK"],
    tasks:["O-Commerce v2","Bug fix O-Wallet","Tests unitaires"] },
  { id:6, name:"Christelle Bouya", role:"Comptable", dept:"Finance", salary_fcfa:600000, salary_pi:0.00191,
    status:"Congé", join:"2023-10-01", phone:"+242 06 678 9012", email:"finance@opportunitiescenter.com",
    contract:"CDI", leave:25, leave_used:18, rating:4.5, avatar:"CB", color:"#2E7D32",
    skills:["Comptabilité","OHADA","Excel","Finance Pi"],
    tasks:["Clôture comptable nov","Déclarations fiscales","Budget 2026"] },
  { id:7, name:"Jean-Baptiste Mbemba", role:"Commercial", dept:"Ventes", salary_fcfa:500000, salary_pi:0.00159,
    status:"Actif", join:"2024-01-15", phone:"+242 06 789 0123", email:"commercial@opportunitiescenter.com",
    contract:"CDD", leave:20, leave_used:4, rating:4.3, avatar:"JM", color:"#E65100",
    skills:["Ventes","Négociation","CRM","Prospection"],
    tasks:["Prospection Airtel Congo","Contrat BGFI Bank","Rapport ventes"] },
  { id:8, name:"Grâce Nkounkou", role:"Assistante RH", dept:"RH", salary_fcfa:450000, salary_pi:0.00143,
    status:"Actif", join:"2024-03-01", phone:"+242 06 890 1234", email:"rh@opportunitiescenter.com",
    contract:"CDD", leave:20, leave_used:1, rating:4.4, avatar:"GN", color:"#4527A0",
    skills:["RH","Recrutement","Paie","Administration"],
    tasks:["Onboarding 2 nouveaux","Fiches de paie nov","Planning congés"] },
];

const DEPTS = ["Tous","Direction","Tech","Marketing","Finance","Ventes","RH"];
const TABS = ["équipe","paie","congés","évaluations","recrutement","o-ai"];

// ── HELPERS ───────────────────────────────────────────────────
function Avatar({emp, size=40}){
  return <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${emp.color},${emp.color}88)`,
    display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.3,fontWeight:800,color:"white",flexShrink:0}}>
    {emp.avatar}
  </div>;
}

function StatusBadge({status}){
  const c = status==="Actif"?T.green:status==="Congé"?T.yellow:T.red;
  return <span style={{padding:"2px 8px",borderRadius:10,background:c+"20",border:`1px solid ${c}40`,color:c,fontSize:"0.62rem",fontWeight:700}}>{status}</span>;
}

function ContractBadge({type}){
  const c = type==="CDI"?T.blue:T.orange;
  return <span style={{padding:"2px 8px",borderRadius:10,background:c+"20",border:`1px solid ${c}40`,color:c,fontSize:"0.62rem",fontWeight:700}}>{type}</span>;
}

function Stars({n}){return <span style={{color:"#F59E0B",fontSize:"0.78rem"}}>{"★".repeat(Math.round(n))}{"☆".repeat(5-Math.round(n))}</span>;}

function Render({text}){
  if(!text) return null;
  return <div style={{lineHeight:1.78,fontSize:"0.85rem",color:T.text}}>
    {text.split("\n").map((line,i)=>{
      if(line.startsWith("## ")) return <h3 key={i} style={{color:T.sky,fontWeight:700,margin:"10px 0 4px",fontSize:"0.92rem"}}>{line.slice(3)}</h3>;
      if(line.match(/^[-•] /)) return <div key={i} style={{display:"flex",gap:8,marginBottom:3}}><span style={{color:T.orange}}>▸</span><span>{line.slice(2)}</span></div>;
      if(line==="") return <div key={i} style={{height:6}}/>;
      const parts=line.split(/(\*\*[^*]+\*\*)/g);
      return <div key={i} style={{marginBottom:2}}>{parts.map((p,j)=>p.startsWith("**")&&p.endsWith("**")?<strong key={j} style={{color:T.sky}}>{p.slice(2,-2)}</strong>:p)}</div>;
    })}
  </div>;
}

// ── EMPLOYEE MODAL ─────────────────────────────────────────────
function EmployeeModal({emp, onClose}){
  const [tab,setTab]=useState("profil");
  const [aiOut,setAiOut]=useState(""); const [aiLoading,setAiLoading]=useState(false);

  const runAI = async (prompt) => {
    setAiLoading(true); setAiOut("");
    await ai(
      `Tu es O-Staff RH expert pour Opportunities Center. Aide avec la gestion RH de ${emp.name}, ${emp.role}.`,
      prompt,
      c => setAiOut(o=>o+c)
    );
    setAiLoading(false);
  };

  const leaveLeft = emp.leave - emp.leave_used;
  const salaryGCV = (emp.salary_pi * GCV).toFixed(2);

  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(10px)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:12}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:560,maxHeight:"90vh",
        background:T.s1,borderRadius:18,overflow:"auto",border:`2px solid ${emp.color}44`,
        boxShadow:`0 40px 80px rgba(0,0,0,0.6),0 0 0 1px ${emp.color}22`}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${emp.color}88,${emp.color}33)`,padding:"20px 18px",position:"relative"}}>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,0.3)",border:"none",color:"white",borderRadius:8,width:28,height:28,cursor:"pointer"}}>✕</button>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <Avatar emp={emp} size={60}/>
            <div>
              <div style={{fontWeight:900,fontSize:"1.1rem",color:"white"}}>{emp.name}</div>
              <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.65)",marginTop:2}}>{emp.role}</div>
              <div style={{display:"flex",gap:6,marginTop:6}}>
                <StatusBadge status={emp.status}/>
                <ContractBadge type={emp.contract}/>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:T.s2}}>
          {["profil","tâches","o-ai"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 8px",border:"none",borderBottom:`2px solid ${tab===t?emp.color:"transparent"}`,
              background:"transparent",color:tab===t?T.text:T.mid,cursor:"pointer",fontWeight:tab===t?700:400,fontSize:"0.75rem"}}>
              {t==="profil"?"👤 Profil":t==="tâches"?"✅ Tâches":"✨ O-AI RH"}
            </button>
          ))}
        </div>

        <div style={{padding:"16px 18px"}}>
          {/* PROFIL */}
          {tab==="profil" && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {l:"Département",v:emp.dept},
                {l:"Date d'embauche",v:new Date(emp.join).toLocaleDateString("fr-FR")},
                {l:"Téléphone",v:emp.phone},
                {l:"Email",v:emp.email,small:true},
              ].map((item,i)=>(
                <div key={i} style={{background:T.s2,borderRadius:8,padding:"10px 12px"}}>
                  <div style={{fontSize:"0.6rem",color:T.dim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>{item.l}</div>
                  <div style={{fontSize:item.small?"0.7rem":"0.82rem",fontWeight:600,color:T.text}}>{item.v}</div>
                </div>
              ))}
            </div>

            {/* Salaire */}
            <div style={{background:`linear-gradient(135deg,rgba(107,33,168,0.2),rgba(27,75,138,0.1))`,border:`1px solid rgba(107,33,168,0.3)`,borderRadius:10,padding:14,marginBottom:12}}>
              <div style={{fontSize:"0.65rem",color:T.mid,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>💰 Rémunération</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:"0.95rem",color:T.text}}>{emp.salary_fcfa.toLocaleString("fr-FR")}</div>
                  <div style={{fontSize:"0.6rem",color:T.mid,marginTop:2}}>FCFA/mois</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:"0.95rem",color:T.goldLt}}>π {emp.salary_pi.toFixed(5)}</div>
                  <div style={{fontSize:"0.6rem",color:T.mid,marginTop:2}}>Pi/mois</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:"0.95rem",color:T.green}}>${salaryGCV}</div>
                  <div style={{fontSize:"0.6rem",color:T.mid,marginTop:2}}>GCV/mois</div>
                </div>
              </div>
            </div>

            {/* Congés */}
            <div style={{background:T.s2,borderRadius:10,padding:12,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:"0.72rem",color:T.mid}}>🏖️ Congés</span>
                <span style={{fontSize:"0.72rem",fontWeight:700,color:leaveLeft>5?T.green:T.red}}>{leaveLeft}/{emp.leave} jours restants</span>
              </div>
              <div style={{height:6,background:T.border,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(emp.leave_used/emp.leave)*100}%`,background:`linear-gradient(90deg,${T.orange},${T.orangeLt})`,borderRadius:3}}/>
              </div>
            </div>

            {/* Évaluation */}
            <div style={{background:T.s2,borderRadius:10,padding:12,marginBottom:12}}>
              <div style={{display:"flex",justify:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:"0.72rem",color:T.mid}}>⭐ Évaluation</span>
                <span style={{fontWeight:800,color:T.goldLt,marginLeft:"auto"}}>{emp.rating}/5</span>
              </div>
              <Stars n={emp.rating}/>
            </div>

            {/* Compétences */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:"0.65rem",color:T.mid,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>🎯 Compétences</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {emp.skills.map((s,i)=>(
                  <span key={i} style={{padding:"4px 10px",borderRadius:14,background:`${emp.color}18`,border:`1px solid ${emp.color}44`,color:emp.color,fontSize:"0.72rem",fontWeight:600}}>✓ {s}</span>
                ))}
              </div>
            </div>
          </>}

          {/* TÂCHES */}
          {tab==="tâches" && <>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:"0.72rem",color:T.mid,marginBottom:10}}>Tâches en cours pour {emp.name}</div>
              {emp.tasks.map((task,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.s2,borderRadius:9,marginBottom:6,border:`1px solid ${T.border}`}}>
                  <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${emp.color}`,flexShrink:0}}/>
                  <span style={{fontSize:"0.82rem",color:T.text}}>{task}</span>
                  <span style={{marginLeft:"auto",fontSize:"0.65rem",color:T.dim,background:T.s3,padding:"2px 8px",borderRadius:6}}>En cours</span>
                </div>
              ))}
            </div>
            <button onClick={()=>runAI(`Génère 3 nouvelles tâches prioritaires pour ${emp.name}, ${emp.role} chez Opportunities Center Congo.`)}
              style={{width:"100%",padding:11,borderRadius:9,background:"rgba(41,171,226,0.1)",border:`1px solid ${T.sky}33`,color:T.sky,cursor:"pointer",fontWeight:600,fontSize:"0.78rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              {aiLoading?<><Spin size={13} color={T.sky}/>O-AI génère des tâches...</>:"✨ O-AI — Générer des tâches"}
            </button>
            {aiOut&&<div style={{marginTop:10,background:T.s2,borderRadius:10,padding:12,border:`1px solid ${T.border2}`}}><Render text={aiOut}/></div>}
          </>}

          {/* O-AI RH */}
          {tab==="o-ai" && <>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
              {[
                `Rédige une évaluation annuelle pour ${emp.name}`,
                `Plan de formation pour ${emp.role}`,
                `Lettre d'augmentation pour ${emp.name}`,
                `Objectifs SMART Q1 2026 pour ${emp.name}`,
                `Analyse performance ${emp.dept}`,
                `Contrat CDI template pour Congo`,
              ].map((p,i)=>(
                <button key={i} onClick={()=>runAI(p)} style={{padding:"5px 10px",borderRadius:14,background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${T.border}`,color:T.mid,cursor:"pointer",fontSize:"0.68rem",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.target.style.borderColor=emp.color;e.target.style.color=emp.color;}}
                  onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.mid;}}>{p.slice(0,35)}...</button>
              ))}
            </div>
            {aiLoading&&<div style={{display:"flex",alignItems:"center",gap:8,color:T.sky,fontSize:"0.78rem",marginBottom:10}}><Spin size={14} color={T.sky}/>O-AI rédige...</div>}
            {aiOut&&<div style={{background:T.s2,borderRadius:10,padding:14,border:`1px solid ${T.border2}`}}><Render text={aiOut}/></div>}
          </>}
        </div>
      </div>
    </div>
  );
}

// ── PAIE SECTION ───────────────────────────────────────────────
function PayrollSection({employees}){
  const [month,setMonth]=useState("Novembre 2025");
  const [aiOut,setAiOut]=useState(""); const [aiLoading,setAiLoading]=useState(false);
  const totalFCFA = employees.reduce((s,e)=>s+e.salary_fcfa,0);
  const totalPi = employees.reduce((s,e)=>s+e.salary_pi,0);

  const runAI = async () => {
    setAiLoading(true); setAiOut("");
    await ai(
      "Tu es O-Staff, expert paie RH pour Opportunities Center Congo. Droit du travail OHADA, cotisations CNSS Congo.",
      `Génère un résumé de paie pour ${month}. Total masse salariale: ${totalFCFA.toLocaleString()} FCFA (${totalPi.toFixed(5)}π GCV). ${employees.length} employés. Inclus cotisations CNSS, IRPP estimatifs.`,
      c => setAiOut(o=>o+c)
    );
    setAiLoading(false);
  };

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {l:"Masse salariale FCFA",v:totalFCFA.toLocaleString("fr-FR")+" FCFA",c:T.green},
        {l:"Masse salariale Pi",v:"π "+totalPi.toFixed(5),c:T.goldLt},
        {l:"Valeur GCV",v:"$"+(totalPi*GCV).toFixed(0),c:T.teal},
      ].map((s,i)=>(
        <div key={i} style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px",textAlign:"center"}}>
          <div style={{fontWeight:900,fontSize:"0.95rem",color:s.c}}>{s.v}</div>
          <div style={{fontSize:"0.58rem",color:T.dim,marginTop:3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
        </div>
      ))}
    </div>

    <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"11px 14px",background:T.s2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,fontSize:"0.82rem"}}>💰 Bulletins de paie — {month}</span>
        <select value={month} onChange={e=>setMonth(e.target.value)}
          style={{background:T.s3,border:`1px solid ${T.border}`,borderRadius:6,color:T.text,padding:"4px 8px",fontSize:"0.72rem",outline:"none"}}>
          {["Novembre 2025","Octobre 2025","Septembre 2025"].map(m=><option key={m}>{m}</option>)}
        </select>
      </div>
      {employees.map(emp=>(
        <div key={emp.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderBottom:`1px solid ${T.border}`}}>
          <Avatar emp={emp} size={34}/>
          <div style={{flex:1}}>
            <div style={{fontSize:"0.82rem",fontWeight:700}}>{emp.name}</div>
            <div style={{fontSize:"0.65rem",color:T.mid}}>{emp.role} · {emp.contract}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:700,fontSize:"0.82rem",color:T.text}}>{emp.salary_fcfa.toLocaleString("fr-FR")} FCFA</div>
            <div style={{fontSize:"0.65rem",color:T.goldLt}}>π {emp.salary_pi.toFixed(5)}</div>
          </div>
          <button style={{padding:"5px 10px",borderRadius:6,background:"rgba(27,75,138,0.2)",border:`1px solid ${T.border}`,color:T.sky,cursor:"pointer",fontSize:"0.65rem",fontWeight:600}}>PDF</button>
        </div>
      ))}
    </div>

    <button onClick={runAI} disabled={aiLoading} style={{width:"100%",padding:12,borderRadius:10,background:"rgba(41,171,226,0.1)",border:`1px solid ${T.sky}33`,color:T.sky,cursor:"pointer",fontWeight:700,fontSize:"0.82rem",display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:10}}>
      {aiLoading?<><Spin size={14} color={T.sky}/>Analyse O-AI...</>:"✨ O-AI — Analyse paie & cotisations CNSS"}
    </button>
    {aiOut&&<div style={{background:T.s1,borderRadius:12,padding:16,border:`1px solid ${T.border2}`}}><Render text={aiOut}/></div>}
  </div>;
}

// ── LEAVE SECTION ──────────────────────────────────────────────
function LeaveSection({employees}){
  const [selected,setSelected]=useState(null);
  const [aiOut,setAiOut]=useState(""); const [aiLoading,setAiLoading]=useState(false);

  const approve = async (emp) => {
    setAiLoading(true); setAiOut(""); setSelected(emp);
    await ai(
      "Tu es O-Staff RH pour OC Congo. Gère les demandes de congés professionnellement.",
      `Rédige une réponse d'approbation de congé pour ${emp.name} (${emp.role}). Congés restants: ${emp.leave-emp.leave_used} jours. Ton professionnel et bienveillant.`,
      c => setAiOut(o=>o+c)
    );
    setAiLoading(false);
  };

  return <div>
    <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"11px 14px",background:T.s2,fontWeight:700,fontSize:"0.82rem"}}>🏖️ Gestion des congés</div>
      {employees.map(emp=>{
        const left = emp.leave - emp.leave_used;
        return <div key={emp.id} style={{padding:"12px 14px",borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <Avatar emp={emp} size={32}/>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.82rem",fontWeight:700}}>{emp.name}</div>
              <div style={{fontSize:"0.65rem",color:T.mid}}>{emp.dept}</div>
            </div>
            <StatusBadge status={emp.status}/>
            <button onClick={()=>approve(emp)} style={{padding:"5px 10px",borderRadius:6,background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",color:T.green,cursor:"pointer",fontSize:"0.65rem",fontWeight:600}}>
              ✨ O-AI
            </button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,height:5,background:T.border,borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(emp.leave_used/emp.leave)*100}%`,background:left>10?`linear-gradient(90deg,${T.green},#059669)`:left>5?`linear-gradient(90deg,${T.yellow},${T.orange})`:`linear-gradient(90deg,${T.red},#DC2626)`,borderRadius:3}}/>
            </div>
            <span style={{fontSize:"0.7rem",fontWeight:700,color:left>10?T.green:left>5?T.yellow:T.red,flexShrink:0}}>{left}/{emp.leave}j</span>
          </div>
        </div>;
      })}
    </div>
    {aiLoading&&<div style={{display:"flex",alignItems:"center",gap:8,color:T.sky,fontSize:"0.78rem",marginBottom:8}}><Spin size={14} color={T.sky}/>O-AI rédige la réponse...</div>}
    {aiOut&&selected&&<div style={{background:T.s1,borderRadius:12,padding:16,border:`1px solid rgba(16,185,129,0.3)`}}>
      <div style={{fontSize:"0.7rem",color:T.green,fontWeight:700,marginBottom:8}}>✨ Réponse O-AI pour {selected.name}</div>
      <Render text={aiOut}/>
    </div>}
  </div>;
}

// ── EVAL SECTION ───────────────────────────────────────────────
function EvalSection({employees}){
  const [sel,setSel]=useState(null);
  const [aiOut,setAiOut]=useState(""); const [aiLoading,setAiLoading]=useState(false);

  const evalAI = async (emp) => {
    setSel(emp); setAiLoading(true); setAiOut("");
    await ai(
      "Tu es O-Staff, expert évaluation RH pour OC Congo. Rédige des évaluations annuelles professionnelles.",
      `Rédige une évaluation annuelle complète pour ${emp.name} (${emp.role}, ${emp.dept}). Note: ${emp.rating}/5. Compétences: ${emp.skills.join(", ")}. Tâches récentes: ${emp.tasks.join(", ")}. Inclus: points forts, axes d'amélioration, objectifs 2026, recommandation.`,
      c => setAiOut(o=>o+c)
    );
    setAiLoading(false);
  };

  return <div>
    <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"11px 14px",background:T.s2,fontWeight:700,fontSize:"0.82rem"}}>⭐ Évaluations annuelles 2025</div>
      {employees.map(emp=>(
        <div key={emp.id} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderBottom:`1px solid ${T.border}`}}>
          <Avatar emp={emp} size={36}/>
          <div style={{flex:1}}>
            <div style={{fontSize:"0.82rem",fontWeight:700}}>{emp.name}</div>
            <div style={{fontSize:"0.65rem",color:T.mid}}>{emp.role}</div>
            <Stars n={emp.rating}/>
          </div>
          <div style={{textAlign:"right",marginRight:8}}>
            <div style={{fontWeight:900,fontSize:"1rem",color:T.goldLt}}>{emp.rating}</div>
            <div style={{fontSize:"0.6rem",color:T.dim}}>/5</div>
          </div>
          <button onClick={()=>evalAI(emp)} style={{padding:"7px 12px",borderRadius:8,background:`linear-gradient(135deg,${T.orange},${T.orangeLt})`,border:"none",color:"white",cursor:"pointer",fontWeight:700,fontSize:"0.7rem"}}>
            ✨ Évaluer
          </button>
        </div>
      ))}
    </div>
    {aiLoading&&<div style={{display:"flex",alignItems:"center",gap:8,color:T.sky,fontSize:"0.78rem",marginBottom:8,padding:"10px 14px",background:T.s1,borderRadius:10}}><Spin size={14} color={T.sky}/>O-AI rédige l'évaluation de {sel?.name}...</div>}
    {aiOut&&sel&&<div style={{background:T.s1,borderRadius:12,padding:16,border:`1px solid ${T.border2}`}}>
      <div style={{fontSize:"0.7rem",color:T.orange,fontWeight:700,marginBottom:10}}>✨ Évaluation O-AI — {sel.name}</div>
      <Render text={aiOut}/>
    </div>}
  </div>;
}

// ── RECRUIT SECTION ────────────────────────────────────────────
function RecruitSection(){
  const [job,setJob]=useState(""); const [aiOut,setAiOut]=useState(""); const [aiLoading,setAiLoading]=useState(false);
  const JOBS = ["Développeur React Senior","Responsable Marketing Digital","Commercial B2B","Comptable OHADA","Designer UI/UX","Chef de projet Pi Network"];

  const genJob = async (title) => {
    setJob(title); setAiLoading(true); setAiOut("");
    await ai(
      "Tu es O-Staff, expert recrutement pour Opportunities Center Congo. Rédige des offres d'emploi attractives.",
      `Rédige une offre d'emploi complète pour: ${title} chez Opportunities Center, Congo Brazzaville. Inclus: description poste, missions, profil recherché, compétences, rémunération en FCFA ET Pi (GCV $314,159), avantages, processus candidature. Email: rh@opportunitiescenter.com`,
      c => setAiOut(o=>o+c)
    );
    setAiLoading(false);
  };

  return <div>
    <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,padding:16,marginBottom:12}}>
      <div style={{fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>🔍 Générer une offre d'emploi</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        {JOBS.map((j,i)=>(
          <button key={i} onClick={()=>genJob(j)} style={{padding:"6px 12px",borderRadius:14,background:"rgba(255,255,255,0.04)",
            border:`1px solid ${job===j?T.orange:T.border}`,color:job===j?T.orangeLt:T.mid,cursor:"pointer",fontSize:"0.72rem",transition:"all 0.2s"}}>
            {j}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={job} onChange={e=>setJob(e.target.value)} placeholder="Ou tapez un poste personnalisé..."
          style={{flex:1,padding:"9px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"rgba(255,255,255,0.04)",color:T.text,fontFamily:"inherit",fontSize:"0.82rem",outline:"none"}}/>
        <button onClick={()=>genJob(job)} disabled={aiLoading||!job.trim()}
          style={{padding:"9px 16px",borderRadius:8,background:`linear-gradient(135deg,${T.orange},${T.orangeLt})`,border:"none",color:"white",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",display:"flex",alignItems:"center",gap:6}}>
          {aiLoading?<><Spin size={14} color="white"/>Génération...</>:"✨ Générer"}
        </button>
      </div>
    </div>
    {aiOut&&<div style={{background:T.s1,borderRadius:12,padding:16,border:`1px solid ${T.border2}`}}>
      <div style={{fontSize:"0.7rem",color:T.orange,fontWeight:700,marginBottom:10}}>📋 Offre d'emploi — {job}</div>
      <Render text={aiOut}/>
      <button style={{marginTop:12,padding:"8px 16px",borderRadius:8,background:"rgba(27,75,138,0.2)",border:`1px solid ${T.border}`,color:T.sky,cursor:"pointer",fontWeight:600,fontSize:"0.75rem"}}>
        📥 Exporter PDF
      </button>
    </div>}
  </div>;
}

// ── O-AI RH SECTION ───────────────────────────────────────────
function OAISection(){
  const [input,setInput]=useState(""); const [output,setOutput]=useState(""); const [loading,setLoading]=useState(false);
  const PROMPTS = [
    "Politique de télétravail pour OC Congo","Règlement intérieur OHADA","Plan formation équipe tech 2026",
    "Grille salariale marché Brazzaville","Procédure disciplinaire Congo","Charte diversité & inclusion",
    "Plan onboarding nouveau collaborateur","Politique congés maternité Congo","Guide entretien annuel",
  ];
  const run = async (p) => {
    const prompt = p || input; if(!prompt) return;
    setInput(prompt); setLoading(true); setOutput("");
    await ai(
      "Tu es O-Staff, expert RH et droit du travail pour Opportunities Center Congo. Droit OHADA, CNSS Congo, Code du travail congolais. Réponds en français, de façon professionnelle et détaillée.",
      prompt, c => setOutput(o=>o+c)
    );
    setLoading(false);
  };

  return <div>
    <div style={{background:`linear-gradient(135deg,rgba(107,33,168,0.15),rgba(27,75,138,0.1))`,border:`1px solid rgba(107,33,168,0.3)`,borderRadius:12,padding:16,marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:"1.2rem"}}>🤖</span>
        <div>
          <div style={{fontWeight:700,fontSize:"0.9rem"}}>O-AI RH — Assistant Ressources Humaines</div>
          <div style={{fontSize:"0.65rem",color:T.mid}}>Droit du travail Congo · OHADA · CNSS · Paie · Recrutement</div>
        </div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        {PROMPTS.map((p,i)=>(
          <button key={i} onClick={()=>run(p)} style={{padding:"5px 10px",borderRadius:14,background:"rgba(255,255,255,0.04)",
            border:`1px solid ${T.border}`,color:T.mid,cursor:"pointer",fontSize:"0.68rem"}}
            onMouseEnter={e=>{e.target.style.borderColor=T.pi;e.target.style.color=T.piLt;}}
            onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.mid;}}>{p}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}
          placeholder="Votre question RH..."
          style={{flex:1,padding:"9px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"rgba(255,255,255,0.04)",color:T.text,fontFamily:"inherit",fontSize:"0.82rem",outline:"none"}}/>
        <button onClick={()=>run()} disabled={loading||!input.trim()} style={{padding:"9px 14px",borderRadius:8,background:`linear-gradient(135deg,${T.pi},${T.piLt})`,border:"none",color:"white",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",display:"flex",alignItems:"center",gap:5}}>
          {loading?<Spin size={14} color="white"/>:"→"}
        </button>
      </div>
    </div>
    {loading&&<div style={{display:"flex",alignItems:"center",gap:8,color:T.sky,fontSize:"0.78rem",marginBottom:8}}><Spin size={14} color={T.sky}/>O-AI RH répond...</div>}
    {output&&<div style={{background:T.s1,borderRadius:12,padding:16,border:`1px solid ${T.border2}`}}><Render text={output}/></div>}
  </div>;
}

// ── MAIN ──────────────────────────────────────────────────────
export default function OStaffEnterprise(){
  const [tab,setTab]=useState("équipe");
  const [dept,setDept]=useState("Tous");
  const [search,setSearch]=useState("");
  const [selectedEmp,setSelectedEmp]=useState(null);
  const [notification,setNotification]=useState(null);

  const notify = msg => { setNotification(msg); setTimeout(()=>setNotification(null),2500); };

  const filtered = EMPLOYEES.filter(e=>(dept==="Tous"||e.dept===dept)&&(e.name.toLowerCase().includes(search.toLowerCase())||e.role.toLowerCase().includes(search.toLowerCase())));

  const actifs = EMPLOYEES.filter(e=>e.status==="Actif").length;
  const totalFCFA = EMPLOYEES.reduce((s,e)=>s+e.salary_fcfa,0);

  return (
    <div style={{minHeight:"100vh",background:T.dark,color:T.text,fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:${T.dim};border-radius:2px;}@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {notification&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"rgba(16,185,129,0.95)",color:"white",padding:"9px 18px",borderRadius:10,fontWeight:600,fontSize:"0.8rem",boxShadow:"0 4px 20px rgba(0,0,0,0.4)",animation:"slideIn 0.3s ease"}}>{notification}</div>}

      {/* NAV */}
      <nav style={{background:"rgba(0,0,0,0.7)",backdropFilter:"blur(12px)",padding:"0 16px",height:54,display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:200}}>
        <div style={{width:36,height:36,borderRadius:"50%",overflow:"hidden",background:"white",border:`2px solid ${T.orange}`,flexShrink:0}}>
          <img src={LOGO} alt="OC" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:"0.9rem"}}>O-Staff</div>
          <div style={{fontSize:"0.52rem",color:T.mid,letterSpacing:"0.1em"}}>OPPORTUNITIES CENTER · RH ENTERPRISE</div>
        </div>
        <div style={{fontSize:"0.72rem",color:T.green,fontWeight:700,background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.25)",padding:"4px 10px",borderRadius:8}}>
          {actifs}/{EMPLOYEES.length} actifs
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,rgba(55,71,79,0.6),rgba(27,75,138,0.4))",padding:"22px 18px 0",borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h1 style={{fontSize:"clamp(1.2rem,3vw,1.8rem)",fontWeight:900,color:"white",marginBottom:6}}>
            O-Staff RH Enterprise
          </h1>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.78rem",marginBottom:14}}>
            Gestion complète du personnel · Paie Pi + FCFA · Évaluations · Recrutement · Droit OHADA
          </p>
          {/* STATS */}
          <div style={{display:"flex",gap:8,marginBottom:0,flexWrap:"wrap"}}>
            {[{n:EMPLOYEES.length,l:"Employés"},{n:actifs,l:"Actifs"},{n:totalFCFA.toLocaleString("fr-FR"),l:"Masse FCFA"},{n:EMPLOYEES.reduce((s,e)=>s+e.salary_pi,0).toFixed(4)+"π",l:"Masse Pi"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${T.border}`,borderRadius:10,padding:"9px 14px",textAlign:"center"}}>
                <div style={{color:T.orangeLt,fontWeight:900,fontSize:"0.92rem"}}>{s.n}</div>
                <div style={{color:"rgba(255,255,255,0.35)",fontSize:"0.58rem",marginTop:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* TABS */}
          <div style={{display:"flex",gap:0,marginTop:14,overflowX:"auto",scrollbarWidth:"none"}}>
            {TABS.map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:"11px 16px",border:"none",borderBottom:`2px solid ${tab===t?T.orange:"transparent"}`,
                background:"transparent",color:tab===t?T.orangeLt:T.mid,cursor:"pointer",fontWeight:tab===t?700:400,fontSize:"0.75rem",whiteSpace:"nowrap",transition:"all 0.2s"}}>
                {t==="équipe"?"👥 Équipe":t==="paie"?"💰 Paie":t==="congés"?"🏖️ Congés":t==="évaluations"?"⭐ Évaluations":t==="recrutement"?"🔍 Recrutement":"✨ O-AI RH"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"16px 14px 60px"}}>

        {/* EQUIPE TAB */}
        {tab==="équipe" && <>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,minWidth:200}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",opacity:0.35}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un employé..."
                style={{width:"100%",padding:"9px 12px 9px 32px",borderRadius:8,border:`1px solid ${T.border}`,background:"rgba(255,255,255,0.04)",color:T.text,fontFamily:"inherit",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <select value={dept} onChange={e=>setDept(e.target.value)}
              style={{padding:"9px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:T.s2,color:T.text,fontSize:"0.78rem",outline:"none",cursor:"pointer"}}>
              {DEPTS.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
            {filtered.map(emp=>(
              <div key={emp.id} onClick={()=>setSelectedEmp(emp)}
                style={{background:T.s1,border:`1.5px solid ${T.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=emp.color+"66"}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                  <Avatar emp={emp} size={42}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:"0.88rem"}}>{emp.name}</div>
                    <div style={{fontSize:"0.68rem",color:T.mid,marginTop:1}}>{emp.role}</div>
                  </div>
                  <StatusBadge status={emp.status}/>
                </div>
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  <ContractBadge type={emp.contract}/>
                  <span style={{padding:"2px 8px",borderRadius:10,background:`${emp.color}15`,border:`1px solid ${emp.color}33`,color:emp.color,fontSize:"0.6rem",fontWeight:700}}>{emp.dept}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem"}}>
                  <div><span style={{color:T.mid}}>Salaire: </span><span style={{color:T.goldLt,fontWeight:700}}>π {emp.salary_pi.toFixed(5)}</span></div>
                  <div><Stars n={emp.rating}/></div>
                </div>
              </div>
            ))}
          </div>
        </>}

        {tab==="paie" && <PayrollSection employees={EMPLOYEES}/>}
        {tab==="congés" && <LeaveSection employees={EMPLOYEES}/>}
        {tab==="évaluations" && <EvalSection employees={EMPLOYEES}/>}
        {tab==="recrutement" && <RecruitSection/>}
        {tab==="o-ai" && <OAISection/>}

        {/* FOOTER */}
        <div style={{marginTop:24,padding:"14px 16px",background:`linear-gradient(135deg,rgba(55,71,79,0.15),rgba(27,75,138,0.08))`,border:`1px solid ${T.border}`,borderRadius:12,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:7,overflow:"hidden",background:"white",flexShrink:0}}>
            <img src={LOGO} alt="OC" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:"0.8rem"}}>O-Staff RH — Opportunities Center</div>
            <div style={{fontSize:"0.62rem",color:T.dim}}>Congo Brazzaville · OHADA · CNSS · GCV 1π=$314,159</div>
          </div>
        </div>
      </div>

      {selectedEmp&&<EmployeeModal emp={selectedEmp} onClose={()=>setSelectedEmp(null)}/>}
    </div>
  );
}
