import React from "react"
import defaultImg from "../../static/Consumer-Digital-Identity-Trends-2020.jpg"
import ctaBg from "../../static/cta-bg.svg"
import ctaStyles from "./cta.module.scss"

const CallToAction = () => {
    return (
        <React.Fragment>
            <hr />

            <div className={ctaStyles.ctaSidebar}>

                <div
                    className={ctaStyles.imageWrapper}
                    style={{ backgroundImage: `url(${ctaBg})` }}
                >
                    <img src={defaultImg} alt="default-img" />
                </div>

                <h3>Consumer Digital Identity Trend Report 2020</h3>

                <p>Optimize Your Conversion Funnel With Core Customer Behavior Analysis</p>

                <a
                    className={"btn-primary mt-24"}
                    href={'https://www.loginradius.com/resource/digital-identity-trends-2020/'}
                    key={"docs-link"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {"Download Now"}
                </a>
            </div>
        </React.Fragment>
    )
}

export default CallToAction
