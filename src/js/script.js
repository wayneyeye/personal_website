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
	var sideBarHeader ='<div class="row side-bar-title"><div class="col-xs-9"><h4>About Me</h4></div></div><div class="row side-bar-potrait"><div class="col-md-12"><img src="img/Wenhe.jpg" id="potrait-img"/></div></div>';
	var sideBarContent ='<div class="row side-bar-content"><div class="col-md-12"><p>Hi, My name is <strong>Wenhe Ye</strong>...</p><p>My current location is <strong>Dallas, TX</strong></p></div></div><div class="row side-bar-subtitle"><div class="col-md-12"><h5>Interests</h5></div></div><div class="row side-bar-sublist"><div class="col-md-12"><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul></div></div>';
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
			this.body= $('body');
			this.listenTo(iSwitch, 'change', this.render);
			this.body.append(this.render().el);
			var ihideSwitch= new HideButtn({model: iSwitch});
			// this.div= $('.side-bar-title');
			// this.div.append(ihideSwitch.render().el);
		},
		render: function(){
			// Create the HTML
			sidebarHTML=sideBarHeader+sideBarSocial+sideBarContent;
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
	img:'img/heros/hero_slc.jpg',
	desc:'A Glance at the Salt Lake City'
	},
	{
	img:'img/heros/hero_chicago.jpg',
	desc:'A Birdview of Downtown Chicago and Lake Michigan'
	},
	{
	img:'img/heros/hero_grandcanyon.jpg',
	desc:'Grand Canyon National Park'
	},
	{
	img:'img/heros/hero_grandcanyon2.jpg',
	desc:'Grand Canyon on Road'
	},
	{
	img:'img/heros/hero_grandteton.jpg',
	desc:'Snow Mountain in Grand Teton National Park'
	},
	{
	img:'img/heros/hero_grandcanyon3.jpg',
	desc:'Grand Canyon and Colorado River at Navajo Bridge'
	},
	{
	img:'img/heros/hero_yellowstone.jpg',
	desc:'Yellowstone National Park'
	},
	{
	img:'img/heros/hero_pku.jpg',
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
				index: 0
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
			//carousel
			setInterval(function() {
				$(".hero-right-arrow").click();
				}, 8000);
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
//*************************Useful Links Below****************************************
	// JSON for saving external links
	var usefulLinks=[
		{
			listname: "Navigation1",
			urlist:[{
				url:"#",
				name:"nav1",
				desc:"link to nav1"
				}],
			desc: "common navigations"
		},
		{
			listname: "Navigation2",
			urlist:[{
				url:"#",
				name:"nav1",
				desc:"link to nav1"
				}],
			desc: "common navigations"
		},
		{
			listname: "Navigation3",
			urlist:[{
				url:"#",
				name:"nav1",
				desc:"link to nav1"
				}],
			desc: "common navigations"
		},
		{
			listname: "Navigation4",
			urlist:[{
				url:"#",
				name:"nav1",
				desc:"link to nav1"
				}],
			desc: "common navigations"
		}
	];
});