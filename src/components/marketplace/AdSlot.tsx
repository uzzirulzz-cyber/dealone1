'use client';

import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/seo';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  /** Slot ID from SITE.adsenseSlots */
  slotKey: keyof typeof SITE.adsenseSlots;
  /** Visual format — controls the data-ad-format attribute */
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'fluid';
  /** Whether the ad should be responsive */
  responsive?: boolean;
  /** Optional className for the wrapper */
  className?: string;
  /** Optional label to show above the ad (e.g. "Advertisement") */
  showLabel?: boolean;
}

/**
 * Google AdSense ad unit component.
 *
 * USAGE:
 *   <AdSlot slotKey="homeFeatured" />
 *   <AdSlot slotKey="blogPostMid" format="horizontal" showLabel />
 *
 * NOTE: Until you replace the placeholder slot IDs in src/lib/seo.ts with
 * real ad slot IDs from your AdSense dashboard, ads will not display.
 * Google's crawler also needs to first approve your site before ads serve.
 */
export function AdSlot({
  slotKey,
  format = 'auto',
  responsive = true,
  className,
  showLabel = true,
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const slotId = SITE.adsenseSlots[slotKey];

  useEffect(() => {
    // Push the ad to AdSense after the ins element mounts.
    // AdSense's adsbygoogle.js reads the data-* attributes and fills the slot.
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error - adsbygoogle is injected by the AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // AdSense can throw if the script hasn't loaded yet, or if the slot
      // is unfilled. We fail silently — the page still renders fine.
      if (process.env.NODE_ENV === 'development') {
        console.debug('[AdSlot] AdSense push failed for slot', slotKey, err);
      }
    }
  }, [slotKey]);

  return (
    <div
      className={cn(
        'my-8 w-full',
        className,
      )}
      aria-label="Advertisement"
    >
      {showLabel && (
        <div className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-1.5 font-semibold">
          Advertisement
        </div>
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 min-h-[90px] flex items-center justify-center">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={SITE.adsenseClient}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
