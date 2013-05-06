Guesses = new Meteor.Collection("guesses");

//Guesses.remove({});
//counter variable 
var counter = 0;

//random number variable
var rand = Math.floor(Random.fraction()*10)*10;
 
if (Meteor.isClient) {
	
	//login settings
Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
  
  //display all the guesses made	 	
 Template.guesses.guesses = function(){
 	//sorting the guesses by timestamp inserts
 	return Guesses.find({}, {sort: {time: -1}});
 };
 
 //	when enter pressed insert guess to database
 Template.entryNum.events = {
  "keydown #guessBox": function(event){
    if(event.which === 13){
      
      var guessNum = document.getElementById('guessBox');
      //if input box contains a number insert number to database
      if(guessBox.value != ''){
      	
      	//increment counter
      	counter++;
      	
          Guesses.insert({
          guess: guessNum.value,
          time: Date.now()
        });
		
		//reset guessNum to null after insert for new entry in input box 
        guessNum.value = '';
      }
    }
  }
};
 
Template.guess.result = function(){
	
	if(this.guess < rand) return " too low";
	if(this.guess > rand) return " too high";
	if(this.guess = rand) return " WINNER WINNER CHICKEN DINNER!!!!";

};
 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //create a random number
    
  });
}
