import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <img src="src/assets/img/loeffelgruen_logo_black.svg" alt="logo" />
        <h2>Löffelgrün</h2>
      </div>
      <div className="social_media">
        <p>Social Media</p>
        <div className="all_icons">
          <div className="icon">
            <a href="https://github.com/MonaEis" target="_blank" ><img src="src/assets/img/YT.png" alt="YouTube" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"><img src="src/assets/img/Twitter.png" alt="Twitter" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"><img src="src/assets/img/instagram.png" alt="Instagram" /></a>
          </div>
          <div className="icon">
          <a href="https://github.com/MonaEis" target="_blank"> <img src="src/assets/img/Pinterest.png" alt="Pinterest" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
