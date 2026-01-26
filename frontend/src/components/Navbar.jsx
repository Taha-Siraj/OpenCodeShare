import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const Navbar = () => {
    return (
        <>

            <nav className="bg-black h-[70px] font-poppins flex items-center text-white justify-between px-5  m-2 rounded-md">
                <div>
                    <img src="/vite.svg" alt="logo" />
                </div>

                <div className="flex gap-5 font-bold cursor-pointer font-poppins">
                    <Link to="/">Home</Link>
                    <Link to="/how-it-works">How it Works</Link>
                    <Link to="/feedback">Feedback</Link>
                </div>

                <div>
                    <Button className="bg-white rounded-full hover:bg-white hover:scale-105 transition-all duration-300 font-bold cursor-pointer text-black" >Get Started</Button>
                </div>

            </nav>
        </>
    );
}

export default Navbar;
