import "../styles/Dashboard.scss"
import Header from "../components/Layout/Header/Header";
import React from "react";
import Image from "next/image";

export default function Dashboard ({ id }) {
  const dt = new Date();
  return (
    <div className="dashboard">
      <Header />
      <div className="welcoming-text">
        The best way to create a short links from <br/> <span>the address bar</span> and much more.
      </div>
      <div className="section browser-section">
        <div className="section-wrapper">
          <div className="browser-wrapper">
            <div className="link-bar">
              <div className="browser-left">
                <div className="buttons">
                  <span className="dot red"/>
                  <span className="dot yellow"/>
                  <span className="dot green"/>
                </div>
                <div className="back-forward">
                  <Image src="/back-forward.svg"
                     width={24}
                     height={13}
                  />
                </div>
                <div className="link-area">
                  <div className="link">
                    <span className="burless">burless.com/</span>
                    https://anywebsite.com/your-very-long-url
                  </div>
                  <div className="refresh">
                    <Image
                      src="/refresh.svg"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>

              <div className="new-window-area">
                <div className="plus-wrapper">
                  <Image
                    src="/plus.svg"
                    layout="fill"
                  />
                </div>
                <div className="windows-wrapper">
                  <Image
                    src="/windows.svg"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
            <div className="arrow-image-wrapper">
              <Image
                src="/arrow.svg"
                layout="fill"
              />
            </div>
            <div className="browser-text">
              <Image
                src="/browser-text.svg"
                layout="fill"
              />
            </div>
            <div className="woman">
              <Image
                src="/woman.svg"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section main-title-section">
        <div className="main-title">
          Features and some cool things
          <div className="main-section-image-wrapper">
            <div className="section-image">
              <Image
                src="/line.svg"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>

      {/*<div className="section without-bg">*/}
      {/*  <div className="section-image-wrapper">*/}
      {/*    <div className="section-image">*/}
      {/*      <Image*/}
      {/*        src="/burless-man.svg"*/}
      {/*        layout="fill"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="section-title">*/}
      {/*    Burless is more*/}
      {/*  </div>*/}
      {/*  <div className="section-content">*/}
      {/*    And free to use. Just don't forget to register to avoid losing your links.*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="section image-area-bg">
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/your-link.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-title">
            Easy to use
          </div>
          <div className="section-content">
            Copy the long url and paste it after burless.com and hit enter. It's that easy and simple. (Don't forget to register)
          </div>
        </div>
      </div>

      <div className="section without-bg">
        <div className="section-content-wrapper">
          <div className="section-title">
            Analytics
          </div>
          <div className="section-content">
            Track each shortened link in real-time. Detailed analytics provides you information about clicks, page referrer, devices, browsers, systems, geolocation. Pretty cool. huh?
          </div>
        </div>
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/analytics.svg"
              layout="fill"
            />
          </div>
        </div>
      </div>

      <div className="section image-area-bg">
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/works-everywhere.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-title">
            Works Everywhere
          </div>
          <div className="section-content">
            Switching between tabs and devices is no longer necessary. Compatible with smartphones, tablets and desktop.
          </div>
        </div>
      </div>

      <div className="section without-bg">
        <div className="section-content-wrapper">
          <div className="section-title">
            Stay at URL
          </div>
          <div className="section-content">
            It's easy too if you want to shorten the link and stay on the same page. Just write burless.com/r before the url.
          </div>
        </div>
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/return-url.svg"
              layout="fill"
            />
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <span className="section-title">
          Stop use hard-to-use shoterner apps!
        </span>
        <span className="section-content">
          Add "burless.com/" to the beginning of the any links.
        </span>
        <button className="started-button">
          Get Started
        </button>
      </div>

      <div className="footer">
        <div className="footer-section-img-wrapper">
          <div className="footer-img">
            <Image
              src="/burless-is-more.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="social-links">
          <Image
            src="/twitter.png"
            layout="fill"
          />
        </div>
        <div className="copyright">
          © {dt.getFullYear()} Burless
        </div>
      </div>
    </div>
  )
}
