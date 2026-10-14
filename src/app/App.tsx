import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/features/layout/components/Header';
import { Footer } from '@/features/layout/components/Footer';
import { LocationPage } from '@/features/venue/pages/LocationPage';
import { HomePage } from '@/features/home/pages/HomePage';
import { AboutPage } from '@/features/about/pages/AboutPage';
import { WorkshopsCallPage } from '@/features/calls/pages/WorkshopsCallPage';
import { PageMetadata } from '@/features/layout/components/PageMetadata';
import { RegistrationPage } from '@/features/registration/pages/RegistrationPage';
import { ConductPage } from '@/features/conduct/pages/ConductPage';
import { VolunteersPage } from '@/features/calls/pages/VolunteersPage';
import { AcceptedPapersPage } from '@/features/papers/pages/AcceptedPapersPage';
import { PreviousEditionsPage } from '@/features/previous-editions/pages/PreviousEditionsPage';
import { ROUTES } from '@/shared/constants/routes';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageMetadata />
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.venue} element={<LocationPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.previousEditions} element={<PreviousEditionsPage />} />
        <Route path={ROUTES.registration} element={<RegistrationPage />} />
        <Route path={ROUTES.conduct} element={<ConductPage />} />
        <Route path={ROUTES.volunteers} element={<VolunteersPage />} />
        <Route path={ROUTES.acceptedPapers} element={<AcceptedPapersPage />} />
        <Route path={ROUTES.sbesTrackPapers} element={<AcceptedPapersPage />} />
        <Route path={ROUTES.workshopsCall} element={<WorkshopsCallPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
