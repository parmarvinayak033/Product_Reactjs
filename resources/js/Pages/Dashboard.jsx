import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const modules = [
        { name: 'Products', route: '/products' },
        { name: 'Categories', route: '/categories' },
        { name: 'Colors', route: '/colors' },
        { name: 'Sizes', route: '/sizes' },


    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-6 text-2xl font-bold">
                                Welcome to Admin Dashboard 👋
                            </h3>

                            <div className="flex flex-wrap gap-4">
                                {modules.map((module) => (
                                    <Link
                                        key={module.name}
                                        href={module.route}
                                        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                                    >
                                        {module.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}