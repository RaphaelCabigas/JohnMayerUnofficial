import { FaGithubAlt } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Link from "next/link";
import MarqueeFooter from "../../components/MarqueeFooter";
import SocialLinks from "@/src/components/SocialLinks";

export default function Footer() {
  return (
    <>
      <MarqueeFooter />
      <div className="footer_container">
        <footer>
          <div className="footer_top">
            <nav className="footer_item">
              <h3>Navigation</h3>
              <ul className="footer_nav">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/discography">Discography</Link>
                </li>
                <li>
                  <a
                    href="https://www.ticketmaster.com/john-mayer-tickets/artist/770494"
                    target="_blank"
                  >
                    TOUR
                  </a>
                </li>
                <li>
                  <a href="https://johnmayerstore.com/" target="_blank">
                    Store
                  </a>
                </li>
              </ul>
            </nav>
            <div className="footer_item">
              <h3>Newsletter</h3>
              <form className="newsletter">
                <label htmlFor="newsletter">Email Address</label>
                <input
                  type="text"
                  name="newsletter"
                  id="newsletter"
                  placeholder="jm@unofficial.com"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="footer_item">
              <h3>Copyright</h3>
              <p className="purposes">
                John Mayer Unofficial uses images, content, and information
                solely for educational project purposes and not for commercial
                gain. All rights to the original content belong to their
                respective owners.
              </p>
            </div>
          </div>
          <div className="footer_bottom">
            <SocialLinks socialContainer={"footer_social"} />
            <a
              href="https://docs.google.com/document/d/1jEYmLIXJ96d1wI0FYcjuPneFTtmwG0MlMnq_9wptnIA/edit?tab=t.0"
              target="_blank"
              className="footer_acknowledgements"
            >
              <IoInformationCircle />
              Additional Acknowledgements
            </a>
            <a
              href="https://www.github.com/RaphaelCabigas"
              target="_blank"
              className="copyright"
            >
              <FaGithubAlt />
              &copy; Made and Designed by Raphael Cabigas 2025
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
