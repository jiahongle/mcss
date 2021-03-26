// Description: Container component for the "Who We Are" section of the home page
import './Introduction.css'
import presidentpic from '../../res/president.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'


// Introductory text
const IntroText = "Mathematical & Computational Sciences Society (MCSS)" + 
                       " is the official society representing MCS students. We hold events for students, " + 
                       "historically they've been centered around MCS topics or hobbies like game nights, " +
                       "coding competitions, or featuring MCS professors."

const presidentQuote = `I like to think of MCSS as a bridge between students and faculties in various aspects. 
                        The vision of MCSS is to help to curate an environment where students build connections 
                        and grow with each other. Shout-out to all the MCS clubs, organizations, and various Discord 
                        servers, together we have built this amazing community at UTM.`

const presidentName = " - Brian Li"
function Introduction() {
    return (
        <div className="Introduction">
            <div className="section-title">Who We Are</div>
            <p>{IntroText}</p>
            
            <div className="President-Container">
                <img src={presidentpic} className="President-Picture"/>
                <div className="QuoteContainer">
                    <FontAwesomeIcon icon={faQuoteLeft}/>
                    <div className="Quote">{presidentQuote}</div>
                    <FontAwesomeIcon icon={faQuoteRight}/>
                    <div className="Initials">{presidentName}, President</div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;