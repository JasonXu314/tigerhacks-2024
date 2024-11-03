import * as React from 'react';
import Svg, { Defs, Path, RadialGradient, Stop, SvgProps } from 'react-native-svg';
const Banner = (props: SvgProps) => (
	<Svg width={393} height={422} fill="none" {...props}>
		<Path
			fill="#92E5A2"
			d="M392.873 0H0v361.315s42.544 33.176 85.334 31.281c36.633-1.623 69.07-24.099 105.659-21.838 38.593 2.386 75.936 45.765 114.284 50.257 45.833 5.37 87.596-30.62 87.596-30.62V0Z"
		/>
		<Path
			fill="url(#a)"
			d="M393 0H.127v352.294s49.433 30.202 92.224 28.354c36.632-1.583 70.108-20.587 106.696-18.382 38.594 2.326 67.07 39.205 105.418 43.585C350.297 411.087 393 380.648 393 380.648V0Z"
		/>
		<Path
			stroke="#000"
			strokeLinejoin="bevel"
			d="M.607 377.846s40.487 18.148 71.74 18.301c39.862.194 61.169-33.955 101.02-32.942 46.01 1.17 58.786 49.97 104.68 53.438 47.735 3.608 115.661-50.51 115.661-50.51"
		/>
		<Defs>
			<RadialGradient id="a" cx={0} cy={0} r={1} gradientTransform="matrix(0 203.228 -196.437 0 196.563 203.228)" gradientUnits="userSpaceOnUse">
				<Stop stopColor="#59B86B" />
				<Stop offset={1} stopColor="#6DC47E" />
			</RadialGradient>
		</Defs>
	</Svg>
);
export default Banner;

