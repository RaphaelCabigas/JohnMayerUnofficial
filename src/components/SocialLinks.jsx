import { PiSpotifyLogoFill } from "react-icons/pi";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram, FaItunes } from "react-icons/fa6";

export default function SocialLinks({ socialContainer }) {
  return (
    // Specify which footer class container
    <ul className={socialContainer}>
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
  );
}
