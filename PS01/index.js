var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var current;
var former;
clicked=true;


var axislabel = ["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"];

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleX = d3.scalePoint().domain(["1", "2", "3", "4", "5", "6","7"]).range([0, 800]);
var ScaleY = d3.scaleLinear().domain([0,30]).range([400, 0]);
svg.append("g")
    .attr('transform','translate(0,400)')
    .call(d3.axisBottom(ScaleX));
svg.append("g")
    .call(d3.axisLeft(ScaleY));

//could not figure out how to get the axe labels to be different than the values need in order to match data to it :(
//also couldn't figure out how to use a function to get this from the array and match it to the tick marks, so i did it the LONG way
svg.append('text')
    .text('None')
    .style("font", "14px times")
    .attr('transform','translate(0,425)rotate(90)');
svg.append('text')
    .text('Diploma from Dance School')
    .style("font", "14px times")
    .attr('transform','translate(125,425)rotate(90)');
svg.append('text')
    .text("Diploma from Performing Arts School")
    .style("font", "14px times")
    .attr('transform','translate(265,425)rotate(90)');
svg.append('text')
    .text("Bachelor's Degree")
    .style("font", "14px times")
    .attr('transform','translate(385,425)rotate(90)');
svg.append('text')
    .text('Advanced Diploma from Dance School')
    .style("font", "14px times")
    .attr('transform','translate(525,425)rotate(90)');
svg.append('text')
    .text('Advanced Diploma from Performing Arts School')
    .style("font", "14px times")
    .attr('transform','translate(665,425)rotate(90)');
svg.append('text')
    .text('Graduate Degree')
    .style("font", "14px times")
    .attr('transform','translate(800,425)rotate(90)');



svg.append('text')
    .text('DANCER EDUCATION LEVELS')
    .attr('transform','translate(350, -20)')
    .style('text-anchor','middle');

svg.append('text')
    .text('Highest Dance Education Level')
    .attr('transform','translate(300, 600)');

svg.append('text')
    .text('Age')
    .attr('transform', 'translate(-50,200)rotate(270)');

//import the data from the .csv file
d3.csv('./data.csv', function(dataIn) {

    allData = dataIn;

    current = dataIn.filter(function(d){
        return d.A1CURFOR == 1;
    });
    former = dataIn.filter(function(d){
        return d.A1CURFOR == 2;
    });

    console.log(current);
    console.log(former);


    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(current)
        .enter()
        .append('circle')
        .attr('class','a_beg')
        .attr('r', 5)
        .attr('fill', "purple");

    svg.selectAll('circles')
        .data(current)
        .enter()
        .append('circle')
        .attr('class','a_prof')
        .attr('r', 5)
        .attr('fill', "grey");


    drawPoints(current);

});




//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.a_beg')
        .data(pointData)
        .transition()
        .ease(d3.easeSin)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8ABEGTR);
        });

    svg.selectAll('.a_prof')
        .data(pointData)
        .transition()
        .ease(d3.easeSin)
        .attr('cx',function(d){
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8CBGPCR);
        });
}



//this function runs when the HTML button is clicked.
function buttonClicked(){

    if(clicked == true){
        drawPoints(former);
        clicked = false;
    }
    else{
        drawPoints(current);
        clicked = true;
    }


}