import Link from 'next/link'
import { FaPlus, FaStar, FaRegUserCircle } from 'react-icons/fa'

export default function Navbar() {
  return (
    <div className="bg-white z-50 fixed top-0 w-full shadow-2xl">
			<nav id="main-nav" className="bg-white max-w-5xl mx-auto font-poppins p-5 flex items-center justify-between">
					<Link href="#top" className="font-semibold text-4xl md:text-3xl oswald">
						<span className="font-light hidden md:inline ">HOW TO </span><span className="hidden md:inline font-semibold text-dark_green">SURVIVE</span>
						<span className="font-light md:hidden">HT</span><span className="md:hidden font-semibold text-dark_green">S</span>
					</Link>
					<div className="w-40 md:w-60 items-center flex justify-between">
							<Link href="/dashboard/addPost"><FaPlus className="fa-solid fa-star text-4xl text-brown hover:text-dark_green"/></Link>
							<Link href="/dashboard/save"><FaStar className="fa-solid fa-star text-4xl text-brown hover:text-dark_green"/></Link>
							<Link href="/"><FaRegUserCircle className="fa-solid fa-star text-4xl text-brown hover:text-dark_green"/></Link>
					</div>
			</nav>
		</div>
  )
}