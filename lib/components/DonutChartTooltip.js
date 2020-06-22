'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var studentCount = name + ': ' + count;
  var tooltipStyle = tooltipClass || 'donut-tooltip';

  return _react2.default.createElement(
    'div',
    { className: tooltipStyle, style: { marginLeft: positionX, marginTop: positionY } },
    studentCount
  );
}

DonutChartTooltip.propTypes = process.env.NODE_ENV !== "production" ? {
  count: _propTypes.number,
  name: _propTypes.string,
  tooltipClass: _propTypes.string,
  mousePosition: (0, _propTypes.shape)({
    x: _propTypes.number,
    y: _propTypes.number
  }),
  pieClass: _propTypes.string
} : {};

exports.default = DonutChartTooltip;
module.exports = exports['default'];