import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './Home';
import About from './About';
import Mission from './Mission';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/our-mission" element={<Mission />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
