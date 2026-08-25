import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import { useEffect, useRef, useState } from 'react'
import './styles.css'

const projects = [
  {
    no: '01', title: '股票价格预测', en: 'MARKET SIGNAL',
    text: '以 CNN × LSTM 混合模型处理美股高频序列，在噪声与趋势之间寻找可解释的信号。',
    tags: ['Python', 'Deep Learning', 'Time Series'], type: 'signal'
  },
  {
    no: '02', title: '风险敞口分析工具', en: 'RISK SYSTEM',
    text: '为客户投资组合搭建自动计算、汇总与输出的风险指标工作流，让数据更接近决策。',
    tags: ['Python', 'Risk', 'Automation'], type: 'risk'
  },
  {
    no: '03', title: '商业可行性分析', en: 'MODEL BUILDING',
    text: '从市场调研、商品价格采集到三年期财务模型，建立一套可验证的投资判断框架。',
    tags: ['SQL', 'Financial Modeling', 'Research'], type: 'model'
  }
]

const strengths = [
  ['01', '量化研究', '将金融直觉转化为可验证的模型、指标与信号。'],
  ['02', '数据工程', '以 Python 和 SQL 构建可复用的数据分析工作流。'],
  ['03', '风险视角', '理解风险敞口、投资组合与市场微观结构的交点。'],
  ['04', '跨域表达', '在研究、产品与业务团队之间清晰传递复杂结论。']
]

const photographs = [
  ['blue-night.jpg', '2024 · 35MM · 1/125S'], ['banff-night.jpg', '2023 · 35MM · 1/30S'], ['dusk-tower.jpg', '2022 · 55MM · 1/250S'], ['dusk-ridge.jpg', '2022 · 35MM · 1/320S'],
  ['sunset-trees.jpg', '2021 · 35MM · 1/160S'], ['fence-sunset.jpg', '2021 · 35MM · 1/200S'], ['crow-roof.jpg', '2024 · 55MM · 1/500S'], ['lighthouse.jpg', '2024 · 35MM · 1/60S'],
  ['red-window.jpg', '2025 · 35MM · 1/80S'], ['airport-green.jpg', '2023 · 35MM · 1/100S'], ['tokyo-street.jpg', '2024 · 35MM · 1/250S'], ['red-car.jpg', '2022 · 55MM · 1/400S'],
  ['moonwater.jpg', '2025 · 35MM · 1/20S'], ['lake-blue.jpg', '2025 · 35MM · 1/500S'], ['summer-rings.jpg', '2026 · 35MM · 1/640S'], ['snow-mountain.jpg', '2023 · 55MM · 1/125S'], ['snow-buses.jpg', '2020 · 35MM · 1/250S'],
  ['water-bubble.jpg', '2025 · 35MM · 1/80S'], ['pastel-sea.jpg', '2025 · 55MM · 1/250S'], ['beach-object.jpg', '2025 · 35MM · 1/320S'], ['turquoise-reeds.jpg', '2025 · 55MM · 1/500S'],
  ['winter-beach.jpg', '2024 · 35MM · 1/400S'], ['toy-box.jpg', '2024 · 35MM · 1/125S'], ['turquoise-rock.jpg', '2025 · 55MM · 1/640S'], ['ice-line.jpg', '2025 · 35MM · 1/500S'],
  ['coconut-boat.jpg', '2023 · 35MM · 1/320S'], ['beach-play.jpg', '2024 · 55MM · 1/800S'], ['kite-beach.jpg', '2024 · 35MM · 1/250S'], ['orange-ball.jpg', '2024 · 35MM · 1/160S']
]

