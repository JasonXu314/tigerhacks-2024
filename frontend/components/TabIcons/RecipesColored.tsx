import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RecipesColored = (props: SvgProps) => (
  <Svg
    width={21}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6DC47E"
      d="M3.168.556H16.51a3 3 0 0 1 3 3v19.079M3.168.556C1.301.496.726.784.57 1.883v22.682M3.168.556v22.079M.57 24.565c-.012 1.173.626 1.42 2.598 1.327h14.713c.9 0 1.63-.729 1.63-1.629M.57 24.565c-.098-1.574.5-1.993 2.598-1.93m0 0H19.51m0 0v1.628m0 0h-6.074"
    />
    <Path
      stroke="#6DC47E"
      d="M12.23 18.538c.51.809 1.1 1.739 1.847 1.481.776-.267.513-1.424.217-2.364-.373-1.189-3.37-6.325-4.248-7.819a.504.504 0 0 0-.665-.186.443.443 0 0 1-.068.029.419.419 0 0 0-.271.54c.566 1.604 2.654 7.47 3.188 8.319ZM9.64 5.982c.367.788.471 1.575.366 2.2-.105.627-.406 1.034-.797 1.202-.392.167-.91.11-1.467-.234-.555-.342-1.097-.942-1.464-1.73s-.471-1.575-.366-2.2c.105-.627.406-1.034.797-1.202.392-.167.91-.11 1.467.234.555.342 1.097.942 1.464 1.73Z"
    />
    <Path
      stroke="#6DC47E"
      d="M7.67 17.708c-.313.896-.667 1.931.022 2.308.716.392 1.463-.55 2.018-1.376.702-1.043 2.836-6.562 3.452-8.171a.466.466 0 0 0-.285-.606.445.445 0 0 1-.066-.03.452.452 0 0 0-.605.152c-.905 1.452-4.21 6.782-4.537 7.723Z"
    />
    <Path
      stroke="#6DC47E"
      strokeLinecap="round"
      d="m13.314 9.393-.543-.357a1 1 0 0 1-.315-1.342l2.097-3.578m-1.239 5.277 2.625-4.448m-2.625 4.448.498.299a1 1 0 0 0 1.377-.35l2.11-3.584"
    />
  </Svg>
)
export default RecipesColored