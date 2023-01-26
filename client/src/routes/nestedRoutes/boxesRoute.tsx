import { RouteObject } from 'react-router-dom';
import { GiveBoxPage, SettleBoxPage, UnsettledBoxesPage, ListBoxesPage } from '@/pages';
import { InnerLayoutManager } from '@/components';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

const giveBoxPagePath = 'give';
const settleBoxPagePath = 'settle';
const unsettledBoxesPagePath = 'unsettled';

const boxesSubroutes: RouteObject[] = [
  {
    path: giveBoxPagePath,
    element: <GiveBoxPage />,
  },
  {
    path: settleBoxPagePath,
    element: <SettleBoxPage />,
  },
  {
    index: true,
    element: <ListBoxesPage />,
  },
  {
    path: unsettledBoxesPagePath,
    element: <UnsettledBoxesPage />,
  },
];

export const boxesRoute = {
  path: 'boxes',
  element: (
    <ProtectedRoute>
      <InnerLayoutManager
        prefix="/liczymy/boxes"
        excludingLinks={[settleBoxPagePath]}
        links={[
          { url: giveBoxPagePath, label: 'Wydaj puszkę' },
          { url: settleBoxPagePath, label: 'Rozlicz puszkę' },
          { url: '', label: 'Wszystkie puszki' },
          { url: unsettledBoxesPagePath, label: 'Lista puszek nie rozliczonych' },
        ]}
      />
    </ProtectedRoute>
  ),
  children: boxesSubroutes,
};
