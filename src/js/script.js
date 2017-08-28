// is just jQuery short-hand for $(document).ready(function() { ... });
$(function(){
//*************************Toggle Side-Bar****************************************
// Indicate whether sidebar is on or off
	var sidebarOnOff = Backbone.Model.extend({
		defaults:{
			on: false
		},
		// Helper function for checking/unchecking a service
		toggle: function(){
			this.set('on', !this.get('on'));
		}
	});
//Sidebar contents
	var sideBarInfo={
		introText:'Hi, My name is <strong>Wenhe Ye</strong>...</p><p>My current location is <strong>Dallas, TX</strong> \n Excellent communication and research skills; Good leadership skills; Excellent problem-solving skills; Highly initiative and detail-oriented. Good information & data retrieval skills in both business and science; Good knowledge in finance and operations process; Hands-on experience in both operations research and chemical engineering.Advanced skill set in data analysis and data modeling; In-depth expertise in programming simulation and optimization; Proficiency in developing data science & optimization products and trouble shooting.',
		interestList:[{name:'DataScience', url:'#', desc:'DA'},{name:'Programming', url:'#', desc:'Dev'}]
	};
	var sideBarHeader ='<div class="row side-bar-title"><div class="col-xs-9"><h4>About Me</h4></div></div><div class="row side-bar-potrait"><div class="col-md-12"><img src="img/Wenhe.jpg" id="potrait-img"/></div></div>';
	var sideBarContent1 ='<div class="row side-bar-content"><div class="col-md-12"><p>';
	var introText=sideBarInfo.introText;
	var sideBarContent2 ='</p></div></div><div class="row side-bar-subtitle"><div class="col-md-12"><h5>Interests</h5></div></div><div class="row side-bar-sublist"><div class="col-md-12"><ul>';
	var interestList='';
	for (var k=0;k<sideBarInfo.interestList.length;k++){
		interestList+='<li><a href="'+sideBarInfo.interestList[k].url+'">'+sideBarInfo.interestList[k].name+'</a>'+'</li>';		
	}
	var sideBarContent3 ='</ul></div></div>';
	var socialIcons = [{
		img: "img/icons/email.png",
		url: 'mailto:yewenhe0904@gmail.com?subject=Mail to Wenhe'
	},{
		img: "img/icons/linkedin.png",
		url: 'https://www.linkedin.com/in/wayneyewenhe'
	},{
		img: "img/icons/home.png",
		url: 'https://wayneyeye.github.io/personal_website'
	},{
		img: "img/icons/github.png",
		url: 'https://github.com/wayneyeye'
	},];
	//import social icons
	var sideBarSocial ='<div class="row side-bar-contact">';
	socialIcons.forEach(function(soc){
		sideBarSocial=sideBarSocial+'<div class="col-xs-3 social"><a href='+soc.url+' target="_blank"><img src="'+soc.img+'"></a></div>';
	});
	sideBarSocial=sideBarSocial+'</div>';

	var SideBarView = Backbone.View.extend({
		tagName: 'div',
		className: "container side-bar",
		initialize: function(){
			this.body= $('.home');
			this.listenTo(iSwitch, 'change', this.render);
			this.body.append(this.render().el);
			var ihideSwitch= new HideButtn({model: iSwitch});
			// this.div= $('.side-bar-title');
			// this.div.append(ihideSwitch.render().el);
		},
		render: function(){
			// Create the HTML
			sidebarHTML=sideBarHeader+sideBarSocial+sideBarContent1+introText+sideBarContent2+interestList+sideBarContent3;
			this.$el.html(sidebarHTML);
			var ihideSwitch= new HideButtn({model: iSwitch});
			// this.div= $('.side-bar-title');
			// this.div.append(ihideSwitch.render().el);
			if(this.model.get('on')){
				this.$el.removeClass('hide');
			}
			else{
				this.$el.addClass('hide');
			}
			return this;
		}
	});
//About Me Link
	var aboutMeView = Backbone.View.extend({
		tagName: 'div',
		className: "about-me-text",
		initialize: function(){
			this.div= $('.about-me');
			this.div.append(this.render().el);
		},
		events:{
			'click': 'toggleSideBar'
		},
		render: function(){
			this.$el.html('<a href="#">About Me</a>');
			return this;
		},
		toggleSideBar: function(){
			this.model.toggle();
		}
	});
//Hide Buttn
	var HideButtn = Backbone.View.extend({
		tagName: 'div',
		className: "col-xs-3 HideButtn",
		initialize: function(){
			this.div= $('.side-bar-title');
			this.div.append(this.render().el);
		},
		events:{
			'click': 'toggleSideBar'
		},
		render: function(){
			this.$el.html('<img src="img/icons/goback.png"/>');
			return this;
		},
		toggleSideBar: function(){
			this.model.toggle();
		}
	});
	var iSwitch= new sidebarOnOff();
	var iSidebarView=new SideBarView({model: iSwitch});
	var iAboutMe = new aboutMeView({model: iSwitch});

//*************************Hero Slide Show****************************************
	var heroImgs=[{
	img:'dist/img/heros/hero_slc.jpg',
	desc:'A Glance at the Salt Lake City'
	},
	{
	img:'dist/img/heros/hero_chicago.jpg',
	desc:'A Birdview of Downtown Chicago and Lake Michigan'
	},
	{
	img:'dist/img/heros/hero_grandcanyon.jpg',
	desc:'Grand Canyon National Park'
	},
	{
	img:'dist/img/heros/hero_grandcanyon2.jpg',
	desc:'Grand Canyon on Road'
	},
	{
	img:'dist/img/heros/hero_grandteton.jpg',
	desc:'Snow Mountain in Grand Teton National Park'
	},
	{
	img:'dist/img/heros/hero_grandcanyon3.jpg',
	desc:'Grand Canyon and Colorado River at Navajo Bridge'
	},
	{
	img:'dist/img/heros/hero_yellowstone.jpg',
	desc:'Yellowstone National Park'
	},
	{
	img:'dist/img/heros/hero_pku.jpg',
	desc:'Weiming Lake at Peking University'
	}];

	//Preload image to speed up
	var preload = new Image();
	var load_flag=true;
	preload.onerror=function(){
		load_flag=false;
		console.log("error");
	};
	heroImgs.forEach(function(hero_img){
		preload.src = hero_img.img;
	});
	if(load_flag){
		$(".hero-slide").addClass("load-success");
	}
	//Backbone model for slides
		var heroSlidesShow = Backbone.Model.extend({
			defaults:{
				max: heroImgs.length,
				index: 0, //index to img
				play:true, //autoplay status
				icon:'<img src="img/icons/pause.png" />', //autoplay icon
				trigger:null //handle to setInterval function
			},
			// Helper function for checking/unchecking a service
			oneNext: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index",index_t);
			},
			oneBack: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index",index_t);
			},
			pausePlay: function(){
				var icon_t = this.get("icon");
				icon_t = ((this.get("play")===true)?'<img src="img/icons/play.png" />':'<img src="img/icons/pause.png" />');
				this.set("icon",icon_t);
				if (this.get("play")===true){
					clearInterval(this.get("trigger"));
				}
				else
				{
					$(".hero-right-arrow").click();
					this.set("trigger",setInterval(function() {
							$(".hero-right-arrow").click();
					}, 8000));
				}
				this.set("play",!this.get("play"));
			}
		});
