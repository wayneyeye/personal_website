$(function(){
//*************************Featured Stories Slide Show****************************************
var heroImgs=[{
	img:'dist/img/placeholder/placeimg_640_480_animals.jpg',
	desc:'meow'
},
{
	img:'dist/img/placeholder/placeimg_640_480_arch.jpg',
	desc:'wonderful!'
},
{
	img:'dist/img/placeholder/placeimg_640_480_arch2.jpg',
	desc:'delicate'
},
{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_animals.jpg',
	desc:'pigeons'
},
{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_any.jpg',
	desc:'splendid'
},
{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_nature.jpg',
	desc:'cool'
},
{
	img:'dist/img/placeholder/placeimg_640_480_grayscale_people.jpg',
	desc:'woo!'
},
{
	img:'dist/img/placeholder/placeimg_640_480_nature.jpg',
	desc:'awesome'
},
{
	img:'dist/img/placeholder/placeimg_640_480_people.png',
	desc:'nice'
},
{
	img:'dist/img/placeholder/placeimg_640_480_sepia_any.jpg',
	desc:'hardworking'
},
{
	img:'dist/img/placeholder/placeimg_640_480_sepia_tech.jpg',
	desc:'smartphone'
},
{
	img:'dist/img/placeholder/placeimg_640_480_tech.jpg',
	desc:'smart cellphone'
}
];

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
				index_left:heroImgs.length-1,
				index_right:1,
				index_far_left:heroImgs.length-2,
				index_far_right:2,
				play:true, //autoplay status
				icon:'<img src="img/icons/pause.png" />', //autoplay icon
				trigger:null //handle to setInterval function
			},
			// Helper function for checking/unchecking a service
			oneNext: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index_far_left",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index_left",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index_right",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index_far_right",index_t);
				//clear and restart autoplay
				if (this.get("play")===true){
					clearInterval(this.get("trigger"));
					this.set("trigger",setInterval(function() {
							$(".hero-right-arrow").click();
					}, 8000));
				}
			},
			oneBack: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index_far_right",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index_right",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index_left",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index_far_left",index_t);
				//clear and restart autoplay
				if (this.get("play")===true){
					clearInterval(this.get("trigger"));
					this.set("trigger",setInterval(function() {
							$(".hero-right-arrow").click();
					}, 8000));
				}
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
			heroLeadingHTML='<img class="img-hero-half" src="';
			heroTrailingHTML='"/>';
			var heroHTML='';
			heroHTML+='<img class="img-hero-half hero-placeholder" src="'+heroImgs[0].img+heroTrailingHTML;
			heroImgs.forEach(function(img_i){
				heroHTML=heroHTML+heroLeadingHTML+img_i.img+heroTrailingHTML;
			});
			this.slide.append(heroHTML);			
			$('.hero').append(this.render().el);
			// var iLeft=new heroArrowLeft({model: iHero});
			// var iRight=new heroArrowRight({model: iHero});
			// var iPause=new heroPausePlay({model: iHero});
			//carousel
			this.model.set("trigger",setInterval(function() {
				$(".hero-right-arrow").click();
			}, 8000));
		},
		events:{
			'click .hero-left-arrow': 'oneBack',
			'click .hero-right-arrow': 'oneNext',
			'click .hero-pause-play': 'pausePlay'
		},
		oneNext: function(){
			this.model.oneNext();
		},
		oneBack: function(){
			this.model.oneBack();
		},
		pausePlay: function(){
			this.model.pausePlay();
		},
		render: function(){
			// Create the HTML
			var index=this.model.get("index")+2;
			var index_left=this.model.get("index_left")+2;
			var index_right=this.model.get("index_right")+2;
			var index_far_left=this.model.get("index_far_left")+2;
			var index_far_right=this.model.get("index_far_right")+2;
			var nchildstr='.img-hero-half:nth-child('+index+')';
			var nchildstr_left='.img-hero-half:nth-child('+index_left+')';
			var nchildstr_right='.img-hero-half:nth-child('+index_right+')';
			var nchildstr_far_left='.img-hero-half:nth-child('+index_far_left+')';
			var nchildstr_far_right='.img-hero-half:nth-child('+index_far_right+')';
			$('.img-hero-half').removeClass("unhide-middle");
			$('.img-hero-half').removeClass("unhide-right");
			$('.img-hero-half').removeClass("unhide-left");
			$('.img-hero-half').removeClass("unhide-far-right");
			$('.img-hero-half').removeClass("unhide-far-left");
			$(nchildstr).addClass("unhide-middle");
			$(nchildstr_left).addClass("unhide-left");
			$(nchildstr_right).addClass("unhide-right");
			$(nchildstr_far_left).addClass("unhide-far-left");
			$(nchildstr_far_right).addClass("unhide-far-right");
			var left_arrow_html='<div class="hero-left-arrow"><img src="img/icons/left.png" /></div>';
			var right_arrow_html='<div class="hero-right-arrow"><img src="img/icons/right.png" /></div>';
			var play_pause_html='<div class="hero-pause-play">'+this.model.get('icon')+'</div>';
			this.$el.html('<div>'+heroImgs[this.model.get("index")].desc+left_arrow_html+right_arrow_html+play_pause_html+'</div>');
			return this;
		}
	});
