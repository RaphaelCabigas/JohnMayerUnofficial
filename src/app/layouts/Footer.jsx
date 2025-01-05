import { PiSpotifyLogoFill } from "react-icons/pi";
import { FaFacebookSquare, FaYoutubeSquare, FaGithubAlt } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram, FaItunes } from "react-icons/fa6";
import Link from "next/link";
import MarqueeFooter from "../../components/MarqueeFooter";
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
                  <Link href="">MERCH</Link>
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
                John Mayer Unofficial uses images and content solely for
                educational purposes and not for commercial gain. All rights to
                the original content belong to their respective owners.
              </p>
            </div>
          </div>
          <div className="footer_bottom">
            <ul className="footer_social">
              <li>
                <a href="https://www.youtube.com/channel/UCi1mYtUWs0JRkPl6bNVRL_Q">
                  <FaYoutubeSquare title="John Mayer Youtube" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/johnmayer/">
                  <FaFacebookSquare title="John Mayer Facebook" />
                </a>
              </li>
              <li>
                <a href="https://x.com/JohnMayer?prefetchTimestamp=1734254517078">
                  <FaSquareXTwitter title="John Mayer Twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/johnmayer/">
                  <FaSquareInstagram title="John Mayer Instagram" />
                </a>
              </li>
              <li>
                <a href="https://music.apple.com/us/artist/john-mayer/472054">
                  <FaItunes title="John Mayer Apple Music" />
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/artist/0hEurMDQu99nJRq8pTxO14">
                  <PiSpotifyLogoFill title="John Mayer Spotify" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@johnmayer">
                  <AiFillTikTok title="John Mayer Tiktok" />
                </a>
              </li>
            </ul>
            <a
              href="https://www.github.com/RaphaelCabigas"
              className="copyright"
            >
              <FaGithubAlt />
              <span>&copy; Made and Designed by Raphael Cabigas 2024</span>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
