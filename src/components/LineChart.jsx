import React from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;
ChartJS.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory?.data?.history[i].price);
	}

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		const timestamp = coinHistory?.data?.history[i].timestamp;
		const date = new Date(timestamp * 1000); // Преобразование секунд в миллисекунды
		const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Форматирование даты в "DD/MM/YYYY"
		coinTimestamp.push(formattedDate);
	}

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: 'Price In USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	const options = {
		scales: {
			x: {
				beginAtZero: true,
			},
		},
	};

	return (
		<>
			<Row className='chart-header'>
				<Title level={2} className='chart-title'>
					{coinName} Price Chart{' '}
				</Title>
				<Col className='price-container'>
					<Title level={5} className='price-change'>
						Change: {coinHistory?.data?.change}%
					</Title>
					<Title level={5} className='current-price'>
						Current {coinName} Price: $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};

export default LineChart;
