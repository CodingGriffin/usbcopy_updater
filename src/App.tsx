import { Routes, Route, Navigate } from 'react-router-dom';
import HubContainer from './container';
import VendorOrdersTab from './container/Vendor/Orders';
import VendorOrderDetail from './container/Vendor/Orders/detail';
import VendorVersionContainer from './container/Vendor/Versions';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubContainer />}>
        <Route index element={<Navigate to="vendor" replace />} />
        <Route path="vendor">
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders">
            <Route index element={<VendorOrdersTab />} />
            <Route path=":orderId" element={<VendorOrderDetail />}>
              <Route path=":version_id" element={<VendorVersionContainer />}>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