//backbone view for hero image
	var heroSlide = Backbone.View.extend({
		tagName: 'div',
		className: "hero-banner",
		initialize: function(){
			primerHTML='<div class="row hero-row"><div class="col-md-12 hero"></div></div>';
			$('.hero-slide').append(primerHTML);
			this.slide= $('.hero');
			this.listenTo(iHero, 'change', this.render);
			// adding html
			heroLeadingHTML='<img class="img-hero" src="';
			heroTrailingHTML='"/>';
			var heroHTML='';
			heroHTML+='<img class="img-hero hero-placeholder" src="'+heroImgs[0].img+heroTrailingHTML;
			heroImgs.forEach(function(img_i){
				heroHTML=heroHTML+heroLeadingHTML+img_i.img+heroTrailingHTML;
			});
			this.slide.append(heroHTML);			
			$('.hero').append(this.render().el);
			var iLeft=new heroArrowLeft({model: iHero});
			var iRight=new heroArrowRight({model: iHero});
			var iPause=new heroPausePlay({model: iHero});
			//carousel
			this.model.set("trigger",setInterval(function() {
				$(".hero-right-arrow").click();
				}, 8000));
			},
		render: function(){
			// Create the HTML
			var index=this.model.get("index")+2;
			var nchildstr='.img-hero:nth-child('+index+')';
			$('.img-hero').removeClass("unhide");
			$(nchildstr).addClass("unhide");
			this.$el.html('<div>'+heroImgs[this.model.get("index")].desc+'</div>');
			var iLeft=new heroArrowLeft({model: iHero});
			var iRight=new heroArrowRight({model: iHero});
			var iPause=new heroPausePlay({model: iHero});
			return this;
		}
	});
	var heroArrowLeft = Backbone.View.extend({
		tagName: 'div',
		className: "hero-left-arrow",
		initialize: function(){
			this.div= $('.hero-banner');
			this.div.append(this.render().el);
		},
		events:{
			'click': 'toggleSlides'
		},
		render: function(){
			this.$el.html('<img src="img/icons/left.png" />');
			return this;
		},
		toggleSlides: function(){
			this.model.oneBack();
		}
	});
	
	var heroPausePlay = Backbone.View.extend({
		tagName: 'div',
		className: "hero-pause-play",
		initialize: function(){
			this.div= $('.hero-banner');
			this.div.append(this.render().el);
		},
		events:{
			'click': 'toggleSlides'
		},
		render: function(){
			this.$el.html(this.model.get('icon'));
			return this;
		},
		toggleSlides: function(){
			this.model.pausePlay();
		}
	});
	
	var heroArrowRight = Backbone.View.extend({
		tagName: 'div',
		className: "hero-right-arrow",
		initialize: function(){
			this.div= $('.hero-banner');
			this.div.append(this.render().el);
		},
		events:{
			'click': 'toggleSlides'
		},
		render: function(){
			this.$el.html('<img src="img/icons/right.png" />');
			return this;
		},
		toggleSlides: function(){
			this.model.oneNext();
		}
	});
	var iHero=new heroSlidesShow();
	var iSlide=new heroSlide({model: iHero});
