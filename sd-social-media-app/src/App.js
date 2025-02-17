import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Content from './components/content';
import SignIn from './components/signIn';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar /* navbar with routing *//>
      <Routes>
        <Route path="/" element={<Content /> /* The Content page */} />
        <Route path="/signIn" element={<SignIn /> /* The Content page */} />
      </Routes>
    </Router>
    
    
  );
}

export default App;
