import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
const Pantry = (props: SvgProps) => (
  <Svg
    width={165}
    height={217}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M.697 170.539V2.972a2 2 0 0 1 2-2h159.902a2 2 0 0 1 2 2V170.54a2 2 0 0 1-2 2H2.697a2 2 0 0 1-2-2Z"
    />
    <Path
      fill="url(#b)"
      d="M6.505 164.463V9.047a2 2 0 0 1 2-2H156.79a2 2 0 0 1 2 2v155.416a2 2 0 0 1-2 2H8.505a2 2 0 0 1-2-2Z"
    />
    <Path fill="#C6C9D1" d="M159.092 7.047v159.479l-3.748-2.501V7.047h3.748Z" />
    <Path
      fill="#DFE1E6"
      d="m155.141 114.753 4.07 8.253H6.782v-8.253h148.359ZM154.722 72.134l4.069 8.253H6.363v-8.253h148.359ZM154.722 29.515l4.069 8.254H6.363v-8.253h148.359Z"
    />
    <Path fill="url(#c)" d="M158.791 44.137H8.983V37.19h149.808v6.946Z" />
    <Path fill="url(#d)" d="M158.791 86.755H8.983V79.81h149.808v6.945Z" />
    <Path
      stroke="#F3F5FC"
      d="M158.791 7.047s-12.517 5.075-20.72 5.009c-7.937-.065-20.029-5.009-20.029-5.009M158.791 7.578s-14.239 6.688-22.917 13.022c-6.1 4.453-15.413 11.416-15.413 11.416M158.791 7.343 139.626 34.36M158.791 7.047l-5.752 30.042M156.727 18.13s-.681-1.452-1.667-1.93c-1.06-.514-2.621-.306-2.621-.306M155.344 24.89s-.975-2.72-2.389-3.615c-1.52-.963-3.758-.573-3.758-.573M154.164 30.677s-1.379-3.11-3.378-4.134c-2.149-1.1-5.313-.655-5.313-.655M153.247 36.704s-1.89-2.989-4.63-3.973c-2.945-1.058-7.282-.63-7.282-.63"
    />
    <Path
      stroke="#F3F5FC"
      d="M152.647 16.059s-.298-1.797-1.052-2.564c-.809-.823-2.222-1.018-2.222-1.018M149.373 20.895s-.841-2.681-2.13-3.824c-1.384-1.227-3.891-1.219-3.891-1.219M145.795 25.481s-1.374-2.959-3.425-4.296c-2.203-1.437-5.229-1.388-5.229-1.388"
    />
    <Path
      fill="#DFE1E7"
      d="m103.86 43.828-2.215 2.166L2.709 2.788h5.27l95.881 41.04Z"
    />
    <Path
      fill="#DFE1E6"
      d="m155.514 158.615 4.069 8.254H7.155v-8.254h148.359Z"
    />
    <Path
      stroke="#F3F5FC"
      d="M141.335 32.016s-2.053-3.05-5.118-4.429c-3.293-1.481-7.815-1.43-7.815-1.43M149.819 12.477s-.391-.909-.974-1.319c-.627-.441-1.488-.426-1.488-.426M143.73 15.852s-1.404-1.414-3.03-2.274c-1.747-.924-3.99-1.522-3.99-1.522M137.141 19.833s-.587-2.441-2.667-4.772c-2.079-2.33-5.498-4.447-5.498-4.447M129.115 25.799s-.861-4.295-2.518-8.372c-1.78-4.382-4.472-8.958-4.472-8.958"
    />
    <Path fill="url(#e)" d="M158.791 129.374H8.983v-6.946h149.808v6.946Z" />
    <Path
      fill="#E6E8EF"
      d="M101.54 47.131v165.99a2 2 0 0 1-2.813 1.827L1.883 171.815a2 2 0 0 1-1.186-1.827V4.952a2 2 0 0 1 2.798-1.834l96.844 42.18a2 2 0 0 1 1.201 1.833Z"
    />
    <Path
      fill="#D6D8DE"
      d="m103.846 212.463-2.675 2.055.316-168.316 2.359-2.668v168.929Z"
    />
    <Path
      fill="#D2D5DE"
      d="M88.362 123.824c-.183-6.346 2.304-15.345 2.64-16.528a.965.965 0 0 0 .037-.268c0-1.089-1.401-1.318-1.713-.275-1.426 4.781-3.228 11.845-3.247 17.071-.018 5.094 1.672 11.443 3.084 15.851.366 1.141 1.876.872 1.876-.327 0-.098-.012-.19-.037-.284-.311-1.156-2.471-9.369-2.64-15.24Z"
    />
    <Path
      stroke="#F3F5FC"
      d="M137.651 136.17s-1.808-2.336-3.863-2.971c-2.209-.683-5.074 0-5.074 0M125.972 156.102s-.424-.546-.961-.894c-.577-.375-1.396-.29-1.396-.29M128.714 151.188s-.889-1.039-1.736-1.5c-.91-.496-2.1-.362-2.1-.362M133.182 143.266s-1.291-1.763-2.742-2.243c-1.56-.515-3.567 0-3.567 0M123.615 155.136s-.338-.482-.707-.571c-.397-.095-.897.157-.897.157M124.793 149.309s-.728-.547-1.368-.602c-.688-.059-1.414.344-1.414.344M126.873 140.794s-1.594-.988-2.912-1.05c-1.416-.066-2.819.763-2.819.763M128.916 133.082s-2.531-1.102-4.781-.982c-2.418.129-4.529 1.395-4.529 1.395"
    />
    <Path
      stroke="#F3F5FC"
      d="M108.22 129.227s6.163 9.988 9.004 18.284c2.167 6.325 4.46 16.558 4.46 16.558m0 0s1.136-12.561 0-20.465c-.955-6.642-3.821-14.377-3.821-14.377m3.821 34.842s2.337-12.574 4.459-20.465c1.761-6.548 4.106-15.787 4.106-15.787m-8.565 36.252s5.705-10.873 9.632-17.674c4.138-7.165 15.618-20.494 15.618-20.494"
    />
    <Path
      stroke="#F3F5FC"
      d="M119.606 133.692s-2.205-.651-4.334 0c-2.129.651-3.127 2.452-3.127 2.452M121.142 140.584s-1.701-.712-3.344 0c-1.642.712-2.413 2.682-2.413 2.682M122.429 149.136s-1.35-.546-2.617-.251c-1.267.295-1.823 1.364-1.823 1.364M122.011 154.645s-.768-.228-1.51 0a2.015 2.015 0 0 0-1.089.861"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={164.599}
        x2={0.697}
        y1={86.755}
        y2={86.755}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E5E7ED" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={158.791}
        x2={6.505}
        y1={86.755}
        y2={86.755}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D3D5DA" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={8.983}
        x2={158.791}
        y1={40.664}
        y2={40.664}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={1} stopColor="#CACCD1" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={8.983}
        x2={158.791}
        y1={83.282}
        y2={83.282}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={1} stopColor="#CACCD1" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={8.983}
        x2={158.791}
        y1={125.901}
        y2={125.901}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={1} stopColor="#CACCD1" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default Pantry
