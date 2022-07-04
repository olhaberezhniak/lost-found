import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LockIcon from "@mui/icons-material/Lock";

export const menuItems = [
    {
        text: 'Profile',
        icon: <PersonIcon  />,
        path: '/sidebar'
    },
    {
        text: 'My BuySell Items',
        icon: <ShoppingCartIcon  />,
        path: '/sidebar/myOwnBuySellItems'
    },
    {
        text: 'Lost/Found items',
        icon: <ContentPasteSearchIcon />,
        path: '/sidebar/myOwnLostFoundItems'
    },
    {
        text: 'My Requirements',
        icon: <FormatListBulletedIcon  />,
        path: '/sidebar/myOwnRequirements'
    },
    {
        text: 'Change Password',
        icon: <LockIcon  />,
        path: '/changePassword'
    },
];