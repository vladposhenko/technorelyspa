import {
    ADMIN_COMPANIES_ROUTE,
    ADMIN_ROUTE, ADMIN_USERS_ROUTE,
    COMPANIES_ROUTE, COMPANY_ADMIN_ROUTE, COMPANY_INFO,
    CREATE_COMPANY_ROUTE, EDIT_COMPANY_ROUTE, EDIT_PROFILE_ADMIN,
    LOGIN_ROUTE, PROFILE_ADMIN_ROUTE, PROFILE_EDIT_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    WELCOME_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Companies from "./pages/Companies";
import CompanyForm from "./components/CompanyForm/CompanyForm";
import CompanyInfo from "./pages/CompanyInfo";
import Profile from "./pages/Profile";
import AllUsers from "./components/AllUsers/AllUsers";
import AllCompanies from "./components/AllCompanies/AllCompanies";
import EditProfile from "./components/EditProfile/EditProfile";

export const authRoutes = [
    {
        path:COMPANIES_ROUTE,
        Component:Companies
    },
    {
        path:CREATE_COMPANY_ROUTE,
        Component:CompanyForm
    },
    {
        path:EDIT_COMPANY_ROUTE,
        Component:CompanyForm
    },
    {
        path:COMPANY_INFO,
        Component:CompanyInfo
    },
    {
        path:PROFILE_ROUTE,
        Component:Profile
    },
    {
        path:PROFILE_ROUTE,
        Component:Profile
    },
    {
        path:PROFILE_EDIT_ROUTE,
        Component:EditProfile
    }
]

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path:WELCOME_ROUTE,
        Component:Welcome
    }
]

export const adminRoutes = [
    {
        path:ADMIN_USERS_ROUTE,
        Component:AllUsers
    },
    {
        path:ADMIN_COMPANIES_ROUTE,
        Component:AllCompanies
    },
    {
        path:PROFILE_ADMIN_ROUTE,
        Component:Profile
    },
    {
        path:EDIT_PROFILE_ADMIN,
        Component:EditProfile
    },
    {
        path:COMPANY_ADMIN_ROUTE,
        Component:CompanyInfo
    }
]