document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContentArea');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const promptGrid = document.getElementById('promptGrid');
    const noResults = document.getElementById('noResults');

    let favorites = JSON.parse(localStorage.getItem('crateFavs')) || [];
    let currentFilter = 'all';

    // ─────────────────────────────────────────────
    // TEMPLATE LIBRARY
    // Each template has:
    //   id, title, category, tags (for search),
    //   preview (image path), difficulty badge,
    //   fields[] (the form shown in modal),
    //   generate(data) → returns full HTML string
    // ─────────────────────────────────────────────

    const library = [

        // ── 1. PORTFOLIO ──────────────────────────────
        {
            id: 1,
            title: "Portfolio",
            category: "Personal",
            difficulty: "Beginner",
            preview: "images/tpl_portfolio.jpg",
            tags: "portfolio personal developer designer showcase",
            fields: [
                { key: "name",       label: "Your full name",    placeholder: "e.g. Aryan Sharma" },
                { key: "role",       label: "Job title / role",  placeholder: "e.g. Full Stack Developer" },
                { key: "about",      label: "Short bio",         placeholder: "2–3 sentences about you", type: "textarea" },
                { key: "project1",   label: "Project 1 title",   placeholder: "e.g. E-Commerce App" },
                { key: "project2",   label: "Project 2 title",   placeholder: "e.g. Weather Dashboard" },
                { key: "project3",   label: "Project 3 title",   placeholder: "e.g. Chat App" },
                { key: "email",      label: "Contact email",     placeholder: "you@example.com" },
                { key: "accent",     label: "Accent color",      type: "color", default: "#00e5ff" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Portfolio</title>
<style>
  :root { --accent: ${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#050505; color:#fff; font-family:'Segoe UI',sans-serif; }
  header { padding:20px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1a1a1a; position:sticky; top:0; background:rgba(5,5,5,0.95); backdrop-filter:blur(10px); z-index:100; }
  .logo { font-weight:900; font-size:1.2rem; color:var(--accent); }
  nav a { color:#aaa; text-decoration:none; margin-left:24px; font-size:0.9rem; transition:color 0.2s; }
  nav a:hover { color:var(--accent); }
  .hero { min-height:90vh; display:flex; flex-direction:column; justify-content:center; padding:0 40px; max-width:900px; margin:0 auto; }
  .hero h1 { font-size:clamp(2.5rem,8vw,5rem); font-weight:900; line-height:1.1; }
  .hero h1 span { color:var(--accent); }
  .hero p { color:#888; margin-top:20px; font-size:1.1rem; max-width:500px; line-height:1.7; }
  .btn { display:inline-block; margin-top:32px; padding:14px 32px; background:var(--accent); color:#000; font-weight:800; border-radius:8px; text-decoration:none; font-size:0.95rem; transition:opacity 0.2s; }
  .btn:hover { opacity:0.85; }
  section { padding:80px 40px; max-width:1100px; margin:0 auto; }
  section h2 { font-size:2rem; font-weight:900; margin-bottom:40px; }
  section h2 span { color:var(--accent); }
  .projects { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .project-card { background:#111; border:1px solid #222; border-radius:14px; padding:28px; transition:border-color 0.3s,transform 0.3s; }
  .project-card:hover { border-color:var(--accent); transform:translateY(-4px); }
  .project-card h3 { font-size:1.1rem; margin-bottom:10px; }
  .project-card p { color:#666; font-size:0.85rem; line-height:1.6; }
  .project-num { font-size:2rem; font-weight:900; color:var(--accent); opacity:0.3; margin-bottom:12px; }
  .contact { background:#0f0f0f; border-radius:20px; padding:60px 40px; text-align:center; border:1px solid #1a1a1a; }
  .contact h2 { font-size:2rem; font-weight:900; margin-bottom:16px; }
  .contact p { color:#888; margin-bottom:24px; }
  .contact a { color:var(--accent); text-decoration:none; font-size:1.1rem; font-weight:700; }
  footer { text-align:center; padding:40px; color:#444; font-size:0.8rem; border-top:1px solid #1a1a1a; }
</style>
</head>
<body>
<header>
  <div class="logo">${d.name}</div>
  <nav>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<section class="hero">
  <h1>Hi, I'm<br><span>${d.name}</span></h1>
  <p>${d.role}<br><br>${d.about}</p>
  <a href="#projects" class="btn">View My Work</a>
</section>
<section id="projects">
  <h2>My <span>Projects</span></h2>
  <div class="projects">
    <div class="project-card"><div class="project-num">01</div><h3>${d.project1}</h3><p>A project I built to solve a real-world problem. Click to learn more.</p></div>
    <div class="project-card"><div class="project-num">02</div><h3>${d.project2}</h3><p>A project I built to solve a real-world problem. Click to learn more.</p></div>
    <div class="project-card"><div class="project-num">03</div><h3>${d.project3}</h3><p>A project I built to solve a real-world problem. Click to learn more.</p></div>
  </div>
</section>
<section id="contact">
  <div class="contact">
    <h2>Let's <span style="color:var(--accent)">Work Together</span></h2>
    <p>Have a project in mind? I'd love to hear about it.</p>
    <a href="mailto:${d.email}">${d.email}</a>
  </div>
</section>
<footer>© 2026 ${d.name}. Built with TemplatesCrate.</footer>
</body>
</html>`
        },

        // ── 2. LANDING PAGE ───────────────────────────
        {
            id: 2,
            title: "Landing Page",
            category: "Business",
            difficulty: "Beginner",
            preview: "images/tpl_landing.jpg",
            tags: "landing page product startup saas marketing",
            fields: [
                { key: "product",    label: "Product / App name",  placeholder: "e.g. TaskFlow" },
                { key: "tagline",    label: "Tagline",              placeholder: "e.g. Get more done in less time" },
                { key: "desc",       label: "Product description",  placeholder: "What does it do?", type: "textarea" },
                { key: "feat1",      label: "Feature 1",            placeholder: "e.g. Smart scheduling" },
                { key: "feat2",      label: "Feature 2",            placeholder: "e.g. Team collaboration" },
                { key: "feat3",      label: "Feature 3",            placeholder: "e.g. Analytics dashboard" },
                { key: "cta",        label: "CTA button text",      placeholder: "e.g. Start for free" },
                { key: "accent",     label: "Brand color",          type: "color", default: "#7c3aed" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.product} — ${d.tagline}</title>
<style>
  :root { --accent:${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#fff; color:#111; font-family:'Segoe UI',sans-serif; }
  header { padding:18px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; position:sticky; top:0; background:rgba(255,255,255,0.95); backdrop-filter:blur(10px); z-index:100; }
  .logo { font-weight:900; font-size:1.3rem; color:var(--accent); }
  nav a { color:#555; text-decoration:none; margin-left:28px; font-size:0.9rem; transition:color 0.2s; }
  nav a:hover { color:var(--accent); }
  .hero { padding:100px 40px; text-align:center; background:#f9fafb; }
  .hero h1 { font-size:clamp(2.5rem,7vw,4.5rem); font-weight:900; line-height:1.1; max-width:800px; margin:0 auto; }
  .hero h1 span { color:var(--accent); }
  .hero p { color:#666; margin-top:20px; font-size:1.15rem; max-width:560px; margin-left:auto; margin-right:auto; line-height:1.7; }
  .btn { display:inline-block; margin-top:36px; padding:16px 40px; background:var(--accent); color:#fff; font-weight:800; border-radius:10px; text-decoration:none; font-size:1rem; transition:opacity 0.2s,transform 0.2s; }
  .btn:hover { opacity:0.9; transform:translateY(-2px); }
  .features { padding:80px 40px; max-width:1100px; margin:0 auto; }
  .features h2 { text-align:center; font-size:2rem; font-weight:900; margin-bottom:50px; }
  .feat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:24px; }
  .feat-card { padding:32px; border-radius:16px; border:1px solid #eee; transition:box-shadow 0.3s,transform 0.3s; }
  .feat-card:hover { box-shadow:0 8px 32px rgba(0,0,0,0.08); transform:translateY(-4px); }
  .feat-icon { width:44px; height:44px; border-radius:10px; background:var(--accent); opacity:0.15; margin-bottom:16px; }
  .feat-card h3 { font-size:1.05rem; font-weight:700; margin-bottom:10px; }
  .feat-card p { color:#777; font-size:0.9rem; line-height:1.6; }
  .cta-section { background:var(--accent); padding:80px 40px; text-align:center; }
  .cta-section h2 { color:#fff; font-size:2.2rem; font-weight:900; margin-bottom:16px; }
  .cta-section p { color:rgba(255,255,255,0.8); margin-bottom:32px; font-size:1rem; }
  .btn-white { display:inline-block; padding:16px 40px; background:#fff; color:var(--accent); font-weight:800; border-radius:10px; text-decoration:none; font-size:1rem; transition:transform 0.2s; }
  .btn-white:hover { transform:translateY(-2px); }
  footer { text-align:center; padding:40px; color:#aaa; font-size:0.8rem; border-top:1px solid #eee; }
</style>
</head>
<body>
<header>
  <div class="logo">${d.product}</div>
  <nav><a href="#features">Features</a><a href="#cta">${d.cta}</a></nav>
</header>
<section class="hero">
  <h1><span>${d.product}</span> — ${d.tagline}</h1>
  <p>${d.desc}</p>
  <a href="#cta" class="btn">${d.cta}</a>
</section>
<section class="features" id="features">
  <h2>Everything you need</h2>
  <div class="feat-grid">
    <div class="feat-card"><div class="feat-icon"></div><h3>${d.feat1}</h3><p>Designed to help you work smarter, not harder. Built for teams of all sizes.</p></div>
    <div class="feat-card"><div class="feat-icon"></div><h3>${d.feat2}</h3><p>Stay in sync with your team no matter where you are. Real-time updates always.</p></div>
    <div class="feat-card"><div class="feat-icon"></div><h3>${d.feat3}</h3><p>Get deep insights into your workflow and make better decisions every day.</p></div>
  </div>
</section>
<section class="cta-section" id="cta">
  <h2>Ready to get started?</h2>
  <p>Join thousands of users already using ${d.product}.</p>
  <a href="#" class="btn-white">${d.cta}</a>
</section>
<footer>© 2026 ${d.product}. Built with TemplatesCrate.</footer>
</body>
</html>`
        },

        // ── 3. BLOG ───────────────────────────────────
        {
            id: 3,
            title: "Blog",
            category: "Personal",
            difficulty: "Beginner",
            preview: "images/tpl_blog.jpg",
            tags: "blog writing articles personal journal",
            fields: [
                { key: "blogname",   label: "Blog name",           placeholder: "e.g. The Dev Diaries" },
                { key: "author",     label: "Author name",         placeholder: "e.g. Priya Mehta" },
                { key: "bio",        label: "Author bio",          placeholder: "Short intro about you", type: "textarea" },
                { key: "post1",      label: "Post 1 title",        placeholder: "e.g. How I Learned React" },
                { key: "post2",      label: "Post 2 title",        placeholder: "e.g. My First Hackathon" },
                { key: "post3",      label: "Post 3 title",        placeholder: "e.g. Tools I Use Daily" },
                { key: "accent",     label: "Theme color",         type: "color", default: "#f59e0b" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.blogname}</title>
<style>
  :root { --accent:${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#fafafa; color:#1a1a1a; font-family:Georgia,serif; }
  header { background:#fff; border-bottom:1px solid #eee; padding:20px 40px; display:flex; justify-content:space-between; align-items:center; }
  .logo { font-size:1.5rem; font-weight:700; color:var(--accent); font-family:'Segoe UI',sans-serif; }
  nav a { color:#555; text-decoration:none; margin-left:24px; font-size:0.9rem; font-family:'Segoe UI',sans-serif; }
  nav a:hover { color:var(--accent); }
  .hero { background:#fff; padding:70px 40px; text-align:center; border-bottom:1px solid #eee; }
  .hero h1 { font-size:clamp(2rem,6vw,3.5rem); color:#111; margin-bottom:12px; }
  .hero p { color:#888; font-size:1rem; font-family:'Segoe UI',sans-serif; }
  .main { max-width:900px; margin:60px auto; padding:0 40px; display:grid; grid-template-columns:2fr 1fr; gap:48px; }
  .posts h2 { font-size:1.1rem; font-family:'Segoe UI',sans-serif; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#999; margin-bottom:28px; }
  .post { padding-bottom:32px; margin-bottom:32px; border-bottom:1px solid #eee; }
  .post .tag { display:inline-block; background:var(--accent); color:#fff; font-size:0.7rem; font-family:'Segoe UI',sans-serif; font-weight:700; padding:3px 10px; border-radius:4px; text-transform:uppercase; margin-bottom:10px; }
  .post h3 { font-size:1.4rem; margin-bottom:8px; color:#111; line-height:1.3; }
  .post p { color:#666; font-size:0.9rem; line-height:1.7; font-family:'Segoe UI',sans-serif; }
  .post .meta { color:#bbb; font-size:0.8rem; font-family:'Segoe UI',sans-serif; margin-top:10px; }
  .read-more { color:var(--accent); font-family:'Segoe UI',sans-serif; font-size:0.85rem; font-weight:700; text-decoration:none; margin-top:10px; display:inline-block; }
  .sidebar h2 { font-size:1.1rem; font-family:'Segoe UI',sans-serif; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#999; margin-bottom:20px; }
  .author-card { background:#fff; border:1px solid #eee; border-radius:12px; padding:24px; text-align:center; margin-bottom:28px; }
  .avatar { width:64px; height:64px; border-radius:50%; background:var(--accent); margin:0 auto 14px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.5rem; font-weight:700; font-family:'Segoe UI',sans-serif; }
  .author-card h3 { font-family:'Segoe UI',sans-serif; font-size:1rem; font-weight:700; margin-bottom:6px; }
  .author-card p { font-family:'Segoe UI',sans-serif; font-size:0.82rem; color:#888; line-height:1.5; }
  footer { text-align:center; padding:40px; color:#bbb; font-size:0.8rem; font-family:'Segoe UI',sans-serif; border-top:1px solid #eee; }
  @media(max-width:680px) { .main { grid-template-columns:1fr; } }
</style>
</head>
<body>
<header>
  <div class="logo">${d.blogname}</div>
  <nav><a href="#">Home</a><a href="#">Archive</a></nav>
</header>
<div class="hero">
  <h1>${d.blogname}</h1>
  <p>Stories, thoughts, and learnings by ${d.author}</p>
</div>
<div class="main">
  <div class="posts">
    <h2>Latest Posts</h2>
    <div class="post">
      <span class="tag">Article</span>
      <h3>${d.post1}</h3>
      <p>A deep dive into my experience and what I learned along the way. Practical insights you can apply immediately.</p>
      <div class="meta">March 2026 · 5 min read</div>
      <a href="#" class="read-more">Read more →</a>
    </div>
    <div class="post">
      <span class="tag">Story</span>
      <h3>${d.post2}</h3>
      <p>Sharing the ups, downs, and lessons from a memorable experience that changed how I think about building things.</p>
      <div class="meta">February 2026 · 4 min read</div>
      <a href="#" class="read-more">Read more →</a>
    </div>
    <div class="post">
      <span class="tag">Resources</span>
      <h3>${d.post3}</h3>
      <p>A curated list of the tools and workflows I rely on every single day to stay productive and keep shipping.</p>
      <div class="meta">January 2026 · 3 min read</div>
      <a href="#" class="read-more">Read more →</a>
    </div>
  </div>
  <div class="sidebar">
    <h2>About</h2>
    <div class="author-card">
      <div class="avatar">${d.author.charAt(0)}</div>
      <h3>${d.author}</h3>
      <p>${d.bio}</p>
    </div>
  </div>
</div>
<footer>© 2026 ${d.blogname} by ${d.author}. Built with TemplatesCrate.</footer>
</body>
</html>`
        },

        // ── 4. RESTAURANT ─────────────────────────────
        {
            id: 4,
            title: "Restaurant",
            category: "Business",
            difficulty: "Intermediate",
            preview: "images/tpl_restaurant.jpg",
            tags: "restaurant food cafe menu business",
            fields: [
                { key: "name",       label: "Restaurant name",     placeholder: "e.g. Casa Verde" },
                { key: "cuisine",    label: "Cuisine type",        placeholder: "e.g. Italian, Indian, Fusion" },
                { key: "tagline",    label: "Tagline",             placeholder: "e.g. Fresh flavors, every day" },
                { key: "dish1",      label: "Signature dish 1",    placeholder: "e.g. Truffle Pasta" },
                { key: "dish2",      label: "Signature dish 2",    placeholder: "e.g. Grilled Sea Bass" },
                { key: "dish3",      label: "Signature dish 3",    placeholder: "e.g. Mango Tart" },
                { key: "address",    label: "Address",             placeholder: "e.g. 42 MG Road, Bengaluru" },
                { key: "phone",      label: "Phone number",        placeholder: "e.g. +91 98765 43210" },
                { key: "accent",     label: "Brand color",         type: "color", default: "#dc2626" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — ${d.cuisine} Restaurant</title>
<style>
  :root { --accent:${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0a0a0a; color:#fff; font-family:'Segoe UI',sans-serif; }
  header { padding:20px 40px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(12px); z-index:100; border-bottom:1px solid #1f1f1f; }
  .logo { font-size:1.4rem; font-weight:900; color:var(--accent); letter-spacing:0.05em; }
  nav a { color:#aaa; text-decoration:none; margin-left:28px; font-size:0.88rem; transition:color 0.2s; }
  nav a:hover { color:var(--accent); }
  .hero { min-height:85vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:40px; }
  .hero .sub { color:var(--accent); font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:16px; }
  .hero h1 { font-size:clamp(3rem,10vw,6rem); font-weight:900; line-height:1; }
  .hero p { color:#888; margin-top:18px; font-size:1rem; max-width:480px; line-height:1.7; }
  .btn { display:inline-block; margin-top:32px; padding:14px 36px; background:var(--accent); color:#fff; font-weight:800; border-radius:8px; text-decoration:none; font-size:0.95rem; transition:opacity 0.2s; }
  .btn:hover { opacity:0.85; }
  .menu { padding:80px 40px; max-width:1000px; margin:0 auto; }
  .menu h2 { text-align:center; font-size:2.2rem; font-weight:900; margin-bottom:8px; }
  .menu .subtitle { text-align:center; color:#666; margin-bottom:48px; font-size:0.9rem; }
  .dishes { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
  .dish { background:#111; border:1px solid #222; border-radius:14px; padding:28px; transition:border-color 0.3s; }
  .dish:hover { border-color:var(--accent); }
  .dish-num { color:var(--accent); font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
  .dish h3 { font-size:1.15rem; font-weight:700; margin-bottom:8px; }
  .dish p { color:#666; font-size:0.85rem; line-height:1.6; }
  .info { background:#0f0f0f; border-top:1px solid #1a1a1a; padding:60px 40px; }
  .info-grid { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:32px; text-align:center; }
  .info-item h3 { color:var(--accent); font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
  .info-item p { color:#aaa; font-size:0.9rem; line-height:1.6; }
  footer { text-align:center; padding:30px; color:#444; font-size:0.8rem; border-top:1px solid #1a1a1a; }
</style>
</head>
<body>
<header>
  <div class="logo">${d.name}</div>
  <nav><a href="#menu">Menu</a><a href="#info">Find Us</a></nav>
</header>
<section class="hero">
  <div class="sub">${d.cuisine} Restaurant</div>
  <h1>${d.name}</h1>
  <p>${d.tagline}</p>
  <a href="#menu" class="btn">View Our Menu</a>
</section>
<section class="menu" id="menu">
  <h2>Signature Dishes</h2>
  <p class="subtitle">Crafted with passion, served with pride</p>
  <div class="dishes">
    <div class="dish"><div class="dish-num">Chef's Pick</div><h3>${d.dish1}</h3><p>A masterfully prepared dish using the finest seasonal ingredients. A guest favorite since day one.</p></div>
    <div class="dish"><div class="dish-num">Fan Favorite</div><h3>${d.dish2}</h3><p>Bold flavors balanced with precision. This dish tells the story of our culinary philosophy.</p></div>
    <div class="dish"><div class="dish-num">House Special</div><h3>${d.dish3}</h3><p>The perfect ending to any meal. A creation that keeps guests coming back.</p></div>
  </div>
</section>
<section class="info" id="info">
  <div class="info-grid">
    <div class="info-item"><h3>Location</h3><p>${d.address}</p></div>
    <div class="info-item"><h3>Reservations</h3><p>${d.phone}</p></div>
    <div class="info-item"><h3>Hours</h3><p>Mon–Fri: 12pm – 11pm<br>Sat–Sun: 11am – 12am</p></div>
  </div>
</section>
<footer>© 2026 ${d.name}. Built with TemplatesCrate.</footer>
</body>
</html>`
        },

        // ── 5. RESUME / CV ────────────────────────────
        {
            id: 5,
            title: "Resume / CV",
            category: "Personal",
            difficulty: "Beginner",
            preview: "images/tpl_resume.jpg",
            tags: "resume cv personal career job",
            fields: [
                { key: "name",       label: "Full name",           placeholder: "e.g. Rahul Gupta" },
                { key: "role",       label: "Current role / title",placeholder: "e.g. Software Engineer" },
                { key: "email",      label: "Email",               placeholder: "rahul@email.com" },
                { key: "phone",      label: "Phone",               placeholder: "+91 98765 43210" },
                { key: "summary",    label: "Professional summary", placeholder: "2–3 sentences about your experience", type: "textarea" },
                { key: "skill1",     label: "Skill 1",             placeholder: "e.g. JavaScript" },
                { key: "skill2",     label: "Skill 2",             placeholder: "e.g. React" },
                { key: "skill3",     label: "Skill 3",             placeholder: "e.g. Node.js" },
                { key: "skill4",     label: "Skill 4",             placeholder: "e.g. SQL" },
                { key: "job1",       label: "Most recent job title",placeholder: "e.g. Frontend Developer at XYZ" },
                { key: "job2",       label: "Previous job title",  placeholder: "e.g. Junior Dev at ABC" },
                { key: "accent",     label: "Accent color",        type: "color", default: "#2563eb" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Resume</title>
<style>
  :root { --accent:${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#f8fafc; color:#1e293b; font-family:'Segoe UI',sans-serif; }
  .page { max-width:860px; margin:40px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
  .layout { display:grid; grid-template-columns:240px 1fr; }
  .sidebar { background:var(--accent); color:#fff; padding:40px 32px; }
  .avatar { width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:2rem; font-weight:900; margin-bottom:20px; }
  .sidebar h1 { font-size:1.6rem; font-weight:900; margin-bottom:4px; }
  .sidebar .role { opacity:0.85; font-size:0.9rem; margin-bottom:28px; }
  .sidebar h2 { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; opacity:0.7; margin:24px 0 12px; }
  .contact-item { font-size:0.85rem; margin-bottom:8px; opacity:0.9; }
  .skill-pill { display:inline-block; background:rgba(255,255,255,0.15); padding:5px 12px; border-radius:20px; font-size:0.78rem; margin:4px 4px 0 0; }
  .main { padding:40px 36px; }
  .main h2 { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:var(--accent); margin:0 0 16px; padding-bottom:8px; border-bottom:2px solid var(--accent); }
  .main section { margin-bottom:32px; }
  .main p { color:#475569; font-size:0.9rem; line-height:1.7; }
  .exp-item { margin-bottom:20px; }
  .exp-item h3 { font-size:1rem; font-weight:700; margin-bottom:4px; }
  .exp-item .period { font-size:0.78rem; color:#94a3b8; margin-bottom:8px; }
  .exp-item p { font-size:0.88rem; color:#64748b; line-height:1.6; }
  @media(max-width:640px) { .layout { grid-template-columns:1fr; } }
</style>
</head>
<body>
<div class="page">
  <div class="layout">
    <div class="sidebar">
      <div class="avatar">${d.name.charAt(0)}</div>
      <h1>${d.name}</h1>
      <div class="role">${d.role}</div>
      <h2>Contact</h2>
      <div class="contact-item">${d.email}</div>
      <div class="contact-item">${d.phone}</div>
      <h2>Skills</h2>
      <span class="skill-pill">${d.skill1}</span>
      <span class="skill-pill">${d.skill2}</span>
      <span class="skill-pill">${d.skill3}</span>
      <span class="skill-pill">${d.skill4}</span>
    </div>
    <div class="main">
      <section><h2>Profile</h2><p>${d.summary}</p></section>
      <section>
        <h2>Experience</h2>
        <div class="exp-item"><h3>${d.job1}</h3><div class="period">2024 – Present</div><p>Delivered high-quality solutions and collaborated with cross-functional teams to meet product goals on time.</p></div>
        <div class="exp-item"><h3>${d.job2}</h3><div class="period">2022 – 2024</div><p>Contributed to key features, improved codebase quality, and supported senior engineers on complex projects.</p></div>
      </section>
      <section>
        <h2>Education</h2>
        <div class="exp-item"><h3>Bachelor of Technology</h3><div class="period">2018 – 2022</div><p>Computer Science & Engineering</p></div>
      </section>
    </div>
  </div>
</div>
</body>
</html>`
        },

        // ── 6. EVENT PAGE ─────────────────────────────
        {
            id: 6,
            title: "Event Page",
            category: "Event",
            difficulty: "Intermediate",
            preview: "images/tpl_event.jpg",
            tags: "event conference meetup workshop launch",
            fields: [
                { key: "event",      label: "Event name",          placeholder: "e.g. DevFest 2026" },
                { key: "tagline",    label: "Tagline",             placeholder: "e.g. Build. Connect. Inspire." },
                { key: "date",       label: "Date",                placeholder: "e.g. April 12, 2026" },
                { key: "venue",      label: "Venue",               placeholder: "e.g. Bombay Exhibition Centre" },
                { key: "city",       label: "City",                placeholder: "e.g. Mumbai" },
                { key: "speaker1",   label: "Speaker 1 name",      placeholder: "e.g. Ananya Kapoor" },
                { key: "speaker2",   label: "Speaker 2 name",      placeholder: "e.g. Rohan Verma" },
                { key: "speaker3",   label: "Speaker 3 name",      placeholder: "e.g. Sara Iyer" },
                { key: "ticket",     label: "Ticket / CTA link",   placeholder: "https://..." },
                { key: "accent",     label: "Event color",         type: "color", default: "#8b5cf6" },
            ],
            generate: (d) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.event} — ${d.city}</title>
<style>
  :root { --accent:${d.accent}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#06020f; color:#fff; font-family:'Segoe UI',sans-serif; }
  header { padding:18px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1a1a1a; }
  .logo { font-weight:900; font-size:1.1rem; color:var(--accent); }
  nav a { color:#888; text-decoration:none; margin-left:24px; font-size:0.88rem; transition:color 0.2s; }
  nav a:hover { color:var(--accent); }
  .hero { min-height:88vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:60px 40px; }
  .pill { display:inline-block; border:1px solid var(--accent); color:var(--accent); padding:6px 18px; border-radius:20px; font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:24px; }
  .hero h1 { font-size:clamp(3rem,10vw,6.5rem); font-weight:900; line-height:1; letter-spacing:-0.02em; }
  .hero .tagline { color:#888; margin-top:20px; font-size:1.1rem; }
  .meta { display:flex; gap:32px; margin-top:32px; flex-wrap:wrap; justify-content:center; }
  .meta-item .label { color:#666; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
  .meta-item .value { font-size:1rem; font-weight:700; }
  .btn { display:inline-block; margin-top:36px; padding:16px 44px; background:var(--accent); color:#fff; font-weight:800; border-radius:10px; text-decoration:none; font-size:1rem; transition:opacity 0.2s; }
  .btn:hover { opacity:0.85; }
  .speakers { padding:80px 40px; max-width:1000px; margin:0 auto; }
  .speakers h2 { text-align:center; font-size:2rem; font-weight:900; margin-bottom:48px; }
  .speaker-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
  .speaker-card { background:#0f0a1a; border:1px solid #1f1a2e; border-radius:16px; padding:32px; text-align:center; transition:border-color 0.3s; }
  .speaker-card:hover { border-color:var(--accent); }
  .speaker-avatar { width:64px; height:64px; border-radius:50%; background:var(--accent); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:900; }
  .speaker-card h3 { font-size:1.05rem; font-weight:700; margin-bottom:6px; }
  .speaker-card p { color:#666; font-size:0.82rem; }
  footer { text-align:center; padding:40px; color:#444; font-size:0.8rem; border-top:1px solid #111; }
</style>
</head>
<body>
<header>
  <div class="logo">${d.event}</div>
  <nav><a href="#speakers">Speakers</a><a href="${d.ticket}">Get Tickets</a></nav>
</header>
<section class="hero">
  <div class="pill">${d.date} · ${d.city}</div>
  <h1>${d.event}</h1>
  <p class="tagline">${d.tagline}</p>
  <div class="meta">
    <div class="meta-item"><div class="label">Date</div><div class="value">${d.date}</div></div>
    <div class="meta-item"><div class="label">Venue</div><div class="value">${d.venue}</div></div>
    <div class="meta-item"><div class="label">City</div><div class="value">${d.city}</div></div>
  </div>
  <a href="${d.ticket}" class="btn">Get Your Ticket</a>
</section>
<section class="speakers" id="speakers">
  <h2>Featured Speakers</h2>
  <div class="speaker-grid">
    <div class="speaker-card"><div class="speaker-avatar">${d.speaker1.charAt(0)}</div><h3>${d.speaker1}</h3><p>Keynote Speaker · Industry Leader</p></div>
    <div class="speaker-card"><div class="speaker-avatar">${d.speaker2.charAt(0)}</div><h3>${d.speaker2}</h3><p>Workshop Lead · Open Source Contributor</p></div>
    <div class="speaker-card"><div class="speaker-avatar">${d.speaker3.charAt(0)}</div><h3>${d.speaker3}</h3><p>Panel Member · Startup Founder</p></div>
  </div>
</section>
<footer>© 2026 ${d.event}. Built with TemplatesCrate.</footer>
</body>
</html>`
        },

    ];

    // ─────────────────────────────────────────────
    // WEEKLY SHUFFLE (same as original)
    // ─────────────────────────────────────────────

    function getWeekSeed() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDays = (now - startOfYear) / 86400000;
        const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
        return now.getFullYear() + weekNum;
    }

    function seededShuffle(array, seed) {
        let m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.abs(Math.sin(seed++)) * m--);
            t = array[m]; array[m] = array[i]; array[i] = t;
        }
        return array;
    }

    const weeklyLibrary = seededShuffle([...library], getWeekSeed());

    // ─────────────────────────────────────────────
    // RENDER CARDS
    // ─────────────────────────────────────────────

    function renderCards(dataList) {
        promptGrid.innerHTML = '';
        dataList.forEach(item => {
            const isFav = favorites.includes(item.id);
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.setAttribute('data-id', item.id);
            card.setAttribute('data-title', item.title);
            card.setAttribute('data-category', item.category);
            card.setAttribute('data-tags', item.tags);
            card.innerHTML = `
                <button class="fav-btn ${isFav ? 'is-fav' : ''}" title="Favorite">❤</button>
                <div class="model-badge">${item.difficulty}</div>
                <div class="card-image-wrapper">
                    <img src="${item.preview}" alt="${item.title}" onerror="this.style.display='none';this.parentElement.style.background='#1a1a2e'">
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <button class="show-btn" data-id="${item.id}">Customize →</button>
                </div>
            `;
            promptGrid.appendChild(card);
        });
        setupModalListeners();
        setupFavListeners();
    }

    renderCards(weeklyLibrary);

    // ─────────────────────────────────────────────
    // FAVORITES
    // ─────────────────────────────────────────────

    function setupFavListeners() {
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.prompt-card');
                const id = parseInt(card.getAttribute('data-id'));
                if (favorites.includes(id)) {
                    favorites = favorites.filter(f => f !== id);
                    btn.classList.remove('is-fav');
                } else {
                    favorites.push(id);
                    btn.classList.add('is-fav');
                }
                localStorage.setItem('crateFavs', JSON.stringify(favorites));
                if (currentFilter === 'favorites') filterAndSearch();
            });
        });
    }

    // ─────────────────────────────────────────────
    // FILTER + SEARCH (now also searches tags)
    // ─────────────────────────────────────────────

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            filterAndSearch();
        });
    });

    function filterAndSearch() {
        const query = searchInput.value.toLowerCase();
        let matches = 0;
        document.querySelectorAll('.prompt-card').forEach(card => {
            const id = parseInt(card.getAttribute('data-id'));
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category');
            const tags = card.getAttribute('data-tags').toLowerCase();
            const matchesSearch = !query || title.includes(query) || tags.includes(query) || category.toLowerCase().includes(query);
            const matchesFilter = currentFilter === 'all'
                ? true
                : currentFilter === 'favorites'
                ? favorites.includes(id)
                : category === currentFilter;
            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                matches++;
            } else {
                card.style.display = 'none';
            }
        });
        noResults.style.display = matches === 0 ? 'block' : 'none';
    }

    searchInput.oninput = filterAndSearch;

    // ─────────────────────────────────────────────
    // MODAL — CUSTOMIZATION FORM
    // ─────────────────────────────────────────────

    function setupModalListeners() {
        document.querySelectorAll('.show-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const template = library.find(t => t.id === id);
                if (template) openModal(template);
            });
        });
    }

    function openModal(template) {
        modalTitle.innerText = template.title;

        const fieldsHTML = template.fields.map(f => {
            if (f.type === 'color') {
                return `<div class="form-group">
                    <label>${f.label}</label>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <input type="color" name="${f.key}" value="${f.default || '#00e5ff'}" style="width:44px;height:36px;padding:2px;border-radius:6px;border:1px solid #333;background:#111;cursor:pointer;">
                        <span style="font-size:0.8rem;color:#666;">Pick your brand color</span>
                    </div>
                </div>`;
            } else if (f.type === 'textarea') {
                return `<div class="form-group">
                    <label>${f.label}</label>
                    <textarea name="${f.key}" placeholder="${f.placeholder}" rows="3"></textarea>
                </div>`;
            } else {
                return `<div class="form-group">
                    <label>${f.label}</label>
                    <input type="text" name="${f.key}" placeholder="${f.placeholder}">
                </div>`;
            }
        }).join('');

        modalContent.innerHTML = `
            <p style="color:var(--cyan-accent);font-size:0.7rem;font-weight:bold;margin-bottom:16px;text-align:left;text-transform:uppercase;letter-spacing:0.08em;">
                ${template.category} &nbsp;·&nbsp; ${template.difficulty}
            </p>
            <form id="templateForm" autocomplete="off">
                <div class="form-fields">${fieldsHTML}</div>
                <button type="submit" id="downloadBtn">Generate &amp; Download</button>
            </form>
            <p id="formError" style="display:none;color:#ff4444;font-size:0.8rem;margin-top:10px;text-align:center;"></p>
        `;

        if (!document.getElementById('formStyles')) {
            const style = document.createElement('style');
            style.id = 'formStyles';
            style.textContent = `
                .form-fields { max-height: 340px; overflow-y: auto; padding-right: 4px; }
                .form-group { margin-bottom: 14px; text-align: left; }
                .form-group label { display:block; font-size:0.75rem; color:#888; margin-bottom:6px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; }
                .form-group input[type="text"], .form-group textarea { width:100%; background:#0d0d0d; border:1px solid #2a2a2a; color:white; padding:10px 12px; border-radius:8px; font-size:0.88rem; font-family:'Inter',sans-serif; outline:none; resize:vertical; transition:border-color 0.2s; }
                .form-group input[type="text"]:focus, .form-group textarea:focus { border-color:var(--cyan-accent); }
                #downloadBtn { width:100%; margin-top:18px; padding:13px; background:var(--neon-green); color:#000; font-weight:800; border:none; border-radius:8px; font-size:0.95rem; cursor:pointer; transition:opacity 0.2s; }
                #downloadBtn:hover { opacity:0.9; }
                #downloadBtn:disabled { opacity:0.5; cursor:not-allowed; }
            `;
            document.head.appendChild(style);
        }

        modal.style.display = 'flex';

        document.getElementById('templateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const errorEl = document.getElementById('formError');
            const btn = document.getElementById('downloadBtn');
            const data = {};
            let valid = true;

            template.fields.forEach(f => {
                const el = form.querySelector(`[name="${f.key}"]`);
                const val = el ? el.value.trim() : '';
                if (!val && f.type !== 'color') {
                    valid = false;
                    if (el) el.style.borderColor = '#ff4444';
                } else {
                    if (el) el.style.borderColor = '';
                    data[f.key] = val || (f.default || '');
                }
            });

            if (!valid) {
                errorEl.textContent = 'Please fill in all fields before downloading.';
                errorEl.style.display = 'block';
                return;
            }
            errorEl.style.display = 'none';
            btn.textContent = 'Generating...';
            btn.disabled = true;

            setTimeout(() => {
                try {
                    const html = template.generate(data);
                    const filename = template.title.toLowerCase().replace(/[\s/]+/g, '-') + '.html';
                    downloadFile(filename, html);
                    btn.textContent = '✓ Downloaded!';
                    btn.style.background = '#39ff14';
                    setTimeout(() => {
                        btn.textContent = 'Generate & Download';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 2500);
                } catch (err) {
                    btn.textContent = 'Error — try again';
                    btn.disabled = false;
                    console.error(err);
                }
            }, 300);
        });
    }

    // ─────────────────────────────────────────────
    // DOWNLOAD HELPER
    // ─────────────────────────────────────────────

    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }

    // ─────────────────────────────────────────────
    // COMING SOON NAV LINKS
    // ─────────────────────────────────────────────

    document.querySelectorAll('.coming-soon').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.innerText = 'Coming Soon';
            modalContent.innerHTML = `<p style="color:#a0a0a0;margin:20px 0;">We are currently building this feature!</p>`;
            modal.style.display = 'flex';
        });
    });

    // ─────────────────────────────────────────────
    // SCROLL / MODAL CLOSE / BACK TO TOP / ESCAPE
    // ─────────────────────────────────────────────

    document.getElementById('exploreLink').addEventListener('click', () => {
        document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' });
    });

    window.onscroll = () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    };

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.style.display = 'none'; });

});
