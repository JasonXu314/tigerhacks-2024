import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SearchColored = (props: SvgProps) => (
  <Svg
    width={28}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6DC47E"
      d="M16.754 17.615 14.52 15.62a1.035 1.035 0 0 1-.018-1.515.924.924 0 0 0 .13-.155.919.919 0 0 1 1.378-.174l2.319 2.08a1.18 1.18 0 0 1-1.575 1.76Z"
    />
    <Path
      stroke="#6DC47E"
      d="M16.44 8.719c0 4.242-3.396 7.67-7.573 7.67-4.178 0-7.575-3.428-7.575-7.67s3.397-7.67 7.575-7.67c4.177 0 7.574 3.428 7.574 7.67Z"
    />
    <Path
      stroke="#6DC47E"
      d="M14.4 8.72c0 3.117-2.485 5.63-5.533 5.63-3.049 0-5.533-2.513-5.533-5.63 0-3.119 2.484-5.633 5.533-5.633 3.048 0 5.532 2.514 5.532 5.632ZM26.58 22.577l-5.217-5.07a2.051 2.051 0 1 0-2.779 3.016l5.483 4.784a1.856 1.856 0 0 0 2.514-2.73Z"
    />
  </Svg>
)
export default SearchColored