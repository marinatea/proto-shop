import {
  Analytics,
  AnalyticsContent,
  AnalyticsDescription,
  AnalyticsHeader,
  AnalyticsTitle
} from '@/components/ui/analytics';

export default function CustomersPage() {
  return (
    <Analytics>
      <AnalyticsHeader>
        <AnalyticsTitle>Analytics</AnalyticsTitle>
        <AnalyticsDescription>View analytics.</AnalyticsDescription>
      </AnalyticsHeader>
      <AnalyticsContent></AnalyticsContent>
    </Analytics>
  );
}
