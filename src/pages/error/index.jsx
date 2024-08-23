import Button from "../../components/buttons/Buttons";

export default function Error404() {
    return (
		<div className="h-screen bg-gray-100 flex items-center">
			<div className="container flex flex-col md:flex-row items-center justify-center text-gray-700">
				<div className="max-w-md">
					<h1 className="text-9xl font-dark font-bold">404</h1>
					<p className="text-2xl md:text-3xl font-light leading-normal">Oops! Page not found or Unauthorized.</p>
					<p className="mb-8">We can't find the page you're looking for.</p>

					<a href="/">
						<Button
							variant="red"
							className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
							Go back home
						</Button>
					</a>
				</div>
				<div className="max-w-lg opacity-25">
					<img src="images/automobile.png"/>
				</div>
			</div>
		</div>
    );
}