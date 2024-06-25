import React from "react"
import ContentLoader from "react-content-loader"

const SkiletonPizza = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="131" cy="125" r="110" /> 
    <rect x="1" y="249" rx="9" ry="9" width="280" height="27" /> 
    <rect x="3" y="293" rx="9" ry="9" width="280" height="88" /> 
    <rect x="6" y="406" rx="9" ry="9" width="90" height="30" /> 
    <rect x="124" y="396" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
)

export default SkiletonPizza