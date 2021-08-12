import React from 'react'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



const BadgeComponent = ({ number, icon }) => {
    return (
        <Badge
            badgeContent={number}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            {icon === 'bag' && <ShoppingCartIcon />}
        </Badge>
    )
}

export default BadgeComponent
