
import Stats from '../sections/about/Stats.jsx'
import Journey from '../sections/about/Journey.jsx'
import Gallery from '../sections/about/Gallery.jsx'
import CharacterLoop from '../components/CharacterLoop.jsx'
import '../components/CharacterArt.css'
import './About.css'

export default function About() {
  // Layout.jsx already renders the page inside <main>, so this is a plain div.
  return (
    <div className="about">
      {/* about__top (About only) adds the two-column layout; about__intro is shared with Join us and Blogs */}
      <section className="about__intro about__top" aria-labelledby="about-heading">
        <div className="about__text">
          <h2 id="about-heading" className="about__heading" data-reveal>
            About us
          </h2>

          <p data-reveal>
            <strong>Bridging Gaps, Breaking Barriers</strong>
          </p>

          <p data-reveal>
            <strong>Built by Her, Backed by Boldness</strong>
          </p>

          <p data-reveal>
            SheBuilds is a movement to empower women in technology, innovation,
            and entrepreneurship across India. Founded in 2024, SheBuilds exists
            to close the gap between education, opportunity, and leadership for
            women by giving them access to the tools, mentorship, and platforms
            they need to learn, build, and scale.
          </p>

          <p data-reveal>
            We are not just an initiative. We are an ecosystem where learning
            creates talent, talent creates value, and value fuels real-world
            impact. Through flagship events, strategic partnerships, and
            community-driven programs, we bring together students, founders,
            and industry leaders to share real stories, practical insights,
            and meaningful connections.
          </p>

          <p data-reveal>
            At our core, we believe that when women build, industries evolve,
            communities grow, and the future transforms.
          </p>

          <Stats />
        </div>

        {/* character-art keeps the slot's size and spacing; CharacterLoop fills it */}
        <div className="character-art character-art--compact">
          <CharacterLoop
            still="/character/mentor-1100.webp"
            video="/character/mentor-loop.webm"
            alt="Illustration of a young woman presenting growth charts on a SheBuilds board"
          />
        </div>
      </section>

      <Journey />
      {/* Later, when the character is ready:
          <Journey character={<img src={characterImg} alt="" />} /> */}
      <Gallery />
    </div>
  )
}