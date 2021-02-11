// Description: Container component for the "Who We Are" section of the home page
import './Introduction.css'
import presidentpic from '../../res/placeholder-president-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'


// Introductory text
const IntroText = "Mathematical & Computational Sciences Society (MCSS)" + 
                       " is the official society representing MCS students. We hold events for students, " + 
                       "historically they've been centered around MCS topics or hobbies like game nights, " +
                       "coding competitions, or featuring MCS professors."

const presidentQuote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex quam, consectetur " +
                       "eu mattis facilisis, sollicitudin nec enim. Sed id ipsum porta, viverra urna sed, " +
                       "sollicitudin tortor. Morbi id risus eget nulla pulvinar tristique a in eros."

const presidentName = " - Brian Li"
function Introduction() {
    return (
        <div className="Introduction">
            <b>Who We Are</b>
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