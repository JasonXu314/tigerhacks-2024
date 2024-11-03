import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
const Camera = (props: SvgProps) => (
	<Svg width={55} height={39} fill="none" {...props}>
		<Path
			fill="#fff"
			stroke="#404040"
			strokeWidth={2}
			d="M1.002 35V10.442a3 3 0 0 1 3-3h10.194a3 3 0 0 0 2.42-1.228l2.367-3.232a3 3 0 0 1 2.42-1.228h11.76a3 3 0 0 1 2.44 1.254l2.274 3.18a3 3 0 0 0 2.44 1.254h10.311a3 3 0 0 1 3 3V35a3 3 0 0 1-3 3H4.002a3 3 0 0 1-3-3Z"
		/>
		<Path
			fill="#FEB762"
			stroke="#404040"
			strokeWidth={2}
			d="M37.467 23.35c0 5.27-4.5 9.623-10.152 9.623-5.653 0-10.152-4.354-10.152-9.624 0-5.27 4.5-9.623 10.152-9.623 5.653 0 10.152 4.354 10.152 9.623Z"
		/>
		<Rect width={8.84} height={2.429} x={22.895} y={5.673} fill="#FEB762" stroke="#404040" strokeWidth={2} rx={1.215} />
	</Svg>
);
export default Camera;
