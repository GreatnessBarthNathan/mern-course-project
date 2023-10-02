import React from "react"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import { Logo } from "../components"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby banh mi vibecession plaid, XOXO fashion axe poke godard
            vice paleo tofu enamel pin chartreuse solarpunk swag hella. Blue
            bottle kombucha la croix vice jawn franzen. Tumeric gastropub cronut
            8-bit kickstarter, green juice flannel pabst ugh ascot artisan
            before they sold out. Hot chicken Brooklyn deep
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
