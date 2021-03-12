import React from 'react'
import Footer from "../../components/footer/footer.js";
import ExecCard from "../../components/execCard/execCard.js";
import GithubProfile from "../../components/githubProfile/githubProfile.js"
import "./theTeam.css";

function Team() {
    return(
        <div>
        <div id="team-page-body">
            <div className="team-title">Our Execs</div>
            <section className="team-cards-container team-section-container">
                <ExecCard name="Brian (Zhengyu) Li" role="President" 
                linkedin="https://www.linkedin.com/in/zhengyu-brian-li/" 
                email="brianli.li@mail.utoronto.ca"
                website="https://404briannotfound.tech/"/>

                <ExecCard name="Rutwa Engineer" role="Vice President of External Affairs"/>

                <ExecCard name="Tanvi Bhandari" role="Vice President of Internal Affairs" 
                linkedin="http://linkedin.com/in/tanvibhandari10"/>

                <ExecCard name="Nina Ricci Lu" role="Treasurer" 
                linkedin="https://www.linkedin.com/in/ninaricci29/"/>

                <ExecCard name="Hillary Tang" role="Marketing Director" 
                linkedin="https://www.linkedin.com/in/hillarytang/"/>
            </section>

            <div className="team-title">Our Associates</div>
            <section className="team-section-container">
                <ul className="associates-list">
                    <li>Jagdev Jhajj</li>
                    <li>Lena Mohammad</li>
                    <li>Manushree Saboo</li>
                    <li>Maryam Gohargani</li>
                    <li>Niral Patel</li>
                    <li>Sherman Liu</li>
                </ul>
            </section>

            <div className="team-title">Our Website Contributors</div>
            <section className="team-section-container github-cards-container">
                <GithubProfile username="luu-alex" pfpLink="https://avatars.githubusercontent.com/u/29740020?v=4"/>
                <GithubProfile username="Obsoleete" pfpLink="https://avatars.githubusercontent.com/u/47087766?v=4"/>
                <GithubProfile username="MEBestawy" pfpLink="https://avatars.githubusercontent.com/u/53573508?v=4"/>
                <GithubProfile username="Alhumam567" pfpLink="https://avatars.githubusercontent.com/u/62971609?v=4"/>
                <GithubProfile username="jiahongle" pfpLink="https://avatars.githubusercontent.com/u/47465704?v=4"/>
                <GithubProfile username="BCYilex" pfpLink="https://avatars.githubusercontent.com/u/60441990?v=4"/>
            </section>
        </div>
        <Footer/>
        </div>
       
    )
}

export default Team