// Cian Dicker-Hughes
// G00415413

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Content from './components/content';
import SignIn from './components/signIn';
import Profile from './components/Profile'
import Messages from './components/Messages'
import Post from './components/Post';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar /* navbar with routing *//>
      <Routes>
        <Route path="/" element={<Content /> /* The Content page */} />
        <Route path="/signIn" element={<SignIn /> /* The signIn page */} />
        <Route path="/messages" element={<Messages /> /* The Messages page */} />
        <Route path="/profile" element={<Profile /> /* The Profile page */} />
        <Route path="/post" element={<Post /> /* The Profile page */} />
      </Routes>
    </Router>
    
    
  );
}

export default App;