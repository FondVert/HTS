import Link from 'next/link'
export default function Home() {
  return (
		<div className="h-screen">
		<img src="assets/images/forest_v2.png" draggable="false" alt="" className="h-screen absolute right-0 hidden md:block z-[-10]"/>
		<img src="assets/images/forest_v3.png" draggable="false" alt="" className="w-screen absolute bottom-0 md:hidden z-[-10]"/>
		<div className="sm:w-screen md:w-[50vw] h-screen flex items-center text-center">
			<div className="w-full oswald text-darkxx">
				<p className=" md:font-light text-4xl md:text-7xl">HOW TO </p>
				<p className=" font-semibold text-7xl md:text-9xl text-dark_green">SURVIVE</p>
				<div className="roboto font-semibold w-50 flex justify-center mt-5 gap-10">
					<Link href="/register" className="bg-dark_green hover:bg-green text-white py-3 px-4 rounded-full">
						S'inscrire
					</Link>
					<Link href="/login" className="border-4 border-solid border-dark_green hover:border-green hover:text-green text-dark_green py-2 px-4 rounded-full">
					Se connecter
					</Link>
				</div>
			</div>
		</div>
	</div>
  )
}