const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function renderPhilosophy(){
  const p = COVA_DATA.philosophy;
  $("#philosophyContent").innerHTML = `
    <div class="card">
      <h3>핵심 3축</h3>
      <ul class="check">${p.pillars.map(x=>`<li>${x}</li>`).join("")}</ul>
      <p class="muted">${p.loop}</p>
      <p class="muted">${p.mode}</p>
      <p class="muted">${p.iep}</p>
    </div>`;
}

function renderList(id, arr){ $(id).innerHTML = arr.map(x=>`<li>${x}</li>`).join(""); }
function renderOrdered(id, arr){ $(id).innerHTML = arr.map(x=>`<li>${x}</li>`).join(""); }

function renderTable(targetId, rows){
  const thead = `<thead><tr><th>주차</th><th>질문</th></tr></thead>`;
  const tbody = `<tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody>`;
  $(targetId).innerHTML = thead + tbody;
}

function renderFAQ(){
  const wrap = $("#faqList");
  wrap.innerHTML = COVA_DATA.faq.map(([q,a])=>`
    <details><summary>${q}</summary><div class="muted" style="margin-top:8px">${a}</div></details>
  `).join("");
}

function initNav(){
  const btn = $(".nav-toggle");
  const list = $(".nav-list");
  btn.addEventListener("click", ()=> list.classList.toggle("open"));
  $$(".nav-list a").forEach(a=>a.addEventListener("click", ()=> list.classList.remove("open")));
}

function initTheme(){
  const btn = $("#themeToggle");
  btn.addEventListener("click", ()=>{
    document.documentElement.classList.toggle("dark");
    btn.textContent = document.documentElement.classList.contains("dark") ? "🌙" : "☀️";
  });
}

// Additional theme styles are now in styles.css

// Mount all
document.addEventListener("DOMContentLoaded", ()=>{
  renderPhilosophy();

  // G1
  renderList("#g1DayLoop", COVA_DATA.g1.dayLoop);
  renderOrdered("#g1ThreeDay", COVA_DATA.g1.threeDay);
  renderList("#g1Monthly", COVA_DATA.g1.monthly);
  renderList("#g1Checkbell", COVA_DATA.g1.checkbell);

  // G2
  renderList("#g2DayLoop", COVA_DATA.g2.dayLoop);
  renderOrdered("#g2ThreeDay", COVA_DATA.g2.threeDay);
  renderList("#g2Monthly", COVA_DATA.g2.monthly);
  renderList("#g2Gates", COVA_DATA.g2.gates);

  // Kick-Off tables
  renderTable("#kickG1", COVA_DATA.kickoff.g1);
  renderTable("#kickG2", COVA_DATA.kickoff.g2);

  // Step-Zero
  renderOrdered("#szDaily", COVA_DATA.stepZero.daily);
  renderList("#szRubric", COVA_DATA.stepZero.rubric);
  renderList("#sz12w", COVA_DATA.stepZero.twelveWeeks);

  // KPI
  renderList("#kpiCommon", COVA_DATA.kpi.common);
  renderList("#kpiG2", COVA_DATA.kpi.g2);

  // FAQ
  renderFAQ();

  initNav();
  initTheme();
});