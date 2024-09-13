// custom typefaces
import "typeface-barlow"

import "prismjs/themes/prism.css"

import "./src/styles/base.scss"

// gatsby-browser.js
export const onClientEntry = () => {
  if (typeof window !== "undefined") {
    // Add OneSignal script dynamically
    const script = document.createElement("script")
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
    script.defer = true
    document.head.appendChild(script)

    // Initialize OneSignal after the script is loaded
    script.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred || []
      window.OneSignalDeferred.push(async function (OneSignal) {
        await OneSignal.init({
          appId: "6388df01-31c6-4379-a183-a5121771c48a",
        })
      })
    }
  }
}
