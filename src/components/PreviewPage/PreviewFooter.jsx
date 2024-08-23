import React from 'react';

export default function PreviewFooter() {
    const location = window.location.pathname;
    const [isLoading, setIsLoading] = React.useState(false);
    
    React.useEffect(() => {
        if(location === '/home' || location === '/') {
            setIsLoading(true);
            setTimeout(function(){
                setIsLoading(false);
            }, 3000);
        }
        
    }, []);

    return (
        <>
            {isLoading ? 
                <></> :
                <footer className="p-4 shadow-lg rounded-lg shadow md:px-6 md:py-8 bg-gray-100">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="/" className="flex items-center mb-4 sm:mb-0">
                            <img
                                className="rounded-t-lg w-1/2 md:w-48"
                                src="images/automobile.png"
                                alt="ASP Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                {/* Automobile Spare Parts */}
                            </span>
                        </a>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2022{" "}
                        <a href="/" className="hover:underline">
                            Automobile Spare Parts™
                        </a>
                        . All Rights Reserved.
                    </span>
                </footer>
            }
        </>
    );
}