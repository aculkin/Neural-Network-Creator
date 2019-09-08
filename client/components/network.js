import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LinearDeterminate from './progress'

import {Network, Layer} from 'synaptic'
import mnist from 'mnist'

export default class NuralNetwork extends Component {
  constructor() {
    super()
    this.state = {
      numberOfNodes: 16,
      learningRate: 0.1,
      trainingExamples: 4000,
      percentTrainingComplete: 0,
      percentTestingComplete: 0,
      percentCorrect: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.runNuralNetwork = this.runNuralNetwork.bind(this)
  }

  handleSubmit = function() {
    event.preventDefault()
    this.runNuralNetwork()
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
    this.setState({
      percentTrainingComplete: 50
    })
    //console.log(this.state.percentTrainingComplete)
  }

  async runNuralNetwork() {
    console.log('running')
    const numberOfNodes = this.state.numberOfNodes
    const learningRate = this.state.learningRate
    const trainingNumber = this.state.trainingExamples
    const dataSet = mnist.set(10000, 500)
    let trainingSet = dataSet.training
    let testSet = dataSet.test
    // if (trainingNumber > 9700) {
    //   trainingNumber = 9700
    // }
    const networkResultChanger = arr => {
      if (arr.length === 0) {
        return -1
      }
      let max = arr[0]
      let maxIndex = 0
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i
          max = arr[i]
        }
      }
      return maxIndex
    }
    const resultChanger = arr => {
      let index = 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
          index = i
        }
      }
      //console.log('completed resultChanger')
      return index
    }

    //create layers
    const inputLayer = new Layer(784)
    const hiddenLayer1 = new Layer(numberOfNodes)
    const outputLayer = new Layer(10)

    //connect layers
    inputLayer.project(hiddenLayer1)
    hiddenLayer1.project(outputLayer)

    //createNetwork
    const myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer1],
      output: outputLayer
    })

    const customTrainer = (learningRate, trainingSet, trainingNumber) => {
      // for (let i = 0; i < trainingNumber; i++) {
      //   myNetwork.activate(trainingSet[i].input)
      //   myNetwork.propagate(learningRate, trainingSet[i].output)
      //   const progress = i * 100 / trainingNumber
      //   console.log(i * 100 / trainingNumber)
      // }
      for (let i = 0; i < trainingNumber; i++) {
        myNetwork.activate(trainingSet[i % 9756].input)
        myNetwork.propagate(learningRate, trainingSet[i % 9756].output)
        const progress = i * 100 / trainingNumber
        console.log(progress)
      }
    }
    customTrainer(learningRate, trainingSet, trainingNumber)

    const visualizer = (input, output) => {
      let result = ''
      let count = 0
      for (let i = 0; i < 784; i++) {
        if (count % 28 === 0) {
          result = result + '\n'
        }
        if (input[count] > 0.5) {
          result = result + '88'
        } else if (input[count] > 0.25) {
          result = result + '8 '
        } else {
          result = result + '. '
        }
        count++
      }
      console.log(result)
      //console.log(`Network result: ${output}`)
    }

    const testNetwork = (testSet, maxTestAmmount) => {
      let correct = 0
      let wrong = 0
      if (maxTestAmmount > testSet.length) {
        maxTestAmmount = testSet.length
      }
      for (let i = 0; i < maxTestAmmount; i++) {
        let networkResult = networkResultChanger(
          myNetwork.activate(testSet[i].input)
        )
        let actualResult = resultChanger(testSet[i].output)
        if (networkResult === actualResult) {
          correct++
        } else {
          wrong++
          visualizer(testSet[i].input, networkResult)
          console.log(`Network result: ${networkResult}`)
          console.log(`Actual result : ${actualResult}`)
        }
      }
      console.log(`${correct * 100 / (correct + wrong)}% correct`)
    }
    testNetwork(testSet, 500)
  }

  render() {
    const container = {
      display: 'flex',
      flexWrap: 'wrap'
    }
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className={container}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="numberOfNodes"
            name="numberOfNodes"
            label="Number of Nodes"
            value={this.state.numberOfNodes}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            helperText="This should be more than 10"
          />
          <TextField
            id="trainingExamples"
            name="trainingExamples"
            label="Number of Training Examples"
            value={this.state.trainingExamples}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            helperText="10,000 examples and 16 nodes =~ 30 seconds"
          />
          <TextField
            id="learningRate"
            name="learningRate"
            label="Learning Rate"
            value={this.state.learningRate}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            helperText="anywhere between .01 and 1"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
          >
            Run Nural Network
          </Button>
        </form>
      </div>
    )
  }
}
