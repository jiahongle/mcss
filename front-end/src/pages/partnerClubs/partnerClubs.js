import React from 'react'
import Footer from "../../components/footer/footer.js"
import PartnerClubCard from "../../components/partnerClubCard/partnerClubCard.js"
import "./partnerClubs.css"

import wiscPfp from "./res/wISC.png"
import csscPfp from "./res/CSSC.png"
import dscPfp from "./res/DSC_UTM.png"
import roboPfp from "./res/UTM_Robotiocs.png"
import samPfp from "./res/UTMSAM.png"

function PartnerClubs() {
    return(
        <div>
            <div className="partner-club-page-body">
                <div className="partner-clubs-page-title">Our Partner Clubs</div>
                <section className="partner-clubs-section">
                    <PartnerClubCard pfpLink={csscPfp} insta="https://www.instagram.com/utm.cssc/" 
                    facebook="https://www.facebook.com/utmcssc/" discord="https://cssc.utm.utoronto.ca/discord"
                    website="https://cssc.utm.utoronto.ca/"/>

                    <PartnerClubCard pfpLink={dscPfp} insta="https://www.instagram.com/dscutm/" 
                    facebook="https://www.facebook.com/utmdsc" 
                    discord="https://discord.gg/8xKTpsv" linkedin="https://www.linkedin.com/company/dscutm" 
                    website="https://dscutm.com/"/>
                    
                    <PartnerClubCard pfpLink={roboPfp} insta="https://www.instagram.com/utm_robotics/" 
                    facebook="https://www.facebook.com/utmrobotics" discord="https://discord.gg/bE4a3g4"
                    website="http://utmrobotics.com"/>
                    
                    <PartnerClubCard pfpLink={samPfp} insta="https://www.instagram.com/utmsam"
                    linkedin=" https://www.linkedin.com/company/utmsam2020" website="http://utmsam.sa.utoronto.ca/"/>
                    
                    <PartnerClubCard pfpLink={wiscPfp} insta="https://www.instagram.com/wiscutm"
                    facebook="https://www.facebook.com/wiscutm/" linkedin="https://www.linkedin.com/in/wisc-utm-5a2417199" 
                    website="https://www.wiscutm.com/"/>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default PartnerClubs