//*************************Featured Projects****************************************
	var Album_json={cat:{
	img:'dist/img/placeholder/placeimg_640_480_animals.jpg',
	title:'meow',
	url:"#",
	},
	street:{
	img:'dist/img/placeholder/placeimg_640_480_arch.jpg',
	title:'wonderful!',
	url:"#",
	},
	building:{
	img:'dist/img/placeholder/placeimg_640_480_arch2.jpg',
	title:'delicate',
	url:"#",
	},
	bird:{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_animals.jpg',
	title:'pigeons',
	url:"#",
	},
	valley:{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_any.jpg',
	title:'splendid',
	url:"#",
	},
	rainbow:{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_nature.jpg',
	title:'cool',
	url:"#",
	}};
	// Collections for Projects
	var placeholder_img='dist/img/placeholder/placeimg_640_480_arch.jpg';
	// view foreach album
	var Album_View = Backbone.View.extend({
		tagName: 'div',
		className: "album-view col-md-6",
		initialize: function(){
			this.div= $('.portfolio-row');
			this.div.append(this.render().el);
		},
		events:{

		},
		render: function(){
			this.$el.html('<div class="album-img-div"><img src="'+this.model.get('cover_pic')+'"/>'+'<div class="album-desc">'+'<a href="'+this.model.get('url')+'">'+
				this.model.get('title')+'</a><p>move here for more information</p></div></div>');
			return this;
		}
	});

	var Album_Model = Backbone.Model.extend({
	  defaults: {
	    title: "Not specified",
	    description: "Not specified",
	    cover_pic:placeholder_img,
	    url:'#'
	  },
	  initialize: function(){
	  	// console.log("initialize Album: "+this.get('name'));
	  	this.view=new Album_View({model:this});
	  }
	});

	var Album_Collection = Backbone.Collection.extend({
	  model: Album_Model
	});

	var Album_names=['cat','bird','valley','building'];
	var Album_list=[];
	var myAlbum = new Album_Collection();
	Album_names.forEach(function(item){
		myAlbum.add(new Album_Model({cover_pic:Album_json[item].img,title:Album_json[item].title,url:Album_json[item].url}));
	});




