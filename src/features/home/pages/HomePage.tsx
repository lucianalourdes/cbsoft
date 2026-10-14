import { Hero } from '@/features/home/components/Hero';
import { AboutSection } from '@/features/home/components/AboutSection';
// import { CallForPapers } from '@/features/calls/components/CallForPapers';
// import { Keynotes } from '@/features/program/components/Keynotes';
// import { Guests } from '@/features/program/components/Guests';
import { LocationSection } from '@/features/venue/components/LocationSection';
// import { Committee } from '@/features/program/components/Committee';
import { Sponsorship } from '@/features/sponsorship/components/Sponsorship';
import { SiteSearch } from '@/features/home/components/SiteSearch';

export function HomePage() {
  return (
    <main id="top">
      <Hero />
      <AboutSection />
      {/* <CallForPapers /> */}
      {/* <Keynotes /> */}
      {/* <Guests /> */}
      <LocationSection />
      {/* <Committee /> */}
      <Sponsorship />
      <SiteSearch />
    </main>
  );
}
