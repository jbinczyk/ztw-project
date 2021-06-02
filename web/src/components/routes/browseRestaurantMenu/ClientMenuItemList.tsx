import React from 'react'

import { CartContext, MenuItem } from '../../../contexts/CartContext'

import { Button, Card, message } from 'antd'


interface MenuListProps {
    menuItems: MenuItem[]
}

const ClientMenuItemList: React.SFC<MenuListProps> = (props: MenuListProps) => {
    return (
        <CartContext.Consumer>
            {(context) => {
                const { addToCart, clearCart, items } = context
                const { menuItems } = props

                // Czyszczenie koszyka jeśli wejdzie do innej restauracji
                if (items.length > 0) {
                    if (menuItems.length > 0) {
                        if (items[0].menu.id !== menuItems[0].menu.id) {
                            clearCart()
                        }
                    }
                }

                const handleAddToCart = (item: MenuItem) => {
                    addToCart(item)
                    message.success("Dodano do zamówienia")
                }
                return (
                    <div>
                        {menuItems?.map(menuItem =>
                            <Card key={menuItem.id}>
                                <h3>{menuItem.name}</h3>
                                <h4>Opis: {menuItem.description}</h4>
                                <h4>Waga: {menuItem.weight}</h4>
                                <h4>Cena: {menuItem.price}</h4>
                                <Button onClick={() => handleAddToCart(menuItem)}>
                                    Dodaj
                                    </Button>
                            </Card>)
                        }
                    </div>
                )
            }}
        </CartContext.Consumer>
    )
}

export default ClientMenuItemList