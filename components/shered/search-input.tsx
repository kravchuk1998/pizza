"use client"

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { log } from "console";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
    classname?: string;
}

export const SearchInput: React.FC<Props> = ({ classname }) =>{

    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);

    const  ref  = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);        
    })

    useDebounce( async () => {
        try { 
            const response = await Api.products.search(searchQuery);
            setProducts(response)
        } catch (error) {console.log(error);
        }
       
    },250,[searchQuery]);

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    }

    return(

        <>
            {focused &&<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/30 z-30"></div>}
            <div ref={ref} className={(cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", classname))}> 
                <SearchIcon className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-grey-400"/>
                <input 
                    type="text"
                    className="rounded-2xl outline-none w-full pl-11 bg-gray-100"
                    placeholder="Найти пиццу" 
                    onFocus={() => setFocused(true)}    
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

        {products.length > 0 &&<div className={cn(
              'absolute  bg-white w-[500px] rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 ',
              focused && 'visible opacity-100 top-24' 

            )}> 
               {products.map((product)  => (
                    <Link 
                        key={product.id}
                        onClick={onClickItem}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 "
                         href={`/products/${product.id}`}>

                        <img className="rounded-sm w-8 h-8" src={product.imageUrl} alt={product.name} />
                        <div>
                            <span> {product.name}</span>                      
                        </div>
                    </Link>
                ))} 
            </div>}

        </>
    )
}