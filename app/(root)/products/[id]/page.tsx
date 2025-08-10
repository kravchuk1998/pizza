import { Container, Title } from "@/components/shered";
import { GroupVariants } from "@/components/shered/group-variants";
import { ProductImage } from "@/components/shered/product-image";
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation";

export default async function ProductPage({params: {id}}: {params : {id: string}}) {

    const proroct  = await prisma.product.findFirst({where: {id: Number(id)}});

    if(!proroct) return notFound();
    return  <Container className="flex flex-col my-10">
        <div className="flex flex-1">
            <ProductImage imageUrl={proroct.imageUrl} size={40}/>

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={proroct.name} size="md" className="font-extralight mb-1"/>

                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <GroupVariants 
                    value="2"
                    items={[
                        {name: 'small', value: '1'},
                        {name: 'mid', value: '2'},
                        {name: 'big', value: '3', disabled: true},
                    

                    ]} 
                />
            </div>
        </div>

         
    </Container>
}