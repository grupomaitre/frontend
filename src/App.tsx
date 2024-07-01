import { Suspense } from 'react';
import AppRouter from './Routes/AppRoutes';
import Overlay from './common/Loading/Overlay';

function App() {

  return (
    <Suspense fallback={<Overlay />}>
      <AppRouter />
    </Suspense>
  )
}

export default App
