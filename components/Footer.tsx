import { contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="visit" className="site-footer">
        <div className="footer-contact">
          <div><span>Find us</span><address>{contact.address[0]}<br />{contact.address[1]}</address><a href={contact.mapsUrl} target="_blank" rel="noreferrer">Get directions ↗</a></div>
          <div><span>Hours</span><p>{contact.hours[0]}<br />{contact.hours[1]}</p></div>
          <div><span>Contact</span><a href={contact.phoneHref}>{contact.phone}</a><a href={contact.instagramUrl} target="_blank" rel="noreferrer">{contact.instagram}</a></div>
        </div>
        <div className="footer-top"><span className="footer-wordmark">DIMERA</span><p>The beauty atelier<br />JVC, Dubai</p></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Dimera</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
