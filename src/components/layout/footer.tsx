import Link from "next/link";
import {
  Gamepad2,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Shield,
  Award,
  Lock,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Casinos",
    links: [
      { label: "New Casinos", href: "/casinos/new" },
      { label: "Top Rated Casinos", href: "/casinos/top-rated" },
      { label: "VIP Casinos", href: "/casinos/vip" },
      { label: "Safe Casinos", href: "/casinos/safe" },
      { label: "Live Casinos", href: "/casinos/live" },
      { label: "Mobile Casinos", href: "/casinos/mobile" },
    ],
  },
  {
    title: "Bonuses",
    links: [
      { label: "Welcome Bonuses", href: "/bonuses/welcome" },
      { label: "No Deposit Bonuses", href: "/bonuses/no-deposit" },
      { label: "Free Spins", href: "/bonuses/free-spins" },
      { label: "Cashback Offers", href: "/bonuses/cashback" },
      { label: "VIP Programs", href: "/bonuses/vip" },
      { label: "Bonus Codes", href: "/bonuses/codes" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "How to Choose a Casino", href: "/guides/how-to-choose" },
      { label: "Responsible Gambling", href: "/guides/responsible-gambling" },
      { label: "Casino Games Guide", href: "/guides/casino-games" },
      { label: "Payment Methods", href: "/guides/payment-methods" },
      { label: "Gambling Laws", href: "/guides/gambling-laws" },
      { label: "Beginner Tips", href: "/guides/beginner-tips" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
    ],
  },
];

const trustBadges = [
  {
    icon: <Shield className="w-6 h-6" />,
    label: "Licensed Reviews",
  },
  {
    icon: <Award className="w-6 h-6" />,
    label: "Expert Verified",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    label: "Secure & Safe",
  },
];

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Trust Badges Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 text-slate-400"
              >
                <span className="text-amber-500">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Casino<span className="text-amber-500">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Your trusted source for online casino reviews, bonuses, and expert guides.
              We help players find safe and reliable casinos since 2020.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Get the latest bonuses
              </h3>
              <p className="text-sm text-slate-400">
                Subscribe for exclusive casino offers and promotions.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-11 pl-10 pr-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>&copy; {currentYear} CasinoHub. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-amber-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">18+</span>
              <span className="text-xs px-2 py-1 bg-slate-800 rounded">BeGambleAware</span>
              <span className="text-xs px-2 py-1 bg-slate-800 rounded">GamStop</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-xs text-slate-600 text-center md:text-left">
            Gambling can be addictive. Please play responsibly. CasinoHub is an independent
            comparison website. We may receive compensation when you click on links to
            operators listed on our site. This does not affect our reviews, which remain
            honest and unbiased. Always check the T&Cs of any bonus offers. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
