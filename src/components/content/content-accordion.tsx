'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type * as React from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

interface ContentAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  defaultOpen?: string[];
  type?: 'single' | 'multiple';
  variant?: 'default' | 'card' | 'minimal';
  className?: string;
}

export function ContentAccordion({
  items,
  title,
  subtitle,
  defaultOpen,
  type = 'single',
  variant = 'default',
  className,
}: ContentAccordionProps) {
  const containerClasses = {
    default: 'bg-slate-900 rounded-xl border border-slate-800 p-6',
    card: 'space-y-3',
    minimal: '',
  };

  const itemClasses = {
    default: '',
    card: 'bg-slate-900 rounded-xl border border-slate-800 px-6',
    minimal: 'border-b border-slate-800 last:border-b-0',
  };

  return (
    <section className={cn('space-y-6', className)}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>}
          {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
        </div>
      )}

      <div className={containerClasses[variant]}>
        {type === 'single' ? (
          <Accordion
            type="single"
            defaultValue={defaultOpen?.[0]}
            className={cn(variant === 'card' && 'space-y-3')}
            collapsible
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className={itemClasses[variant]}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                  {typeof item.answer === 'string' ? (
                    <div
                      className="prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  ) : (
                    item.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={defaultOpen}
            className={cn(variant === 'card' && 'space-y-3')}
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className={itemClasses[variant]}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                  {typeof item.answer === 'string' ? (
                    <div
                      className="prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  ) : (
                    item.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}

// FAQ Section with Schema Markup for SEO
interface FAQSectionProps extends ContentAccordionProps {
  schemaId?: string;
}

export function FAQSection({
  items,
  title = 'Frequently Asked Questions',
  schemaId = 'faq-schema',
  ...props
}: FAQSectionProps) {
  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : '',
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ContentAccordion items={items} title={title} variant="card" {...props} />
    </>
  );
}

export default ContentAccordion;
