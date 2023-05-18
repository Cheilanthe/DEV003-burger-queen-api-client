import style from "../../styles/viewAllFood.module.css";
import { useState, useEffect} from "react";
import { BoxOrder } from "./boxOrder";
import { BtnProcessOrder } from "./btnProcessOrder";
import { HandlerOrder } from "./handlerOrder";
export function ViewAllFood({ type }) {
    const [data, setData] = useState([]);
    let [dataFilter, setDataFilter] = useState(0);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVuZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjg0NDMyNzk4LCJleHAiOjE2ODQ0MzYzOTgsInN1YiI6IjMifQ.Jwa_O4pJnYepe5F16zzjbCI_6cZTR4uH4tffxe3ai-I';
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
            <BoxOrder />
        <BtnProcessOrder />
        </div>
    )
};
