// is just jQuery short-hand for $(document).ready(function() { ... });
$(function(){
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
	})
	sideBarSocial=sideBarSocial+'</div>';

	var SideBarView = Backbone.View.extend({
		tagName: 'div',
		className: "container side-bar",
		initialize: function(){
			this.body= $('body');
			this.listenTo(iSwitch, 'change', this.render);
			this.body.append(this.render().el);
		},
		render: function(){
			// Create the HTML
			sidebarHTML=sideBarHeader+sideBarSocial+sideBarContent;
			var ihideSwitch= new HideButtn({model: iSwitch});
			this.$el.html(sidebarHTML);
			this.div= $('.side-bar-title');
			this.div.append(ihideSwitch.render().el);
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
});