
import { ChooseProductModal } from '@/components/shered/modals/choose-product-modal';
import { prisma } from '@/prisma/prisma-client';
import { log } from 'console';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });
 
  if (!product) {
    return notFound();
  }

  return  <ChooseProductModal product={product}  />;
}