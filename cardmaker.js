/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import back from './back.png';


function App() {
  const [name, setName] = useState('');
  const [Coname, setCoName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [line, setLine] = useState('');
  const [errors, setErrors] = useState({});
  const [cardStyle, setCardStyle] = useState('card-format1');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/\.\./.test(email) && email.includes('.');
  const isValidNumber = /^[1-9]\d{9}$/.test(number) && !/^(.)\1*$/.test(number);
  const isValidName = /^[a-zA-Z\s]+$/.test(name) && name.length >= 3 && !/^(.)\1{2,}$/.test(name);
  const isValidCoName = /^[a-zA-Z\s]+$/.test(Coname) && Coname.length >= 3 && !/^(.)\1{2,}$/.test(Coname);

  const handleName = async (event) => {
    const value = event.target.value;
    setName(value);
    if (!/^[a-zA-Z\s]+$/.test(value) || value.length < 3 || /^(.)\1{2,}$/.test(value)) {
      setErrors((prev) => ({ ...prev, name: 'Invalid name. It should contain only alphabets, be at least 3 characters long, and not consist of repeated characters.' }));
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
      try {
        const response = await axios.get(`http://localhost:5000/api/cards/${value}`);
        if (response.data) {
          const { Coname, number, email, text, line } = response.data;
          setCoName(Coname);
          setNumber(number);
          setEmail(email);
          setText(text);
          setLine(line);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  };

  const handleCoName = (event) => {
    const value = event.target.value;
    setCoName(value);
    if (!/^[a-zA-Z\s]+$/.test(value) || value.length < 3 || /^(.)\1{2,}$/.test(value)) {
      setErrors((prev) => ({ ...prev, Coname: 'Invalid company name. It should contain only alphabets, be at least 3 characters long, and not consist of repeated characters.' }));
    } else {
      setErrors((prev) => ({ ...prev, Coname: null }));
    }
  };

  const handleNumber = async(event) => {
    const value = event.target.value;
    setNumber(value);
    if (!/^[1-9]\d{9}$/.test(value) || /^(.)\1*$/.test(value)) {
      setErrors((prev) => ({ ...prev, number: 'Invalid phone number. It should be 10 digits, cannot start with 0, and cannot be composed of repeated digits.' }));
    } else {
      setErrors((prev) => ({ ...prev, number: null }));
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/${value}`);
      if (response.data) {
        const { Coname, name, email, text, line } = response.data;
        setCoName(Coname);
        setNumber(name);
        setEmail(email);
        setText(text);
        setLine(line);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /\.\./.test(value) || !value.includes('.')) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address.' }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleLine = (event) => {
    setLine(event.target.value);
  };

  const handleSubmit = async () => {
    const input = document.getElementById('card');

    if (isValidName && isValidCoName && isValidNumber && isValidEmail) {
      try {
        await axios.post('http://localhost:5000/api/cards', {
          name,
          Coname,
          number,
          email,
          text,
          line,
        });
        alert('Data saved successfully!');
      } catch (error) {
        alert('Error saving data');
      }
    } else {
      alert('Please correct the errors before submitting.');
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('img1/jpg');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'cm',
        format: [10, 6],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 10, 6);
      pdf.save('business-card.pdf');
    });
  };
  const handleScrollToFooter = () => {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" id='title'>Card Epic</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" id='home' aria-current="page" href="#" >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id='home' aria-current="page" href="#"onClick={handleScrollToFooter}>Contact</a>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
    <center><h2 id='head'><img id="img3" alt=''></img>CARD EPIC<br/></h2></center>
 <h4>Let's Create Your Business-Card...</h4>
    <img className='back' src={back} alt="Logo" />
    <section id='section'>
      <h3><u>Let's Fill up the form and <br/>Generate your card</u></h3>
      </section>
    <div className="row">
    

      <div className="col-md-6">
        <center>
          <div className="form">
            <center>
              <h1>Enter Your Details here</h1>
            </center>
            <select onChange={(e) => setCardStyle(e.target.value)} value={cardStyle} className="form-control">
              <option value="card-format1">Card Format 1</option>
              <option value="card-format2">Card Format 2</option>
              <option value="card-format3">Card Format 3</option>
              <option value="card-format4">Card Format 4</option>
              {/* Add options for other card formats here... */}
            </select>
            <br />
            <input type="text" onChange={handleName} value={name} id='pass' className="form-control" placeholder="Owner Name" />
            {errors.name && <p className="error">{errors.name}</p>}
            <br />
            <input type="text" onChange={handleCoName} value={Coname} className="form-control" placeholder="Company name" />
            {errors.Coname && <p className="error">{errors.Coname}</p>}
            <br />
            <input type="text" onChange={handleNumber} value={number} className="form-control" placeholder="Mobile no." />
            {errors.number && <p className="error">{errors.number}</p>}
            <br />
            <input type="text" onChange={handleEmail} value={email} className="form-control" placeholder="Email id" />
            {errors.email && <p className="error">{errors.email}</p>}
            <br />
            <input type="text" onChange={handleLine} value={line} className="form-control" placeholder="Tagline" />
            <br />
            <textarea onChange={handleText} value={text} className="form-control" id="exampleFormControlTextarea1" placeholder='Address' rows="3"></textarea>
            <br />
            <button onClick={handleSubmit} className="btn btn-primary">Download Now!</button>
          </div>
        </center>
      </div>

      <div className="col-md-6">
        <Card name={isValidName ? name : ''} email={isValidEmail ? email : ''} Coname={isValidCoName ? Coname : ''} line={line} text={text} number={isValidNumber ? number : ''} cardStyle={cardStyle} />
      </div>
    </div>

{/* <footer>
  <p>Deep Soni &copy; 2024  @CARD EPIC. All rights reserved.</p>
</footer> */}
<footer id='footer'> 
        <div class="waves">
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div>
        </div>
        <ul class="social_icon">
            <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
            {/* <li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li> */}
            <li><a href="https://www.instagram.com/deep_0707__?igsh=MWVlODcyNnpobDdtMw=="><ion-icon name="logo-instagram"></ion-icon></a></li>
            <li><a href="https://www.linkedin.com/in/deep-mandaliya-0a13b8277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><ion-icon name="logo-linkedin"></ion-icon></a></li>
        </ul>
        {/* <ul class="menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="/contact.js">Contact</a></li>
         </ul> */}
         <p>©2024 DS Card Epic || All rights are reserved </p>
    </footer>

    </>
  );
}

export default App;
