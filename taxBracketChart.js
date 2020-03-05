// Global Options
Chart.defaults.global.defaultFontFamily='Lato';
Chart.defaults.global.defaultFontSize=18;
Chart.defaults.global.defaultFontColor='#777';
Chart.defaults.global.animation=800;
Chart.defaults.global.legend.position='bottom';

var deduction = 0;
var taxRates = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
var taxBrackets = [9700, 29775, 44725, 76525, 43375, 306200];
var scale = 250000;

var slider = document.getElementById("myIncomeRange");
var output1 = document.getElementById("incomeNumber");
output1.innerHTML = slider.value;

var output2 = document.getElementById("deductionNumber");
output2.innerHTML = deduction;

var income = slider.value;

var myChart = document.getElementById('myChart').getContext('2d');
var barChartData = {
        labels:['Taxable Income'],
        datasets:[{
            label:'@ 10% Tax Rate',
            backgroundColor: '#FF5733',
            data:[
                9700
            ]
        }, {
            label:'@ 12% Tax Rate',
            backgroundColor: '#9999ff',
            data:[
                29775
            ]
        }, {
            label:'@ 22% Tax Rate',
            backgroundColor: '#e6e600',
            data:[
                44725
            ]
        }, {
            label:'@ 24% Tax Rate',
            backgroundColor: '#33FF57',
            data:[
                76525
            ]
        }, {
            label:'@ 32% Tax Rate',
            backgroundColor: '#cc33ff',
            data:[
                43375
            ]
        }, {
            label:'@ 35% Tax Rate',
            backgroundColor: '#00cc8b',
            data:[
                306200
            ]
        }]
    };

var chart = new Chart(myChart, {
    type:'bar',
    data:barChartData,
    options:{
        title: {
            display: true,
            text: 'Interactive Tax Bracket'
        },
        responsive: true,
        aspectRatio: 0.5,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                    stacked: true,
                }],
            yAxes: [{
                id: 'y-axis-1',
                stacked: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 250000,
                    callback: function(value, index, values) {
                      return value.toLocaleString("en-US",{style:"currency", currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0});
                    }
                }
            }] 
        },
        annotation: {
            drawTime: "beforeDatasetsDraw",
            annotations: [{
                id: 'box1',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 0,
              yMax: 9700,
              backgroundColor: '#ffc1b3',
              borderColor: '#ffc1b3'
            },{
                id: 'box2',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 9700,
              yMax: 39475,
              backgroundColor: '#e6e6ff',
              borderColor: '#e6e6ff'
            },{
                id: 'box3',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 39475,
              yMax: 84200,
              backgroundColor: '#ffffcc',
              borderColor: '#ffffcc'
            },{
                id: 'box4',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 84200,
              yMax: 160725,
              backgroundColor: '#ccffd5',
              borderColor: '#ccffd5'
            },{
                id: 'box5',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 160725,
              yMax: 204100,
              backgroundColor: '#f9e6ff',
              borderColor: '#ccffef'
            },{
                id: 'box6',
              type: 'box',
              yScaleID: 'y-axis-1',
              yMin: 204100,
              yMax: 510300,
              backgroundColor: '#b3ffe7',
              borderColor: '#ccffef'
            }]
        }  
    }    
});

toggleStandardDeduction();
updateChart();

function updateChart() {
    updateTaxableIncome();
    chart.update();
}

function updateTaxableIncome() {
    var remainingIncome = income-deduction;
    for (i = 0; i < 6; i++) {
        if (remainingIncome >= taxBrackets[i]) {
            chart.data.datasets[i].data[0]=taxBrackets[i];
            remainingIncome-=taxBrackets[i];
        }
        else {
            chart.data.datasets[i].data[0]=remainingIncome;
            remainingIncome=0;
        }
    }
}

function toggleStandardDeduction() {
    if (document.getElementById('stdChecked').checked) {
        deduction=12200;
    }
    else {
        deduction=0;
    }
    output2.innerHTML = deduction;
    updateChart();
}

slider.oninput = function() {
    console.log(slider.value);
    income = slider.value;
    output1.innerHTML = income;
    updateChart();
}