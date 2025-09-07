// This is the new root page. It will automatically redirect to the default locale.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
