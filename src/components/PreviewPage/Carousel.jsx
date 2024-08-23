export default function PreviewCarousel() {
    return (
        <div
            id="carouselDarkVariant"
            className="carousel slide carousel-fade relative"
            data-bs-ride="carousel"
        >
        <div
            className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
        >
            <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
            />
            <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to={1}
                aria-label="Slide 1"
            />
            <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to={2}
                aria-label="Slide 1"
            />
        </div>
        {/* Inner */}
        <div className="carousel-inner relative w-full overflow-hidden">
            {/* Single item */}
            <div className="carousel-item active relative float-left w-full">
            <img
                src="images/carousel1.jpg"
                className="block w-full"
                alt="Motorbike Smoke"
            />
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
            <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-4xl">Welcome to AutoMobile Spare Parts</h5>
                <p>24 Hours service just for you.</p>
            </div>
            </div>
            {/* Single item */}
            <div className="carousel-item relative float-left w-full">
            <img
                src="images/carousel2.jpg"
                className="block w-full"
                alt="Mountaintop"
            />
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
            <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-4xl">Call us Now</h5>
                <p>+94 (77) 308 7221</p>
            </div>
            </div>
            {/* Single item */}
            <div className="carousel-item relative float-left w-full">
            <img
                src="images/carousel3.jpg"
                className="block w-full"
                alt="Woman Reading a Book"
            />
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
            <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-4xl">Quality and Trustworthy online site for you</h5>
            </div>
            </div>
        </div>
        <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselDarkVariant"
            data-bs-slide="prev"
        >
            <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselDarkVariant"
            data-bs-slide="next"
        >
            <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    );
}