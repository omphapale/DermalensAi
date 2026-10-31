import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import TrustBar from "./component/TrustBar";
import HowItWorks from "./component/HowItWorks";
import InteractiveDemo from "./component/InteractiveDemo";
import Features from "./component/Features";
import ChatbotDemo from "./component/ChatbotDemo";
import Safety from "./component/Safety";
import FreqAskQue from "./component/FreqAskQue";
import FinalCard from "./component/FinalCard";
import Footer from "./component/Footer";

const LandingPage = () => {
 
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">

      {/* NAVBAR */}

      <Navbar/>

      {/* HERO SECTION */}

      <Hero/>

      {/* TRUST BAR */}

     <TrustBar/>

      {/*  HOW IT WORKS */}

      <HowItWorks/>
      
      {/*  INTERACTIVE DEMO */}

     <InteractiveDemo/>

      {/* FEATURES */}

      <Features/>

      {/* CHATBOTDEMO */}

      <ChatbotDemo/>

      {/* SAFETY */}

      <Safety/>

      {/* FAQ */}

     <FreqAskQue/>

      {/* FINAL CARD */}

      <FinalCard/>

      {/* FOOTER */}

      <Footer/>
      </main>
  )
}
export default LandingPage;