import {useMemo,useState} from 'react';
import {ArrowUpRight,BookOpen,Code2,Filter,GitBranch,Github,Layers3,Search,Sparkles,TrendingUp,X} from 'lucide-react';
import {categories,methods,type Method} from './data';

const repo='https://github.com/joelulu/Awesome-Efficient-Diffusion';
const applications=['全部应用','图像','视频','世界模型','扩散语言模型','通用'];
const start=new Date('2020-01-01').getTime();
const end=new Date('2026-10-01').getTime();
const years=[2020,2021,2022,2023,2024,2025,2026];
const catMap=Object.fromEntries(categories.map(c=>[c.id,c]));
const pct=(date:string)=>Math.max(1,Math.min(99,(new Date(date).getTime()-start)/(end-start)*100));
const ext=(url:string)=>window.open(url,'_blank','noopener,noreferrer');

function MethodCard({m,active,onLocate}:{m:Method;active:boolean;onLocate:(id:string)=>void}){
  const c=catMap[m.category];
  return <article id={`paper-${m.id}`} className={`paper-card ${active?'active':''}`} style={{'--accent':c.color} as React.CSSProperties}>
    <div className="paper-head">
      <div><div className="badges"><span className="cat-badge">{c.name}</span>{m.representative&&<span className="rep-badge">代表工作</span>}{m.latest&&<span className="new-badge">最新</span>}{m.hybrid&&<span className="hybrid-badge">复合加速</span>}</div>
      <h3>{m.name}</h3><p className="paper-title">{m.title}</p></div>
      <time>{m.date}</time>
    </div>
    <p className="paper-summary">{m.summary}</p>
    <div className="paper-meta"><span>{m.venue||'论文 / 技术报告'}</span><span>{m.training||'—'}</span>{m.applications.map(a=><span key={a}>{a}</span>)}</div>
    <div className="paper-actions">
      <button onClick={()=>ext(m.paperUrl)}><BookOpen size={14}/>论文 / 项目<ArrowUpRight size={12}/></button>
      {m.codeUrl&&<button onClick={()=>ext(m.codeUrl)}><Github size={14}/>代码<ArrowUpRight size={12}/></button>}
      <button onClick={()=>onLocate(m.id)}><GitBranch size={14}/>在地图中定位</button>
    </div>
  </article>
}

