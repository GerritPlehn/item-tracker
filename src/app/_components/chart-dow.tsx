"use client";
import { type ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";

import { api } from "~/trpc/react";
import { items, type ItemKey } from "~/types/itemConsumption";

export function DayOfWeekChart(props: {
  itemId: ItemKey;
  from: Date;
  to: Date;
}) {
  const { itemId, from, to } = props;
  const item = items[itemId];

  const consumptionQuery = api.item.getWeekdayTotals.useQuery(
    { item: item.name, verb: item.verb, from, to },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  );

  // ApexCharts options and config
  const series = [
    {
      name: `${item.name} ${item.verb ?? "used"}`,
      data: consumptionQuery.data?.map((item) => item.sum) ?? [],
      color: "#1A56DB",
    },
  ];

  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => item.formatter.format(val),
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: function (value) {
          return item.formatter.format(Number(value));
        },
      },
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 5,
      },
    },
  };

  return (
    <div style={{ minHeight: 450 }}>
      <div className="flex justify-between">
        <div>
          <span className="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
            {item.name} per Day of Week
          </span>
        </div>
      </div>
      <ApexChart type="bar" series={series} options={options} height={450} />
      <div className="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between pt-5"></div>
      </div>
    </div>
  );
}
