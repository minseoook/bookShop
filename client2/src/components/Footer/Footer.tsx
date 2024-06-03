import styled from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styled.container}>
      <div className={styled.info}>
        <p>&copy; 2024 북마켓. All rights reserved.</p>
      </div>
      <div className={styled.links}>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <div className={styled.socials}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/cute-clipart/64/facebook.png"
            alt="Facebook"
            className={styled.socialIcon}
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/cute-clipart/64/twitter.png"
            alt="Twitter"
            className={styled.socialIcon}
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styled.socialIcon}
            src="https://img.icons8.com/color/48/instagram-new--v1.png"
            alt="instagram-new--v1"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
