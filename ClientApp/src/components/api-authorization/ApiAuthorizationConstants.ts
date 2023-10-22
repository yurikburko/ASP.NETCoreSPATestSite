export const ApplicationName = 'SPATestSite';

export const QueryParameterNames = {
  ReturnUrl: 'returnUrl',
  Message: 'message'
};

export const LogoutActions = {
  LogoutCallback: 'logout-callback',
  Logout: 'logout',
  LoggedOut: 'logged-out'
};

export const LoginActions = {
  Login: 'login',
  LoginCallback: 'login-callback',
  LoginFailed: 'login-failed',
  Profile: 'profile',
  Register: 'register'
};

const prefix = '/authentication';
const apiPrefix = '/api';

export const ApplicationPaths = {
  DefaultLoginRedirectPath: '/',
  ApiAuthorizationClientConfigurationUrl: `_configuration/${ApplicationName}`,
  ApiAuthorizationPrefix: prefix,
  Login: `${prefix}/${LoginActions.Login}`,
  LoginFailed: `${prefix}/${LoginActions.LoginFailed}`,
  LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,
  Register: `${prefix}/${LoginActions.Register}`,
  Profile: `${prefix}/${LoginActions.Profile}`,
  LogOut: `${prefix}/${LogoutActions.Logout}`,
  LoggedOut: `${prefix}/${LogoutActions.LoggedOut}`,
  LogOutCallback: `${prefix}/${LogoutActions.LogoutCallback}`,
  IdentityRegisterPath: 'Identity/Account/Register',
  IdentityManagePath: 'Identity/Account/Manage',
  
  users: {
    get: `${apiPrefix}/users`,
    delete: (id: string) => `${apiPrefix}/users/${id}`,
    assignAdminRole: (id: string) => `${apiPrefix}/users/${id}/assign-admin-role`,
    unassignAdminRole: (id: string) => `${apiPrefix}/users/${id}/unassign-admin-role`,
    getAvatar: (id: string) => `${apiPrefix}/users/${id}/avatar`
  }
};

export const adminRole = "Admin";