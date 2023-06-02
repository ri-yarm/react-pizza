import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={455}
    viewBox="0 0 280 455"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="130" r="127" /> 
    <rect x="143" y="388" rx="17" ry="17" width="135" height="43" /> 
    <rect x="0" y="389" rx="3" ry="3" width="80" height="32" /> 
    <rect x="0" y="268" rx="3" ry="3" width="280" height="27" /> 
    <rect x="0" y="309" rx="3" ry="3" width="280" height="63" />
  </ContentLoader>
)

export default MyLoader

