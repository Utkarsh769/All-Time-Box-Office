import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = ({ movies }) => {
  // Get top 10 movies by revenue
  const top10Movies = movies
    .filter((movie) => movie.revenue && movie.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  if (top10Movies.length === 0) {
    return null;
  }

  const chartData = {
    labels: top10Movies.map((movie) => movie.title.length > 20 
      ? movie.title.substring(0, 20) + '...' 
      : movie.title),
    datasets: [
      {
        label: 'Revenue (USD)',
        data: top10Movies.map((movie) => movie.revenue),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 10 Movies by Revenue',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Revenue: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
              notation: 'compact',
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default ChartSection;

