export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background-color: #0d0d0d;
          color: #ffffff;
          font-family: Inter, sans-serif;
          width: 100%;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 48px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          text-align: center;
        }

        .footer-brand-text {
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.7;
          max-width: 240px;
          margin: 0 auto;
        }

        .footer-brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .footer-brand-name {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .footer-col-heading {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .footer-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          line-height: 1.6;
          display: block;
          margin-bottom: 12px;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #2979FF;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background-color: #1f1f1f;
          margin: 48px 0 24px;
        }

        .footer-copyright {
          color: #6b7280;
          font-size: 13px;
          text-align: center;
        }

        /* Tablet: 2-column */
        @media (max-width: 860px) {
          .footer-inner {
            padding: 48px 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .footer-brand-col {
            grid-column: 1 / -1;
          }
        }

        /* Mobile: single column */
        @media (max-width: 520px) {
          .footer-inner {
            padding: 40px 24px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-brand-col {
            grid-column: auto;
          }

          .footer-brand-text {
            max-width: 100%;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand-col">
              <div className="footer-brand-logo">
                <AppasaurusLogo />
                <span className="footer-brand-name">Appasaurus</span>
              </div>
              <p className="footer-brand-text">
                Appasaurus is an unlimited app design and development service with a low fixed
                monthly subscription fee and a 15 day money-back guarantee.
              </p>
            </div>

            {/* Our Service */}
            <div>
              <p className="footer-col-heading">Our Service</p>
              {["About us", "Our Work", "Pricing", "Help Center", "Login"].map((item) => (
                <a key={item} href="#" className="footer-link">{item}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <p className="footer-col-heading">Company</p>
              {["Terms of Use", "Contact Us"].map((item) => (
                <a key={item} href="#" className="footer-link">{item}</a>
              ))}
            </div>

            {/* Follow Us */}
            <div>
              <p className="footer-col-heading">Follow Us</p>
              {["Facebook", "LinkedIn", "Instagram", "Dribbble"].map((item) => (
                <a key={item} href="#" className="footer-link">{item}</a>
              ))}
            </div>
          </div>

          <div className="footer-divider" />

          <p className="footer-copyright">
            © {new Date().getFullYear()} Appasaurus. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function AppasaurusLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#2979FF" />
      <path
        d="M8 22 Q8 14 14 12 Q18 10 22 12 L24 10 L22 14 Q26 16 24 20 Q22 24 16 24 Q10 24 8 22Z"
        fill="white"
      />
      <circle cx="18" cy="15" r="1.5" fill="#2979FF" />
      <path
        d="M20 19 Q18 21 16 20"
        stroke="#2979FF"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
