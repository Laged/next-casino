import { groq } from 'next-sanity';

// Casino queries
export const featuredCasinosQuery = groq`
  *[_type == "casino" && isFeatured == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    rating,
    bonus,
    bonusValue,
    features,
    license,
    paymentMethods,
    minDeposit,
    withdrawalTime,
    affiliateLink,
    isNew
  }
`;

export const newCasinosQuery = groq`
  *[_type == "casino" && isNew == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    rating,
    bonus,
    bonusValue,
    features,
    license,
    minDeposit,
    withdrawalTime,
    affiliateLink,
    isNew
  }
`;

export const allCasinosQuery = groq`
  *[_type == "casino"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    rating,
    bonus,
    bonusValue,
    features,
    license,
    paymentMethods,
    minDeposit,
    withdrawalTime,
    affiliateLink,
    isNew,
    isFeatured
  }
`;

export const casinoBySlugQuery = groq`
  *[_type == "casino" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    logo,
    rating,
    bonus,
    bonusValue,
    features,
    license,
    paymentMethods,
    minDeposit,
    withdrawalTime,
    affiliateLink,
    isNew,
    review {
      summary,
      content,
      pros,
      cons
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Bonus queries
export const featuredBonusesQuery = groq`
  *[_type == "bonus" && isActive == true && isFeatured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    value,
    maxAmount,
    wageringRequirement,
    minDeposit,
    bonusCode,
    description,
    casino->{
      name,
      "slug": slug.current,
      logo,
      affiliateLink
    }
  }
`;

export const allBonusesQuery = groq`
  *[_type == "bonus" && isActive == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    value,
    maxAmount,
    wageringRequirement,
    minDeposit,
    validDays,
    bonusCode,
    description,
    terms,
    casino->{
      name,
      "slug": slug.current,
      logo,
      affiliateLink
    }
  }
`;

// Free spins queries
export const featuredFreeSpinsQuery = groq`
  *[_type == "freeSpins" && isActive == true && isFeatured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    spinsCount,
    spinValue,
    requiresDeposit,
    minDeposit,
    game,
    wageringRequirement,
    bonusCode,
    casino->{
      name,
      "slug": slug.current,
      logo,
      affiliateLink
    }
  }
`;

export const noDepositFreeSpinsQuery = groq`
  *[_type == "freeSpins" && isActive == true && requiresDeposit == false] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    spinsCount,
    spinValue,
    game,
    wageringRequirement,
    maxWinnings,
    bonusCode,
    casino->{
      name,
      "slug": slug.current,
      logo,
      affiliateLink
    }
  }
`;

// Category queries
export const categoriesQuery = groq`
  *[_type == "category" && showInNav == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    "casinoCount": count(casinos)
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    content,
    featuredImage,
    casinos[]->{
      _id,
      name,
      "slug": slug.current,
      logo,
      rating,
      bonus,
      bonusValue,
      features,
      license,
      minDeposit,
      withdrawalTime,
      affiliateLink,
      isNew
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Page queries
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    featuredImage,
    seo {
      metaTitle,
      metaDescription,
      noIndex
    }
  }
`;

export const footerPagesQuery = groq`
  *[_type == "page" && showInFooter == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    ogImage,
    heroTitle,
    heroSubtitle,
    trustBadges,
    stats,
    socialLinks,
    footer,
    analytics
  }
`;
