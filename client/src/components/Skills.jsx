import { useProfile } from '../context/ProfileContext.jsx';
import Reveal from './Reveal.jsx';
import { Code } from './Icons.jsx';

export default function Skills() {
  const { profile } = useProfile();

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="section-heading center">
            <span className="eyebrow">Skills</span>
            <h2 className="section-title">The tools I reach for</h2>
            <p className="section-subtitle">
              A pragmatic stack chosen for shipping reliable products quickly.
            </p>
          </div>
        </Reveal>

        <div className="skills-grid">
          {profile.skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 80}>
              <div className="skill-card">
                <div className="skill-head">
                  <span className="skill-icon">
                    <Code width={18} height={18} />
                  </span>
                  <h3>{group.category}</h3>
                </div>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
