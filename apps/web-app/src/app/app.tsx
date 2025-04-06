import { FC, useEffect, useState } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import Loader from './components/Loader';

interface ConversionRateData {
	timestamp: number;
	rate: number;
}

const App: FC = () => {
	const [rates, setRates] = useState<ConversionRateData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const eventSource = new EventSource('http://localhost:3000/api/pufeth-conversion-rate');

		eventSource.onmessage = ({ data }) => {
			try {
				const parsed = JSON.parse(data);
				const rate = Number(parsed.rate);
				if (!isNaN(rate)) {
					const timestamp = Date.now();
					setRates((prev) => [...prev, { rate, timestamp }]);
				}
			} catch (error) {
				console.error('Invalid SSE data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-6 font-sans">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
					pufETH Conversion Rate Tracker
				</h1>

				<div className="bg-white p-4 rounded-lg shadow mb-8 relative">
					{isLoading ? (
						<div className="h-[376px]">
							<Loader />
						</div>
					) : (
						<>
							<h2 className="text-xl font-semibold mb-4">Live Chart</h2>
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={rates}>
									<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
									<XAxis
										dataKey="timestamp"
										tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
									/>
									<YAxis domain={['auto', 'auto']} />
									<Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
									<Line
										type="monotone"
										dataKey="rate"
										stroke="#7c3aed"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</>
					)}
				</div>

				<div className="bg-white p-4 rounded-lg shadow relative">
					{isLoading ? (
						<div className="h-[135px]">
							<Loader />
						</div>
					) : (
						<>
							<h2 className="text-xl font-semibold mb-4">Conversion Rate History</h2>
							<ul className="max-h-80 overflow-y-auto space-y-2 text-sm">
								{rates.reverse().map((item, idx) => (
									<li key={idx} className="flex justify-between border-b pb-1 text-gray-700">
										<span>{new Date(item.timestamp).toLocaleTimeString()}</span>
										<span className="font-mono">{item.rate.toFixed(6)}</span>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
