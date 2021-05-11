import React from 'react';
import FaqBereich from '../components/Faq.js';

//chatbot importieren
import Chatbot from '../components/Chatbot.js';

const Hilfebereich = () => {
    return (
        <div>
            <h2>Hilfebereich<br></br> </h2>   
           <FaqBereich/>

           <Chatbot/>
           <br></br>
        </div>
    )
}
export default Hilfebereich