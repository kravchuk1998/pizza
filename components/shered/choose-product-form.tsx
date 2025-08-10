import { cn } from "@/lib/utils";

import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
    imageURL: string;
    name: string;
    className?: string;
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    items,
    imageURL,
    className,
    onClickAdd,
    ingredients,
}) => {
    const textDetaills = '30 cm - 8 slices - 4 ingredients';
    const totalPrice = 400
    return (
        <div className={cn(className, 'flex flex-1')}>
            <img
                src={imageURL}
                alt={name}
                className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
            />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                 <p className="text-gray-400">{textDetaills}</p>
                 <Button
                    
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
   