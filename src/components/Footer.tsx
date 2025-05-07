import "../styles/footer.css";
import logoImg from "../assets/img/loeffelgruen_logo_black.svg";
import ytLogo from "../assets/img/YT.png";
import twitterLogo from "../assets/img/Twitter.png";
import instaLogo from "../assets/img/instagram.png";
import pinterestLogo from "../assets/img/pinterest.png";

const Footer = () => {
  return (
    <footer>
      <a href="#start">
      <div className="logo">
        <img src={logoImg} alt="logo" />
        <h2>Löffelgrün</h2>
      </div>

      </a>
      <div className="social_media">
        <p>Social Media</p>
        <div className="all_icons">
          <div className="icon">
            <a href="https://github.com/MonaEis" target="_blank" ><img src={ytLogo} alt="YouTube" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"><img src={twitterLogo} alt="Twitter" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"><img src={instaLogo} alt="Instagram" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"> <img src={pinterestLogo} alt="Pinterest" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
