import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PAGES } from 'src/helpers/Pages';
import { Loader } from './components';
import { AppLayout } from './components/Layouts';

const MainPage = lazy(() => import('./pages/MainPage'));
const ListPage = lazy(() => import('./pages/ListPage'));

function App() {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={PAGES.HOME} element={<MainPage />} />
            <Route path={PAGES.HISTORY} element={<ListPage />} />
            <Route path="*" element={<Navigate replace to={PAGES.HOME} />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
}

export default App;
