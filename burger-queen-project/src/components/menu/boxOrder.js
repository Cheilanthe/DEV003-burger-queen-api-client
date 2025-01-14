import styles from "../../styles/boxOrder.module.css";
import style from "../../styles/viewAllFood.module.css";
import { useContext, useDebugValue, useState } from "react";
import { ContextOrder } from "./contextOrder";

export function BoxOrder({ name, price }) {
    const [order, setOrder] = useContext(ContextOrder);
    const [infOrder, setInfOrder] = useState({});
        const addInfo = (e) => {
            const value = e.target.value;
            const client = e.target.name;
        setInfOrder(prevInfo => ({...prevInfo, client: value}));
        };
     console.log(infOrder);
     console.log(order);
     
    const modifyItems = (action, itemId, infOrder) => {
        const itemInOrder = order.findIndex((item, index) => index === itemId);
        if (itemInOrder !== -1) {
            const updatedOrder = [...order];
            // console.log(updatedOrder);
            const updatedItem = { ...updatedOrder[itemInOrder] };
            // console.log(updatedItem)
            updatedItem.counter += action;
            if (updatedItem.counter) {
                updatedItem.price;
                updatedOrder[itemInOrder] = updatedItem;
            } 
            setOrder(updatedOrder);
        } 
    };
    const addTotal = order.reduce((previous, current) => previous + (current.price * current.counter), 0);
    
    console.log(order);
    const joinOrder =[...order, infOrder, {total: addTotal}];
    console.log(joinOrder);
    return (
        <div className={styles.burgerBox}>
            <label className={styles.customer}>Cliente: <input type="text" value={infOrder.client} className={styles.customerName} onChange={addInfo}></input></label>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th> </th>
                        <th>Cantidad</th>
                        <th> </th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody >
                    {order.map((item, index) => {
                        // console.log(item.name)
                        const itemPrice = item.price * item.counter;
                        return (
                            <tr className={styles.tableOrder} key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {/* <button className={style.btnAdd} onClick={() => modifyItems(-1, index)}>-</button> */}
                                    <button className={style.btnAdd} onClick={() => item.counter > 1 ? modifyItems(-1, index) : null}>-</button>
                                </td>
                                <td className={style.countertd}>
                                    <div className={style.counter}><p>{item.counter}</p></div>
                                </td>
                                <td>
                                    <button className={style.btnAdd} onClick={() => modifyItems(1, index)}>+</button>
                                </td>
                                <td>$ {itemPrice}</td>
                                <td> <button className={styles.btnGarbage}><img className={styles.imgGarbage} src = {'https://i.postimg.cc/cHH67PmW/eliminar.png'} alt='garbage'/></button></td>
                            </tr>
                        )
                    })}
                    <tr className={style.trTotal}>
                        <td>Total: ${addTotal}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

