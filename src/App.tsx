import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { AboutPage } from '@/pages/AboutPage';
import { WorkshopsCallPage } from '@/pages/WorkshopsCallPage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/workshops/chamada" element={<WorkshopsCallPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
