function App() {
	const articlesRef = React.useRef([])
	const [articles, setArticles] = React.useState([])
	React.useEffect(function effect() {
		fetch('http://localhost:3000/articles')
			.then(res => res.json())
			.then(articles => {
				setArticles(articles)
			})
			.catch(console.error)
	}, [])
  return React.createElement(React.Fragment, undefined,
		React.createElement
		(
			'ul', undefined,
			articles.map(function getItemElement(article) {
				const { title, description, pub_date, link } = article
				return React.createElement(
					'li',
					{
						key: title,
						className: 'item',
						onClick: loadPage(link),
					},
					React.createElement('div', { className: 'title' },
						React.createElement('a', { href: link }, title)
					),
					React.createElement('div', { className: 'metadata' }, `${pub_date} - ${description}`),
				)
			})
		),
		React.createElement('iframe', { id: 'frame' })
	)

	function loadPage(url) {
		return function loadByUrl() {
			let frame = document.getElementById("frame");
			frame.src = url;
		}
  }
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#app')
)