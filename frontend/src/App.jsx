import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Fotter';
import Home from './pages/Home';
import File from './pages/File';
import Text from './pages/Text';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<File />} />
          <Route path="/text" element={<Text />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
