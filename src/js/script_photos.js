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
				play:true, //autoplay status
				icon:'<img src="img/icons/pause.png" />', //autoplay icon
				trigger:null //handle to setInterval function
			},
			// Helper function for checking/unchecking a service
			oneNext: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				this.set("index_left",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index",index_t);
				index_t = ((index_t==max_t-1)?0:index_t+1);
				this.set("index_right",index_t);
			},
			oneBack: function(){
				var index_t = this.get("index");
				var max_t = this.get("max");
				this.set("index_right",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index",index_t);
				index_t = ((index_t===0)?max_t-1:index_t-1);
				this.set("index_left",index_t);
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
		render: function(){
			// Create the HTML
			var index=this.model.get("index")+2;
			var index_left=this.model.get("index_left")+2;
			var index_right=this.model.get("index_right")+2;
			var nchildstr='.img-hero-half:nth-child('+index+')';
			var nchildstr_left='.img-hero-half:nth-child('+index_left+')';
			var nchildstr_right='.img-hero-half:nth-child('+index_right+')';
			$('.img-hero-half').removeClass("unhide-middle");
			$('.img-hero-half').removeClass("unhide-right");
			$('.img-hero-half').removeClass("unhide-left");
			$('.img-hero-half').removeClass("unhide");
			$(nchildstr).addClass("unhide-middle unhide");
			$(nchildstr_left).addClass("unhide-left unhide");
			$(nchildstr_right).addClass("unhide-right unhide");
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
});