var iHero=new heroSlidesShow();
var iSlide=new heroSlide({model: iHero});

	// Collections for Albums
//*************************Featured Projects****************************************
var Album_json={cat:{
	title:'meow',
	url:"#",
	img_list:{
		img:'dist/img/placeholder/placeimg_640_480_animals.jpg',
		desc:"Our plans include unlimited texting, calling, and data, starting as low as $13.99 per month with no contracts."
	}
},
street:{
	title:'wonderful!',
	url:"#",
	img_list:[{
		img:'dist/img/placeholder/placeimg_640_480_arch.jpg',
		desc:"This is a description"
	}]
},
building:{
	title:'delicate',
	url:"#",
	img_list:[{
		img:'dist/img/placeholder/placeimg_640_480_arch2.jpg',
		desc:"This is a description"
	},
	{
		img:'dist/img/placeholder/placeimg_640_480_arch.jpg',
		desc:"This is a description"
	},
	{
		img:'dist/img/placeholder/placeimg_640_480_grayscale_any.jpg',
		desc:"This is a description"
	}]
},
bird:{
	title:'pigeons',
	url:"#",
	img_list:[{
		img:'dist/img/placeholder/placeimg_640_480_grayscale_animals.jpg',
		desc:"This is a description"
	}]
},
valley:{
	title:'splendid',
	url:"#",
	img_list:[{
		img:'dist/img/placeholder/placeimg_640_480_grayscale_any.jpg',
		desc:"This is a description"
	}]
},
rainbow:{
	title:'cool',
	url:"#",
	img_list:[{
		img:'dist/img/placeholder/placeimg_640_480_grayscale_nature.jpg',
		desc:"This is a description"
	}]
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
			this.listenTo(this.model, 'change', this.render);
		},
		events:{
			'click .album-arrow-right': 'oneNext',
			'click .album-arrow-left': 'oneBack'
		},
		render: function(){
			var left_arrow_html='<div class="album-arrow-left"><img src="img/icons/left.png"/></div>';
			var right_arrow_html='<div class="album-arrow-right"><img src="img/icons/right.png"/></div>';
			if (this.model.get('current_index')===0){
				left_arrow_html='';
			}
			else{
				left_arrow_html='<div class="album-arrow-left"><img src="img/icons/left.png"/></div>';
			}
			if (this.model.get('current_index')>=(this.model.get("img_list").length-1)){
				right_arrow_html='';
			}
			else
			{
				right_arrow_html='<div class="album-arrow-right"><img src="img/icons/right.png"/></div>';
			}
			this.$el.html('<div class="album-img-div"><img src="'+this.model.get('cover_pic')+'"/>'+'<div class="album-desc">'+'<a class="album-title-url" href="'+this.model.get('url')+'">'+
				this.model.get('title')+'</a><p>move here for more information</p>'+
				'<span>'+this.model.get('desc')+'</span>'+'<a class="album-x-url" href="'+this.model.get('url')+'">'+
				'click here for more'+'</a>'+left_arrow_html+right_arrow_html+'</div></div>');
			return this;
		},
		oneNext: function(){
			this.model.oneNext();
		},
		oneBack: function(){
			this.model.oneBack();
		}
	});

	var Album_Model = Backbone.Model.extend({
		defaults: {
			title: "Not specified",
			description: "Not specified",
			current_index:0,
			cover_pic:placeholder_img,
			url:'#'
		},
		initialize: function(){
	  	// console.log("initialize Album: "+this.get('name'));
	  	this.view=new Album_View({model:this});
	  },
	  events:{
	  	
	  },
	  oneNext: function(){
	  	var current_index_t=this.get("current_index");
	  	this.set("current_index",1+current_index_t);
	  	var album_length=this.get("img_list").length;
	  	if (this.get("current_index")>=album_length){
	  		this.set("current_index",album_length-1);
	  	}
	  	img_t=this.get("img_list")[this.get("current_index")];
	  	this.set("cover_pic",img_t.img);
	  	this.set("desc",img_t.desc);
	  	// console.log(this.get("cover_pic"));
	  },
	  oneBack: function(){
	  	var current_index_t=this.get("current_index");
	  	this.set("current_index",current_index_t-1);
	  	if (this.get("current_index")<0){
	  		this.set("current_index",0);
	  	}
	  	img_t=this.get("img_list")[this.get("current_index")];
	  	this.set("cover_pic",img_t.img);
	  	this.set("desc",img_t.desc);
	  	// console.log(this.get("cover_pic"));
	  }

	});

	var Album_Collection = Backbone.Collection.extend({
		model: Album_Model
	});

	var Album_names=['rainbow','street','valley','building'];
	var Album_list=[];
	var myAlbum = new Album_Collection();
	Album_names.forEach(function(item){
		myAlbum.add(new Album_Model({img_list:Album_json[item].img_list,cover_pic:Album_json[item].img_list[0].img,title:Album_json[item].title,url:Album_json[item].url,desc:Album_json[item].img_list[0].desc}));
	});
});