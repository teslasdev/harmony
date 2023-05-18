import {useState} from 'react';
import axios from "axios";
import PromptInput from "../PromptInput/PromptInput";
import './App.css';
import {FaBars} from 'react-icons/fa'
import Navigation from './Navigation';

const Mission = () => {

  const [isOpen, setOpen] = useState(true)
  return (
    <div className="App">
    <div className='header-box'>
      <header className='header'>
        <div className='pr-4 d-mobile' onClick={() => setOpen(!isOpen)}>
          <FaBars color="white" size={20} />
        </div>
        <h3 className='logo-name'>Harmony Ai</h3>
      </header>
    </div>
    <div className='flex flex-center'>
      {!isOpen && 
        <div className='bg-absolute-black'>
          <Navigation />
        </div>
      }
      <div className='flex-10 sidebar d-sm-none'>
        <Navigation />
      </div>
        <div className='flex-100' style={{justifyContent:'center'}}>
          <div className='box-container'>
            <div className="box-content">
              <h3 className='logo-name'>Expertise</h3>
              <p>Our team of experienced AI developers is well-versed in the latest AI technologies and frameworks, ensuring top-quality results.</p>
            </div>

            <div className="box-content">
              <h3 className='logo-name'>Custom Solutions</h3>
              <p>We understand that every project is unique. We'll work closely with you to understand your requirements and deliver tailor-made AI solutions to meet your specific needs.</p>
            </div>

            <div className="box-content">
              <h3 className='logo-name'>Cutting-Edge Technology</h3>
              <p>We stay up-to-date with the latest advancements in AI and leverage state-of-the-art tools and techniques to deliver high-performance AI models.</p>
            </div>


            <div className="box-content">
              <h3 className='logo-name'>Cost-Effective</h3>
              <p>Take advantage of our limited-time offer for free AI development services and save on your AI project expenses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
