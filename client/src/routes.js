import {
    ADMIN_ROUTE,
    COMPANIES_ROUTE, COMPANY_INFO,
    CREATE_COMPANY_ROUTE,
    LOGIN_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    WELCOME_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Companies from "./pages/Companies";
import CreateCompany from "./components/CreateCompany/CreateCompany";
import CompanyInfo from "./pages/CompanyInfo";
import Profile from "./pages/Profile";

export const authRoutes = [
    {
        path:COMPANIES_ROUTE,
        Component:Companies
    },
    {
        path:CREATE_COMPANY_ROUTE,
        Component:CreateCompany
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
        path:ADMIN_ROUTE,
        Component:Admin
    },
]