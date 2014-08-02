describe('quizService', function(){
	var quizService, $rootScope;
	beforeEach(module('quiz.services'));

	beforeEach(inject(function(_$rootScope_, _quizService_){
		quizService = _quizService_;
		$rootScope = _$rootScope_;
	}));

	it('should have getQuizData function', function(){
		expect(quizService.getQuizData).toBeDefined();

	});

	it('getQuizData should return an array of items', function(){
		var promise = quizService.getQuizData();
		promise.then(function(data){
			expect(data.length).toBeGreaterThan(0);
		});
		$rootScope.$digest();
		
	});

});