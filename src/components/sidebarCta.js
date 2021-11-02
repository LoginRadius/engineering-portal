import React from "react"
import defaultImg from "../../static/Consumer-Digital-Identity-Trends-2020.jpg"
import ctaBg from "../../static/cta-bg.svg"
import ctaStyles from "./cta.module.scss"

const CallToAction = () => {
    return (
        <React.Fragment>
            <hr />

            <div className={ctaStyles.sidebarCta}>

                {/*<div*/}
                {/*    className={ctaStyles.image}*/}
                {/*    style={{ backgroundImage: `url(${ctaBg})` }}*/}
                {/*>*/}
                {/*    <img src={defaultImg} alt="default-img" />*/}
                {/*</div>*/}

                <div className={ctaStyles.text}>
                    <p className={ctaStyles.heading}>
                        LoginRadius Docs
                    </p>

                    <p>Implement Authentication in Minutes</p>

                    <a
                        className={"btn-primary"}
                        href={'https://www.loginradius.com/docs/developer'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {"CLICK HERE"}
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CallToAction
