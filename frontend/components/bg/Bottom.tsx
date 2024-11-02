import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Bottom = (props: SvgProps) => (
  <Svg
    width={393}
    height={110}
    fill="none"
    {...props}
  >
    <Path
      fill="#92E5A2"
      d="M-.756 110h392.873V16.521s-42.544-8.583-85.334-8.093c-36.633.42-69.07 6.235-105.658 5.65-38.594-.617-75.937-11.84-114.285-13.002C41.007-.314-.756 8.998-.756 8.998V110Z"
    />
    <Path
      fill="#6DC47E"
      d="M-.63 109.714h392.874V23.773s-30.665-12.644-73.455-12.166c-36.633.41-73.51 12.736-110.098 12.166-38.594-.602-83.307-15.29-121.655-16.424C41.204 5.995-.629 15.99-.629 15.99v93.725Z"
    />
  </Svg>
)
export default Bottom
