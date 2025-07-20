# USB Copy Pro - Management Dashboard

A React-based web application for managing USB copy orders, diagnostics, and file uploads. This application provides a comprehensive interface for tracking orders, managing file versions across different operating systems, and handling customer diagnostics.

## 🚀 Features

### Order Management
- **Order Tracking**: View and manage USB copy orders with detailed status tracking
- **Job Status Filtering**: Filter orders by job status (active, completed, on-hold)
- **Order Details**: Comprehensive order information including job numbers, dates, and configurations

### Version Management
- **Multi-OS Support**: Manage file versions for Windows and Mac operating systems
- **File Upload**: Upload and manage files for different OS versions
- **Version Control**: Track multiple versions of files with detailed metadata
- **File Operations**: Delete, rename, and organize uploaded files

### Diagnostics System
- **Customer Diagnostics**: Collect and manage customer diagnostic information
- **Issue Tracking**: Track customer issues with detailed descriptions and metadata
- **Device Information**: Capture VID, PID, serial numbers, and browser information
- **Support Integration**: Generate support codes and track resolution status

### File Upload System
- **Multi-Provider Support**: Integration with cloud storage providers:
  - Google Drive
  - Dropbox
  - OneDrive
  - Box
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload progress monitoring
- **File Validation**: Automatic file type and size validation

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Redux + Redux Saga** - State management and side effects
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend Integration
- **Express.js** - Proxy server for API requests
- **Axios** - HTTP client for API communication
- **CORS** - Cross-origin resource sharing support

### File Upload
- **Uppy** - Modular file uploader with cloud provider integrations
- **TUS** - Resumable file upload protocol

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd usbcopy_updating
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
VITE_SERVER_BASE_URL=your_api_base_url
```

## 🚀 Development

### Start Development Server
```bash
# Start frontend development server
npm run dev

# Start backend proxy server
npm run server

# Start both frontend and backend concurrently
npm run dev:all
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend Proxy: `http://localhost:3001`

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── component/           # Reusable UI components
│   ├── HeaderComponent.tsx
│   ├── TabNavComponent.tsx
│   └── UppyUploader.tsx
├── container/          # Container components with business logic
│   └── Usbcopy/
│       └── Orders/
├── page/              # Page components
│   └── Usbcopy/
│       ├── DiagnosticsTable.tsx
│       ├── UpdatesTable.tsx
│       ├── OrdersDetail.tsx
│       └── UploadModal.tsx
├── states/            # Redux state management
│   ├── Orders/
│   ├── UsbCopyUpdates/
│   ├── reducer.tsx
│   ├── saga.tsx
│   └── store.tsx
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and configurations
└── App.tsx           # Main application component
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite for development and building. Key configurations:
- React plugin for JSX support
- Lucide React optimization
- Development server on port 5173

### Tailwind CSS
Configured with PostCSS for utility-first styling with dark mode support.

### ESLint
Configured with React and TypeScript rules for code quality.

## 🌐 API Integration

The application integrates with a PHP backend through a proxy server:
- **Proxy Endpoint**: `/proxy`
- **Target Server**: `https://everyusb.info`
- **API Class**: `class.usbCopyPro.php`

### Key API Operations
- `getOrders` - Fetch order listings
- `getOrder` - Fetch individual order details
- `getUpdates` - Fetch file updates for orders
- `getDiagnostics` - Fetch diagnostic information
- `addUpdate` - Upload new file versions
- `deleteUpdate` - Remove file versions

## 🎨 UI/UX Features

### Dark Mode Support
- System preference detection
- Manual toggle functionality
- Consistent theming across components

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🔒 Security Considerations

- CORS configuration for secure cross-origin requests
- File upload validation and sanitization
- Secure API proxy implementation
- Environment variable protection

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For technical support or questions, please contact the development team or create an issue in the project repository.
