resumeData={
"FirstName":'Wenhe',
"LastName":'Ye',
"ProfilePicture":'img/photo-placeholder.jpg',	
"DesiredPosition":['Data Analyst','Business Analyst'],
"Education":[{
	"order":1,
	"schoolname":'University of Texas at Dallas',
	"subdivision":'Naveen Jindal School of Management',
	"degreetype":"Master's",
	"major":'Business Analytics',
	"location":'Richardson, Texas',
	"from":2016,
	"to":2018,
	"logo":"dist/img/resume_logos/round/utd_round.png"
},
{
	"order":2,
	"schoolname":'Northwestern University',
	"subdivision":'McCormick School of Engineering',
	"degreetype":"Master's",
	"major":'Chemical Engineering',
	"location":'Evanston, Illinois',
	"from":2013,
	"to":2015,
	"logo":"dist/img/resume_logos/round/Northwestern_round.png"
},
{
	"order":3,
	"schoolname":'Peking University',
	"subdivision":'College of Chemistry and Molecular Engineering',
	"degreetype":"Bachelor's",
	"major":'Applied Chemistry',
	"location":'Beijing, China',
	"from":2008,
	"to":2012,
	"logo":"dist/img/resume_logos/round/PKU_round.png"
}],
"Skills":[
{'name':'Analytics','link':''},
{'name':'Javascript','link':''},
{'name':'CSS','link':''},
{'name':'HTML','link':''},
{'name':'Bootstrap/Backbone/D3','link':''},
{'name':'Python','link':''},
{'name':'NumPy/Pandas','link':''},
{'name':'Python','link':''},
{'name':'SQL','link':''},
{'name':'Excel/VBA','link':''},
{'name':'Alteryx','link':''},
{'name':'Statistical','link':''},
{'name':'Machine Learning','link':''},
{'name':'Financial Analytics','link':''},
{'name':'Supply Chain Management','link':''},
{'name':'Optimization','link':''},
{'name':'Linux Shell','link':''},
{'name':'SAS','link':''},
{'name':'R','link':''},
{'name':'Tableau','link':''},
{'name':'SSRS','link':''},
],
"Professional":[
{
	"order":1,
	"company":'ATCG Solutions',
	"subdivision":'',
	"position":'Data Analyst Intern',
	'location':'Richardson, Texas',
	"from":'01/2016',
	"to":'06/2016',
	"experience":['Migrated multiple legacy databases (Oracle, SQL Server, Access) into redesigned data warehouse using SSIS and validated to ensure integrity',
	'Wrote complex SQL queries and developed views, stored procedures and user-defined functions over large datasets (~100 GB)',
	'Improved performance for expensive queries by different techniques, including indexing and caching']
},
{
	"order":2,
	"company":'Education First',
	"subdivision":'',
	"position":'Marketing Data Analyst Intern',
	'location':'Shanghai, China',
	"from":'01/2013',
	"to":'08/2013',
	"experience":['Developed multiple business data QA toolbox using Excel targeting database which can handle 100k+ records',
	'Automated data processing by scripting VBA, which reduced manual work load from 3 hours to 10 minutes']
}
],
"Project":[{
	"name":"Simulation Based Optimization 1",
	"link":"http://www.sciencedirect.com/science/article/pii/S0098135416300060"
},
{
	"name":"Simulation Based Optimization 2",
	"link":"https://www.scholars.northwestern.edu/en/publications/a-fast-simulation-based-optimization-method-for-inventory-control"
},
{
	"name":"Simulation Based Optimization 3",
	"link":"https://iwe.pure.elsevier.com/en/publications/a-simulation-based-optimization-method-for-solving-the-integrated"
}],
};
$(function(){
$('.wenhe-photo').append('<img src="'+resumeData.ProfilePicture+'"></img>');
resumeData.DesiredPosition.forEach(function(item){
	$('.desired').append('<div class="col-md-12">'+item+'</div>');
});

resumeData.Education.forEach(function(item)
{
	$('.education').append('<div class="col-md-7 schoolname">'+item.schoolname+'</div>');
	$('.schoolname:last').append('<div class="schoollogo"><img src="'+item.logo+'"></img></div>');
	$('.education').append('<div class="col-md-5 location">'+item.location+'</div>');
	$('.education').append('<div class="col-md-7 degree">'+item.degreetype+' Degree</div>');
	$('.education').append('<div class="col-md-5 degree">'+item.from+'-'+item.to+'</div>');
	$('.education').append('<div class="col-md-12">'+item.subdivision+'</div>');
	
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

resumeData.Project.forEach(function(item)
{
	$('.projects').append('<div class="col-md-12"><a href="'+item.link+'">'+item.name+'</h6></div>');

});


});