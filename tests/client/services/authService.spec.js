describe('authService', function(){
	var authService;
	beforeEach(module('quiz.services'));

	beforeEach(inject(function(_authService_){
		authService = _authService_;
	}));

	it('should have isAuthenticated defined', function(){
		expect(authService.isAuthenticated).toBeDefined();
	});

});