function useEditorialEntrances() {
  useEffect(() => {
    const sections = document.querySelectorAll('main > .motion-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.classList.add('is-visible')
        observer.unobserve(target)
      })
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}

function useCursorFeedback() {
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return undefined

    const root = document.documentElement
    let frame = 0
    let point = { x: -100, y: -100 }

    const paint = () => {
      root.style.setProperty('--cursor-x', `${point.x}px`)
      root.style.setProperty('--cursor-y', `${point.y}px`)
      root.classList.add('pointer-ready')
      frame = 0
    }
    const onMove = (event) => {
      point = { x: event.clientX, y: event.clientY }
      if (!frame) frame = window.requestAnimationFrame(paint)
    }
    const onOver = (event) => {
      root.classList.toggle('cursor-active', Boolean(event.target.closest('a, button, [role="button"]')))
    }
    const onDown = () => root.classList.add('cursor-active')
    const onUp = () => root.classList.remove('cursor-active')
    const onLeave = () => root.classList.remove('pointer-ready', 'cursor-active')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      root.classList.remove('pointer-ready', 'cursor-active')
    }
  }, [])
}

function PortraitFilm() {
  const videoRef = useRef(null)
  const previousX = useRef(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  const seekToTarget = () => {
    const video = videoRef.current
    if (!video || seeking.current || !Number.isFinite(video.duration)) return
    seeking.current = true
    video.currentTime = targetTime.current
  }

  const handlePointerMove = (event) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return

    if (previousX.current === null) {
      previousX.current = event.clientX
      targetTime.current = video.currentTime
      return
    }

    const delta = event.clientX - previousX.current
    previousX.current = event.clientX
    const next = targetTime.current + (delta / window.innerWidth) * 0.8 * video.duration
    targetTime.current = Math.max(0, Math.min(video.duration, next))
    seekToTarget()
  }

  const handleSeeked = () => {
    seeking.current = false
    const video = videoRef.current
    if (video && Math.abs(video.currentTime - targetTime.current) > 0.04) seekToTarget()
  }

  return <div
    className="portrait portrait-film"
    onPointerMove={handlePointerMove}
    onPointerLeave={() => { previousX.current = null }}
  >
    <video
      ref={videoRef}
      className="portrait-video"
      muted
      playsInline
      preload="metadata"
      onSeeked={handleSeeked}
      onLoadedMetadata={(event) => { targetTime.current = event.currentTarget.currentTime }}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
    />
    <div className="portrait-video-shade" />
    <div className="portrait-photo"><img src="/images/portrait-mountain.jpg" alt="刘小龙于黑独山" /></div>
    <div className="portrait-overlay" />
    <span className="portrait-cue">MOVE TO EXPLORE ↔</span>
    <p>BLACK DUSHAN<br />2026</p>
  </div>
}

function useTypewriter(text, speed = 32, startDelay = 360) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let index = 0
    let timer
    const delayedStart = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(timer)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(delayedStart)
      window.clearInterval(timer)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

function EdgeConsole() {
  const { displayed, done } = useTypewriter('从信号出发，将复杂市场转化为可执行的判断。下一步，构建什么？')
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('teryfinance@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = 'mailto:teryfinance@gmail.com'
    }
  }

  return <div className="edge-console">
    <div className="edge-console-copy">
      <p className="edge-console-blur">您好，这里是 L.X.L /<br />量化分析与金融科技。</p>
      <p className="edge-console-type">{displayed}{!done && <i aria-hidden="true" />}</p>
      <div className="edge-console-actions">
        <a href="#work">查看项目</a><a href="#experience">学习经历</a><a href="/interests.html">进入影像档案</a>
        <button type="button" className="edge-console-mail" onClick={copyEmail}>{copied ? '已复制邮箱' : '联系我：teryfinance@gmail.com'} <span>▣</span></button>
      </div>
    </div>
    <div className="market-monitor" aria-label="股票市场走势图示意">
      <div className="monitor-top"><span>MARKET / LIVE</span><span>+ 02.84%</span></div>
      <svg viewBox="0 0 640 360" role="img" aria-label="上行的股票价格曲线">
        <defs><linearGradient id="marketFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#e54035" stopOpacity=".3"/><stop offset="1" stopColor="#e54035" stopOpacity="0"/></linearGradient></defs>
        <g className="monitor-grid"><path d="M0 72H640M0 144H640M0 216H640M0 288H640"/><path d="M106 0V360M213 0V360M320 0V360M427 0V360M534 0V360"/></g>
        <path className="market-area" d="M0 290 L42 261 L79 274 L115 232 L153 248 L194 171 L232 198 L274 146 L313 164 L353 101 L398 134 L440 94 L476 113 L512 51 L548 82 L587 32 L640 62 V360 H0Z"/>
        <path className="market-line" d="M0 290 L42 261 L79 274 L115 232 L153 248 L194 171 L232 198 L274 146 L313 164 L353 101 L398 134 L440 94 L476 113 L512 51 L548 82 L587 32 L640 62"/>
        <circle cx="587" cy="32" r="6" className="market-point"/>
      </svg>
      <div className="monitor-bottom"><span>SHANGHAI / HSI / SPX</span><b>01:17:48</b></div>
    </div>
  </div>
}

