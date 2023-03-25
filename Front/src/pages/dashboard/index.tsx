import Link from 'next/link'
import Navbar from '../../../components/navbar'
import { useCookies } from "react-cookie"
import React, { useEffect, useState } from "react"

export default function Dashboard() {
	const [cookie, setCookie] = useCookies([""])
	const [articles, setArticles] = useState([])


	const getData = () => {
		fetch("http://10.20.30.50:5000/post/list", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				page: 0,
				sliceSize: 10,
				orderType: 0,
				getSave: false,
				token: cookie.token
			})
		})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticles(data.data)
      })
	}

	useEffect(() => {
		getData()
	}, [])

  return (
    <div className='min-h-screen'>
			<Navbar/>
			{articles.length > 0 && (
        <ul>
					{articles.map(article => (
						<div key={article.postId} className="mt-10 w-[85vw] md:max-w-7xl gap-6 md:h-[30vh] bg-brown/5 cursor-pointer flex flex-col md:flex-row hover:bg-brown/10 p-6 mx-auto rounded-3xl else-in-out duration-200">
							<img src="assets/images/forest.png" alt="" className="h-full aspect-square rounded-3xl object-cover"/>
							<div className="rounded-3xl bg-white p-5 md:p-8 w-full">
								<h1 className="text-dark_green font-bold text-3xl">
									{article.title}
								</h1>
								<p className="text-lg">
									{article.description}
								</p>
							</div>
						</div>
					))}
				</ul>
      )}
    </div>
  )
}