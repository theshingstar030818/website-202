export interface UserServiceInterface {
    init();
	isInitiallized(): boolean;
	isLoggedIn(): boolean;
	login(values: any);
	logOut();
	getUserRole():string;
}