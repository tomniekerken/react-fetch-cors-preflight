
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import Blog from './pages/Blog'
import Preflight from './pages/Preflight'

function App() {

  return (
    <>
      <nav>
        <ul className="flex flex-row p-8 gap-x-8 justify-center">
          <li className="text-lg hover:text-sky-500 transition-colors"><Link to="/">Home</Link></li>
          <li className="text-lg hover:text-sky-500 transition-colors"><Link to="/blog">Blog</Link></li>
          <li className="text-lg hover:text-sky-500 transition-colors"><Link to="/preflight">Preflight</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog">
          <Route index element={<Blog />} />
          <Route path=":url" element={<BlogPost />} />
        </Route>

        <Route path="/preflight" element={<Preflight />} />

      </Routes>
    </>
  )
}

export default App
