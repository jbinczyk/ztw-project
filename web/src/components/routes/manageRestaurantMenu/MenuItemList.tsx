import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api from '../../../api';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface MenuItemListProps {}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    weight: number;
}

const MenuItemList: React.FunctionComponent<MenuItemListProps> = () => {
    // const { items } = props
    const [menuState, setMenuState] = useState({
        menuItems: Array(),
        restaurant: Number,
    });

    useEffect(() => {
        getMenuInfo();
    }, []);

    const getMenuInfo = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const response = await api.getRestaurantForUserEmail(email);
                const response2 = await api.getRestaurantMenuId(response.data.id);
                const response3 = await api.getRestaurantMenuItemByMenuId(response2.data.id);
                console.log(response3);
                setMenuState({
                    menuItems: response3.data,
                    restaurant: response.data.id,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await api.deleteMenuItemById(id);
            // const menuItem = {
            //   id: id,
            //   visible: false
            // }
            // await axios.put(`${config.url.API_URL}/api/menuItem/put`, menuItem)

            // await api.setMenuItem(id)
            await getMenuInfo();
            message.success('Usunięto pozycję');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {menuState.menuItems.map((item) => {
                return (
                    <Card
                        key={item.id}
                        actions={[
                            <Link key={item.id} to={`/manage-menu-item/${item.id}`}>
                                <EditOutlined key="editMenuItem" />
                            </Link>,
                            <DeleteOutlined key="deleteMenuItem" onClick={() => deleteItem(Number(item.id))} />,
                        ]}
                    >
                        <Meta title={item.name + ' (' + item.price + ' zł)'} description={item.description} />
                    </Card>
                );
            })}
        </div>
    );
};

export default MenuItemList;
