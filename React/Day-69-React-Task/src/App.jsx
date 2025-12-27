import React from "react";

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
          <button>Book now</button>{" "}
          <span>
            <i className="ri-arrow-right-up-long-line"></i>
          </span>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-main1">
          <h2>Unleash Your Inner Champion Today. All In One Place.</h2>
          <h4>
            Join the ultimate tennnis experience where passion meets
            Performance, and every swing brings you closer to victory
          </h4>
          <button>Start your own journey</button>
        </div>
        <div className="hero-main2">
          <div className="left">
            <div className="tagline">
              Train with real professionals.
              <br /> Get the real results.
            </div>
            <div className="professionals">
              <img
                src="https://images.unsplash.com/photo-1722620195964-2679f3be48ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="professional1"
              />
              <img
                src="https://plus.unsplash.com/premium_photo-1713273717222-bcce16fe243e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="professional2"
              />
              <img
                src="https://images.unsplash.com/photo-1562070682-b53d9ce08792?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="professional3"
              />
            </div>
          </div>
          <div className="right">
            <div className="social-media1">
              <span>Instagram</span>{" "}
              <i className="ri-arrow-right-up-long-line"></i>
            </div>
            <div className="social-media2">
              <span>Facebook</span>{" "}
              <i className="ri-arrow-right-up-long-line"></i>
            </div>
            <div className="social-media3">
              <span>Tik Tok</span>{" "}
              <i className="ri-arrow-right-up-long-line"></i>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="sec1">
          <div className="first-sec">
            <div className="about">About Horizon</div>
            <div className="about-text">
              At Horizon, we don't just play tennis - we live it. Since 2021,
              our club has been a home for players of all levels, from eager
              beginners to seasoned pros.
            </div>
          </div>
          <div className="second-sec">
            <div className="card">
              <div className="first"></div>
              <div className="second">
                <span>Professional hard courts</span> with tournament-grade
                lighting & climate control -play in{" "}
                <span>perfect conditions, in any season.</span>
              </div>
              <div className="third">
                <div className="toggleContainer">
                  <div className="button"></div>
                </div>
                <div className="mode">Game Mode</div>
              </div>
            </div>
            <div className="card card2">
              <div className="desc">Private & Group Lessons</div>
            </div>
            <div class="card card3">
              <div class="proText">
                <h3>100+</h3>
                <h4>Pro Coaches</h4>
                <p>
                  Certified professionals ready to boost your game from first
                  serve to tournment level.
                </p>
              </div>
              <div class="levels">
                <div class="level">
                  <p>Beginner</p>
                  <div class="points">
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                  </div>
                  <p>55</p>
                </div>
                <div class="level">
                  <p>Intermediate</p>
                  <div class="points">
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                  </div>
                  <p>40</p>
                </div>
                <div class="level">
                  <p>Advanced</p>
                  <div class="points">
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                  </div>
                  <p>35</p>
                </div>
              </div>
            </div>
          </div>
          <div className="third-sec">
            <div className="third-tagline">A few more facts about us in numbers</div>
            <div className="number-sec">
              <div className="data-container">
                <h2>12 000+</h2>
                <p>Hours of play annually</p>
              </div>
              <div className="data-container">
                <h2>89%</h2>
                <p>Player Retention Rate</p>
              </div>
              <div className="data-container">
                <h2>1,200+</h2>
                <p>Active Members</p>
              </div>
              <div className="data-container">
                <h2>125+</h2>
                <p>Annual Tournaments</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="main-sec2">
          <div className="services">
            <div className="logo-text">Services</div>
            <h3 className="services-desc">Explore our full range of coaching. training, and tennis experiences. From first serve to match point - we've got the right program for you.</h3>
            <div className="button">Explore More <i className="ri-arrow-right-up-long-line"></i></div>
          </div>
          <div className="training">
            <div className="desc-top">Training Programs</div>
            <div className="bottom">
              <div className="training-txt">Program designed for all ages and abilities.</div>
              <button><i className="ri-arrow-right-up-long-line"></i></button>
            </div>
          </div>
          <div className="court-access">
            <div className="wrapper">
              <div className="access-top">Court Access</div>
              <div className="access-bottom">Hourly Court Rental</div>
            </div>
            <div className="bottom">
              <div className="access-text">Step into a space built for players - to grow, complete, and thrive</div>
              <div className="access-btn">
                <i class="ri-arrow-left-long-line"></i>
                <i class="ri-arrow-right-long-line"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
