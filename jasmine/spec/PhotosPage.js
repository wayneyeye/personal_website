$(function(){
describe("Side-Bar", function() {
  beforeEach(function() {
  });
  it("should be able to display", function(done) {
    var aboutmeBtn=$(".about-me-text"); //only the about me text is clickable
    aboutmeBtn.click();
    expect($(".side-bar").hasClass("hide")).not.toEqual(true);
    done();
  });
  it("should be able to hide", function() {
    $(".HideButtn").click();
    expect($(".side-bar").hasClass("hide")).toEqual(true);    
  });
});
}());
