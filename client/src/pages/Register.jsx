import React from "react"
import { Form, redirect, Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo, FormRow, SubmitBtn } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post("/auth/register", data)
    toast.success("Registration successful")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
  // console.log(data)
}

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='Name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' labelText='location' />
        <FormRow type='email' name='email' labelText='email' />
        <FormRow type='password' name='password' labelText='password' />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
