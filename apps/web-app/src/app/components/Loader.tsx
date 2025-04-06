import { FC } from 'react';

const Loader: FC = () => {
	return (
		<div className="flex justify-center items-center absolute inset-0">
			<div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
		</div>
	);
};

export default Loader;
