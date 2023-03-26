import Link from 'next/link'
import Navbar from '../../../components/navbar'
import { useCookies } from "react-cookie"
import React, { useEffect, useState } from "react"

export default function Save() {
	const [cookie, setCookie] = useCookies([""])
	const [articles, setArticles] = useState([])


	const getData = () => {
		fetch("http://10.20.30.50:5000/post/list", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				page: 0,
				sliceSize: 1000,
				orderType: 0,
				getSave: true,
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
    <div className='min-h-screen pb-10'>
			<Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='pt-5 pl-5 text-white font-semibold text-2xl'>Articles sauvegardés</h1>
      </div>
			{articles.length > 0 ? (
        <ul>
					{articles.map(article => (
						<Link href={"/dashboard/post/"+article.postId} key={article.postId}>
							<div className="mt-10 w-[85vw] md:max-w-7xl gap-6 md:h-[30vh] bg-white/10 cursor-pointer flex flex-col md:flex-row hover:bg-white/20 p-6 mx-auto rounded-3xl else-in-out duration-200">
								<img src="../assets/images/forest.png" alt="" className="h-full aspect-square rounded-3xl object-cover"/>
								<div className="rounded-3xl bg-white/10 p-5 md:p-8 w-full">
									<h1 className="text-green drop-shadow-[0_0px_30px_rgba(16,196,78,1)] font-bold text-3xl">
										{article.title}
									</h1>
									<p className="mt-1 text-lg text-white">
										{article.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</ul>
      ) : (
				<h1 className='text-center p-5 text-white/40 font-semibold text-3xl'>Vous n&apos;avez aucun article enrgistré</h1>
			)}
    </div>
  )
}