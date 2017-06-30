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
	"company":'EFGH Solutions',
	"subdivision":'',
	"position":'Data Analyst',
	'location':'Richardson, Texas',
	"from":'04/2016',
	"to":'12/2016',
	"experience":['Migrated multiple legacy databases (Oracle, SQL Server, Access) into redesigned data warehouse using SSIS and validated to ensure integrity',
	'Wrote complex SQL queries and developed views, stored procedures and user-defined functions over large datasets (~100 GB)',
	'Improved performance for expensive queries by different techniques, including indexing and caching']
},
{
	"order":2,
	"company":'ABCD Solutions',
	"subdivision":'',
	"position":'Data Analyst',
	'location':'Richardson, Texas',
	"from":'04/2016',
	"to":'12/2016',
	"experience":['Migrated multiple legacy databases (Oracle, SQL Server, Access) into redesigned data warehouse using SSIS and validated to ensure integrity',
	'Wrote complex SQL queries and developed views, stored procedures and user-defined functions over large datasets (~100 GB)',
	'Improved performance for expensive queries by different techniques, including indexing and caching']
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
	if(item.name.length>8){
		$('.skills').append('<div><a href="#">'+item.name+'</a></div>');
	}
	else if(item.name.length>3){
		$('.skills').append('<div><a href="#">'+item.name+'</a></div>');
	}
	else{
		$('.skills').append('<div><a href="#">'+item.name+'</a></div>');
	}
	
});

resumeData.Professional.forEach(function(item)
{
	$('.profession').append('<div class="col-md-6"><h6>'+item.company+'</h6></div>');
	$('.profession').append('<div class="col-md-6"><h6>'+item.location+'</h6></div>');
	$('.profession').append('<div class="col-md-6"><h6>'+item.position+'</h6></div>');
	$('.profession').append('<div class="col-md-6"><h6>'+item.from+'-'+item.to+'</h6></div>');
	$('.profession').append('<div class="col-md-12"><ul></ul></div>');
	item.experience.forEach(function(exp){
		$('div ul:last').append('<li>'+exp+'</li>');
	});

});



});