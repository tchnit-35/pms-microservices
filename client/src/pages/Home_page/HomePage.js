import React, {useState} from 'react'

import "./HomePage.css"
import NavigationBar from '../../components/Navbar/Navbar';
import SideMenu from '../../components/Navbar/Sidebar';
import Footer from '../../components/footer/Footer';

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <NavigationBar handleClick={toggleMenu} />
      <SideMenu isOpen={isOpen} />

      <div className="flex-grow-1 the-home-container">

        <div className='part-1 me-5'>
          <div className='mb-2'>
            <span className='the-title'>Inbox</span>
          </div>
          <div className='home-inbox'>
            <p>this is it</p>
          </div>
        </div>

        <div className='part-2'>
          <div className='mb-2'>
            <span className='the-title'>High Pririty Tasks</span>
          </div>
          <div className='home-task'>
            <div>
              <span>Streams</span>

              <span>Public</span>

              <span>Private</span>
            </div>
          </div>
        </div>

      </div>

      <Footer />
      </div>
    </>
  )
}

export default HomePage;