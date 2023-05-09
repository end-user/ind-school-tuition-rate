export const msalConfig = {
	auth: {
		clientId: "8a97f476-d0b7-4754-bf13-88a08e03ff54",
		authority: "https://login.microsoftonline.com/20b4933b-baad-433c-9c02-70edcc7559c6",
		redirectUri: "https://hls.education.vermont.gov/",
	},
	cache: {
		cacheLocation: "localStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
		secureCookies: false
	}
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
	scopes: ["User.Read", "openid"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com"
};