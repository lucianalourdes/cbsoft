import { Hero } from '@/components/sections/Hero';
import { Agenda } from '@/components/sections/Agenda';
import { About } from '@/components/sections/About';
import { CallForPapers } from '@/components/sections/CallForPapers';
// import { Keynotes } from '@/components/sections/Keynotes';
// import { Guests } from '@/components/sections/Guests';
import { Registration } from '@/components/sections/Registration';
import { Location } from '@/components/sections/Location';
import { Committee } from '@/components/sections/Committee';
import { Sponsorship } from '@/components/sections/Sponsorship';

export function Home() {
  return (
    <main id="top">
      <Hero />
      <Agenda />
      <About />
      <CallForPapers />
      {/* <Keynotes /> */}
      {/* <Guests /> */}
      <Registration />
      <Location />
      {/* <Committee /> */}
      <Sponsorship />
    </main>
  );
}
