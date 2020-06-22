'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../assets/styles/style.css');

var _d3Shape = require('d3-shape');

var shape = _interopRequireWildcard(_d3Shape);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Transition = require('d3-transition');

var _d3Selection = require('d3-selection');

var _d3Interpolate = require('d3-interpolate');

var _propTypes = require('prop-types');

var _DonutChartTooltip = require('./DonutChartTooltip');

var _DonutChartTooltip2 = _interopRequireDefault(_DonutChartTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonutChart = function (_Component) {
  _inherits(DonutChart, _Component);

  function DonutChart(props) {
    _classCallCheck(this, DonutChart);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleMouseOut = function () {
      _this.setState({
        selectedArc: {}
      });
    };

    _this.handleMouseOver = function (data, mousePosition) {
      _this.setState({
        mousePosition: mousePosition,
        selectedArc: data
      });
    };

    _this.update = function () {
      var totalCount = 0;

      var _this$props = _extends({}, _this.props),
          donutData = _this$props.data;

      donutData.forEach(function (data) {
        return totalCount += data.count;
      });
      var data = donutData && donutData.map(function (donutChartData) {
        var percentage = donutData.count * 100 / totalCount || 0;

        return _extends({}, donutChartData, { percentage: percentage });
      });

      _this.state.circle.select('#total-count').text(100);
      _this.state.g.data(_this.state.pie(data));

      if (_this.props.transition) {
        _this.state.g.select('path').interrupt().transition(_this.state.trans).attrTween('d', function (d) {
          var i = (0, _d3Interpolate.interpolate)(d.startAngle, d.endAngle);

          return function (t) {
            d.endAngle = i(t);

            return _this.state.arc(d);
          };
        }).style('fill', function (d, i) {
          return d.data.color;
        });
      } else {
        _this.state.g.select('path').style('fill', function (d, i) {
          return d.data.color;
        });
      }
    };

    _this.state = {
      selectedArc: {},
      mousePosition: {}
    };
    return _this;
  }

  DonutChart.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var data = [].concat(this.props.data);
    var svg = (0, _d3Selection.select)('.' + this.props.pieClass).append('svg').attr('width', this.props.outerRadius * 2).attr('height', this.props.outerRadius * 2).attr('class', this.props.svgClass).append('g');

    var translate = {
      x: this.props.outerRadius,
      y: this.props.outerRadius
    };
    var arc = shape.arc().outerRadius(this.props.outerRadius).innerRadius(this.props.innerRadius);

    var pie = shape.pie().sort(null).value(function (d) {
      return d.count;
    });

    var circle = (0, _d3Selection.select)('svg').append('g');

    var trans = (0, _d3Transition.transition)().duration(1000);

    // TODO: Implement an option to display text at the center of the pie chart
    // if (this.props.displayCenterText) {
    //   circle
    //     .append('svg:circle')
    //     .attr('stroke', 'white')
    //     .attr('fill', '#132434')
    //     .attr('r', this.props.innerRadius)
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    //   circle
    //     .append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', this.props.outerRadius / 2)
    //     .attr('y', 0)
    //     .attr('id', 'total-count')
    //     .text(totalCount)
    //     .style('fill', 'white')
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    //   circle
    //     .append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', this.props.outerRadius)
    //     .attr('y', 20)
    //     .text(this.props.centerText)
    //     .style('fill', 'white')
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');
    // }

    var g = svg.selectAll(this.props.svgClass).data(pie(data)).enter().append('g').attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    var path = g.attr('id', function (d, i) {
      return i;
    }).append('path').on('mouseover', function (d) {
      var mousePosition = {
        x: _d3Selection.event.layerX,
        y: _d3Selection.event.layerY
      };

      _this2.handleMouseOver(d.data, mousePosition);
    }).on('mouseout', function () {
      _this2.handleMouseOut();
    }).attr('d', arc).attr('stroke', 'white').attr('stroke-width', this.props.strokeWidth);

    if (this.props.transition) {
      path.transition(trans).attrTween('d', function (d) {
        var i = (0, _d3Interpolate.interpolate)(d.startAngle, d.endAngle);

        return function (t) {
          d.endAngle = i(t);

          return arc(d);
        };
      }).style('fill', function (d, i) {
        return d.data.color;
      });
    }

    this.setState({
      g: g,
      pie: pie,
      svg: svg,
      arc: arc,
      path: path,
      trans: trans,
      circle: circle
    }, this.update);
  };

  DonutChart.prototype.componentDidUpdate = function componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.update();
    }
  };

  DonutChart.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: this.props.pieClass, style: { position: 'relative' }, id: 'arc' },
      this.props.displayTooltip && Object.keys(this.state.selectedArc).length ? _react2.default.createElement(_DonutChartTooltip2.default, {
        pieClass: this.props.pieClass,
        tooltipClass: this.props.tooltipClass,
        name: this.state.selectedArc.name || '',
        count: this.state.selectedArc.count || 0,
        mousePosition: this.state.mousePosition
      }) : null
    );
  };

  return DonutChart;
}(_react.Component);

DonutChart.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes.array.isRequired,
  outerRadius: _propTypes.number.isRequired,
  innerRadius: _propTypes.number.isRequired,
  strokeWidth: _propTypes.number.isRequired,
  svgClass: _propTypes.string.isRequired,
  pieClass: _propTypes.string.isRequired,
  transition: _propTypes.bool,
  tooltipClass: _propTypes.string,
  displayTooltip: _propTypes.bool
} : {};

exports.default = DonutChart;
module.exports = exports['default'];