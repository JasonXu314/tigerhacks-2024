import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const Search = (props: SvgProps) => (
	<Svg width={28} height={27} fill="none" {...props}>
		<Path
			stroke="#000"
			d="M16.754 17.166 14.52 15.17a1.035 1.035 0 0 1-.018-1.514.924.924 0 0 0 .13-.155.919.919 0 0 1 1.378-.175l2.319 2.081a1.18 1.18 0 0 1-1.575 1.759Z"
		/>
		<Path stroke="#000" d="M16.44 8.27c0 4.242-3.396 7.67-7.573 7.67-4.178 0-7.575-3.428-7.575-7.67S4.69.6 8.867.6c4.177 0 7.574 3.428 7.574 7.67Z" />
		<Path
			stroke="#000"
			d="M14.4 8.27c0 3.118-2.485 5.631-5.533 5.631-3.049 0-5.533-2.513-5.533-5.631 0-3.118 2.484-5.632 5.533-5.632 3.048 0 5.532 2.514 5.532 5.632ZM26.58 22.128l-5.217-5.071a2.051 2.051 0 1 0-2.779 3.017l5.483 4.783a1.856 1.856 0 0 0 2.514-2.73Z"
		/>
	</Svg>
);
export default Search;

