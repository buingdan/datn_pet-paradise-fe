import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";

function Chart({ orders, total, width, startDate, endDate }) {
  const dateArray = [];
  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate);

  if (startDateMoment.isValid() && endDateMoment.isValid()) {
    for (
      let date = startDateMoment.clone();
      date.isSameOrBefore(endDateMoment, "day");
      date.add(1, "day")
    ) {
      dateArray.push(date.format("DD/MM/YYYY"));
    }
  }
  const [config, setConfig] = useState({
    rotate: 90,
    align: "left",
    verticalAlign: "middle",
    position: "insideBottom",
    distance: 15,
  });

  const labelOption = {
    show: true,
    position: config.position,
    distance: config.distance,
    align: config.align,
    verticalAlign: config.verticalAlign,
    rotate: config.rotate,
    // formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {},
    },
  };
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: orders ? ["Đơn hàng"] : total ? ["Doanh số"] : [],
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        // data: dateArray
        data: ["2012", "2013", "2014", "2015", "2016"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: orders
      ? [
          {
            name: "Đơn hàng",
            type: "bar",
            stack: "Tổng số",
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210],
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#266b28eb",
            },
          },
        ]
      : [
          {
            name: "Doanh số",
            type: "bar",
            stack: "Tổng số",
            barGap: 0,
            label: labelOption,
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ minHeight: "400px" }}
      width={width}
    />
  );
}

export default Chart;
