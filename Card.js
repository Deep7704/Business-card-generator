import React from 'react';
import './App.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function Card({ name, Coname, text, email, number, line, cardStyle }) {
  // const handleChange = () => {
  //   const input = document.getElementById('card');

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL('img1/jpg');
  //     const pdf = new jsPDF({
  //       orientation: 'landscape',
  //       unit: 'cm',
  //       format: [10, 6],
  //     });

  //     pdf.addImage(imgData, 'PNG', 0, 0, 10, 6);
  //     pdf.save('business-card.pdf');
  //   });
  // };

  return (
    <div className="body">
      <div id="card" className={`card ${cardStyle}`}>
        <div className="top">
          <div className="name">{name || 'Your Name'}</div>
          <div className="phone">{number || 'Mobile No.'}</div>
        </div>
        <div className="center">
          <div className="company-name">{Coname || 'Company Name'}</div>
          <div className="tagline">{line || 'Tagline'}</div>
        </div>
        <div className="bottom">
          <div className="email">{email || 'Email ID'}</div>
          <div className="address">{text || 'Address'}</div>
        </div>
      </div>
      
      {/* <center>
        <button id="btn1" onClick={handleChange} className="btn btn-primary">Download</button>
      </center> */}
    </div>
  );
}

export default Card;
