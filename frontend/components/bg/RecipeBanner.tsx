import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const RecipeBanner = (props: SvgProps) => (
	<Svg width={393} height={133} fill="none" {...props}>
		<Path
			fill="#92E5A2"
			d="M0 .866h392.873v109.682s-42.544 10.071-85.334 9.495c-36.632-.492-69.07-7.315-105.658-6.629-38.594.724-75.937 13.892-114.285 15.256C41.763 130.3 0 119.375 0 119.375V.866Z"
		/>
		<Path
			fill="#6DC47E"
			d="M.127 1.201H393V102.04s-30.665 14.836-73.455 14.275c-36.633-.481-73.509-14.944-110.098-14.275-38.593.706-83.307 17.941-121.655 19.27C41.96 122.899.127 111.172.127 111.172V1.202Z"
		/>
		<Path
			stroke="#000"
			strokeLinejoin="bevel"
			d="M0 125.257s43.053 7.058 70.832 6.767c52.23-.547 78.726-27.813 130.958-27.914 44.048-.086 67.367 24.018 111.191 19.455 32.491-3.383 79.892-25.376 79.892-25.376"
		/>
	</Svg>
);
export default RecipeBanner;
