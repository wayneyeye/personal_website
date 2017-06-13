resumeData={
"FirstName":'Wenhe',
"LastName":'Ye',
"ProfilePicture":'',	
"Education":[{
	"order":1,
	"schoolname":'Peking University',
	"subdivision":'College of Chemistry and Molecular Engineering',
	"degreetype":"Bachelor's",
	"major":'Applied Chemistry',
	"location":'Beijing',
	"state":'China',
	"country":'China',
	"from":2008,
	"to":2012,
},
{
	"order":2,
	"schoolname":'Northwestern University',
	"subdivision":'McCormick School of Engineering',
	"degreetype":"Master's",
	"major":'Chemical Engineering',
	"location":'Evanston',
	"state":'Illinois',
	"country":'U.S.A',
	"from":2013,
	"to":2015,
},
{
	"order":3,
	"schoolname":'University of Texas at Dallas',
	"subdivision":'Naveen Jindal School of Management',
	"degreetype":"Master's",
	"major":'Business Analytics',
	"location":'Richardson',
	"state":'Texas',
	"country":'U.S.A',
	"from":2016,
	"to":2018,
},],
"Professional":[],
"Project":[],
};
$(function(){

resumeData.Education.forEach(function(item)
{
	$('.education').append('<div class="col-md-12">'+item.schoolname+'</div>');
	$('.education').append('<div class="col-md-1">'+item.from+'</div>');
	$('.education').append('<div class="col-md-1">'+item.to+'</div>');
	$('.education').append('<div class="col-md-3">'+item.degreetype+'</div>');
	$('.education').append('<div class="col-md-12">'+item.subdivision+'</div>');
	$('.education').append('<div class="col-md-1">'+item.location+'</div>');
	$('.education').append('<div class="col-md-3">'+item.state+'</div>');
	$('.education').append('<div class="col-md-3">'+item.country+'</div>');
});



});