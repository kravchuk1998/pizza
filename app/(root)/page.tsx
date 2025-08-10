import {  Container, Filters,  Title, TopBar } from "@/components/shered";
import { ProductCard } from "@/components/shered/product-card";
import { ProductGroupList } from "@/components/shered/products-group-list";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {
  const catedories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true
        }
      }
    }
  });

  return (
      <>
          <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-extralight"/>
          </Container>

            <TopBar categories={catedories.filter((category) => category.products.length > 0)}/>

            <Container className="mt-10 pb-14"> 
              <div className="flex gap-[80px]">

                <div className="w-[250px]">
                  <Filters />
                </div>

                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                      {
                        catedories.map(
                          (category) => 
                            category.products.length > 0 && (
                              <ProductGroupList 
                                key={category.id}
                                title={category.name} 
                                categoryId={category.id}
                                items={category.products} 
                              />
                            ),
                            
                      )}
                
                      
                        

                 
                        
                    </div>
                </div>
              </div>
            </Container>
      </>
  );
}