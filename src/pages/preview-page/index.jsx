import NavBar from "../../components/LayoutComponents/NavBar";
import PreviewCarousel from "../../components/PreviewPage/Carousel";
import PreviewHeader from "../../components/PreviewPage/PreviewHeader";
import ServiceCards from "../../components/PreviewPage/ServiceCards";
import {useLocation} from 'react-router-dom';
import Loader from "../../components/LayoutComponents/Loader";
import React, { useEffect } from "react";
import './index.css';

export default function PreviewSite() {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(function(){
            setIsLoading(false);
        }, 3000)
    }, []);

    const ServiceHead = () => {
        return (
            <>
                <br/><br/>
                <center>
                <div className="deconstructed font-sans text-4xl antialiased font-semibold text-center underline underline-offset-8">
                    Our Services
                    <div>Our Services</div>
                    <div>Our Services</div>
                    <div>Our Services</div>
                    <div>Our Services</div>
                </div>
                </center>
                <br/>
                <p className="long-text font-mono text-base antialiased font-thin text-center px-5">We are committed to supplying all types of automotive replacement parts. Top quality at a reasonable price and honest service are our main weapons.</p>
                <br/><br/>
            </>
        );
    }
    return (
        <div className="container">
            {isLoading? <Loader /> : 
                <>
                    {location.pathname === '/'? <PreviewHeader /> : <NavBar />}
                    <br />
                    <PreviewCarousel />
                    <ServiceHead/>
                    <ServiceCards />
                    <br/><br/>
                </>
            }
        </div>
    )
}