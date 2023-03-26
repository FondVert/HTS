import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import React, { useEffect, useState } from "react"
import { FaPoop, FaArrowDown, FaRegStar, FaStar } from "react-icons/fa"
import { AiFillSmile } from "react-icons/ai"
import { RiArrowGoBackFill } from "react-icons/ri"

import Navbar from '../../../../components/navbar'

export default function Save() {
	const [cookie, setCookie] = useCookies([""])
	const [article, setArticle] = useState([])
	const [classBtn, setClassBtn] = useState([])
	const router = useRouter()
	const { id } = router.query

	const getData = () => {
		fetch("http://10.20.30.50:5000/getPost", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				postId: id,
				token: cookie.token
			})
		})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticle(data)
				console.log(data)
				if(data.voteType == 1) {
					setClassBtn({
						bad: "text-white/50",
						good: "text-white",
						save: data.hasSave ? "text-green drop-shadow-[0_0px_10px_rgba(16,196,78,1)]" : "text-white drop-shadow-[0_0px_30px_rgba(255,255,255,1)]"
					})
				} else if (data.voteType == 2) {
					setClassBtn({
						bad: "text-white",
						good: "text-white/50",
						save: data.hasSave ? "text-green drop-shadow-[0_0px_10px_rgba(16,196,78,1)]" : "text-white drop-shadow-[0_0px_30px_rgba(255,255,255,1)]"
					})
				} else {
					setClassBtn({
						bad: "text-white/50",
						good: "text-white/50",
						save: data.hasSave ? "text-green drop-shadow-[0_0px_10px_rgba(16,196,78,1)]" : "text-white drop-shadow-[0_0px_30px_rgba(255,255,255,1)]"
					})
				}
      })
	}

	const goodClick = () => {
		let type = 1
		if (article.voteType == 1) {
			type = 0
		}
		fetch("http://10.20.30.50:5000/post/vote", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				postId: id,
				type: type,
				token: cookie.token
			})
		})
      .then(response => {
      	getData()
      })
	}

	const badClick = () => {
		let type = 2
		if (article.voteType == 2) {
			type = 0
		}
		fetch("http://10.20.30.50:5000/post/vote", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				postId: id,
				type: type,
				token: cookie.token
			})
		})
      .then(response => {
      	getData()
      })
	}

	const skipClick = () => {
		fetch("http://10.20.30.50:5000/getPost", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				postId: id,
				token: cookie.token
			})
		})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticle(data)
				console.log(data)
      })
	}

	const saveClick = () => {
		fetch("http://10.20.30.50:5000/post/save", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
			body: JSON.stringify({
				postId: id,
				type: article.hasSave ? 0 : 1,
				token: cookie.token
			})
		})
      .then(response => {
        getData()
      })
	}

	const backward = () => {
		router.back()
	}

	useEffect(() => {
		getData()
	}, [])

  return (
		<div className='min-h-screen'>
			<Navbar/>
			{article && (<div className="p-8 md:max-w-7xl mx-auto">
				<div className="flex justify-between">
					<div className="text-2xl text-white flex flex-inline items-center gap-3">
						<img src="../../assets/images/user_placeholder.png" alt="" className="h-[5.5vh] rounded-full"/>
						<p>{article.username}</p>
					</div>
					<div className='flex gap-10'>
						<RiArrowGoBackFill onClick={backward} className="text-3xl text-white drop-shadow-[0_0px_30px_rgba(255,255,255,1)] cursor-pointer flex my-auto hover:scale-110 ease-in-out duration-300"/>
						<FaRegStar onClick={saveClick} className={"text-3xl cursor-pointer flex my-auto hover:scale-110 ease-in-out duration-300 " + classBtn.save}/>
					</div>
				</div>
				<div className="mt-7 gap-6 md:h-[50vh] bg-white/10 flex flex-col md:flex-row p-6 rounded-3xl">
					<img src="../../assets/images/forest.png" alt="" className="h-full aspect-square rounded-3xl object-cover"/>
					<div className="text-white rounded-3xl rounded-r-none bg-white/10 p-5 md:p-8 overflow-y-scroll w-full">
						<h1 className="text-green drop-shadow-[0_0px_30px_rgba(16,196,78,1)] font-bold text-4xl">
							{article.title}
						</h1>
						<p className="text-md mt-5">
								{article.content}
						</p>
					</div>
				</div>
				<div className="flex justify-between">
					{/* bien */}
					<button onClick={badClick} className={"flex flex-row gap-4 px-5 py-4 mt-7 bg-gradient-to-l from-red-500 to-red-700 rounded-full drop-shadow-[0_0px_50px_rgba(247,7,27,1)] hover:bg-red-700 hover:px-20 ease-in-out duration-300 " + classBtn.bad}>
						<FaPoop className="fa-solid fa-poo text-3xl"/>
						<h2 className="text-xl">{article.nbrDown}</h2>
					</button>
					{/* down */}
					{/* <button onClick={skipClick} className="flex mx-auto px-5 py-4 mt-7 text-white/80 bg-white/10 rounded-full drop-shadow-[0_0px_30px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:translate-y-3 ease-in duration-200">
						<FaArrowDown className="text-3xl"/>
					</button> */}
					{/* bien :) */}
					<button onClick={goodClick} className={"flex flex-row gap-4 px-5 py-4 mt-7 bg-gradient-to-l from-green to-green/70 rounded-full drop-shadow-[0_0px_50px_rgba(16,196,78,1)]  hover:px-20 ease-in-out duration-300 " + classBtn.good}>
						<h2 className="text-xl">{article.nbrUp}</h2>
						<AiFillSmile className="text-3xl"/>
					</button>
				</div>
			</div>)}
		</div>
  )
}