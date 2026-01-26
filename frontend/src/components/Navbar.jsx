import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <>

            <nav className="bg-black h-[70px] font-poppins flex items-center text-white justify-between px-5  m-2 rounded-md">
                <div>
                </div>

                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/home">How it Works</Link>
                    <Link to="/home">Feedback</Link>
                </div>

            </nav>
        </>
    );
}

export default Navbar;
