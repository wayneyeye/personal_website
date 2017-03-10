// is just jQuery short-hand for $(document).ready(function() { ... });
$(function(){
// Indicate whether sidebar is on or off
	var sidebarOnOff = Backbone.Model.extend({
		defaults:{
			on: true
		},
		// Helper function for checking/unchecking a service
		toggle: function(){
			this.set('on', !this.get('on'));
		}
	});

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
			sidebarHTML='<div class="row side-bar-title"><div class="col-xs-9"><h4>About Me</h4></div><div class="col-xs-3 HideButtn" style="text-align:right"><a href="#">Hide</a></div></div><div class="row side-bar-potrait"><div class="col-md-12"><img src="img/Wenhe.jpg" id="potrait-img"/></div></div><div class="row side-bar-contact"><div class="col-xs-3 social"><img src="http://placehold.it/50x50"></div><div class="col-xs-3 social"><img src="http://placehold.it/50x50"></div><div class="col-xs-3 social"><img src="http://placehold.it/50x50"></div><div class="col-xs-3 social"><img src="http://placehold.it/50x50"></div></div><div class="row side-bar-content"><div class="col-md-12"><p>Hi, My name is <strong>Wenhe Ye</strong>...</p><p>My current location is <strong>Dallas, TX</strong></p></div></div><div class="row side-bar-subtitle"><div class="col-md-12"><h5>Interests</h5></div></div><div class="row side-bar-sublist"><div class="col-md-12"><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul></div></div>';
			this.$el.html(sidebarHTML);
			return this;
		}
	});
	var iSwitch= new sidebarOnOff();
	var iSidebarView=new SideBarView();
});