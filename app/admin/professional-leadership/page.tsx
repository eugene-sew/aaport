"use client";

import Link from 'next/link';

export default function ProfessionalLeadershipPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Professional Leadership</h1>
      <p className="text-gray-500">Manage your professional leadership activities.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/professional-leadership/supervision" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Supervision</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Manage student and project supervisions.</p>
        </Link>
        <Link href="/admin/professional-leadership/speaking-engagement" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Speaking Engagements</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Manage speaking engagements and invitations.</p>
        </Link>
      </div>
    </div>
  );
}
