import Button from "../buttons/Buttons";

export default function PreviewHeader() {

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    <a href="/">
                        <img
                            className="rounded-t-lg w-0 md:w-16"
                            src="images/asplogo.png"
                            alt=""
                            loading="lazy"
                        />
                    </a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="/register" className="mr-4 hover:underline md:mr-6">
                            <Button variant="alternative">Register</Button>
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="mr-4 hover:underline md:mr-6">
                            <Button variant="green">Login</Button>
                        </a>
                    </li>
                </ul>
        </div>
    );

}