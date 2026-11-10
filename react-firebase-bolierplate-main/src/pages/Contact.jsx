import React from 'react';
import './Contact.css'

const Contact = () => {
  return (
    
    <>
     <div className="input">
    <input type='text' placeholder='Your Name'/>
    
    <input type='text' placeholder='Your Email'/>
    <textarea rows="4" placeholder='Your Message or Queries'></textarea>

    <button>Send Message</button>
  <p>📍 A secret lair beneath a haunted thrift store in the heart of Nowhere, Earth.</p>
  <p>✉️ Email: skull.style@Akhil's Trendszz.fake</p>
  </div>

  </>
   
  );
  
}

export default Contact;
