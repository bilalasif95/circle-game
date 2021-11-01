import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './App.css';

var timer;

const App = () => {
  const [selected, setSelected] = useState(-1);
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false)
  const [stop, setStop] = useState(true)

  const generateRandomNumbers = () => {
    var randomDataSet = [];
    for (let i = 0; i < 12; i++) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      randomDataSet[i] = {
        title: i, value: 8.3, color: '#' + randomColor
      };
    }
    randomDataSet = randomDataSet.filter((res) => res !== undefined)

    var temp, current, top = randomDataSet.length;
    if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      temp = randomDataSet[current];
      randomDataSet[current] = randomDataSet[top];
      randomDataSet[top] = temp;
    }
    setData(randomDataSet)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  const onStart = () => {
    generateRandomNumbers()
    setStart(true)
    setStop(false)
    setSelected(0)
    let temp = -1;
    let select = 0
    timer = setInterval(() => {
      temp = temp + 1;
      if (temp > 11) {
        setStart(false)
        setStop(true)
        clearInterval(timer)
        setSelected(-1)
      }
      else {
        select = data[temp].title
        setSelected(select)
      }
    }, 5000)
  }

  const onStop = () => {
    setStart(false)
    setStop(true)
    clearInterval(timer)
    setSelected(-1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <PieChart
            viewBoxSize={[100, 100]}
            segmentsShift={(index) => (index === selected ? 6 : -1)}
            data={data}
          />
          <button disabled={start} onClick={() => onStart()}>Start</button>
          <button disabled={stop} onClick={() => onStop()}>Stop</button>
        </p>
      </header>
    </div>
  );
}

export default App;
