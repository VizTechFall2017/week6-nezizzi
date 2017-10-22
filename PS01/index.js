var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');

clicked=true;

var axislabel = ["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"];

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleX = d3.scaleBand().rangeRound([0, 600]).padding(0.1);
ScaleY = d3.scaleLinear().range([400, 0]);


//import the data from the .csv file
d3.csv('./data.csv', function(dataIn) {

    cf = crossfilter(dataIn);
    //console.log(dataIn);
    //filter data!!
    dancerStatus = cf.dimension(function (d) {
        return d.A1CURFOR;
    });
    currentDancer = dancerStatus.filterExact("1").top(Infinity);
    formerDancer = dancerStatus.filterExact("2").top(Infinity);

    //console.log(formerDancer);
    //console.log(currentDancer);

    ScaleX.domain(dancerStatus.map(function(d) {
        return A1CURFOR
    }));

    //scaleY.domain([0,d3.max(loadData.map(function(d){
    //    return +d.totalPop
   // }))]);

    //MAKE THE AXES
    svg.append("g")
        .attr('transform','translate(0,400)')
        .call(d3.axisBottom(ScaleX));
    svg.append("g")
        .call(d3.axisLeft(ScaleY));

    //AXIS LABELS
    svg.append('text')
        .text('DANCER EDUCATION LEVELS')
        .attr('transform','translate(350, -20)')
        .style('text-anchor','middle');
    svg.append('text')
        .text('Highest Dance Education Level')
        .attr('transform','translate(325, 450)');
    svg.append('text')
        .text('Age')
        .attr('transform', 'translate(-50,200)rotate(270)');


});