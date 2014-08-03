describe('quizService', function(){
	var quizService, $rootScope, $httpBackend;
	beforeEach(module('ui.router'));
	beforeEach(module('underscore'));
	beforeEach(module('quiz.services'));

	beforeEach(inject(function(_$rootScope_, _quizService_,_$httpBackend_){
		quizService = _quizService_;
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET','/getQuizData').respond(
			[{"id":0,"question":"Which is not an advantage of using closure","options":[{"text":"Prevent pollution of global scope","value":"A"},{"text":"Encapsulation","value":"B"},{"text":"Private properties and methods","value":"C"},{"text":"Allow conditional use of 'strict mode'","value":"D"}]},{"id":1,"question":"Second question","options":[{"text":"A","value":"A"},{"text":"B","value":"B"},{"text":"C","value":"C"}]}]
		);
	}));

	it('should have getQuizData function', function(){
		expect(quizService.getQuizData).toBeDefined();

	});

	it('getQuizData should return an array of items', function(){
		var promise = quizService.getQuizData();
		$httpBackend.flush();
		promise.then(function(data){
			expect(data.length).toBeGreaterThan(0);
		});
	});

});