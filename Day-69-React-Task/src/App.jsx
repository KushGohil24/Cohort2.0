import React from 'react'

const App = () => {
  return (
    <div>
      <nav>
        <div className="nav1">
          <h2>Horizon Courts</h2>
        </div>
        <div className="nav2">
          <i className="nav-opt">About Us</i>
          <i className="nav-opt">Services</i>
          <i className="nav-opt">Coaches</i>
          <i className="nav-opt">Events</i>
          <i className="nav-opt">Contacts</i>
        </div>
        <div className="nav3">
          <button>Book now</button> <span><i className="ri-arrow-right-up-long-line"></i></span>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-main1">
          <h2>
            Unleash Your Inner Champion Today. All In One Place.
          </h2>
          <h4>Join the ultimate tennnis experience where passion meets Performance, and every swing brings you closer to victory</h4>
          <button>Start your own journey</button>
        </div>
        <div className="hero-main2">
          <div className="left">
            <div className="tagline">Train with real professionals.<br/> Get the real results.</div>
            <div className="professionals">
              <img src="https://images.unsplash.com/photo-1722620195964-2679f3be48ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="professional1" />
              <img src="https://plus.unsplash.com/premium_photo-1713273717222-bcce16fe243e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="professional2" />
              <img src="https://images.unsplash.com/photo-1562070682-b53d9ce08792?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="professional3" />
            </div>
          </div>
          <div className="right">
            <div className="social-media1"><span>Instagram</span> <i className="ri-arrow-right-up-long-line"></i></div>
            <div className="social-media2"><span>Facebook</span> <i className="ri-arrow-right-up-long-line"></i></div>
            <div className="social-media3"><span>Tik Tok</span> <i className="ri-arrow-right-up-long-line"></i></div>
          </div>
        </div>
      </div>
      <section>
        <div className="sec1">
          <div className="first-sec">
            <div className="about">About Horizon</div>
            <div className="about-text">At Horizon, we don't just play tennis - we live it. Since 2021, our club has been a home for players of all levels, from eager beginners to seasoned pros.</div>
          </div>
          <div className="second-sec">
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
