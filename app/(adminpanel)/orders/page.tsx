import {
  Orders,
  OrdersContent,
  OrdersDescription,
  OrdersHeader,
  OrdersTitle
} from '@/components/ui/orders';

export default function OrdersPage() {
  return (
    <Orders>
      <OrdersHeader>
        <OrdersTitle>Orders</OrdersTitle>
        <OrdersDescription>View all orders.</OrdersDescription>
      </OrdersHeader>
      <OrdersContent></OrdersContent>
    </Orders>
  );
}
