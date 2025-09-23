import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import '../css/Layout.css'; 

export default function Layout({ children }) {  

    return (        
        <div className="layout">    
        <Header />
            <main>{children}</main>     
        <Footer />
        </div>  
    );
}   