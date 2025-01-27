import {
  Settings,
  SettingsContent,
  SettingsDescription,
  SettingsHeader,
  SettingsTitle
} from '@/components/ui/settings';

export default function SettingsPage() {
  return (
    <Settings>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SettingsDescription>View all settings.</SettingsDescription>
      </SettingsHeader>
      <SettingsContent></SettingsContent>
    </Settings>
  );
}
