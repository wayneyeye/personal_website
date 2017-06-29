resumeData={
"FirstName":'Wenhe',
"LastName":'Ye',
"ProfilePicture":'img/photo-placeholder.jpg',	
"DesiredPosition":['Data Analyst','Business Analyst'],
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
"Skills":[
{'name':'Javascript','link':''},
{'name':'CSS','link':''},
{'name':'HTML','link':''},
{'name':'Python','link':''},
{'name':'SQL','link':''},
{'name':'Excel','link':''},
{'name':'Alteryx','link':''},
{'name':'Analytics','link':''},
],
"Professional":[
{
	"order":1,
	"company":'',
	"subdivision":'',
	"position":'',
	'location':'',
	"from":2013,
	"to":2014,
	"experience":[]
}
],
"Project":[],
};
$(function(){
$('.wenhe-photo').append('<img src="'+resumeData.ProfilePicture+'"></img>');
resumeData.DesiredPosition.forEach(function(item){
	$('.desired').append('<div class="col-md-12">'+item+'</div>');
});

resumeData.Education.forEach(function(item)
{
	$('.education').append('<div class="col-md-12">'+item.schoolname+'</div>');
	$('.education').append('<div class="col-md-1">'+item.from+'</div>');
	$('.education').append('<div class="col-md-1">'+item.to+'</div>');
	$('.education').append('<div class="col-md-3">'+item.degreetype+'</div>');
	$('.education').append('<div class="col-md-12">'+item.subdivision+'</div>');
	$('.education').append('<div class="col-md-3">'+item.location+'</div>');
	$('.education').append('<div class="col-md-3">'+item.state+'</div>');
	$('.education').append('<div class="col-md-3">'+item.country+'</div>');
});

resumeData.Skills.forEach(function(item)
{
	if(item.name.length>9){
		$('.skills').append('<div class="col-lg-3 col-md-3 col-xs-2 col-sm-2"><a href="#">'+item.name+'</a></div>');
	}
	else if(item.name.length>3){
		$('.skills').append('<div class="col-lg-2 col-md-3 col-xs-2 col-sm-2"><a href="#">'+item.name+'</a></div>');
	}
	else{
		$('.skills').append('<div class="col-lg-1 col-md-2 col-sm-2"><a href="#">'+item.name+'</a></div>');
	}
	
});



});