export default function App(){
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('all');
  const [application,setApplication]=useState('全部应用');
  const [mode,setMode]=useState<'all'|'representative'|'latest'>('representative');
  const [active,setActive]=useState<string|null>(null);

  const filtered=useMemo(()=>methods.filter(m=>{
    const q=query.trim().toLowerCase();
    const matchQ=!q||[m.name,m.title,m.summary,m.training,...m.applications].join(' ').toLowerCase().includes(q);
    const matchCat=category==='all'||m.category===category;
    const matchApp=application==='全部应用'||m.applications.includes(application);
    const matchMode=mode==='all'||(mode==='representative'?m.representative:m.latest);
    return matchQ&&matchCat&&matchApp&&matchMode;
  }).sort((a,b)=>mode==='latest'?b.date.localeCompare(a.date):Number(Boolean(b.representative))-Number(Boolean(a.representative))||b.date.localeCompare(a.date)),[query,category,application,mode]);

  const latest=useMemo(()=>methods.filter(m=>m.latest).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10),[]);
  const representative=useMemo(()=>methods.filter(m=>m.representative).sort((a,b)=>a.date.localeCompare(b.date)),[]);

  function scrollToPaper(id:string){
    setActive(id);setMode('all');setQuery('');setCategory('all');setApplication('全部应用');
    setTimeout(()=>document.getElementById(`paper-${id}`)?.scrollIntoView({behavior:'smooth',block:'center'}),80);
  }
  function locate(id:string){
    setActive(id);
    document.getElementById('research-map')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>document.querySelector(`[data-node="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'center',inline:'center'}),120);
  }

  return <>
    <header className="site-header">
      <a className="brand" href="#top"><span className="brand-icon"><Layers3 size={22}/></span><span>Efficient Diffusion <b>Atlas</b><small>扩散模型高效生成研究地图</small></span></a>
      <nav><a href="#research-map">研究地图</a><a href="#papers">论文库</a><a href="#latest">最新进展</a></nav>
      <a className="github-link" href={repo} target="_blank" rel="noreferrer"><Github size={17}/>GitHub<ArrowUpRight size={13}/></a>
    </header>

    <main id="top">
      <section className="hero">
        <div><div className="eyebrow"><span/> EFFICIENT DIFFUSION · IMAGE · VIDEO · WORLD MODEL · DLLM</div><h1>扩散模型高效生成<br/><em>方法与应用脉络</em></h1><p>从快速采样、少步蒸馏，到 Cache、稀疏注意力、量化压缩与系统并行。按方法主线与应用场景双维度持续整理代表性工作和最新进展。</p><div className="hero-actions"><a href="#research-map">探索研究地图</a><button onClick={()=>{setMode('latest');document.getElementById('papers')?.scrollIntoView({behavior:'smooth'})}}>查看最新工作</button></div></div>
        <div className="hero-stats"><div><b>{methods.length}</b><span>已收录工作</span></div><div><b>{categories.length}</b><span>方法主线</span></div><div><b>{methods.filter(m=>m.latest).length}</b><span>最新前沿</span></div><div><b>{methods.filter(m=>m.hybrid).length}</b><span>复合加速</span></div><small>文献整理更新：2026-09-14</small></div>
      </section>

      <section className="logic-strip"><div><span>总览</span><b>生成成本 ≈ 去噪步数 NFE × 单步计算成本 + 系统运行开销</b></div><div className="logic-flow"><span>少跑几步</span><i>→</i><span>每步少算</span><i>→</i><span>模型更小</span><i>→</i><span>系统更快</span></div></section>

      <section id="research-map" className="section map-section">
        <div className="section-head"><div><span className="num">01</span><h2>交互研究地图</h2><p>六条方法泳道 × 时间轴。点击节点查看论文；颜色表示方法类别。</p></div><div className="map-key"><span className="dot rep"/>代表工作 <span className="dot fresh"/>最新前沿</div></div>
        <div className="timeline-shell">
          <div className="timeline-head"><div className="lane-label">方法主线</div><div className="years">{years.map(y=><span key={y} style={{left:`${pct(`${y}-01-01`)}%`}}>{y}</span>)}</div></div>
          <div className="timeline-scroll">
            <div className="timeline" style={{width:1900}}>
              {years.map(y=><i key={y} className="year-line" style={{left:`${pct(`${y}-01-01`)}%`}}/>)}
              {categories.map(c=><div className="lane" key={c.id}><div className="lane-name" style={{borderColor:c.color}}><b>{c.short}</b><span>{c.name}</span></div><div className="lane-track">
                {methods.filter(m=>m.category===c.id).map(m=><button key={m.id} data-node={m.id} className={`map-node ${m.representative?'is-rep':''} ${m.latest?'is-new':''} ${active===m.id?'selected':''}`} style={{left:`${pct(m.date)}%`,'--node':c.color} as React.CSSProperties} onClick={()=>scrollToPaper(m.id)} title={`${m.name} · ${m.date}`}><span>{m.name}</span><small>{m.date.slice(0,7)}</small></button>)}
              </div></div>)}
            </div>
          </div>
        </div>
        <div className="category-legend">{categories.map(c=><button key={c.id} onClick={()=>{setCategory(c.id);setMode('all');document.getElementById('papers')?.scrollIntoView({behavior:'smooth'})}}><i style={{background:c.color}}/>{c.name}</button>)}</div>
      </section>

      <section id="papers" className="section papers-section">
        <div className="section-head"><div><span className="num">02</span><h2>论文与方法库</h2><p>代表性工作用于建立主线；最新工作重点覆盖 2025–2026 的研究前沿。</p></div><span className="count">当前 {filtered.length} 篇</span></div>
        <div className="toolbar">
          <div className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索方法、标题、应用或关键词…"/>{query&&<button onClick={()=>setQuery('')}><X size={14}/></button>}</div>
          <div className="segmented"><button className={mode==='representative'?'on':''} onClick={()=>setMode('representative')}><Sparkles size={14}/>代表工作</button><button className={mode==='latest'?'on':''} onClick={()=>setMode('latest')}><TrendingUp size={14}/>最新工作</button><button className={mode==='all'?'on':''} onClick={()=>setMode('all')}>全部</button></div>
          <label><Filter size={14}/><select value={application} onChange={e=>setApplication(e.target.value)}>{applications.map(a=><option key={a}>{a}</option>)}</select></label>
        </div>
        <div className="chips"><button className={category==='all'?'on':''} onClick={()=>setCategory('all')}>全部方法</button>{categories.map(c=><button key={c.id} className={category===c.id?'on':''} onClick={()=>setCategory(c.id)}><i style={{background:c.color}}/>{c.short}</button>)}</div>
        <div className="paper-grid">{filtered.map(m=><MethodCard key={m.id} m={m} active={active===m.id} onLocate={locate}/>)}</div>
        {!filtered.length&&<div className="empty">没有匹配结果，试试清空搜索或切换筛选条件。</div>}
      </section>

      <section id="latest" className="section latest-section">
        <div className="section-head"><div><span className="num">03</span><h2>最新研究前沿</h2><p>优先追踪真正改变效率边界或 taxonomy 的新工作。</p></div></div>
        <div className="latest-grid">{latest.map((m,i)=><button key={m.id} onClick={()=>scrollToPaper(m.id)}><span>{String(i+1).padStart(2,'0')}</span><div><b>{m.name}</b><p>{m.summary}</p><small>{m.date} · {catMap[m.category].name}</small></div><ArrowUpRight size={15}/></button>)}</div>
      </section>

      <section className="section reading-section"><div className="section-head"><div><span className="num">04</span><h2>推荐阅读主线</h2><p>先建立共同基线，再进入 2025–2026 的新瓶颈。</p></div></div><div className="reading-grid"><div><b>① 减少 NFE</b><p>DDIM → DPM-Solver → Consistency Models → LCM / DMD2 → Phased DMD</p></div><div><b>② 降低单步成本</b><p>DeepCache → TeaCache → TaylorSeer → SVD-Cache；ToMeSD → Sparse VideoGen → LoSA</p></div><div><b>③ 面向 Video / World Model</b><p>ARCache → FAST-AR → Light Forcing → WorldCache</p></div><div><b>④ 走向复合加速</b><p>CacheQuant → QuantSparse / Q&C → TurboDiffusion → LightX2V / FastVideo</p></div></div></section>
    </main>

    <footer><div><b>Efficient Diffusion Atlas</b><span>持续整理扩散模型高效生成研究。</span></div><a href={repo} target="_blank" rel="noreferrer"><Code2 size={15}/>在 GitHub 上查看与贡献<ArrowUpRight size={13}/></a></footer>
  </>;
}
