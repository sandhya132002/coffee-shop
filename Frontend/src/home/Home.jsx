import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashbord from '../component/dash/Dashbord'
import Footer from '../component/footer/Footer'
import Navbar from '../component/nav/Navbar'
import Cart from '../component/cart/Cart'
import Contact from '../component/contact/Contact'
import AdminPanel from '../component/admin/AdminPanel'
import CustomerReviews from '../component/review/CustomerReviews'


function Home() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/messages/message')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  }, []);

  return (

    <div>

      <Navbar />
      <main>
        <Dashbord />
        
        <Cart />
        <AdminPanel />
        <Contact />
        <CustomerReviews />

      </main>

      <Footer />
    </div>


  )
}

export default Home
