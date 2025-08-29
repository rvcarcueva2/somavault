'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircle, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

type Event = {
    title: string;
    id: string;
    datePublished: string;
    dateModified: string;
};

type Column = {
    key: keyof Event;
    label: string;
    minWidth?: string;
};

const columns: Column[] = [
    { key: 'title', label: 'Title', minWidth: 'min-w-[200px]' },
    { key: 'datePublished', label: 'Date Published', minWidth: 'min-w-[150px]' },
    { key: 'dateModified', label: 'Date Modified', minWidth: 'min-w-[150px]' },
];

// Static data for featured works
const staticEvents: Event[] = [
    {
        title: 'Golden Hour Gathering ',
        id: 'E001',
        datePublished: '2024-01-15',
        dateModified: '2024-02-01',
    },
    {
        title: 'Echoes of Tomorrow: A Music & Arts Festival',
        id: 'E002',
        datePublished: '2024-02-15',
        dateModified: '2024-03-01',
    },

    {
        title: 'Frames in Motion: Independent Film Nights',
        id: 'E003',
        datePublished: '2024-04-15',
        dateModified: '2024-04-17',
    },
    {
        title: 'The Storytellers’ Stage',
        id: 'E004',
        datePublished: '2024-05-15',
        dateModified: '2024-05-17',
    }
];

export default function EventsPage() {
    const [data, setData] = useState<Event[]>(staticEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Event | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [pendingStatusChange, setPendingStatusChange] = useState<{
        id: string;
        newStatus: string;
    } | null>(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isOpen, setIsOpen] = useState<string>('');
    const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number; showAbove: boolean } | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleToggle = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if there's enough space below (150px for dropdown height)
        const spaceBelow = windowHeight - rect.bottom;
        const showAbove = spaceBelow < 150;

        setDropdownPosition({
            x: rect.left - 120, // Position to the left of the button
            y: showAbove ? rect.top - 140 : rect.bottom + 5, // Above or below based on space
            showAbove
        });

        setIsOpen((prev) => (prev === id ? '' : id));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsOpen('');
            setDropdownPosition(null);
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleSort = (column: keyof Event) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    let filteredWorks = data.filter((item) =>
        Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (sortColumn) {
        filteredWorks.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortDirection === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                return sortDirection === 'asc'
                    ? Number(valueA) - Number(valueB)
                    : Number(valueB) - Number(valueA);
            }

            return sortDirection === 'asc'
                ? Number(valueA) - Number(valueB)
                : Number(valueB) - Number(valueA);
        });
    }



    const handleRowClick = (id: string) => {
        // You can implement navigation to work details here
        console.log('Clicked work:', id);
    };


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderCellContent = (item: Event, columnKey: keyof Event) => {
        {/* Render cell content based on column key */ }
        switch (columnKey) {

            case 'title':
                return (
                    <div className=" pl-5 flex items-center justify-start">
                        {item[columnKey]}
                    </div>
                );

            case 'id':
                return (
                    <div className="flex items-center justify-center">
                        {item[columnKey]}
                    </div>
                );

            case 'datePublished':
                return (
                    <div className="flex items-center justify-center">
                        {formatDate(item[columnKey] as string)}
                    </div>
                );
            case 'dateModified':
                return (
                    <div className="flex items-center justify-center">
                        {formatDate(item[columnKey] as string)}
                    </div>
                );

            default:
                return item[columnKey];
        }
    };

    return (
        <div className="font-geist p-6 ml-64">
            {/* Page Header */}
            <div className="mt-4 mb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Events</h1>
                </div>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg text-m font-regular transition-all duration-300">
                    {successMessage}
                </div>
            )}

            <div className="bg-white border shadow-sm rounded-md">
                <div className="flex justify-end p-4 border-b border-[rgba(0,0,0,0.2)]">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#EAB044]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute top-1/2 left-3 -translate-y-1/2">
                            <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className={`w-full ${filteredWorks.length > 6 ? 'max-h-[440px] overflow-y-auto' : ''}`}>
                        <table className="w-full text-sm">
                            <thead className="bg-red-50 border-b border-[rgba(0,0,0,0.2)] sticky top-0 z-10">
                                {/* Table header */}
                                <tr>
                                    {columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className={`p-3 pl-5 text-left text-gray-500 font-normal cursor-pointer ${column.minWidth} truncate`}
                                            onClick={() => handleSort(column.key)}
                                        >
                                            <div
                                                className={`flex gap-2 ${column.label === "Title" ? "justify-start pl-2" : "justify-center"
                                                    }`}
                                            >
                                                {column.label}
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-3 w-[90px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                                            Loading data...
                                        </td>
                                    </tr>
                                ) : filteredWorks.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                                            No featured works found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredWorks.map((item, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleRowClick(item.id)}
                                            className={`border-b border-[rgba(0,0,0,0.2)] hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                }`}
                                        >
                                            {columns.map((column) => (
                                                <td key={column.key} className={`p-3 text-sm break-words text-black `}>
                                                    {renderCellContent(item, column.key)}
                                                </td>
                                            ))}
                                            <td className="p-3 text-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                                <FontAwesomeIcon icon={faInfoCircle} className="text-[#EAB044] w-4 h-4" />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}