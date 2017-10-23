var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');

var clicked=true;

var axislabel = ["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"];

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleX = d3.scalePoint().domain(["1", "2", "3", "4", "5", "6","7"]).range([0, 800]);
var ScaleY = d3.scaleLinear().range([400, 0]);


//AXIS LABELS
svg.append('text')
    .text('DANCER EDUCATION LEVELS')
    .attr('transform','translate(350, -20)')
    .style('text-anchor','middle');
svg.append('text')
    .text('Highest Dance Education Level')
    .attr('transform','translate(225, 450)');
svg.append('text')
    .text('Age')
    .attr('transform', 'translate(-50,200)rotate(270)');

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


//import the data from the .csv file
d3.csv('./data.csv', function(dataIn) {

    /*cf = crossfilter(dataIn);
    //console.log(dataIn);
    //filter data!!
    dancerStatus = cf.dimension(function (d) {
        return d.A1CURFOR;
    });
    currentDancer = dancerStatus.filterExact("1").top(Infinity);
    formerDancer = dancerStatus.filterExact("2").top(Infinity);

    console.log(formerDancer);
    console.log(currentDancer);
    */

    nestedData = d3.nest()
        .key(function (d) {
            return d.A1CURFOR
        })
        .entries(dataIn);

    console.log(nestedData);
    var currentDancers = nestedData.filter(function(d){return d.key == '1'})[0].values;
    var formerDancers = nestedData.filter(function(d){return d.key == '2'})[0].values;
    console.log(currentDancers);
    console.log(formerDancers);

    ScaleX.domain(formerDancers.map(function (d) {
        return d.A6QUALS1
    }));

    ScaleY.domain([0,30]);

    svg.append("g")
        .attr('transform','translate(0,400)')
        .call(d3.axisBottom(ScaleX));
    svg.append("g")
        .call(d3.axisLeft(ScaleY));

    svg.selectAll('circles')
        .data(formerDancers)
        .enter()
        .append('circle')
        .attr('class','ageBeg')
        .attr('r', 5)
        .attr('fill', "rebeccapurple");

    svg.selectAll('circles')
        .data(formerDancers)
        .enter()
        .append('circle')
        .attr('class','ageProf')
        .attr('r', 5)
        .attr('fill', "slategrey");


    //$('[data-toggle="tooltip"]').tooltip();
    drawPoints(formerDancers);

});

function drawPoints(pointData){

    svg.selectAll('.ageBeg')
        .data(pointData)
        .transition()
        .ease(d3.easeSin)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8ABEGTR);
        })
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d){
            return A3AGEGP
    });


    svg.selectAll('.ageProf')
        .data(pointData)
        .transition()
        .ease(d3.easeSin)
        .attr('cx',function(d){
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8CBGPCR);
        });


    $('[data-toggle="tooltip"]').tooltip();
}

function buttonClicked(){

    if(clicked == true){
        drawPoints(currentDancers);
        clicked = false;
    }
    else{
        drawPoints(formerDancers);
        clicked = true;
    }


}