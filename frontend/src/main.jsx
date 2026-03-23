import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'sonner'
import App from './App.jsx'
import './index.css'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_ID_CLIENT;

if (!GOOGLE_CLIENT_ID) {
  console.error("Error: VITE_OAUTH_ID_CLIENT no está definido en el archivo .env");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, 
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Toaster richColors position="top-right" closeButton />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)