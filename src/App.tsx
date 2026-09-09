import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
// import { Agenda } from '@/components/sections/Agenda';
import { About } from '@/components/sections/About';
import { Symposia } from '@/components/sections/Symposia';
import { CallForPapers } from '@/components/sections/CallForPapers';
// import { Keynotes } from '@/components/sections/Keynotes';
import { Guests } from '@/components/sections/Guests';
import { Registration } from '@/components/sections/Registration';
import { Location } from '@/components/sections/Location';
import { Committee } from '@/components/sections/Committee';
import { Sponsorship } from '@/components/sections/Sponsorship';

export function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        {/* <Agenda /> */}
        <About />
        <Symposia />
        <CallForPapers />
        {/* <Keynotes /> */}
        <Guests />
        <Registration />
        <Location />
        <Committee />
        <Sponsorship />
      </main>
      <Footer />
    </>
  );
}
