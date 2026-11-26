import './Partners.css'
import codeOnJvmChennai from '../../assets/community/code-on-jvm-chennai.png'
import aiGeeks from '../../assets/community/ai-geeks.png'
import nammaFlutter from '../../assets/community/namma-flutter.png'
import chennaiReactJs from '../../assets/community/chennai-reactjs.png'
import wyntrix from '../../assets/partners/wyntrix.png'
import mastra from '../../assets/partners/mastra.png'
import balsamiq from '../../assets/partners/balsamiq.png'
import navan from '../../assets/partners/navan.png'
import fossUnitedChennai from '../../assets/community/foss-united-chennai.png'
import developerCommunity from '../../assets/community/chennai-dev-community.png'
import codingCommunity from '../../assets/community/coding-community.png'
import elevenLabs from '../../assets/sponsors/elevenlabs.png'
import happyFox from '../../assets/sponsors/happyfox.png'
import sponsorMark from '../../assets/sponsors/sponsor-mark.png'
import github from '../../assets/sponsors/github.png'
import azureDeveloperCommunity from '../../assets/community/azure-developer-community.png'
import friendsOfFigmaChennai from '../../assets/community/friends-of-figma-chennai.png'
import communityPartnerD from '../../assets/community/community-partner-d.png'
import notion from '../../assets/sponsors/notion.png'
import ccl from '../../assets/sponsors/ccl.png'
import zuntraDigital from '../../assets/sponsors/zuntra-digital.png'
import kottraAi from '../../assets/sponsors/kottra-ai.png'
import mako from '../../assets/sponsors/mako.png'
import xyzDomain from '../../assets/partners/xyz-domain.png'
import interviewBuddy from '../../assets/partners/interview-buddy.png'

const communityPartners = [
  { name: 'CODE ON JVM Chennai', logo: codeOnJvmChennai },
  { name: 'AI Geeks', logo: aiGeeks },
  { name: 'Namma Flutter', logo: nammaFlutter },
  { name: 'Chennai ReactJS', logo: chennaiReactJs },
  { name: 'FOSS United Chennai', logo: fossUnitedChennai },
  { name: 'Developer Community', logo: developerCommunity },
  { name: 'Coding Community', logo: codingCommunity },
  { name: 'Azure Developer Community', logo: azureDeveloperCommunity },
  { name: 'Friends of Figma Chennai', logo: friendsOfFigmaChennai },
  { name: 'Developer Partner', logo: communityPartnerD },
]
const partners = [
  { name: 'Wyntrix', logo: wyntrix },
  { name: 'Mastra', logo: mastra },
  { name: 'Balsamiq', logo: balsamiq },
  { name: 'Navan', logo: navan },
  { name: '.xyz', logo: xyzDomain },
  { name: 'Interview Buddy', logo: interviewBuddy },
]
const sponsors = [
  { name: 'ElevenLabs', logo: elevenLabs },
  { name: 'HappyFox', logo: happyFox },
  { name: 'Sponsor', logo: sponsorMark },
  { name: 'GitHub', logo: github },
  { name: 'Notion', logo: notion },
  { name: 'CCL', logo: ccl },
  { name: 'Zuntra Digital', logo: zuntraDigital },
  { name: 'Kottra.ai', logo: kottraAi },
  { name: 'MAKO', logo: mako },
]

function LogoBelt({ logos, direction }) {
  return (
    <div className="partners__belt" data-reveal>
      <div className={`partners__track partners__track--${direction}`}>
        <div className="partners__belt-group">
          {logos.map((item) => (
            <div className="partners__logo-slot partners__logo-slot--partner" key={item.name}>
              <img src={item.logo} alt={`${item.name} logo`} className="partners__logo" />
              <span className="partners__name">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="partners__belt-group" aria-hidden="true">
          {logos.map((item) => (
            <div className="partners__logo-slot partners__logo-slot--partner" key={item.name}>
              <img src={item.logo} alt="" className="partners__logo" />
              <span className="partners__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Partners() {
  return (
    <section className="partners" aria-labelledby="partners-heading">
      <h2 id="partners-heading" className="about__heading partners__heading" data-reveal>
        Partners
      </h2>

      <div className="partners__groups">
        <section className="partners__group" aria-labelledby="community-partners-heading">
          <h3 id="community-partners-heading" className="partners__group-heading" data-reveal>
            Community Partners
          </h3>
          <LogoBelt logos={communityPartners} direction="forward" />
        </section>

        <section className="partners__group" aria-labelledby="partners-group-heading">
          <h3 id="partners-group-heading" className="partners__group-heading" data-reveal>
            Partners
          </h3>
          <LogoBelt logos={partners} direction="reverse" />
        </section>

        <section className="partners__group" aria-labelledby="sponsors-heading">
          <h3 id="sponsors-heading" className="partners__group-heading" data-reveal>
            Sponsors
          </h3>
          <LogoBelt logos={sponsors} direction="forward" />
        </section>
      </div>
    </section>
  )
}