function FitnessHero() {
  const videoRef = useRef(null)
  const [hlsReady, setHlsReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    const source = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'
    const revealAndPlay = () => {
      setHlsReady(true)
      video.play().catch(() => {})
    }

    video.muted = true
    video.playsInline = true
    const useNativeHls = () => {
      if (!video.canPlayType('application/vnd.apple.mpegurl')) return
      video.src = source
      video.load()
      video.addEventListener('canplay', revealAndPlay, { once: true })
    }
    let hls
    let disposed = false
    import('hls.js').then(({ default: Hls }) => {
      if (disposed) return
      if (!Hls.isSupported()) {
        useNativeHls()
        return
      }
      hls = new Hls({ enableWorker: false })
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad()
        if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError()
      })
      hls.on(Hls.Events.MANIFEST_PARSED, revealAndPlay)
      hls.loadSource(source)
      hls.attachMedia(video)
    }).catch(useNativeHls)
    return () => {
      disposed = true
      video.removeEventListener('canplay', revealAndPlay)
      hls?.destroy()
    }
  }, [])

  return <section className="fitness-section fitness-hero" id="training">
    <video ref={videoRef} className={`fitness-video ${hlsReady ? 'is-ready' : ''}`} muted autoPlay loop playsInline preload="auto" onLoadedData={(event) => { setHlsReady(true); event.currentTarget.play().catch(() => {}) }} aria-hidden="true" />
    <div className="fitness-video-shade" />
    <div className="fitness-gridlines" aria-hidden="true"><i /><i /><i /></div>
    <svg className="fitness-glow" viewBox="0 0 900 250" aria-hidden="true"><defs><filter id="fitnessBlur"><feGaussianBlur stdDeviation="25" /></filter></defs><ellipse cx="450" cy="125" rx="300" ry="62" fill="#0c8f74" fillOpacity=".5" filter="url(#fitnessBlur)" /></svg>
    <div className="fitness-topbar">
      <a href="/index.html" className="fitness-brand">TRAINING</a>
      <nav><a href="#training">训练</a><a href="#photography">影像</a><a href="/index.html#about">关于</a><a href="/index.html#contact">联系</a></nav>
      <a className="fitness-top-cta" href="/index.html#contact">联系我</a>
      <button className="fitness-menu-toggle" type="button" aria-label="打开训练导航" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button>
    </div>
    <div className={`fitness-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
      <a onClick={() => setMenuOpen(false)} href="#training">训练</a><a onClick={() => setMenuOpen(false)} href="#photography">影像</a><a onClick={() => setMenuOpen(false)} href="/index.html#about">关于</a><a onClick={() => setMenuOpen(false)} href="/index.html#contact">联系我</a>
    </div>
    <div className="fitness-hero-copy">
      <div className="liquid-card"><span>[ 2025 ]</span><h3>训练是长期主义的<br/><em>专业课。</em></h3><p>节律、恢复与可重复的执行。</p></div>
      <p className="eyebrow">CAREER-READY DISCIPLINE</p>
      <h2>训练是<br/><em>另一种复利。</em></h2>
      <p className="fitness-description">保持身体的节律，也保持对长期主义的耐心。把每一次训练，视为对长期目标的可复利投入。</p>
      <a className="fitness-cta" href="/index.html#contact">开始交流 <ArrowRight size={16} /></a>
    </div>
    <div className="fitness-images">
      <figure className="fitness-main"><img src="/photos/fitness-gym.jpg" alt="刘小龙健身镜面自拍" /><figcaption>GYM SESSION / 2025</figcaption></figure>
      <figure className="fitness-mirror"><img src="/photos/fitness-mirror.jpg" alt="训练日常记录" /><figcaption>OFF THE CLOCK / 2025</figcaption></figure>
    </div>
  </section>
}

function InterestsPage() {
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    if (!activePhoto) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activePhoto])

  return <main className="interests-page">
    <nav className="interests-nav"><a href="/index.html">← 返回主页</a><p>捡树枝的鸦 / VISUAL NOTES</p><span>2026</span></nav>
    <header className="interests-hero"><div className="interests-title"><p className="eyebrow">PERSONAL ARCHIVE / 01</p><h1>影像<br/><em>与兴趣</em></h1><p>行走、观察、训练。<br/>这些是工作之外，持续塑造我的另一套坐标系。</p></div><figure className="self-portrait"><span className="portrait-kicker">FIELD NOTES / 2026</span><img src="/photos/self-portrait-mirror.jpg" alt="刘小龙镜面自拍"/><figcaption>OBSERVE<br/>THEN<br/>FRAME<span>35MM / 1·160</span></figcaption></figure></header>
    <section className="gallery-wrap" id="photography"><div className="gallery-intro"><p className="eyebrow">PHOTOGRAPHY</p><p>旅行与日常的光线记录</p></div><div className="photo-grid">{photographs.map(([file, metadata], i) => <figure className={`photo-tile tile-${i % 7}`} key={file} role="button" tabIndex="0" aria-label={`放大预览摄影作品 ${i + 1}`} onClick={() => setActivePhoto({ file, metadata, index: i + 1 })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActivePhoto({ file, metadata, index: i + 1 }) } }}><img src={`/photos/${file}`} alt={`摄影作品 ${i + 1}`} loading="lazy"/><figcaption><span>{String(i + 1).padStart(2, '0')}</span>{metadata}</figcaption></figure>)}</div></section>
    <FitnessHero />
    <footer className="interests-footer"><a href="/index.html">← BACK TO QUANTITATIVE PORTFOLIO</a><p>© 2026 LIU XIAOLONG</p></footer>
    {activePhoto && <div className="photo-modal" role="dialog" aria-modal="true" aria-label={`摄影作品 ${activePhoto.index} 原图预览`} onClick={() => setActivePhoto(null)}><button className="photo-modal-close" type="button" onClick={() => setActivePhoto(null)} aria-label="关闭照片预览">×</button><div className="photo-modal-stage" onClick={(event) => event.stopPropagation()}><img src={`/photos/${activePhoto.file}`} alt={`摄影作品 ${activePhoto.index} 原图`} /><p><span>{String(activePhoto.index).padStart(2, '0')}</span>{activePhoto.metadata}</p></div></div>}
  </main>
}

function App() {
  useEditorialEntrances()
  useCursorFeedback()
  const [activeResult, setActiveResult] = useState(null)
  return <main>
    <div className="cursor-feedback" aria-hidden="true" />
    <nav className="nav frame hero-nav">
      <div className="nav-links">
        <a href="#about"><span>01</span> 关于</a>
        <a href="#experience"><span>02</span> 经历</a>
        <a href="#work"><span>03</span> 项目</a>
        <a href="#edge"><span>04</span> 优势</a>
        <a href="/interests.html"><span>05</span> 兴趣</a>
      </div>
    </nav>
    <section className="hero" id="top">
      <div className="hero-photo" />
      <div className="hero-shade" />
      <div className="grain" />
      <div className="hero-copy frame hero-intro">
        <p className="eyebrow">01 / QUANTITATIVE FINANCE · GUANGZHOU</p>
        <h1>让波动<br/><em>成为信号</em></h1>
        <div className="hero-bottom"><p>金融数据、定量分析与可执行的判断。<br/>目前位于广州。</p></div>
      </div>
      <a href="#about" className="scroll hero-explore"><span>向下探索</span><ChevronDown size={18}/></a>
      <div className="hero-caption"><span>BLACK DUSHAN / 2026</span><span>38° N · 75° E</span></div>
      <p className="hero-index">01 / 05</p>
    </section>

    <section className="about section frame motion-reveal" id="about">
      <div className="section-top" data-motion="ABOUT"><p className="eyebrow">01 — ABOUT</p><p className="section-note">从数据到判断</p></div>
      <div className="about-grid">
        <PortraitFilm />
        <div className="about-copy"><h2>以严谨模型<br/>理解<span>复杂市场。</span></h2><p>我是刘小龙，香港理工大学金融（量化分析与金融科技）硕士，本科同时修读金融与行政管理。我的能力覆盖量化建模、数据工程与商业分析——曾在券商衍生品部门开发风险分析工具、撰写稳定币市场研究报告，也在资管机构参与过投教项目落地与定投策略研究。我习惯用 Python 和 SQL 拆解复杂问题，但也擅长用财务模型和业务逻辑验证方案的可行性。我的目标是成为连接技术、业务与决策的金融复合型人才。</p><div className="contact-lines"><a href="mailto:teryfinance@gmail.com"><Mail size={16}/> teryfinance@gmail.com</a><a href="tel:+8618620598868"><Phone size={16}/> +86 186 2059 8868</a><span><MapPin size={16}/> Guangzhou</span></div></div>
        <div className="metrics"><div><strong>MSc</strong><span><b>教育背景</b>香港理工大学 · 理学硕士<br/>量化分析和金融科技<br/>西安大略大学 · 金融与行政管理荣誉学士</span></div><div><strong>03</strong><span><b>风险研究与工具</b>主导 Python 风险敞口分析工具，自动计算、汇总并输出客户组合风险指标；完成稳定币市场研究，覆盖机制、竞争格局、成本及监管牌照要求；维护风控数据表。</span></div><div><strong>MA</strong><span><b>均线策略迭代</b>基于聚宽构建均线趋势与超跌超卖信号，加入波动率过滤、仓位管理与交易成本约束，以滚动回测检验策略稳健性。</span></div><div><strong>20<span>min</span></strong><span><b>履约保障互换报表</b>重对齐历史指标口径、代码逻辑与 Excel 模板，修复计算偏差，使日报生成时间缩短约 20 分钟并提升数据一致性。</span></div></div>
      </div>
    </section>

    <section className="experience frame motion-reveal" id="experience"><div className="section-top" data-motion="EXPERIENCE"><p className="eyebrow">02 — EXPERIENCE</p><p className="section-note">学习与实践轨迹</p></div><div className="timeline">
      <article><p className="year">2025 — 2025</p><div><h3>广发证券（香港）</h3><p>股票及衍生品部 · 实习生</p></div><p className="detail">开发 Python 风险敞口分析工具；完成稳定币市场研究；优化股息保障互换风控报表。</p></article>
      <article><p className="year">2024 — 2026</p><div><h3>香港理工大学</h3><p>金融（量化分析和金融科技）硕士</p></div><p className="detail">量化分析、机器学习、深度学习、高频交易。</p></article>
      <article><p className="year">2020 — 2024</p><div><h3>Western University</h3><p>金融与行政管理本科</p></div><p className="detail">Honours Specialization degree · London, Canada（主修课程：商业分析、风险管理、公司治理、国际金融、市场营销、计量经济学、行为经济学）</p></article>
    </div></section>

    <section className="work section motion-reveal" id="work"><div className="frame"><div className="section-top" data-motion="SELECTED WORK"><p className="eyebrow">03 — SELECTED WORK</p><p className="section-note">研究 / 系统 / 模型</p></div><div className="work-intro"><h2>让数据<br/><span>成为视野。</span></h2><p>精选项目聚焦于市场预测、风险系统与金融建模。每一个项目都从具体问题出发，落向更好的决策。</p></div></div><div className="project-rail">{projects.map((p) => <article className={`project-card ${p.type}`} key={p.no}><div className="card-visual"><span className="card-no">{p.no}</span>{p.type === 'signal' ? <button className="result-frame result-frame--signal" type="button" onClick={() => setActiveResult({src:'/projects/stock-model-results.jpg', alt:'股票预测模型完整输出结果', label:'STOCK FORECAST / FULL OUTPUT'})}><img src="/projects/stock-model-results.jpg" alt="股票预测模型训练与价格拟合结果"/><span className="result-label">点击查看完整结果 ↗</span></button> : p.type === 'risk' ? <div className="result-frame result-frame--risk"><img className="risk-exposure" src="/projects/factor-exposure.jpg" alt="投资组合因子敞口分析结果"/><img className="risk-trends" src="/projects/factor-trends.jpg" alt=""/><span className="result-label">FACTOR EXPOSURE / TREND</span></div> : <><div className="visual-mark">◇</div><div className="chart-lines"/></>}</div><div className="card-content"><p className="eyebrow">{p.en}</p><h3>{p.title}</h3><p>{p.text}</p><div className="tags">{p.tags.map(x => <span key={x}>{x}</span>)}</div><button aria-label={`查看${p.title}`}><ArrowUpRight size={20}/></button></div></article>)}</div></section>

    <section className="edge section frame motion-reveal" id="edge"><div className="section-top" data-motion="EDGE"><p className="eyebrow">04 — EDGE</p><p className="section-note">不只是技术能力</p></div><div className="edge-header"><h2>保持冷静，<br/><span>持续推演。</span></h2><p>在快速变化的市场里，好的分析既需要技术深度，也需要对业务情境的感知。</p></div><EdgeConsole /><div className="strength-grid">{strengths.map(([no, title, text]) => <article key={no}><span>{no}</span><ArrowDownRight size={20}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="visual-entry frame motion-reveal"><a href="/interests.html"><div className="visual-entry-photo"/><div className="visual-entry-copy"><p className="eyebrow">PERSONAL ARCHIVE / 06</p><h2>摄影<br/>与<span>兴趣。</span></h2><p>影像记录、旅行与训练。</p><span className="visual-entry-arrow">↗</span></div></a></section>

    <footer id="contact" className="contact-film motion-reveal"><video className="contact-film-video" autoPlay muted loop playsInline preload="metadata" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"/><div className="contact-film-shade"/><div className="frame footer-inner"><div className="contact-film-nav"><span>Terrence Liu</span><span>QUANTITATIVE FINANCE</span><span>GUANGZHOU · 2026</span></div><div className="contact-film-copy"><p className="eyebrow">05 — LET'S CONNECT</p><h2>下一个问题，<br/><em>一起解。</em></h2></div><div className="contact-film-bottom"><p>金融数据、量化研究与风险分析。<br/>期待下一段需要被拆解的复杂问题。</p><a href="mailto:teryfinance@gmail.com" className="mail-link">teryfinance@gmail.com <ArrowUpRight/></a></div><div className="footer-bottom"><p>© 2026 Terrence Liu</p><p>QUANTITATIVE FINANCE<br/>GUANGZHOU</p><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    {activeResult && <div className="result-modal" role="dialog" aria-modal="true" aria-label={activeResult.label} onClick={() => setActiveResult(null)}><div className="result-modal-panel" onClick={(event) => event.stopPropagation()}><button className="result-modal-close" type="button" onClick={() => setActiveResult(null)} aria-label="关闭完整项目结果">×</button><p>{activeResult.label}</p><img src={activeResult.src} alt={activeResult.alt}/></div></div>}
  </main>
}

export default App

createRoot(document.getElementById('root')).render(location.pathname.endsWith('/interests.html') ? <InterestsPage /> : <App />)