//*************************Useful Links Below****************************************
	// JSON for saving external links
	var usefulLinks=[
		{
			listname: "Most Visited Portals as a Developer",
			urlist:[{
				url:"https://www.w3schools.com/",
				name:"W3schools",
				desc:"link to W3"
				},
				{
				url:"https://www.udacity.com/",
				name:"Udacity",
				desc:"link to Udacity"
				},
				{
				url:"https://www.coursera.org/",
				name:"Coursera",
				desc:"link to Coursera"
				}],
			desc: "Beginner's favorite sites"
		},
		{
			listname: "Resources for Data Scientists",
			urlist:[{
				url:"https://www.kaggle.com/",
				name:"Kaggle",
				desc:"link to Kaggle"
				},
				{
				url:"https://www.data.gov/",
				name:"U.S. Government Data",
				desc:"link to data.gov"
				},
				{
				url:"http://www.google.com/trends/explore",
				name:"Google Trends",
				desc:"link to Google Trends"
				}],
			desc: "If you want to be a data scientist"
		},
		{
			listname: "Logistics for My Perosnal Site",
			urlist:[{
				url:"http://backbonejs.org/",
				name:"Backbonejs",
				desc:"link to nav1"
				},
				{
				url:"http://getbootstrap.com",
				name:"BootStrap",
				desc:"link to nav1"
				},
				{
				url:"https://www.javascript.com/",
				name:"JavaScript",
				desc:"link to nav1"
				},
				{
				url:"https://jquery.com/",
				name:"JQuery",
				desc:"link to nav1"
				},
				{
				url:"https://gruntjs.com/",
				name:"Grunt",
				desc:"link to nav1"
				},
				{
				url:"https://jasmine.github.io/",
				name:"Jasmine",
				desc:"link to nav1"
				},
				{
				url:"https://github.com/",
				name:"GitHub",
				desc:"link to nav1"
				},
				{
				url:"https://www.djangoproject.com/",
				name:"DJango",
				desc:"link to nav1"
				}],
			desc: "common navigations"
		}
	];
	var usefulLink_box=$(".link-list");
	var usefulLinkHTML='';
	for (var i=0;i<usefulLinks.length;i++){
		Leading='<div class="col-md-4">';
		Trailing='</div>';
		usefulLinkHTML+=Leading;
		usefulLinkHTML+='<ul>'+usefulLinks[i].listname+'</ul>';
		for (var j=0;j<usefulLinks[i].urlist.length;j++){
			liLeading='<li><a href="';
			liTrailing='</a></li>';
			usefulLinkHTML+=liLeading;
			usefulLinkHTML+=usefulLinks[i].urlist[j].url+'" target="_blank">'+usefulLinks[i].urlist[j].name;
			usefulLinkHTML+=liTrailing;
		}
		usefulLinkHTML+=Trailing;
	}
	usefulLink_box.append(usefulLinkHTML);
});