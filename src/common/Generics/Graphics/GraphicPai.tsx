import { FC, useEffect, useState } from 'react';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from "react-chartjs-2";

interface IProps {
    labels?: Object[]
    count?: Object[]
    data?: []
}

const GraphicPai: FC<IProps> = ({ /* labels, count, data */ }) => {
    const areaChartOptions = {
        chart: {
            id: 'new-stack-chart',
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            }
        },
        fill: {
            opacity: [1, 0.7, 0.4, 0.3]
        },
        grid: {
            strokeDashArray: 4
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '80%'
            }
        },
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            }
        },
        legend: {
            show: false
        }
    };
    const [options, setOptions] = useState<ChartProps>(areaChartOptions);

    const [series] = useState<any>([
        {
            name: 'Productos',
            data: [44, 55, 41, 67, 52, 53, 13, 23, 20, 8, 13, 27, 50, 1, 2, 31, 1, 1, 1, 1, 1, 1, 11, 1, 11, 1, , 1, 2, 21, 2, 1, 2, 12, , 3, 4, 3, 4, 3, 4,]
        }
    ]);
    useEffect(() => {
        setOptions((prevState: any) => ({
            ...prevState,
            colors: ['#e96c3f', '#e96c3f', '#e96c3f', '#e96c3f'],
            xaxis: {
                categories: [' item 1', 'item 2', 'item 3', 'item item item 4', 'item item 5', 'itemitemitem6', '7', '8', '9', '10', '11', '1211', '13'],
                labels: {
                    style: {
                        colors: [
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd',
                            '#0d6efd'
                        ]
                    }
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
                tickAmount: 11
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#0d6efd"
                    }
                }
            },


        }));
    }, []);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    /*     const labels2 = data.map((item: any) => item.nombre);
        const values = data.map((item: any) => item.cantidad);
        const randomColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        };
        const backgroundColors = data.map(() => randomColor()); */

    /*   const chartData = {
          labels: labels2,
          datasets: [
              {
                  label: 'Cantidad Vendida',
                  backgroundColor: backgroundColors,
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(75,192,192)',
                  hoverBorderColor: 'rgba(75,192,192,1)',
                  data: values,
              },
          ],
      } */
    /*    const chartData = {
           labels: labels,
           datasets: [
               {
                   label: "labels",
                   data: count,
                   backgroundColor: [
                       'rgb(237, 164, 47)',
                       'rgb(221, 92, 45)',
                       'rgb(87, 173, 87)',
   
                   ],
                   borderColor: [
                       'rgb(237, 164, 47)',
                       'rgb(221, 92, 45)',
                       'rgb(87, 173, 87)',
   
                   ]
               },
           ],
       }; */
    const option = {
        x: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        }
    }
    return (
        <div >
            {/*     <Bar width={320} height={200} data={chartData} options={option} /> */}
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default GraphicPai