import React from 'react'
import { useState, useEffect, useRef } from 'react'

const StopWatch = () => {

	const [IsRunning, setIsRunning] = useState(false);
	const [ElapsedTime, setElapsedTime] = useState(0);
	const IntervalIdRef = useRef(null);
	const StartTimeRef = useRef(0);

	useEffect(() => {

		IntervalIdRef.current = setInterval(() => {
			if (IsRunning) {
				setElapsedTime(Date.now() - StartTimeRef.current)
			}
		}, 10);

		return () => {
			clearInterval(IntervalIdRef.current);
		}

	}, [IsRunning])

	function Start() {
		setIsRunning(true);
		StartTimeRef.current = Date.now() - ElapsedTime;


	}
	function Stop() {
		setIsRunning(false);
	}
	function Reset() {
		setIsRunning(false);
		setElapsedTime(0);
	}
	function FormatTime() {

		let Hours = Math.floor(ElapsedTime / (1000 * 60 * 60));
		let Minutes = Math.floor(ElapsedTime / (1000 * 60) % 60);
		let Seconds = Math.floor(ElapsedTime / (1000) % 60);
		let Miliseconds = Math.floor((ElapsedTime % 1000) / 10);

		Hours = String(Hours).padStart(2, "0");
		Minutes = String(Minutes).padStart(2, "0");
		Seconds = String(Seconds).padStart(2, "0");
		Miliseconds = String(Miliseconds).padStart(2, "0");

		return `${Minutes}:${Seconds}:${Miliseconds}`
	}


	return (
		<div className='flex justify-center items-center h-screen bg-gray-500'>
			<div className='h-[400px] w-[400px] border-2 border-indigo-500 bg-teal-500/70 flex justify-center items-center rounded-3xl'>
				<div className='space-y-4'>
					<h1 className='text-center font-bold text-6xl text-slate-700'>{FormatTime()}</h1>
					<div className='text-center space-x-2'>
						<button onClick={Start} className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-green-500/70 text-xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Start</button>
						<button onClick={Stop} className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-blue-500/70 text-xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Stop</button>
						<button onClick={Reset} className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-red-500/70 text-xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Reset</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StopWatch;