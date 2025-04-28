// Cian Dicker-Hughes
// G00415413

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Content from './components/Content';
import SignIn from './components/SignIn';
import Profile from './components/Profile'
import Messages from './components/Messages'
import Post from './components/Post';
import EditProfile from './components/EditProfile';
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
        <Route path="/post" element={<Post /> /* The Post page */} />
        <Route path="/edit" element={<EditProfile /> /* The Edit Profile page */} />
      </Routes>
    </Router>
  );
}

export default App;