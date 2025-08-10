'use client'
import { Dialog,DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";




import React from "react"

import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";


interface Props {
    product: ProductWithRelations
    className?: string;
}
export const ChooseProductModal: React.FC<Props> = ({product ,className}) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType)
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',className)}>
                { isPizzaForm ? ('pizzaForm'):
                    <ChooseProductForm imageURL={product.imageUrl} name={product.name}  ingredients={[]} />
                }   
            </DialogContent>
        </Dialog>
    )
}