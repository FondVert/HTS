import Image from "next/image"
import { useState } from "react"
import { useCookies } from "react-cookie"

export default function AddPost() {
	const [cookie, setCookie] = useCookies([""])
	const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState<string | null>(null)
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
		<div class="flex items-center justify-center min-h-screen bg-[url('/assets/images/forest.png')]">
			<div class="px-8 py-6 mt-7 text-left bg-white shadow-2xl md:rounded-3xl">
				<h3 class="text-2xl font-medium text-center">Créer un post</h3>
				<form onSubmit={handleSubmit}>
					<div class="mt-7">
						<div>
							<label class="block" htmlFor="title">Titre</label>
							<input type="text" name="title" placeholder="Titre" class="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-green"/>
						</div>
						<div class="mt-4">
							<label class="block">Image</label>
							<input class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file" accept="image/*" onChange={onFileChange} onClick={onClick}/>
						</div>
						<div class="mt-4">
							<label class="block" htmlFor="description">Description</label>
							<input type="text" placeholder="Description" class="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-green"/>
						</div>
						<div class="mt-4">
							<label class="block" htmlFor="content">Contenu</label>
							<textarea name="content" type="text" placeholder="Contenu" class="w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-green"/>
						</div>
						<div class="flex">
						 <input type="submit" className="px-4 py-2 mt-7 text-white bg-dark_green rounded-full transition ease-in-out hover:scale-110 hover:bg-green duration-300"/>
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