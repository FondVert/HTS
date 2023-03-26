import Link from 'next/link'
import Navbar from '../../../components/navbar'
import { useCookies } from "react-cookie"
import {RiArrowDropDownLine} from "react-icons/ri"
import React, { useEffect, useState } from "react"

export default function Dashboard() {
	const [cookie, setCookie] = useCookies([""])
	const [articles, setArticles] = useState([])
	const [search, setSearch] = useState(0)
	const [isOpen, setIsOpen] = useState(false);


	const getData = () => {
		fetch("http://10.20.30.50:5000/post/list", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				page: 0,
				sliceSize: 1000,
				orderType: search,
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

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const searchNew = () => {
		setSearch(0)
		setIsOpen(!isOpen)
		getData()
	}


	const searchBest = () => {
		setSearch(2)
		setIsOpen(!isOpen)
		getData()
	}


	const searchOld = () => {
		setSearch(1)
		setIsOpen(!isOpen)
		getData()
	}


	const searchBad = () => {
		setSearch(3)
		setIsOpen(!isOpen)
		getData()
	}


	useEffect(() => {
		getData()
	}, [])
	
  return (
    <div className='min-h-screen pb-10'>
			<Navbar/>
			{articles.length > 0 && (
        <ul>
			<div className='max-w-7xl flex items-center mx-auto justify-between'>
				{/* titre */}
        		<h1 className='pt-5 pl-5 text-white font-semibold text-2xl'>Accueil</h1>
				
				{/* navbar */}
				<div className="relative inline-block mt-5 mr-5 z-[100]">
					<button
						className="drop-shadow-[0_0px_30px_rgba(255,255,255,0.3)] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center ease-in-out duration-200"
						onClick={toggleDropdown}>
						
						<span>Trier par</span>
						<RiArrowDropDownLine className='text-2xl'/>
					</button>
					<ul
						className={`absolute ${
						isOpen ? "" : "hidden"
						} text-gray-700 pt-1 w-full rounded-3xl shadow-md `}
					>
						<li>
							<button className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ease-in-out duration-200 w-full rounded-t-3xl" onClick={searchNew}>Nouveaux</button>
						</li>
						<li>
							<button className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ease-in-out duration-200 w-full" onClick={searchOld}>Anciens</button>
						</li>
						<li>
							<button className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ease-in-out duration-200 w-full" onClick={searchBest}>Meilleur</button>
						</li>
						<li>
							<button className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ease-in-out duration-200 w-full rounded-b-3xl" onClick={searchBad}>Pire</button>
						</li>
					</ul>
				</div>



     		</div>
					{articles.map(article => (
						<Link href={"/dashboard/post/"+article.postId} key={article.postId}>
							<div className="z-[10] mt-10 w-[85vw] md:max-w-7xl gap-6 md:h-[30vh] bg-white/10 cursor-pointer flex flex-col md:flex-row hover:bg-white/20 p-6 mx-auto rounded-3xl ease-in-out duration-200">
								<img src="assets/images/forest.png" alt="" className="h-full aspect-square rounded-3xl object-cover"/>
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
      )}
    </div>
  )
}