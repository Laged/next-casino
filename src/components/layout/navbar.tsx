"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Gamepad2,
  Gift,
  Trophy,
  CreditCard,
  BookOpen,
  Star,
  Zap,
  Shield,
  Dice5,
  Spade,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface MegaMenuSection {
  title: string;
  items: NavItem[];
}

interface NavItemWithMegaMenu {
  label: string;
  href?: string;
  megaMenu?: MegaMenuSection[];
}

const navigationItems: NavItemWithMegaMenu[] = [
  {
    label: "Casinos",
    megaMenu: [
      {
        title: "By Type",
        items: [
          {
            label: "New Casinos",
            href: "/casinos/new",
            icon: <Zap className="w-4 h-4" />,
            description: "Latest casino launches",
          },
          {
            label: "Top Rated",
            href: "/casinos/top-rated",
            icon: <Star className="w-4 h-4" />,
            description: "Highest rated casinos",
          },
          {
            label: "VIP Casinos",
            href: "/casinos/vip",
            icon: <Trophy className="w-4 h-4" />,
            description: "Premium VIP experiences",
          },
          {
            label: "Safe Casinos",
            href: "/casinos/safe",
            icon: <Shield className="w-4 h-4" />,
            description: "Licensed & regulated",
          },
        ],
      },
      {
        title: "By Game",
        items: [
          {
            label: "Slots Casinos",
            href: "/casinos/slots",
            icon: <Gamepad2 className="w-4 h-4" />,
            description: "Best for slot games",
          },
          {
            label: "Live Casinos",
            href: "/casinos/live",
            icon: <Dice5 className="w-4 h-4" />,
            description: "Live dealer games",
          },
          {
            label: "Poker Rooms",
            href: "/casinos/poker",
            icon: <Spade className="w-4 h-4" />,
            description: "Online poker sites",
          },
        ],
      },
    ],
  },
  {
    label: "Bonuses",
    megaMenu: [
      {
        title: "Bonus Types",
        items: [
          {
            label: "Welcome Bonuses",
            href: "/bonuses/welcome",
            icon: <Gift className="w-4 h-4" />,
            description: "First deposit offers",
          },
          {
            label: "No Deposit",
            href: "/bonuses/no-deposit",
            icon: <Star className="w-4 h-4" />,
            description: "Free bonus no deposit",
          },
          {
            label: "Free Spins",
            href: "/bonuses/free-spins",
            icon: <Gamepad2 className="w-4 h-4" />,
            description: "Free spins offers",
          },
          {
            label: "Cashback",
            href: "/bonuses/cashback",
            icon: <CreditCard className="w-4 h-4" />,
            description: "Cashback promotions",
          },
        ],
      },
    ],
  },
  {
    label: "Payments",
    megaMenu: [
      {
        title: "Payment Methods",
        items: [
          {
            label: "Crypto Casinos",
            href: "/payments/crypto",
            icon: <CreditCard className="w-4 h-4" />,
            description: "Bitcoin & crypto accepted",
          },
          {
            label: "Fast Payouts",
            href: "/payments/fast-payout",
            icon: <Zap className="w-4 h-4" />,
            description: "Quick withdrawal casinos",
          },
          {
            label: "PayPal Casinos",
            href: "/payments/paypal",
            icon: <CreditCard className="w-4 h-4" />,
            description: "PayPal accepted",
          },
        ],
      },
    ],
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "Reviews",
    href: "/reviews",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Casino<span className="text-amber-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.megaMenu && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                      activeMegaMenu === item.label
                        ? "text-amber-400"
                        : "text-slate-300 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeMegaMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                )}

                {/* Mega Menu Dropdown */}
                {item.megaMenu && activeMegaMenu === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 p-6 min-w-[500px]">
                      <div className="grid grid-cols-2 gap-6">
                        {item.megaMenu.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                              {section.title}
                            </h3>
                            <ul className="space-y-1">
                              {section.items.map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors group"
                                  >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                      {subItem.icon}
                                    </span>
                                    <div>
                                      <span className="block text-sm font-medium text-white">
                                        {subItem.label}
                                      </span>
                                      {subItem.description && (
                                        <span className="block text-xs text-slate-400">
                                          {subItem.description}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/compare">
              <Button variant="outline" size="sm">
                Compare
              </Button>
            </Link>
            <Link href="/casinos/top-rated">
              <Button size="sm">
                Find Casino
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <MobileAccordion item={item} onClose={() => setIsMobileMenuOpen(false)} />
                  )}
                </div>
              ))}
              <div className="flex gap-2 px-4 pt-4">
                <Link href="/compare" className="flex-1">
                  <Button variant="outline" fullWidth>
                    Compare
                  </Button>
                </Link>
                <Link href="/casinos/top-rated" className="flex-1">
                  <Button fullWidth>
                    Find Casino
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function MobileAccordion({
  item,
  onClose,
}: {
  item: NavItemWithMegaMenu;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && item.megaMenu && (
        <div className="ml-4 mt-1 space-y-1">
          {item.megaMenu.map((section) => (
            <div key={section.title} className="py-2">
              <span className="block px-4 py-1 text-xs font-semibold text-slate-500 uppercase">
                {section.title}
              </span>
              {section.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white"
                  onClick={onClose}
                >
                  {subItem.icon}
                  {subItem.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
