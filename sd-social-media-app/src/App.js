// Cian Dicker-Hughes
// G00415413

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Content from './components/Content';
import SignUp from './components/SignUp';
import Profile from './components/Profile'
import Post from './components/Post';
import EditProfile from './components/EditProfile';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar /* navbar with routing */ />
      <Routes>
        <Route path="/" element={<Content /> /* The Content page */} />
        <Route path="/signUp" element={<SignUp /> /* The SignUp page */} />
        <Route path="/profile" element={<Profile /> /* The Profile page */} />
        <Route path="/post" element={<Post /> /* The Post page */} />
        <Route path="/edit" element={<EditProfile /> /* The Edit Profile page */} />
      </Routes>
    </Router>
  );
}

export default App;