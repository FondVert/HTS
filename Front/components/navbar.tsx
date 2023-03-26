import Link from 'next/link'
import { FaPlus, FaStar, FaRegUserCircle, FaSearch } from 'react-icons/fa'

export default function Navbar() {
  return (
    <div className="bg-white backdrop-blur-xl z-50 w-full drop-shadow-[0_0px_50px_rgba(255,255,255,0.5)] bg-center ">
			<nav id="main-nav" className="max-w-7xl mx-auto p-5 flex items-center justify-between">
					<Link href="/dashboard" className="font-semibold text-4xl md:text-3xl oswald">
						<span className="font-light hidden md:inline ">HOW TO </span><span className="hidden md:inline font-semibold text-dark_green">SURVIVE</span>
						<span className="font-light md:hidden">HT</span><span className="md:hidden font-semibold text-dark_green">S</span>
					</Link>
					<div className="w-40 md:w-60 items-center flex justify-between">

							<Link href="/dashboard/addPost"><FaPlus className="fa-solid fa-star text-4xl text-brown hover:text-dark_green hover:scale-110 else-in-out duration-200"/></Link>
							<Link href="/dashboard/search"><FaSearch className="fa-solid fa-star text-4xl text-brown hover:text-dark_green hover:scale-110 else-in-out duration-200"/></Link>
							<Link href="/dashboard/save"><FaStar className="fa-solid fa-star text-4xl text-brown hover:text-dark_green hover:scale-110 else-in-out duration-200"/></Link>
							<Link href="/"><FaRegUserCircle className="fa-solid fa-star text-4xl text-brown hover:text-dark_green hover:scale-110 else-in-out duration-200"/></Link>
					</div>
			</nav>
		</div>
  )
}