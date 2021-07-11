import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Opportunities from './pages/Opportunities';
import Genome from './pages/Genome';
import Bios from './pages/Bios';
import Torre from './pages/Torre';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/opportunities" replace /> },
        { path: 'me', element: <Genome /> },
        { path: 'opportunities', element: <Opportunities /> },
        { path: 'bios', element: <Bios /> },
        { path: 'bios/:user', element: <Genome /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Torre /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
