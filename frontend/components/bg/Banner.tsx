import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Banner = (props: SvgProps) => (
  <Svg
    width={393}
    height={422}
    fill="none"
    {...props}
  >
    <Path
      fill="#92E5A2"
      d="M392.873 0H0v361.315s42.544 33.176 85.334 31.281c36.633-1.623 69.07-24.099 105.659-21.838 38.593 2.386 75.936 45.765 114.284 50.257 45.833 5.37 87.596-30.62 87.596-30.62V0Z"
    />
    <Path
      fill="#6DC47E"
      d="M393 0H.127v352.294s49.433 30.202 92.224 28.354c36.632-1.583 70.108-20.587 106.696-18.382 38.594 2.326 67.07 39.205 105.418 43.585C350.297 411.087 393 380.648 393 380.648V0Z"
    />
  </Svg>
)
export default Banner
