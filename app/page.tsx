import QueryBox from '../components/QueryBox';
import Drawer from '../components/Drawer';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-blue-700 relative">
      <h1 className="text-4xl font-bold text-white text-center mt-16">Gemini AI Companion</h1>
      <Drawer />
      <QueryBox />
    </div>
  );
}
