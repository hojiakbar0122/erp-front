import { Button } from "antd"
import { useWorker } from "../../hooks/useWorker"

const Worker = () => {
    const {runWorker, result} = useWorker()

    const calculate = ()=>{
        runWorker(10000000000)
    }
    const test = ()=>{
        console.log("test");
        
    }
  return (
    <div>
        <h1>Worker</h1>
        <Button type="primary" onClick={calculate}>
            Calculate
        </Button>
        <Button type="primary" onClick={test}>
            run test
        </Button>
        <h1>Result: {result}</h1>
    </div>
  )
}

export default Worker