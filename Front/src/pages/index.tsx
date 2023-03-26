import Link from 'next/link'
export default function Home() {
  return (
		<div className="h-screen bg-black bg-cover bg-[url('/assets/images/forest_v3.png')] md:bg-[url('/assets/images/forest_v2.png')]">
		<div className="sm:w-screen md:w-[50vw] h-screen flex pt-[25vh] md:p-0 md:items-center text-center">
			<div className="w-full oswald text-darkxx">
				<p className=" md:font-light text-4xl md:text-7xl text-white drop-shadow-[0_0px_30px_rgba(255,255,255,1)]">HOW TO </p>
				<p className=" font-semibold text-7xl md:text-9xl text-green drop-shadow-[0_0px_50px_rgba(16,196,78,1)]">SURVIVE</p>
				<div className="roboto font-semibold w-50 flex justify-center mt-5 gap-10">
					<Link href="/register" className=" bg-gradient-to-t from-green to-green/70 hover:bg-green text-black drop-shadow-[0_0px_40px_rgba(16,196,78,1)] py-3 px-4 rounded-full hover:scale-110 else-in-out duration-200">
						S&apos;inscrire
					</Link>
					<Link href="/login" className="border-4 border-solid border-green hover:border-green hover:text-green drop-shadow-[0_0px_20px_rgba(16,196,78,1)] text-green py-2 px-4 rounded-full hover:scale-110 else-in-out duration-200">
					Se connecter
					</Link>
				</div>
			</div>
		</div>
	</div>
  )
}