import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BarsChart(props) {
  const { data, labels, total, meta, metaAlDiaria } = props;
  var midata = {
    labels: labels,
    datasets: [
      {
        label: "Venta Mes",
        data: data,
        tension: 0.5,
        backgroundColor: "rgba(255, 0, 0, 0.7)", // Rojo transparente
        borderColor: "rgba(255, 0, 0, 1)", // Borde rojo sólido
        borderWidth: 1,
      },
      {
        label: "Meta Mes",
        data: meta,
        tension: 0.5,
        backgroundColor: "rgba(0, 255, 0, 0.7)", // Verde transparente
        borderColor: "rgba(0, 255, 0, 1)", // Borde verde sólido
        borderWidth: 1,
      },
      // {
      //   label: "Meta Al día",
      //   data: metaAlDiaria,
      //   tension: 0.5,
      //   backgroundColor: "rgba(0, 0, 255, 0.7)", // Azul transparente
      //   borderColor: "rgba(0, 0, 255, 1)", // Borde azul sólido
      //   borderWidth: 1,
      // },
    ],
  };
  var options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={midata} options={options} />;
}
