import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Detail() {
	const [load, setLoad] = useState(true)
	const [movie, setMovie] = useState([])
	const { id } = useParams()
	const getMovie = async () => {
		const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json()
		setMovie(json.data.movie)
		setLoad(false)
	}
	useEffect(() => {
		getMovie()
	}, [])
	console.log(movie)
	return (
		<div>
			{load ? (
				`Loading...`
			) : (
				<>
					<h1>Detail</h1>
					<img src={movie.medium_cover_image} alt={movie.title} />
					<h3>
						{movie.title} ({movie.year})
					</h3>
					<ul>
						{movie.genres.map((genre) => (
							<li key={genre}>{genre}</li>
						))}
					</ul>
					<p>{movie.description_full}</p>
					<a href="/">Back to list</a>
				</>
			)}
		</div>
	)
}

export default Detail
