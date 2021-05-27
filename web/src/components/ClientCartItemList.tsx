import React from 'react';

import { CartContext } from '../contexts/CartContext';

import { Card } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ClientCartItemList: React.FunctionComponent = () => {
    return (
        <CartContext.Consumer>
            {(context) => {
                const { items, removeItem } = context;

                let totalCost = 0.0;
                for (const i of items) {
                    totalCost = totalCost + i.price;
                }

                if (items.length === 0) {
                    return (
                        <div>
                            <h3>Pusty</h3>
                            Dodaj produkty :)
                        </div>
                    );
                }

                return (
                    <div>
                        {items?.map((menuItem, index) => (
                            <Card
                                key={menuItem.id}
                                actions={[<DeleteOutlined key="deleteCartItem" onClick={() => removeItem(index)} />]}
                            >
                                <Meta
                                    title={menuItem.name + ' (' + menuItem.price + ' zł)'}
                                    description={menuItem.description}
                                />
                                {/* <Button onClick={() => removeItem(index)}>
                                    Usuń
                                </Button> */}
                            </Card>
                        ))}
                        Razem: {totalCost.toFixed(2)} zł
                    </div>
                );
            }}
        </CartContext.Consumer>
    );
};

export default ClientCartItemList;
