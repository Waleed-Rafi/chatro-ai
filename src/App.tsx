
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Import your existing screens
import Index from '@/screens/Index'
import Auth from '@/screens/Auth'
import ImageGeneration from '@/screens/ImageGeneration'
import Pricing from '@/screens/Pricing'
import Support from '@/screens/Support'
import NotFound from '@/screens/NotFound'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/image-generation" element={<ImageGeneration />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
