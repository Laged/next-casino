import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Award, Calendar, CheckCircle, Clock, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface AuthorData {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials?: string[];
  experience?: string;
  slug?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

interface AuthorBioProps {
  author: AuthorData;
  publishDate?: string;
  updateDate?: string;
  readTime?: string;
  variant?: 'default' | 'compact' | 'inline';
  showCredentials?: boolean;
  className?: string;
}

export function AuthorBio({
  author,
  publishDate,
  updateDate,
  readTime,
  variant = 'default',
  showCredentials = true,
  className,
}: AuthorBioProps) {
  // Generate Author Schema for E-E-A-T
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    image: author.avatar,
    description: author.bio,
    sameAs: [author.social?.linkedin, author.social?.twitter].filter(Boolean),
  };

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image src={author.avatar} alt={author.name} fill className="object-cover" />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium text-white">{author.name}</span>
          {publishDate && (
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="h-4 w-4" />
              {publishDate}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-start gap-4', className)}>
        <Link href={author.slug ? `/author/${author.slug}` : '#'}>
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-500/30">
            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
          </div>
        </Link>
        <div>
          <Link
            href={author.slug ? `/author/${author.slug}` : '#'}
            className="font-semibold text-white transition-colors hover:text-amber-400"
          >
            {author.name}
          </Link>
          <p className="text-amber-500 text-sm">{author.role}</p>
          <div className="mt-2 flex items-center gap-3 text-slate-400 text-xs">
            {publishDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {publishDate}
              </span>
            )}
            {updateDate && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="h-3 w-3" />
                Updated {updateDate}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default full bio
  return (
    <>
      {/* JSON-LD Schema for SEO/E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <Card variant="gradient" className={cn('overflow-hidden', className)}>
        <div className="flex flex-col gap-6 p-6 md:flex-row">
          {/* Avatar & Social */}
          <div className="flex shrink-0 flex-col items-center">
            <Link href={author.slug ? `/author/${author.slug}` : '#'}>
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-amber-500/30">
                <Image src={author.avatar} alt={author.name} fill className="object-cover" />
              </div>
            </Link>
            {author.social && (
              <div className="mt-4 flex items-center gap-2">
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-sky-500 hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Bio Content */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={author.slug ? `/author/${author.slug}` : '#'}
                  className="font-bold text-white text-xl transition-colors hover:text-amber-400"
                >
                  {author.name}
                </Link>
                <Badge variant="success" size="sm" icon={<CheckCircle className="h-3 w-3" />}>
                  Verified Expert
                </Badge>
              </div>
              <p className="font-medium text-amber-500">{author.role}</p>
            </div>

            <p className="text-slate-300">{author.bio}</p>

            {/* Credentials */}
            {showCredentials && author.credentials && author.credentials.length > 0 && (
              <div className="border-slate-700 border-t pt-4">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-400 text-sm">
                  <Award className="h-4 w-4 text-amber-500" />
                  Credentials & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {author.credentials.map((credential, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {credential}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {author.experience && (
              <p className="text-slate-400 text-sm">
                <span className="font-medium text-slate-300">Experience:</span> {author.experience}
              </p>
            )}

            {/* Article Meta */}
            {(publishDate || updateDate || readTime) && (
              <div className="flex flex-wrap items-center gap-4 border-slate-700 border-t pt-4 text-slate-400 text-sm">
                {publishDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Published: {publishDate}
                  </span>
                )}
                {updateDate && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="h-4 w-4" />
                    Updated: {updateDate}
                  </span>
                )}
                {readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readTime} read
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

// Fact-check box for additional E-E-A-T signals
interface FactCheckBoxProps {
  reviewer: string;
  reviewerRole: string;
  lastReviewed: string;
  className?: string;
}

export function FactCheckBox({
  reviewer,
  reviewerRole,
  lastReviewed,
  className,
}: FactCheckBoxProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4',
        className
      )}
    >
      <CheckCircle className="h-8 w-8 shrink-0 text-emerald-500" />
      <div>
        <p className="font-medium text-white">Fact-Checked Content</p>
        <p className="text-slate-400 text-sm">
          Reviewed by <span className="text-emerald-400">{reviewer}</span>, {reviewerRole}. Last
          verified: {lastReviewed}
        </p>
      </div>
    </div>
  );
}

export default AuthorBio;
