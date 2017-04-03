$(function(){
describe("Side-Bar", function() {
  beforeEach(function() {
  });
  it("should be able to display", function(done) {
    var aboutmeBtn=$(".about-me-text");
    aboutmeBtn.click();
    expect($(".side-bar").hasClass("hide")).not.toEqual(true);
    done();
  });
  it("should be able to hide", function() {
    $(".HideButtn").click();
    expect($(".side-bar").hasClass("hide")).toEqual(true);    
  });
});

describe("Hero SlideShow", function() {
  beforeEach(function() {
  });
  it("should be able to load images", function() {
  });
  it("should be able to slide forward", function() {
      htmlBefore = $(".hero-banner").html();
      $(".hero-right-arrow").click();
      expect($(".hero-banner").html()).not.toEqual(htmlBefore);
  });
  it("should be able to slide backward", function() {
    htmlBefore = $(".hero-banner").html();
    $(".hero-left-arrow").click();
    expect($(".hero-banner").html()).not.toEqual(htmlBefore);    
  });
});
}());
