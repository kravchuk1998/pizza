'use client'

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
    items: Category[];
    className?: string;
}

//const cats = ['Пиццы', 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Десерты'];


export const Categories: React.FC<Props> = ({items, className }) => {
    const categorieActiveId = useCategoryStore((state) => state.activeId)
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                items.map(({ name, id}, index) => (
                    <a className={
                        cn('flex items-center font-bold h-11 rounded-2xl px-5 ', 
                            categorieActiveId === id && 'bg-white shadow-mb shadow-gray-200 text-primary', )}
                            href={`/#${name}`}
                        key={index}>
                        <button>{name}</button>
                    </a>
                ))
            }
        </div>
    )
}