import Svg, {Path} from 'react-native-svg';

interface SvgArrowDownProps {
  color?: string;
  width?: number;
  height?: number;
}

export const SvgArrowDown = ({
  width = 16,
  height = 16,
  color = '#002859',
}: SvgArrowDownProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58021 10.8267 7.06688 10.3133L2.72021 5.96667"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
