import {useState} from 'react';
import axios from "axios";
import PromptInput from "../PromptInput/PromptInput";
import './App.css';
import {ResponseInterface} from "../PromptResponseList/response-interface";
import PromptResponseList from "../PromptResponseList/PromptResponseList";
import {IoFlashSharp} from 'react-icons/io5'
import {FaBars} from 'react-icons/fa'
import Navigation from './Navigation';

type ModelValueType = 'gpt' | 'codex' | 'image';
const Home = () => {

  const [responseList, setResponseList] = useState<ResponseInterface[]>([]);
  const [preView, setPreview] = useState<Boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
  const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
  const [modelValue, setModelValue] = useState<ModelValueType>('gpt');
  const [isLoading, setIsLoading] = useState(false);
  let loadInterval: number | undefined;

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const htmlToText = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent;
  }

  const delay = (ms: number) => {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const addLoader = (uid: string) => {
    const element = document.getElementById(uid) as HTMLElement;
    element.textContent = ''

    // @ts-ignore
    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }


  const addResponse = (selfFlag: boolean, response?: string) => {
    const uid = generateUniqueId()
    setResponseList(prevResponses => [
      ...prevResponses,
      {
        id: uid,
        response,
        selfFlag
      },
    ]);
    return uid;
  }

  const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
    setResponseList(prevResponses => {
      const updatedList = [...prevResponses]
      const index = prevResponses.findIndex((response) => response.id === uid);
      if (index > -1) {
        updatedList[index] = {
          ...updatedList[index],
          ...updatedObject
        }
      }
      return updatedList;
    });
  }

  const regenerateResponse = async () => {
    await getGPTResult(promptToRetry, uniqueIdToRetry);
  }

  const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
    // Get the prompt input
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    // If a response is already being generated or the prompt is empty, return
    if (isLoading || !_prompt) {
      return;
    }

    setPreview(true);

    setIsLoading(true);

    // Clear the prompt input
    setPrompt('');

    let uniqueId: string;
    if (_uniqueIdToRetry) {
      uniqueId = _uniqueIdToRetry;
    } else {
      // Add the self prompt to the response list
      addResponse(true, _prompt);
      uniqueId = addResponse(false);
      await delay(50);
      addLoader(uniqueId);
    }

    try {
      // Send a POST request to the API with the prompt in the request body
      const response = await axios.post('get-prompt-result', {
        prompt: _prompt,
        model: modelValue
      });
      if (modelValue === 'image') {
        // Show image for `Create image` model
        updateResponse(uniqueId, {
          image: response.data,
        });
      } else {
        updateResponse(uniqueId, {
          response: response.data.trim(),
        });
      }

      setPromptToRetry(null);
      setUniqueIdToRetry(null);
    } catch (err) {
      setPromptToRetry(_prompt);
      setUniqueIdToRetry(uniqueId);
      updateResponse(uniqueId, {
        // @ts-ignore
        response: `Error: ${err.message}`,
        error: true
      });
    } finally {
      // Clear the loader interval
      clearInterval(loadInterval);
      setIsLoading(false);
    }
  }


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
        <div className='flex-100 h-70'>
          {!preView && 
          <div className='box-container'>
            <div className="box-content">
              <h3 className='logo-name'>Harmony Ai</h3>
              <p>Hello there! I'm an AI trained in AI development and I'm here to offer you free AI development services for a limited time. Whether you need assistance with building a custom AI model, creating a chatbot, or any other AI-related project, I'm here to help.</p>
            </div>

            <div className='flex d-col'>
              <div className='flex gap-10'>
                <div className='box-half'>
                  <span className='badge'><IoFlashSharp size={20}/></span>
                  Are there any hidden costs or obligations associated with the free services
                </div>

                <div className='box-half'>
                  <span className='badge'><IoFlashSharp size={20}/></span>
                  What is the typical turnaround time for completing an AI project
                </div>
              </div>


              <div className='flex gap-10'>
                <div className='box-half'>
                  <span className='badge'><IoFlashSharp size={20}/></span>
                  Who is eligible for the free AI development services
                </div>

                <div className='box-half'>
                  <span className='badge'><IoFlashSharp size={20}/></span>
                  What types of AI projects do you support
                </div>
              </div>
            </div>
          </div>
          }
          <div id="response-list">
            <PromptResponseList responseList={responseList} key="response-list"/>
          </div>
          { uniqueIdToRetry &&
            (<div id="regenerate-button-container">
              <button id="regenerate-response-button" className={isLoading ? 'loading' : ''} onClick={() => regenerateResponse()}>
                Regenerate Response
              </button>
            </div>
            )
          }
          <div id="model-select-container">
            <label htmlFor="model-select">Select model:</label>
            <select id="model-select" value={modelValue} onChange={(event) => setModelValue(event.target.value as ModelValueType)}>
              <option value="gpt">GPT-3 (Understand and generate natural language )</option>
              <option value="codex">Codex (Understand and generate code, including translating natural language to code)
              </option>
              <option value="image">Create Image (Create AI image using DALL·E models)</option>
            </select>
          </div>
          <div id="input-container">
            <PromptInput
              prompt={prompt}
              onSubmit={() => getGPTResult()}
              key="prompt-input"
              updatePrompt={(prompt) => setPrompt(prompt)}
            />
            <button id="submit-button" className={isLoading ? 'loading' : ''} onClick={() => getGPTResult()}></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
