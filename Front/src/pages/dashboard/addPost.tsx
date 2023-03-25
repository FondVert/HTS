import Image from "next/image"
import { useState } from "react"
import { useCookies } from "react-cookie"

export default function AddPost() {
	const [cookie, setCookie] = useCookies([""])
	const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState<string | null>(null)
	const [formData, updateFormData] = useState()
	const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }


	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  }
	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  }
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(file as File);

    setBase64(base64 as string);

    // You can upload the base64 to your server here
    await fetch("http://10.20.30.50:5000/post", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				image: base64,
				form: formData,
				token: cookie.token
			})
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)
		})

    // Clear the states after upload
    setFile(null);
    setBase64(null);
  };
  return (

		
		<div>
		<div className="flex items-center justify-center min-h-screen bg-[url('/assets/images/forest.png')]">
			<div className="px-8 py-6 mt-7 text-left bg-black/50 backdrop-blur-md shadow-2xl rounded-3xl md:min-w-[30vw]">
				<h3 className="text-2xl font-medium text-center text-white">Créer un post</h3>
				<form onSubmit={handleSubmit}>
					<div className="mt-7">
						<div>
							<label className="block text-white" htmlFor="title">Titre</label>
							<input type="text" name="title" placeholder="Titre" className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200" onChange={handleChange}/>
						</div>
						<div className="mt-4">
							<label className="block text-white" htmlFor="description">Description</label>
							<textarea name="description" type="text" placeholder="Description" className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200" onChange={handleChange}/>
						</div>
						<div className="mt-4">
							<label className="block text-white" htmlFor="content">Contenu</label>
							<textarea name="content" type="text" placeholder="Contenu" className="text-white w-full px-4 py-2 mt-2 h-[15vh] bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200" onChange={handleChange}/>
						</div>
						{/* <div className="mt-4">
							<label className="block text-white">Image</label>
							<input className="text-white w-full px-4 py-2 mt-2 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green else-in-out duration-200" id="small_size" type="file" accept="image/*" onChange={onFileChange} onClick={onClick}/>
						</div> */}
						<div className="flex justify-center">
							<input type="submit" className="font-semibold mt-5 bg-gradient-to-t from-green to-green/70 hover:bg-green text-black drop-shadow-[0_0px_40px_rgba(16,196,78,1)] py-2 px-3 rounded-full hover:scale-110 else-in-out duration-200"/>
						</div>
					</div>
				</form>
			</div>
		</div>
		</div>
  )
}

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};