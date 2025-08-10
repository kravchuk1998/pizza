"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/hooks/use-ingredients";
import { useFilters } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";
import { useQueryFilters } from "@/hooks/use-query-filters";


interface Props {
    className?: string;
}




export const Filters: React.FC<Props> = ({ className }) => {
    const router = useRouter();
    const {ingredients, loading} = useIngredients();
    const  filters = useFilters();

    useQueryFilters(filters);

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

    const items = ingredients.map((item) => ({
        value: String(item.id), text: item.name
    }))
    
    

    return (    
        <div className={cn('', className)}>
           <Title text="Фильтрaция" size="sm" className="mb-5 font-bold"/>
            {/*Top checkBox */}
            <div className="flex flex-col gap-4">
                <CheckboxFiltersGroup
                    title = 'Size'
                    name = "sizes"
                    className = "mb-5"
                    onClickCheckbox={filters.setSizes}
                    selected={filters.sizes}
                    items={[
                        {text: '20', value: '20'},
                        {text: '30', value: '30'},
                        {text: '40', value: '40'},
                    ]}
                />   

                <CheckboxFiltersGroup 
                    title='Тип теста' 
                    className="mb-5"
                    name="pizzaTypes" 
                    items={[
                        {text: 'Тонкое', value: '1'},
                        {text: 'Традиционное', value: '2'},
                    ]}              
                    onClickCheckbox={filters.setPizzaTypes}
                    selected={filters.pizzaTypes}
                />
                
            </div>
            {/*Filter Price */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7 ">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(filters.prices.priceFrom)} onChange={e => filters.setPrices('priceFrom', Number(e.target.value))}/>
                    <Input type='number'  min={0} max={1000} value={String(filters.prices.priceTo)} onChange={e => filters.setPrices('priceTo', Number(e.target.value))}/>
                </div>

                <RangeSlider min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} 
                            onValueChange={updatePrices}/>
            </div>
            {/*Filter ingredients */}

            <CheckboxFiltersGroup 
                title='Инредиенты' 
                className="mb-5" 
                limit={6}
                defaultItems={items.slice(0, 6)} 
                items={items} 
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    )
}