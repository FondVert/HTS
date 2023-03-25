import Link from 'next/link'
import { useState, useEffect } from "react";

export default function Login() {
	const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("http://localhost:5000", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({name:'Félix'})
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			setUsers(data)
		})
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
        <ul>
            <li>{users.name}</li>
        </ul>
    </div>
  )
}