import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocationPage } from '@/pages/LocationPage';
import { Home } from '@/pages/Home';
import { AboutPage } from '@/pages/AboutPage';
import { WorkshopsCallPage } from '@/pages/WorkshopsCallPage';
import { PageMetadata } from '@/components/layout/PageMetadata';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ConductPage } from '@/pages/ConductPage';
import { VolunteersPage } from '@/pages/VolunteersPage';
import { AcceptedPapersPage } from '@/pages/AcceptedPapersPage';
import { PreviousEditionsPage } from '@/pages/PreviousEditionsPage';
import { SymposiumCallPage } from '@/pages/SymposiumCallPage';
import { SYMPOSIA } from '@/data/symposia';
import { SBES_TRACKS } from '@/data/sbesTracks';
import { sbesTrackCallPath, symposiumCallPath } from '@/data/symposiumCalls';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageMetadata />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local" element={<LocationPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/edicoes-anteriores" element={<PreviousEditionsPage />} />
        <Route path="/inscricoes" element={<RegistrationPage />} />
        <Route path="/codigo-de-conduta" element={<ConductPage />} />
        <Route path="/voluntarios" element={<VolunteersPage />} />
        <Route path="/artigos-aceitos" element={<AcceptedPapersPage />} />
        <Route path="/sbes/:track/artigos-aceitos" element={<AcceptedPapersPage />} />
        <Route path="/workshops/chamada" element={<WorkshopsCallPage />} />
        {SYMPOSIA.map(({ id }) => (
          <Route key={id} path={symposiumCallPath(id)} element={<SymposiumCallPage id={id} />} />
        ))}
        {SBES_TRACKS.map(({ id }) => (
          <Route key={id} path={sbesTrackCallPath(id)} element={<SymposiumCallPage id="sbes" track={id} />} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
