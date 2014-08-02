describe('authService', function(){
	var authService, $rootScope;
	beforeEach(module('quiz.services'));

	beforeEach(inject(function(_$rootScope_,_authService_){
		authService = _authService_;
		$rootScope = _$rootScope_;
	}));

	it('should have isAuthenticated defined', function(){
		expect(authService.isAuthenticated).toBeDefined();
		$rootScope.$digest();
	});

});