import { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import TrendDashboard from './components/TrendDashboard';
import ContentGenerator from './components/ContentGenerator';
import ReviewQueue from './components/ReviewQueue';
import InternalBriefGenerator from './components/InternalBriefGenerator';
import Analytics from './components/Analytics';

type View = 'trends' | 'generate' | 'review' | 'internal' | 'analytics';

function App() {
  const [currentView, setCurrentView] = useState<View>('trends');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'trends' as View, name: 'Trend Detection', icon: TrendingUp, color: 'text-purple-600' },
    { id: 'generate' as View, name: 'Content Generator', icon: Sparkles, color: 'text-blue-600' },
    { id: 'review' as View, name: 'Review Queue', icon: CheckCircle, color: 'text-green-600' },
    { id: 'internal' as View, name: 'Internal Briefs', icon: FileText, color: 'text-orange-600' },
    { id: 'analytics' as View, name: 'Analytics', icon: BarChart3, color: 'text-pink-600' }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'trends':
        return <TrendDashboard />;
      case 'generate':
        return <ContentGenerator />;
      case 'review':
        return <ReviewQueue />;
      case 'internal':
        return <InternalBriefGenerator />;
      case 'analytics':
        return <Analytics />;
      default:
        return <TrendDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-beiersdorf-blue to-beiersdorf-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Science Content Ecosystem</h1>
                <p className="text-xs text-gray-500">Beiersdorf AI-Powered Platform</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex gap-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-beiersdorf-blue text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                    currentView === item.id
                      ? 'bg-beiersdorf-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderView()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Beiersdorf AG. Science-to-Content Ecosystem Prototype.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-beiersdorf-blue transition">Documentation</a>
              <a href="#" className="hover:text-beiersdorf-blue transition">API</a>
              <a href="#" className="hover:text-beiersdorf-blue transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
