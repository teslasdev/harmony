import {useState} from 'react';
import axios from "axios";
import PromptInput from "../PromptInput/PromptInput";
import './App.css';
import {FaBars} from 'react-icons/fa'
import Navigation from './Navigation';

const About = () => {

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
        <div className='flex-100' style={{justifyContent:'flex-start'}}>
          <div className='box-container'>
            <div className="box-content">
              <h3 className='logo-name'>Project Description</h3>
              <p>Provide a brief overview of your AI development project, including the problem you want to solve and any specific requirements you have.</p>
            </div>

            <div className="box-content">
              <h3 className='logo-name'>TimeLine</h3>
              <p>Let us know if you have any specific deadlines or time constraints for your project.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
