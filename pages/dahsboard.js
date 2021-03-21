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
      <div className="section">
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

      <div className="section">
        <div className="main-title">
          The new standard for your links and link analytics
        </div>
      </div>

      {/*<div className="section">*/}
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
        <div className="section-title">
          Easy to use
        </div>
      </div>

      <div className="section">
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/analytics.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-title">
          Analytics
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
        <div className="section-title">
          Works Everywhere
        </div>
      </div>

      <div className="section">
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/return-url.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-title">
          Return to URL
        </div>
      </div>

      <div className="bottom-section">
        <span className="section-title">
          Stop copy-pasting URLs!
        </span>
        <span className="section-content">
          or try it out! go prepend "burless.com/" to a URL
        </span>
        <button className="started-button">
          Get Started
        </button>
      </div>

      <div className="section footer">
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
