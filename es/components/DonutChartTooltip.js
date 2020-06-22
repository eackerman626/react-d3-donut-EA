import React from 'react';
import { number, shape, string } from 'prop-types';

function DonutChartTooltip(props) {
	var count = props.count,
		name = props.name,
		mousePosition = props.mousePosition,
		pieClass = props.pieClass,
		tooltipClass = props.tooltipClass;

	var donutChart = document.getElementsByClassName(pieClass);
	var container = donutChart.length && donutChart[0].getBoundingClientRect();
	var positionY = mousePosition.y - container.height;
	var positionX = mousePosition.x;
	var studentCount = name + ': ' + (count * 100).toFixed(2) + '%';
	var tooltipStyle = tooltipClass || 'donut-tooltip';

	return React.createElement('div', { className: tooltipStyle, style: { marginLeft: positionX, marginTop: positionY, zIndex: 1 } }, studentCount);
}

DonutChartTooltip.propTypes =
	process.env.NODE_ENV !== 'production'
		? {
				count: number,
				name: string,
				tooltipClass: string,
				mousePosition: shape({
					x: number,
					y: number,
				}),
				pieClass: string,
		  }
		: {};

export default DonutChartTooltip;
