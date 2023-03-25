import Link from 'next/link'
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import Router from "next/router";

export default function Login() {
	const [cookie, setCookie] = useCookies([""])
	const [formData, updateFormData] = useState()
	const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }
	const handleSubmit = (e) => {
		e.preventDefault()
		fetch("http://10.20.30.50:5000/login", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)
			if(data.success==true) {
				if(data.token) {
					console.log(data.token)
					setCookie("token", data.token, {
						path: "/",
						maxAge: 3600*24,
						sameSite: true,
					})
				}
				Router.push("/dashboard")
			}
		})
	}
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/assets/images/forest.png')]">
			<div className="px-8 py-6 mt-7 text-left bg-white shadow-2xl md:rounded-3xl">
				<h3 className="text-2xl font-medium text-center">Se connecter</h3>
				<form onSubmit={handleSubmit}>
					<div className="mt-7">
						<div className="mt-4">
							<label className="block" htmlFor="email">Pseudo</label>
							<input name="username" type="text" placeholder='Pseudo' onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-green"/>
						</div>
						<div className="mt-4">
							<label className="block" htmlFor="password">Mot de passe</label>
							<input name="password" type="password" placeholder='Mot de passe' onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-green"/>
						</div>
						<div className="flex items-baseline">
							<input type="submit" className="px-4 py-2 mt-7 text-white bg-dark_green rounded-full transition ease-in-out hover:scale-110 hover:bg-green duration-300"/>
						</div>
					</div>
				</form>
			</div>
		</div>
  )
}