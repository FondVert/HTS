import Link from 'next/link'
import { useState, useEffect } from "react"

export default function Register() {
	const [formData, updateFormData] = useState()
	const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }
	const handleSubmit = (e) => {
		e.preventDefault()
		fetch("http://localhost:5000/register", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)
			if(data.succefull==true) {
				console.log("Success")
			}
		})
	}
  return (
    <>
      <form onSubmit={handleSubmit}>
				<input name="name" type="text" placeholder='Name' onChange={handleChange}/>
				<input name="username" type="text" placeholder='Username' onChange={handleChange}/>
				<input name="password" type="password" placeholder='Password' onChange={handleChange}/>
				<input type="submit" />
			</form>
    </>
  )
}