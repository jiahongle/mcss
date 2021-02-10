// Description: Container component for the "Who We Are" section of the home page

import presidentpic from './placeholder-president-pic.png';

// Introductory text
var IntroText = "Mathematical & Computational Sciences Society (MCSS)" + 
                       " is the official society representing MCS students. We hold events for students, " + 
                       "historically they've been centered around MCS topics or hobbies like game nights, " +
                       "coding competitions, or featuring MCS professors."

function Introduction() {
    return (
        <div className="Introduction">
            <b>Who We Are</b>
            <p>{IntroText}</p>

            <img src={presidentpic} className="President-Picture"/>
        </div>
    );
}

export default Introduction;