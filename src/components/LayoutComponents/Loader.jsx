import './index.css';

export default function Loader() {
    
    return (
        <center>
            <div className="loading hover:scale-110 transition duration-300 ease-in-out drop-shadow-2xl"><div></div><div></div><div></div></div>
            <div className='antialiased font-semibold uppercase text-lg'><h2 className='flipX'>Loading...</h2></div>
        </center>
    );
}