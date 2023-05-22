import style from "../../styles/viewAllFood.module.css";
import { useState, useEffect} from "react";
import { BoxOrder } from "./boxOrder";
import { BtnProcessOrder } from "./btnProcessOrder";
import { HandlerOrder } from "./handlerOrder";
export function ViewAllFood({ type }) {
    const [data, setData] = useState([]);
    let [dataFilter, setDataFilter] = useState(0);
    // agregue este hook para compartir info entre components hermanos
    let [completeOrder, setCompleteOrder] = useState({}); // completeOrden se va a ir a btnProcessOrder y serCompleteO a boxOrder
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVuZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjg0NzgyMjg1LCJleHAiOjE2ODQ3ODU4ODUsInN1YiI6IjMifQ.zpNnrYBqRW9RLxqBXpLordTT3nCG25xxuP7IDPV57l4';
    useEffect(() => {
        const headers = {'Authorization': `Bearer ${token}` };
        fetch('http://localhost:8080/products', {headers})
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data)
            })
    }, [])
    const filterFood = (data, category) => {
        if (Array.isArray(data)){ // agregué este condicional para que no se rendericen la data vacía, solo cuando tenga algo en el array
            return data.filter((element) => {
                return element.type.includes(category);
            })
        }
        return [];
    };
    useEffect (()=>{
        const newDataFilter = filterFood(data, type);
        setDataFilter(newDataFilter);
    },  [data, type]) // solo se ejecuta useEffect si estos cambian 
    // función que se va a enviar a boxOrden para que actualice la orden completa
    const receivedOrder = (completeOrder) => {setCompleteOrder(completeOrder)};

    return (
        <div className={style.container}>
            {dataFilter.length > 0 && // este operador permite ejecutar el siguiente código solo si la expr anterior es true Short-circuit evaluation
            dataFilter.map((item) => {
                return (
                    <div className={style.content} key={item.id}>
                            <HandlerOrder
                             img={item.image}
                             id={item.id}
                             name={item.name}
                             price={item.price}
                             />
                    </div>

                )
            })}
            <BoxOrder object = {receivedOrder} />
        <BtnProcessOrder object = {completeOrder} />
        </div>
    )
};
