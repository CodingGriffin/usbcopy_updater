import { Routes, Route, Navigate } from 'react-router-dom';
import HubContainer from './container';
import OrdersTab from './container/Usbcopy/Orders';
import OrderDetail from './container/Usbcopy/Orders/detail';
import Version from './container/Usbcopy/Versions';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubContainer />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders">
          <Route index element={<OrdersTab />} />
          <Route path=":orderId" element={<OrderDetail />}>
            <Route path=":version_id" element={<Version />}>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
