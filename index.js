// три функции для генерации данных
function generateData(quantity) {
    var dataSet = [];
    let i = 0;
    let k = 0;
    while (i < quantity) {
        dataSet.push(Math.random() * i + k);
        i++;
        k++;
    }
    return dataSet;
}
/*
function generateData(quantity) {
    var dataSet = [];
    let i = 0;
    let k = 0;
    while (i < quantity) {
        dataSet.push(Math.sin(i) * k);
        i++;
        k++;
    }
    return dataSet;
}
*/
/*
function generateData(quantity) {
    var dataSet = [];
    let i = 0;
    while (i < quantity) {
        dataSet.push(Math.random() * i);
        i++;
    }
    return dataSet;
}
*/
// функция 
function minimizationData(bigDataSet) {
    var minimizedData = [];
    var groupPoints = [];
    var pointsInOnePix = Math.ceil(bigDataSet.length / (document.documentElement.clientWidth - 83));

    // возвращаем исходные данные если одна точка на 1 pixel
    if (pointsInOnePix === 1) {
        return bigDataSet;
    }
    
    for (let i = 0; i < bigDataSet.length; i += pointsInOnePix) {
        // группа точек помещающаяся в 1 pixel
        groupPoints = bigDataSet.slice(i, i + pointsInOnePix)
        
        //вместо одной точки(среднего занчения) рисуем прямую от минимума до максимума
        minimizedData.push(Math.min(...groupPoints), Math.max(...groupPoints));
    }

    return minimizedData
}

anychart.onDocumentReady(function () {
    // закомментируй строку 83 если хочешь проверить как работает алгоритм на данных больше 200.000,
    var generateSet = generateData(40000);
    var minDataSet = minimizationData(generateSet);

    // data
    var dataSet = anychart.data.set(minDataSet);
    var fullDataSet = anychart.data.set(generateSet);

    // set chart type
    var chart = anychart.line();
    var chartFullSet = anychart.line();
    chart.title().text("Click on Chart to Add a Point ");
    chartFullSet.title().text("Click on Chart to Add a Point ");

    // set data
    chart.spline(dataSet).markers(null);
    chartFullSet.spline(fullDataSet).markers(null);
    // disable stagger mode. Only one line for x axis labels
    chart.xAxis().staggerMode(false);
    chartFullSet.xAxis().staggerMode(false);

    // set container and draw chart
    chart.container("container").draw();
    chartFullSet.container("container_fullSet").draw();
    // first index for new point
    //indexSetter = (dataSet.mapAs().getRowsCount())+1;  
});

function startStream() {

    // adjust button content
    var streamButton = document.getElementById("streamButton");
    streamButton.innerHTML = "Stop" + "\nstream";

    // set interval of data stream
    var myVar = setInterval(

        // data streaming itself
        function () {

            // append data
            dataSet.append({

                // x value
                x: "P" + indexSetter,

                // random value from 1 to 500
                value: Math.floor((Math.random() * 500) + 1)
            });

            // removes first point
            dataSet.remove(0);
            indexSetter++;
        }, 200            // interval
    );

    streamButton.onclick = function () {

        // clears interval which stops streaming
        clearInterval(myVar);
        streamButton.onclick = function () {
            startStream();
        };
        streamButton.innerHTML = "Start" + "\nstream";
    };
};