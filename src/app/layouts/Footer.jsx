import { PiSpotifyLogoFill } from "react-icons/pi";
import { FaFacebookSquare, FaYoutubeSquare, FaGithubAlt } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram, FaItunes } from "react-icons/fa6";
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
                  <Link href="/biography">Biography</Link>
                </li>
                <li>
                  <Link href="/discography">Discography</Link>
                </li>
                <li>
                  <Link href="">TOUR</Link>
                </li>
                <li>
                  <Link href="">Store</Link>
                </li>
              </ul>
            </nav>
            <div className="footer_item">
              <h3>Newsletter</h3>
              <form className="newsletter">
                <label htmlFor="newsletter">Email</label>
                <input
                  type="text"
                  name="newsletter"
                  id="newsletter"
                  placeholder="Email"
                />
                <button type="submit">Sign Up</button>
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
            <span className="copyright">
              &copy; Made and Designed by Raphael Cabigas 2024
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
