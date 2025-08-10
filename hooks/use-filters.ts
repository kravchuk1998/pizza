import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps{
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps{
    sizes: string,
    pizzaTypes: string,
    ingredients: string
    
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    prices: PriceProps;
    selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters{
    setSizes: (value: string) => void;
    setPizzaTypes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
    setPrices: (name: keyof PriceProps, value: number) => void;
    
}

export const useFilters = () : ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router = useRouter();
/* Фильтр по ингредиентам*/
    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
    /* Фильтр по размерам*/
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') :[]));
    /* Фильтр по типпу теста*/
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') :[]));
    /* Фильтр по цене*/
    const [prices, setPrices] = React.useState<PriceProps>({ 
        priceFrom: Number(searchParams.get('priceFrom')) ||  undefined,
        priceTo: Number(searchParams.get('priceTo')) ||  undefined,
    });

    const updatePrice =  (name: keyof PriceProps, value: number) =>{
        
            setPrices(prev => ({
                ...prev,        
                [name]: value
            }))
        }   

    return{
        sizes, 
        pizzaTypes, 
        prices, 
        selectedIngredients, 
        setPrices: updatePrice, 
        setPizzaTypes: togglePizzaTypes, 
        setSizes: toggleSizes, 
        setSelectedIngredients: toggleIngredients};
}

