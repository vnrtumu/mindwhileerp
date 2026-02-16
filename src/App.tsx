import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import './css/globals.css';
import { ThemeProvider } from './components/provider/theme-provider';
import { StudentProvider } from './context/StudentContext';
import { AcademicsProvider } from './context/AcademicsContext';
import { FeeProvider } from './context/FeeContext';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StudentProvider>
          <AcademicsProvider>
            <FeeProvider>
              <RouterProvider router={router} />
            </FeeProvider>
          </AcademicsProvider>
        </StudentProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
