// neuralNetwork.js - Implements a simple neural network visualization using TensorFlow.js and Chart.js
import * as tf from '@tensorflow/tfjs';
import Chart from 'chart.js/auto';

const nnChartCanvas = document.getElementById('nnChart');
const learningRateInput = document.getElementById('learningRate');
const neuronsInput = document.getElementById('neurons');
const trainButton = document.getElementById('trainButton');

let model, chart;

function createModel() {
    // Create a simple feed-forward model with TensorFlow.js
    model = tf.sequential();
    model.add(tf.layers.dense({ units: parseInt(neuronsInput.value), inputShape: [1], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    const learningRate = parseFloat(learningRateInput.value);
    const optimizer = tf.train.sgd(learningRate);
    model.compile({ loss: 'meanSquaredError', optimizer });
}

function createChart() {
    // Create a line chart to display the loss over epochs
    chart = new Chart(nnChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Training Loss',
                data: [],
                backgroundColor: 'rgba(102, 252, 241, 0.3)',
                borderColor: 'rgba(102, 252, 241, 0.7)',
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epoch'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Loss'
                    }
                }
            }
        }
    });
}

async function trainModel() {
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    const epochs = 20;
    for (let epoch = 0; epoch < epochs; epoch++) {
        const history = await model.fit(xs, ys, { epochs: 1 });
        const loss = history.history.loss[0];

        // Update the chart with the new loss value
        chart.data.labels.push(epoch + 1);
        chart.data.datasets[0].data.push(loss);
        chart.update();
    }
}

// Initialize the model and chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createModel();
    createChart();

    trainButton.addEventListener('click', () => {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        createModel();
        trainModel();
    });
});
