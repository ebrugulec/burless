import "../styles/Dashboard.scss"
import Header from "../components/Layout/Header/Header";
import React from "react";
import Image from "next/image";
import DashboardHeader from "../components/Layout/DashboardHeader";
import Link from "next/link";

export default function Dashboard ({ id }) {
  const dt = new Date();
  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="welcoming-text">
        The easiest way to shorten links from <span>the <br/> address bar,</span> and much more.
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
                src="/text-browser.svg"
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
          Feature and some cool things
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
              src="/long-link-image.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-title">
            Easy to use
          </div>
          <div className="section-content">
            Copy the long url and paste it after burless.com and hit enter. It's that easy and simple.
          </div>
        </div>
      </div>

      <div className="section without-bg">
        <div className="section-content-wrapper">
          <div className="section-title">
            Statistics
          </div>
          <div className="section-content">
            Track each shortened link in real-time. Detailed analytics provides you information about clicks, page referrer and much more. Pretty cool. huh?
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
              src="/login.svg"
              layout="fill"
            />
          </div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-title">
            Access anytime
          </div>
          <div className="section-content">
            You can save your links anonymously, but you must register to access these links later.
          </div>
        </div>
      </div>

      <div className="section without-bg">
        <div className="section-content-wrapper">
          <div className="section-title">
            Stay at link
          </div>
          <div className="section-content">
            It's easy too if you want to shorten the link and stay on the same page. Just write burless.com/s before the link.
          </div>
        </div>
        <div className="section-image-wrapper">
          <div className="section-image">
            <Image
              src="/stay-url-image.svg"
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
            Works every device
          </div>
          <div className="section-content">
            Switching between tabs and devices is no longer necessary. Compatible with smartphones, tablets and desktop.
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <span className="section-title">
          Start using burless
        </span>
        <span className="section-content">
          Add "burless.com/" to the beginning of the any links.
        </span>

        <Link
          href={{
            pathname: '/register',
          }}
        >
          <a>
            <button className="started-button">
              Get Started
            </button>
          </a>
        </Link>
      </div>
      <div className="dashboard-footer-section-img-wrapper">
        <div className="footer-img">
          <Image
            src="/burless-is-more.svg"
            layout="fill"
          />
        </div>
      </div>
      <div className="dashboard-footer">
        <div className="dashboard-footer-menu">
          <a className="menu" target="_blank" href="https://burless.medium.com">About</a>
          <a className="menu" target="_blank" href="https://twitter.com/glcebru">Me</a>
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
