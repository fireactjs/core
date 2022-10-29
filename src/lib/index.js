import { AuthContext, AuthProvider, AuthRoutes } from "./components/Auth";
import { PublicTemplate } from "./components/templates/PublicTemplate";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { ResetPassword } from "./components/auth/ResetPassword";
import { AppTemplate } from "./components/templates/AppTemplate";
import { UserMenu } from "./components/menus/UserMenu";
import { MainMenu } from "./components/menus/MainMenu";
import { UserProfile } from "./components/user/UserProfile";
import { UserUpdateEmail } from "./components/user/UserUpdateEmail";
import { SetPageTitle } from "./components/SetPageTitle";

import pathnames from "./pathnames.json";

export {
    pathnames,
    AppTemplate,
    AuthContext,
    AuthProvider,
    AuthRoutes,
    MainMenu,
    PublicTemplate,
    ResetPassword,
    SetPageTitle,
    SignIn,
    SignUp,
    UserMenu,
    UserProfile,
    UserUpdateEmail
}