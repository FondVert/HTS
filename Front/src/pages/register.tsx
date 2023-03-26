import Link from 'next/link'
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import Router from "next/router";

export default function Register() {
	const [cookie, setCookie] = useCookies([""])
	const [formData, updateFormData] = useState()
	const [error, setError] = useState("")
	const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }
	const handleSubmit = (e) => {
		e.preventDefault()
		fetch("http://10.20.30.50:5000/register", {
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
					setCookie("token", data.token, {
						path: "/",
						maxAge: 3600*24,
						sameSite: true,
					})
				}
				Router.push("/dashboard")
			} else {
				setError("Tout les champs sont requis et les caractères spéciaux sont interdit")
			}
		})
	}
  return (
		<div className="flex items-center justify-center min-h-screen bg-[url('/assets/images/forest.png')]">
			<div className="px-8 py-6 min-w-[90vw] md:min-w-[20vw] mt-7 text-left backdrop-blur-md bg-black/50 shadow-2xl rounded-3xl ">
				<h3 className="text-2xl font-medium text-center text-white">S&apos;inscrire</h3>
				<form onSubmit={handleSubmit}>
					<div className="mt-7">
						<div>
							<label className="block text-white" htmlFor="email">Nom</label>
							<input name="name" type="text" placeholder='Nom' onChange={handleChange} className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200"/>
						</div>
						<div className="mt-4">
							<label className="block text-white" htmlFor="email">Pseudo</label>
							<input name="username" type="text" placeholder='Pseudo' onChange={handleChange} className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200"/>
						</div>
						<div className="mt-4">
							<label className="block text-white" htmlFor="password">Mot de passe</label>
							<input name="password" type="password" placeholder='Mot de passe' onChange={handleChange} className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200"/>
						</div>
						<div className="flex justify-between items-center">
							<input type="submit" className="font-semibold mt-5 bg-gradient-to-t from-green to-green/70 hover:bg-green text-black drop-shadow-[0_0px_40px_rgba(16,196,78,1)] py-2 px-3 rounded-full hover:scale-110 else-in-out duration-200"/>
							<Link href="/login" className='mt-5 mr-5 drop-shadow-[0_0px_10px_rgba(16,196,78,1)] text-green hover:scale-110 else-in-out duration-200'>Se connecter</Link>
						</div>
					</div>
					<p className='text-red-500 font-bold pt-4 drop-shadow-[0_0px_10px_rgba(235,7,49,1)]'>{error}</p>
				</form>
			</div>
		</div>
  )
}