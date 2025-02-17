import {
  Products,
  ProductsContent,
  ProductsDescription,
  ProductsHeader,
  ProductsTitle
} from '@/components/ui/Products';

export default function ProductsPage() {
  return (
    <Products>
      <ProductsHeader>
        <ProductsTitle>Products</ProductsTitle>
        <ProductsDescription>View all products.</ProductsDescription>
      </ProductsHeader>
      <ProductsContent></ProductsContent>
    </Products>
  );
}
