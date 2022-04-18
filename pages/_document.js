import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

	render() {
		return (
			<Html lang="en">
				<Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
					{/* Stylesheets */}
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@900&family=Montserrat&family=Merriweather&family=Noto+Sans+JP:wght@300&family=Rubik&family=Ubuntu:wght@400;500&family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" href="https://use.typekit.net/uqi8xbk.css" />
                    <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"
                    />
                    <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
                    />
                    <link rel="stylesheet" type="text/css" href="/static/styles.css" />
                    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument