import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
     <section className="public">
     <header>
        <h1>Welcome To <span className='nowrap'>Dan D.Repairs!</span></h1>
     </header>
     <main className="public__main">
     <p>Located in Beautiful Downtown Foo City ,Dan D. Repairs
        Provides a trained staff ready to meet your tech repair needs.
     </p>
     <address className='public__addr'>
      Dan D. Repairs<br/>
      555 Foo Driver<br/>
      Foo City,CA 12345<br/>
      <a href="tel:+155555555555">(555) 555-5555</a>
     </address>
     <br/>
     <p>Owner: Dan Davidson</p>
     </main>
     <footer>
        <Link to="/login">Employee Login</Link>
     </footer>
     </section>
  )
  return content
}

export default Public