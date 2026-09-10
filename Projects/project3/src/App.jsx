import './App.css'

const projects = [
  { id: 1, title: 'Project 1', tone: 'cyan' },
  { id: 2, title: 'Project 2', tone: 'purple' },
  { id: 3, title: 'Project 3', tone: 'pink' },
  { id: 4, title: 'Project 4', tone: 'gold' },
  { id: 5, title: 'Project 5', tone: 'green' },
  { id: 6, title: 'Project 6', tone: 'orange' },
]

function App() {
  return (
    <div className="portfolio-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="bg-orb orb-three" />

      <header className="hero-header">
        <p className="eyebrow">Creative portfolio</p>
        <h1 className="main-title">
          My <span>Projects</span>
        </h1>
        <p className="subtitle">
          A curated collection of bold ideas, polished concepts, and immersive digital experiences.
        </p>
      </header>

      <main className="projects-grid">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className={`project-card ${project.tone}`}
            style={{ animationDelay: `${index * 120}ms` }}
            aria-label={`Open ${project.title}`}
          >
            <div className="project-topbar">
              <span className="project-number">0{project.id}</span>
              <span className="project-tag">Live</span>
            </div>

            <div className="project-visual" aria-hidden="true">
              <div className="visual-window">
                <div className="window-bar">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>

                <div className="mockup-lines">
                  <span className="line short" />
                  <span className="line medium" />
                  <span className="line long" />
                  <span className="line medium" />
                </div>

                <div className="mockup-cards">
                  <span className="mini-card card-one" />
                  <span className="mini-card card-two" />
                </div>
              </div>
            </div>

            <div className="project-info">
              <h2>{project.title}</h2>
              <p>Interactive concept • visual design</p>
            </div>
          </a>
        ))}
      </main>
    </div>
  )
}

export default App
