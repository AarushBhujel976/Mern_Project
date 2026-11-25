import { socialIcons, ExternalLink } from './Icons.jsx';

export default function SocialLinks({ socials = [], className = '' }) {
  if (!socials.length) return null;

  return (
    <div className={`social-row ${className}`.trim()}>
      {socials.map((social) => {
        const Icon = socialIcons[social.label] || ExternalLink;
        const isEmail = social.url.startsWith('mailto:');

        return (
          <a
            key={`${social.label}-${social.url}`}
            className="social-link"
            href={social.url}
            aria-label={social.label}
            title={social.label}
            {...(isEmail ? {} : { target: '_blank', rel: 'noreferrer' })}
          >
            <Icon width={18} height={18} />
          </a>
        );
      })}
    </div>
  );
}
